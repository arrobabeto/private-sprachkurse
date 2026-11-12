import articles from "./wissenArticles.json"

export type ArticlePart =
  | { type: "text"; text: string }
  | { type: "link"; text: string; href: string }

export type ArticleBlock =
  | { kind: "p"; text: string; parts?: ArticlePart[] }
  | { kind: "h2"; id: string; text: string }
  | { kind: "strong"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "table"; headers: string[]; rows: string[][] }
  | { kind: "link"; href: string; text: string }

export type WissenFaq = {
  question: string
  answer: string
}

export type WissenArticle = {
  slug: string
  title: string
  seoTitle: string
  description: string
  hero: string
  imageAlt: string
  author: string
  date: string
  datePublished: string
  readingLabel: string
  readingTime: string
  wordCount: number
  faqs: WissenFaq[]
  ctaLabel: string
  ctaUrl: string
  blocks: ArticleBlock[]
}

export const wissenArticles = articles as WissenArticle[]

export function findWissenArticle(slug: string) {
  return wissenArticles.find((article) => article.slug === slug) ?? null
}
