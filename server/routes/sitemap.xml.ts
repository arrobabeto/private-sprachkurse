import { appendResponseHeaders, defineEventHandler } from "h3"
import { dedent } from "ts-dedent"
import { formatSitemapLastmod, resolveSiteUrl } from "~/server/utils/siteUrl"

/**
 * Primary sitemap index for Google Search Console.
 * Submit: https://privatesprachkurse.ch/sitemap.xml
 */
export default defineEventHandler((event) => {
  const baseUrl = resolveSiteUrl(event)
  const lastmod = formatSitemapLastmod()

  appendResponseHeaders(event, {
    "Content-Type": "application/xml; charset=utf-8",
    "Cache-Control":
      "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
  })

  return dedent`
    <?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>${baseUrl}/sitemaps/pages.xml</loc>
        <lastmod>${lastmod}</lastmod>
      </sitemap>
      <sitemap>
        <loc>${baseUrl}/sitemaps/posts.xml</loc>
        <lastmod>${lastmod}</lastmod>
      </sitemap>
    </sitemapindex>
  `
})
