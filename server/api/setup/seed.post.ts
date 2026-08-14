import { createError, defineEventHandler, readBody } from "h3"
import type { IPage } from "~/types/dto/IPage"
import { buildAngeboteSeed, ANGEBOTE_ID } from "~/server/utils/angeboteSeed"
import { buildHomepageSeed, HOMEPAGE_ID } from "~/server/utils/homepageSeed"
import {
  buildInUnternehmenSeed,
  IN_UNTERNEHMEN_PAGE_ID,
} from "~/server/utils/inUnternehmenSeed"
import {
  buildSprachtrainerinSeed,
  SPRACHTRAINERIN_ID,
} from "~/server/utils/sprachtrainerinSeed"
import { buildKontaktSeed, KONTAKT_PAGE_ID } from "~/server/utils/kontaktSeed"
import {
  buildUbersetzungenSeed,
  UBERSETZUNGEN_PAGE_ID,
} from "~/server/utils/ubersetzungenSeed"
import {
  buildImpressumSeed,
  IMPRESSUM_PAGE_ID,
} from "~/server/utils/impressumSeed"

type TSeedBody = {
  force?: boolean
  pages?: (
    | "home"
    | "angebote"
    | "kontakt"
    | "sprachtrainerin"
    | "in-unternehmen"
    | "ubersetzungen"
    | "impressum"
  )[]
}

const ORBITYPE_API_KEYS_URL = "https://app.orbitype.com/settings/api-keys"

const SEED_PAGES = {
  home: { id: HOMEPAGE_ID, slug: "home", build: buildHomepageSeed },
  angebote: { id: ANGEBOTE_ID, slug: "angebote", build: buildAngeboteSeed },
  // AUTO-PAGES:START
  kontakt: { id: KONTAKT_PAGE_ID, slug: "kontakt", build: buildKontaktSeed },
  // AUTO-PAGES:END
  sprachtrainerin: {
    id: SPRACHTRAINERIN_ID,
    slug: "sprachtrainerin",
    build: buildSprachtrainerinSeed,
  },
  "in-unternehmen": {
    id: IN_UNTERNEHMEN_PAGE_ID,
    slug: "in-unternehmen",
    build: buildInUnternehmenSeed,
  },
  ubersetzungen: {
    id: UBERSETZUNGEN_PAGE_ID,
    slug: "ubersetzungen",
    build: buildUbersetzungenSeed,
  },
  impressum: {
    id: IMPRESSUM_PAGE_ID,
    slug: "impressum",
    build: buildImpressumSeed,
  },
} as const

function hasSqlKeyConfigured() {
  const raw = import.meta.env.ORBITYPE_API_SQL_KEY
  if (!raw) return false
  const normalized = String(raw).trim()
  if (!normalized) return false
  if (normalized.toLowerCase() === "your-api-key") return false
  return true
}

async function fetchExistingPage(
  slug: string,
  id: string,
): Promise<IPage | null> {
  const rows = await $fetch<IPage[]>(import.meta.env.ORBITYPE_API_SQL_URL, {
    method: "POST",
    headers: { "X-API-KEY": import.meta.env.ORBITYPE_API_SQL_KEY },
    body: {
      sql: "SELECT * FROM pages WHERE slug = :slug OR id = :id",
      bindings: { slug, id },
    },
  })

  if (!Array.isArray(rows) || rows.length === 0) return null
  return rows[0] ?? null
}

async function updatePage(page: IPage, existingId: string) {
  const bindings = {
    id: existingId,
    title: JSON.stringify(page.title),
    lead: JSON.stringify(page.lead),
    img: page.img ?? "",
    sections: JSON.stringify(page.sections),
    keywords: JSON.stringify(page.keywords),
  }

  const rows = await $fetch<IPage[]>(import.meta.env.ORBITYPE_API_SQL_URL, {
    method: "POST",
    headers: { "X-API-KEY": import.meta.env.ORBITYPE_API_SQL_KEY },
    body: {
      sql: `UPDATE pages
            SET title = :title,
                lead = :lead,
                img = :img,
                sections = :sections,
                keywords = :keywords,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = :id
            RETURNING *`,
      bindings,
    },
  })

  return rows[0]
}

async function insertPage(page: IPage) {
  const bindings = {
    id: page.id,
    title: JSON.stringify(page.title),
    slug: page.slug,
    lead: JSON.stringify(page.lead),
    img: page.img ?? "",
    sections: JSON.stringify(page.sections),
    keywords: JSON.stringify(page.keywords),
    head: JSON.stringify(page.head ?? {}),
  }

  const rows = await $fetch<IPage[]>(import.meta.env.ORBITYPE_API_SQL_URL, {
    method: "POST",
    headers: { "X-API-KEY": import.meta.env.ORBITYPE_API_SQL_KEY },
    body: {
      sql: `INSERT INTO pages (id, title, slug, lead, img, sections, keywords, head)
            VALUES (:id, :title, :slug, :lead, :img, :sections, :keywords, :head)
            RETURNING *`,
      bindings,
    },
  })

  return rows[0]
}

async function seedPage(
  key: keyof typeof SEED_PAGES,
  force: boolean,
): Promise<{
  key: string
  ok: boolean
  skipped: boolean
  message: string
  page?: IPage
}> {
  const config = SEED_PAGES[key]
  const page = config.build(hasSqlKeyConfigured())
  const existing = await fetchExistingPage(config.slug, config.id)

  if (existing && !force) {
    return {
      key,
      ok: true,
      skipped: true,
      message: `${key} page already exists. Pass { force: true } to overwrite.`,
      page: existing,
    }
  }

  if (existing && force) {
    const updated = await updatePage(page, existing.id)
    return {
      key,
      ok: true,
      skipped: false,
      message: `${key} page updated successfully.`,
      page: updated,
    }
  }

  const inserted = await insertPage(page)
  return {
    key,
    ok: true,
    skipped: false,
    message: `${key} page seeded successfully.`,
    page: inserted,
  }
}

export default defineEventHandler(async (event) => {
  const body = (await readBody(event).catch(() => ({}))) as TSeedBody
  const force = body.force === true
  const pageKeys = body.pages?.length
    ? body.pages
    : ([
        "home",
        "angebote",
        "kontakt",
        "sprachtrainerin",
        "in-unternehmen",
        "ubersetzungen",
        "impressum",
      ] as const)

  if (
    !import.meta.env.ORBITYPE_API_SQL_URL ||
    !import.meta.env.ORBITYPE_API_SQL_KEY
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: `Missing ORBITYPE_API_SQL_URL or ORBITYPE_API_SQL_KEY in environment. Create/find your SQL API key at ${ORBITYPE_API_KEYS_URL}`,
    })
  }

  try {
    const results: Awaited<ReturnType<typeof seedPage>>[] = []
    for (const key of pageKeys) {
      if (!(key in SEED_PAGES)) continue
      results.push(await seedPage(key, force))
    }

    const allSkipped = results.every((r) => r.skipped)

    return {
      ok: true,
      skipped: allSkipped,
      message: allSkipped
        ? "All requested pages already exist. Pass { force: true } to overwrite."
        : "Seed completed.",
      results,
    }
  } catch (error: any) {
    const errorMessage =
      error?.data?.message ??
      error?.statusMessage ??
      error?.message ??
      "Unknown error while seeding pages."

    throw createError({
      statusCode: 500,
      statusMessage: String(errorMessage),
    })
  }
})
