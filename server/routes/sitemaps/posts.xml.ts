import { appendResponseHeaders, defineEventHandler } from "h3"
import toSlug from "slug"
import { dedent } from "ts-dedent"
import type { IPost } from "~/types/dto/IPost"
import type { I18nString } from "~/types/util/I18nString"
import {
  formatSitemapLastmod,
  resolveSiteUrl,
  toAbsoluteUrl,
} from "~/server/utils/siteUrl"

type TLang = "de" | "en"

const langs: TLang[] = ["de", "en"]

function localizeTitle(title: I18nString | string, lang: TLang): string {
  if (typeof title === "string") return title
  return title[lang] || title.de || title.en || ""
}

function postPath(post: IPost, lang: TLang): string {
  const slug = toSlug(localizeTitle(post.title as I18nString, lang))
  const base = `/posts/${post.id}/${slug}`
  return lang === "de" ? base : `/en${base}`
}

function buildUrlEntry(baseUrl: string, post: IPost): string {
  const lastmod = formatSitemapLastmod(post.updated_at ?? post.created_at)
  const href = (lang: TLang) => toAbsoluteUrl(baseUrl, postPath(post, lang))

  const alternates = [
    ...langs.map(
      (lang) =>
        `    <xhtml:link rel="alternate" hreflang="${lang === "de" ? "de-CH" : lang}" href="${href(lang)}" />`,
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

  const posts = await $fetch<IPost[]>("/api/posts", {
    query: { status: "published", limit: "500" },
  }).catch(() => [] as IPost[])

  appendResponseHeaders(event, {
    "Content-Type": "application/xml; charset=utf-8",
    "Cache-Control":
      "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
  })

  return dedent`
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${posts.map((post) => buildUrlEntry(baseUrl, post)).join("\n")}
    </urlset>
  `
})
