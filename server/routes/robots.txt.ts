import { appendResponseHeaders, defineEventHandler } from "h3"
import { dedent } from "ts-dedent"
import { resolveSiteUrl } from "~/server/utils/siteUrl"

export default defineEventHandler((event) => {
  const baseUrl = resolveSiteUrl(event)

  appendResponseHeaders(event, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control":
      "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
  })

  return dedent`
    User-agent: *
    Allow: /

    Disallow: /errors/
    Disallow: /_nuxt/
    Disallow: /api/

    Allow: /robots.txt
    Allow: /sitemap.xml
    Allow: /sitemaps.xml
    Allow: /llms.txt

    Sitemap: ${baseUrl}/sitemap.xml
  `
})
