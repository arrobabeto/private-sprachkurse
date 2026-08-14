import { defineEventHandler, sendRedirect } from "h3"

// attention: order matters as it is startsWith with!
// SEO vanity URLs → existing CMS pages (do not create duplicate pages).
const redirects = [
  {
    from: "/sprachkurse",
    to: "/angebote",
  },
  {
    from: "/en/sprachkurse",
    to: "/en/angebote",
  },
  {
    from: "/über-uns",
    to: "/sprachtrainerin",
  },
  {
    from: "/uber-uns",
    to: "/sprachtrainerin",
  },
  {
    from: "/en/über-uns",
    to: "/en/sprachtrainerin",
  },
  {
    from: "/en/uber-uns",
    to: "/en/sprachtrainerin",
  },
  {
    from: "/sitemap.xml",
    to: "/sitemaps.xml",
  },
  {
    from: "/blog",
    to: "/posts",
  },
]

export default defineEventHandler((event) => {
  const requestUrlString = event.req.url || "" // Ensure url is defined
  const host = event.req.headers.host || "" // Ensure host is defined
  const requestUrl = new URL(requestUrlString, `http://${host}`)
  // Decode so /%C3%BCber-uns matches /über-uns
  const pathWithoutQuery = decodeURIComponent(requestUrl.pathname)

  // Find the corresponding redirect
  const redirect = redirects.find(
    (r) =>
      pathWithoutQuery === r.from || pathWithoutQuery.startsWith(`${r.from}/`),
  )

  if (redirect) {
    return sendRedirect(event, redirect.to, 301)
  }
})
