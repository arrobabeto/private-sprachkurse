import { appendResponseHeaders, defineEventHandler, sendRedirect } from "h3"

/** Legacy locale sitemap index → primary sitemap. */
export default defineEventHandler((event) => {
  appendResponseHeaders(event, {
    "Cache-Control": "public, max-age=3600",
  })
  return sendRedirect(event, "/sitemap.xml", 301)
})
