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
    to: "/wissen",
  },
  {
    from: "/wissen/sprachkurs-in-liestal-finden",
    to: "/wissen/sprachkurs-liestal-finden",
  },
  {
    from: "/wissen/a1-bis-c2-erklaert",
    to: "/wissen/sprachniveau-a1-c2-einschaetzen",
  },
  {
    from: "/wissen/wie-lange-dauert-eine-sprache",
    to: "/wissen/wie-lange-dauert-sprache-lernen",
  },
  {
    from: "/wissen/deutschkurs-in-baselland",
    to: "/wissen/deutschkurs-baselland-niveau",
  },
  {
    from: "/wissen/schweizerdeutsch-verstehen",
    to: "/wissen/schweizerdeutsch-verstehen-baselland",
  },
  {
    from: "/wissen/business-english-in-der-schweiz",
    to: "/wissen/business-english-schweiz-arbeitssituationen",
  },
  {
    from: "/wissen/englischkurs-in-baselland",
    to: "/wissen/englischkurs-baselland-ziel",
  },
  {
    from: "/wissen/firmensprachkurse-in-der-schweiz",
    to: "/wissen/firmensprachkurse-schweiz-kosten",
  },
  {
    from: "/wissen/franzoesisch-in-der-nordwestschweiz",
    to: "/wissen/franzoesisch-nordwestschweiz-auffrischen",
  },
  {
    from: "/wissen/italienisch-lernen-als-erwachsener",
    to: "/wissen/italienisch-lernen-deutschschweiz",
  },
  {
    from: "/wissen/sprechhemmungen-ueberwinden",
    to: "/wissen/sprechhemmungen-fremdsprache",
  },
  {
    from: "/wissen/maschinenuebersetzung-oder-uebersetzerin",
    to: "/wissen/maschinenuebersetzung-oder-uebersetzer",
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
