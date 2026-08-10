import { getRequestURL, type H3Event } from "h3"

const PRODUCTION_SITE_URL = "https://privatesprachkurse.ch"

function stripTrailingSlash(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url
}

function isLocalHost(value: string): boolean {
  return /localhost|127\.0\.0\.1/i.test(value)
}

/**
 * Resolve the public site origin for sitemaps/robots.
 * Prefer NUXT_PUBLIC_SITE_URL when it is a real public URL; otherwise derive
 * from the request host (Vercel), then fall back to production.
 */
export function resolveSiteUrl(event?: H3Event): string {
  const configured = stripTrailingSlash(
    (process.env.NUXT_PUBLIC_SITE_URL || "").trim(),
  )

  let url = configured

  if ((!url || isLocalHost(url)) && event) {
    try {
      const requestUrl = getRequestURL(event)
      if (requestUrl.host && !isLocalHost(requestUrl.host)) {
        url = `${requestUrl.protocol}//${requestUrl.host}`
      }
    } catch {
      // ignore — fall through to defaults
    }
  }

  if (!url || isLocalHost(url)) {
    if (process.env.VERCEL || process.env.NODE_ENV === "production") {
      url = PRODUCTION_SITE_URL
    } else {
      url = url || "http://localhost:3000"
    }
  }

  url = stripTrailingSlash(url)

  // Prefer HTTPS and apex host for this production domain.
  if (!isLocalHost(url)) {
    url = url.replace(/^http:\/\//i, "https://")
    url = url.replace(
      "://www.privatesprachkurse.ch",
      "://privatesprachkurse.ch",
    )
  }

  return url
}

/** YYYY-MM-DD — preferred by Google Search Console. */
export function formatSitemapLastmod(value?: string | null): string {
  if (value) {
    const date = new Date(value)
    if (!Number.isNaN(date.getTime())) {
      return date.toISOString().slice(0, 10)
    }
  }
  return new Date().toISOString().slice(0, 10)
}

/**
 * Build a public page path for i18n strategy prefix_except_default (default: de).
 * home → "/" (de) or "/en" (en)
 * slug → "/slug" (de) or "/en/slug" (en)
 */
export function toLocalizedPagePath(
  slug: string | undefined,
  lang: "de" | "en",
): string {
  const isHome = !slug || slug === "home"
  if (lang === "de") return isHome ? "/" : `/${slug}`
  return isHome ? "/en" : `/en/${slug}`
}

export function toAbsoluteUrl(baseUrl: string, path: string): string {
  const normalizedBase = stripTrailingSlash(baseUrl)
  if (!path || path === "/") return `${normalizedBase}/`
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${normalizedBase}${normalizedPath}`
}
