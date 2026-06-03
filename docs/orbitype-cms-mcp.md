# Orbitype MCP — Private Sprachkurse

This guide explains how CMS content flows in **Private Sprachkurse**, how to set up Orbitype MCP in Cursor, and how to add or update sections safely.

Official Orbitype API + MCP docs: [Orbitype Docs — API Authentication](https://www.orbitype.com/docs/oQSPNY)

---

## 1) Big picture

This repository is a Nuxt marketing frontend that reads page content from PostgreSQL through internal API routes.

### Request flow

1. User opens a URL (for example `/`, `/de`, `/about`).
2. Nuxt page [`pages/[[slug]].vue`](../pages/[[slug]].vue) handles the route.
3. Page calls [`/api/pages`](../server/api/pages/index.get.ts).
4. The handler executes SQL via Orbitype (`ORBITYPE_API_SQL_URL` + `ORBITYPE_API_SQL_KEY` in `.env`).
5. Database row is returned with a `sections` JSON array.
6. [`components/sections/AnySection.vue`](../components/sections/AnySection.vue) renders each section.

### Cursor MCP vs Nuxt runtime

| Layer                                  | Purpose                                           |
| -------------------------------------- | ------------------------------------------------- |
| **Orbitype MCP** (`.cursor/mcp.json`)  | Lets Cursor read/write CMS data while you develop |
| **Nuxt app** (`.env` + `server/api/*`) | Serves the website at runtime                     |

MCP does **not** replace the Nuxt app. It replaces manual Orbitype UI edits and ad-hoc SQL during development.

---

## 2) MCP setup in this project

### Step 1 — API keys in Orbitype

Create keys at [Orbitype API keys](https://app.orbitype.com/settings/api-keys):

| Key                     | Used by       | Env var (Nuxt `.env`)  | Env var (Cursor MCP)                       |
| ----------------------- | ------------- | ---------------------- | ------------------------------------------ |
| SQL connector           | Nuxt + MCP    | `ORBITYPE_API_SQL_KEY` | `ORBITYPE_SQL_API_KEY_PRIVATE_SPRACHKURSE` |
| S3 connector (optional) | MCP for media | `ORBITYPE_API_S3_KEY`  | `ORBITYPE_S3_API_KEY_PRIVATE_SPRACHKURSE`  |

Each key is scoped to **one connector**. Use separate MCP entries if you manage multiple websites.

### Step 2 — Export MCP env vars for Cursor

MCP reads `${env:...}` from **Cursor's environment**, not from Nuxt's `.env` automatically.

Print export commands from your local `.env`:

```bash
npm run mcp:env
```

Copy the output into `~/.zshrc`, then restart Cursor (or reload MCP in **Cursor Settings → MCP**).

### Step 3 — MCP config

Already configured in [`.cursor/mcp.json`](../.cursor/mcp.json):

- `orbitype-sql-private-sprachkurse` — database read/write
- `orbitype-s3-private-sprachkurse` — file storage (enable after creating S3 key)

### Step 4 — Verify

In a new Cursor chat:

1. Call `orbitype_get_context` — confirms project/connector scope
2. Call `sql_readonly_query` with `SELECT id, slug FROM pages LIMIT 5`

---

## 3) Codebase map

| File                                                                                    | Role                                     |
| --------------------------------------------------------------------------------------- | ---------------------------------------- |
| [`pages/[[slug]].vue`](../pages/[[slug]].vue)                                           | Generic page route                       |
| [`server/api/pages/index.get.ts`](../server/api/pages/index.get.ts)                     | Fetches pages from Orbitype SQL          |
| [`server/api/setup/install-schema.post.ts`](../server/api/setup/install-schema.post.ts) | Creates tables (first-time setup)        |
| [`server/api/setup/seed.post.ts`](../server/api/setup/seed.post.ts)                     | Seeds homepage content                   |
| [`components/sections/AnySection.vue`](../components/sections/AnySection.vue)           | Dynamic section renderer                 |
| [`utils/normalizeSections.ts`](../utils/normalizeSections.ts)                           | Flattens malformed nested section arrays |
| [`types/util/Section.d.ts`](../types/util/Section.d.ts)                                 | Section shape with `_orbi.component`     |

### Available section components

- `SectionProse` — title + HTML content (en/de)
- `SectionQuote` — centered quote block
- `SectionWelcome` — CMS setup / seeding wizard
- `SectionSpacer` — vertical spacing

---

## 4) Sections system

Each page row contains metadata (`title`, `lead`, `keywords`, …) and a `sections` JSON array.

Each section object **must** include:

```json
{
  "_orbi": {
    "component": "SectionProse"
  }
}
```

The value in `_orbi.component` must match the Vue file name in `components/sections/` (e.g. `SectionProse.vue` → `"SectionProse"`).

### Example: SectionProse demo JSON (Private Sprachkurse)

```json
{
  "_orbi": { "component": "SectionProse" },
  "title": {
    "en": "About Private Sprachkurse (Demo)",
    "de": "Über Private Sprachkurse (Demo)"
  },
  "content": {
    "en": "<p>Private Sprachkurse offers one-to-one language lessons tailored to your goals, schedule, and level.</p><ul><li>Individual coaching for all levels</li><li>Business and exam preparation</li><li>Flexible online or in-person lessons</li></ul>",
    "de": "<p>Private Sprachkurse bietet Einzelunterricht, abgestimmt auf Ihre Ziele, Ihren Zeitplan und Ihr Niveau.</p><ul><li>Einzelcoaching für alle Niveaus</li><li>Business-Sprache und Prüfungsvorbereitung</li><li>Flexible Online- oder Präsenztermine</li></ul>"
  }
}
```

**Important:** Keep `sections` as a **flat array of objects**. Do not nest arrays inside `sections`.

---

## 5) MCP tools

| Tool                                | Use for                                             |
| ----------------------------------- | --------------------------------------------------- |
| `orbitype_get_context`              | First call every session — confirms connector scope |
| `sql_readonly_query`                | Read/analyze pages, posts, settings                 |
| `sql_crud_execute`                  | INSERT/UPDATE/DELETE content                        |
| `s3_list`, `s3_put`, `s3_delete`, … | Media uploads (requires S3 key)                     |

---

## 6) Safe workflow for content changes

1. `orbitype_get_context`
2. `sql_readonly_query` — read and backup current `sections` JSON
3. `sql_crud_execute` — apply update
4. `sql_readonly_query` — verify JSON shape
5. Refresh `http://localhost:3000/` or `/de` in the browser

### Append a section to the home page

```sql
UPDATE pages
SET sections = (
  COALESCE(sections, '[]'::json)::jsonb
  || jsonb_build_array(
    jsonb_build_object(
      '_orbi', jsonb_build_object('component', 'SectionProse'),
      'title', jsonb_build_object(
        'en', 'About Private Sprachkurse',
        'de', 'Über Private Sprachkurse'
      ),
      'content', jsonb_build_object(
        'en', '<p>One-to-one language lessons for all levels.</p>',
        'de', '<p>Einzelunterricht für alle Niveaus.</p>'
      )
    )
  )
)::json
WHERE slug = 'home';
```

---

## 7) Common pitfalls

- **Component name mismatch** — `_orbi.component` must match the `.vue` file name
- **Nested section arrays** — Orbitype may store `[[{...}]]`; keep writes flat
- **Missing i18n fields** — use `{ "en": "...", "de": "..." }` for localized props
- **Wrong connector** — always run `orbitype_get_context` first
- **Two env systems** — Nuxt uses `ORBITYPE_API_SQL_KEY`; MCP uses `ORBITYPE_SQL_API_KEY_PRIVATE_SPRACHKURSE`

---

## 8) Figma + Orbitype MCP together

1. Design a section in Figma (Figma MCP)
2. Implement `SectionX.vue` in code
3. Insert matching JSON via Orbitype MCP (`sql_crud_execute`)
4. Verify at `http://localhost:3000/`

---

## References

- [Orbitype Docs — API Authentication](https://www.orbitype.com/docs/oQSPNY)
- [Orbitype API keys settings](https://app.orbitype.com/settings/api-keys)
