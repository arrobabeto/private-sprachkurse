import { defineEventHandler, getQuery } from "h3"
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
import { normalizeSections } from "~/utils/normalizeSections"

type QueryValue = string | string[] | null | undefined
type QueryBindings = Record<string, QueryValue>

function normalizePage(page: IPage): IPage {
  return {
    ...page,
    sections: normalizeSections(page.sections),
  }
}

function normalizePages(pages: IPage | IPage[]): IPage | IPage[] {
  return Array.isArray(pages) ? pages.map(normalizePage) : normalizePage(pages)
}

function queryValueMatches(value: QueryValue, expected: string) {
  return Array.isArray(value) ? value.includes(expected) : value === expected
}

function getFallbackPage(bindings: QueryBindings) {
  const sqlConfigured = hasSqlKeyConfigured()
  const homepage = buildHomepageSeed(sqlConfigured)
  const angebote = buildAngeboteSeed()
  const sprachtrainerin = buildSprachtrainerinSeed()
  const inUnternehmen = buildInUnternehmenSeed()
  const ubersetzungen = buildUbersetzungenSeed()
  const id = bindings["id"]
  const slug = bindings["slug"]

  if (slug === "angebote" || id === ANGEBOTE_ID) return angebote
  if (slug === "sprachtrainerin" || id === SPRACHTRAINERIN_ID)
    return sprachtrainerin
  if (slug === "in-unternehmen" || id === IN_UNTERNEHMEN_PAGE_ID)
    return inUnternehmen
  if (slug === "ubersetzungen" || id === UBERSETZUNGEN_PAGE_ID)
    return ubersetzungen
  // AUTO-PAGES:START
  const kontakt = buildKontaktSeed()
  if (slug === "kontakt" || id === KONTAKT_PAGE_ID) return kontakt
  // AUTO-PAGES:END
  if (
    id &&
    !queryValueMatches(id, homepage.id) &&
    id !== ANGEBOTE_ID &&
    id !== SPRACHTRAINERIN_ID &&
    id !== IN_UNTERNEHMEN_PAGE_ID &&
    id !== UBERSETZUNGEN_PAGE_ID &&
    id !== KONTAKT_PAGE_ID
  )
    return null
  if (
    slug &&
    !queryValueMatches(slug, homepage.slug) &&
    slug !== "angebote" &&
    slug !== "kontakt" &&
    slug !== "sprachtrainerin" &&
    slug !== "in-unternehmen" &&
    slug !== "ubersetzungen"
  )
    return null

  return id || slug
    ? homepage
    : [
        homepage,
        angebote,
        sprachtrainerin,
        inUnternehmen,
        ubersetzungen,
        // AUTO-PAGES:START
        kontakt,
        // AUTO-PAGES:END
      ]
}

function returnPage(page: IPage | IPage[] | null) {
  if (!page) return null
  return normalizePages(page)
}

function isMockModeEnabled() {
  const rawValue = import.meta.env.ORBITYPE_MOCK
  if (!rawValue) return false
  const normalizedValue = String(rawValue).trim().toLowerCase()
  return (
    normalizedValue === "true" ||
    normalizedValue === "1" ||
    normalizedValue === "yes"
  )
}

function hasSqlKeyConfigured() {
  const raw = import.meta.env.ORBITYPE_API_SQL_KEY
  if (!raw) return false
  const normalized = String(raw).trim()
  if (!normalized) return false
  if (normalized.toLowerCase() === "your-api-key") return false
  return true
}

export default defineEventHandler(async (event) => {
  const bindings = getQuery(event) as QueryBindings

  if (isMockModeEnabled()) return returnPage(getFallbackPage(bindings))

  if (
    !import.meta.env.ORBITYPE_API_SQL_URL ||
    !import.meta.env.ORBITYPE_API_SQL_KEY
  )
    return returnPage(getFallbackPage(bindings))

  let sql = "SELECT * FROM pages"
  if (bindings.id) sql += " WHERE id = :id"
  if (bindings.slug) sql += " WHERE slug = :slug"

  let rows: IPage[]
  try {
    rows = await $fetch(import.meta.env.ORBITYPE_API_SQL_URL, {
      method: "POST",
      headers: { "X-API-KEY": import.meta.env.ORBITYPE_API_SQL_KEY },
      body: { sql, bindings },
    })
  } catch {
    return returnPage(getFallbackPage(bindings))
  }

  if (!Array.isArray(rows) || rows.length === 0)
    return returnPage(getFallbackPage(bindings))

  return bindings.id || bindings.slug
    ? normalizePage(rows[0])
    : rows.map(normalizePage)
})
