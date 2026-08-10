import { appendResponseHeaders, defineEventHandler } from "h3"
import { dedent } from "ts-dedent"
import type { IPage } from "~/types/dto/IPage"
import {
  formatSitemapLastmod,
  resolveSiteUrl,
  toAbsoluteUrl,
  toLocalizedPagePath,
} from "~/server/utils/siteUrl"

type TLang = "de" | "en"

const langs: TLang[] = ["de", "en"]

function isPublished(page: IPage): boolean {
  const status = (page as { status?: string }).status
  return !status || status === "published"
}

function buildUrlEntry(baseUrl: string, page: IPage): string {
  const lastmod = formatSitemapLastmod(page.updated_at ?? page.created_at)
  const href = (lang: TLang) =>
    toAbsoluteUrl(baseUrl, toLocalizedPagePath(page.slug, lang))

  const alternates = [
    ...langs.map(
      (lang) =>
        `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href(lang)}" />`,
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${href("de")}" />`,
  ].join("\n")

  return langs
    .map(
      (lang) => dedent`
        <url>
          <loc>${href(lang)}</loc>
          <lastmod>${lastmod}</lastmod>
        ${alternates}
        </url>
      `,
    )
    .join("\n")
}

export default defineEventHandler(async (event) => {
  const baseUrl = resolveSiteUrl(event)

  const pages = await $fetch<IPage[]>("/api/pages").catch(() => [] as IPage[])
  const published = pages.filter(isPublished)

  appendResponseHeaders(event, {
    "Content-Type": "application/xml; charset=utf-8",
    "Cache-Control":
      "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
  })

  return dedent`
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${published.map((page) => buildUrlEntry(baseUrl, page)).join("\n")}
    </urlset>
  `
})
