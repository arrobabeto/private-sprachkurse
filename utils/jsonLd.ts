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

export type FaqSchemaItem = {
  question: string
  answer: string
}

/** schema.org FAQPage for rich results */
export function buildFaqPage(items: FaqSchemaItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export function buildAggregateRating(opts?: {
  ratingValue?: string
  reviewCount?: string
  bestRating?: string
  worstRating?: string
}) {
  return {
    "@type": "AggregateRating",
    ratingValue: opts?.ratingValue ?? "5.0",
    reviewCount: opts?.reviewCount ?? "6",
    bestRating: opts?.bestRating ?? "5",
    worstRating: opts?.worstRating ?? "1",
  }
}

export function buildPersonSchema(siteUrl: string) {
  const base = siteUrl.replace(/\/$/, "")
  return {
    "@type": "Person",
    "@id": `${base}/sprachtrainerin#person`,
    name: "Viviane Baier",
    jobTitle: "Sprachtrainerin",
    url: `${base}/sprachtrainerin`,
    email: "info@privatesprachkurse.ch",
    telephone: "+41789433963",
    knowsAbout: [
      "Englisch",
      "Französisch",
      "Deutsch",
      "Spanisch",
      "Italienisch",
    ],
    worksFor: {
      "@type": "Organization",
      "@id": `${base}/#organization`,
      name: "Private Sprachkurse",
      url: base,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Liestal",
      addressRegion: "Basel-Landschaft",
      postalCode: "4410",
      addressCountry: "CH",
    },
  }
}

type CourseDef = {
  name: string
  description: string
  inLanguage: string
}

const PRIVATE_COURSES: CourseDef[] = [
  {
    name: "Privater Englischkurs Schweiz",
    description: "Individueller Englischkurs in Liestal und online.",
    inLanguage: "en",
  },
  {
    name: "Privater Französischkurs Schweiz",
    description: "Individueller Französischkurs in Liestal und online.",
    inLanguage: "fr",
  },
  {
    name: "Privater Deutschkurs Schweiz",
    description: "Individueller Deutschkurs in Liestal und online.",
    inLanguage: "de",
  },
  {
    name: "Privater Spanischkurs Schweiz",
    description: "Individueller Spanischkurs in Liestal und online.",
    inLanguage: "es",
  },
  {
    name: "Privater Italienischkurs Schweiz",
    description: "Individueller Italienischkurs in Liestal und online.",
    inLanguage: "it",
  },
]

/** Five private language Course schemas for /angebote/ */
export function buildAngeboteCourseSchemas(siteUrl: string) {
  const base = siteUrl.replace(/\/$/, "")
  const provider = {
    "@type": "Organization",
    "@id": `${base}/#organization`,
    name: "Private Sprachkurse",
    url: base,
  }

  return PRIVATE_COURSES.map((course) => ({
    "@type": "Course",
    name: course.name,
    description: course.description,
    provider,
    inLanguage: course.inLanguage,
    offers: {
      "@type": "Offer",
      price: "88",
      priceCurrency: "CHF",
      availability: "https://schema.org/InStock",
      url: `${base}/angebote`,
    },
  }))
}

export function absoluteUrl(baseUrl: string, pathOrUrl: string): string {
  if (!pathOrUrl) return baseUrl
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  const base = baseUrl.replace(/\/$/, "")
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`
  return `${base}${path}`
}
