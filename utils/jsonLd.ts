/** Build a Unhead-safe JSON-LD script entry (works with SSR). */
export function jsonLdScript(key: string, data: unknown) {
  return {
    key,
    type: "application/ld+json" as const,
    children: JSON.stringify(data),
  }
}

export type BreadcrumbItem = {
  name: string
  url: string
}

/** schema.org BreadcrumbList for SERP trails */
export function buildBreadcrumbList(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function absoluteUrl(baseUrl: string, pathOrUrl: string): string {
  if (!pathOrUrl) return baseUrl
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  const base = baseUrl.replace(/\/$/, "")
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`
  return `${base}${path}`
}
