<script setup lang="ts">
  import { showError, useSeoMeta } from "#app"
  import {
    useHead,
    useI18n,
    useRoute,
    useRuntimeConfig,
    useTranslate,
  } from "#imports"
  import AnySection from "~/components/sections/AnySection.vue"
  import { useCanonicalLinks } from "~/composables/useCanonicalLinks"
  import { fn } from "~/functions/fn"
  import type { IPage } from "~/types/dto/IPage"
  import type { Section } from "~/types/util/Section"
  import type { I18nString } from "~/types/util/I18nString"
  import {
    buildAngeboteCourseSchemas,
    buildBreadcrumbList,
    buildFaqPage,
    buildPersonSchema,
    jsonLdScript,
  } from "~/utils/jsonLd"
  import { homepageFaqItems } from "~/utils/homepageFaq"
  import { generateOGImageUrl } from "~/utils/ogImageGenerator"
  import { normalizeSections } from "~/utils/normalizeSections"

  type FaqSection = Section & {
    items?: { question: I18nString; answer: I18nString }[]
  }

  function extractFaqSchemaItems(
    sections: Section[],
    translate: (text?: I18nString) => string,
    includeHomeFallback: boolean,
  ) {
    const faqSection = sections.find(
      (section) => section._orbi?.component === "SectionFaq",
    ) as FaqSection | undefined
    const items = faqSection?.items?.length
      ? faqSection.items
      : includeHomeFallback
        ? homepageFaqItems
        : []

    return items.map((item) => ({
      question: translate(item.question),
      answer: translate(item.answer),
    }))
  }

  const t = useTranslate()
  const { locale } = useI18n()
  const config = useRuntimeConfig()

  const route = useRoute()
  const routeSlug = route.params["slug"]
  const currentSlug = Array.isArray(routeSlug)
    ? routeSlug[0] || "home"
    : routeSlug || "home"
  const slug =
    route.path === "/en" && currentSlug === "en" ? "home" : currentSlug

  const page = await $fetch<IPage>("/api/pages", { query: { slug } })
  if (!page)
    throw showError({ statusCode: 404, statusMessage: "Page not found" })

  const sections = normalizeSections(page.sections)

  const title = fn.truncateText(t(page.title), 60)
  const rawLead = fn.removeHtml(t(page.lead))
  const description = fn.truncateText(
    rawLead === "..." ? String(config.public.siteDescription || "") : rawLead,
    160,
  )
  const keywords = Array.isArray(page.keywords) ? page.keywords.join(", ") : ""
  const isGermanPage =
    route.path === "/" ||
    (!route.path.startsWith("/en") && !route.path.startsWith("/en/"))
  const dePath = page.slug === "home" ? "/" : `/${page.slug}`
  const enPath = page.slug === "home" ? "/en" : `/en/${page.slug}`
  const canonicalPath = isGermanPage ? dePath : enPath
  const siteUrl = String(config.public.siteUrl || "").replace(/\/$/, "")
  const canonicalUrl = `${siteUrl}${canonicalPath}`
  const homeUrl = `${siteUrl}/`
  const pageName = t(page.title)
  const isHome = page.slug === "home"
  const ogImage = config.public.ogImageEnabled
    ? generateOGImageUrl({
        title: t(page.title),
        description: fn.removeHtml(t(page.lead)),
        image: page.img,
        type: "page",
      })
    : page.img
  const orgId = `${siteUrl}/#organization`
  const faqItems = extractFaqSchemaItems(sections, t, isHome)

  useSeoMeta({
    title,
    description,
    keywords,
    author: config.public.organizationName,
    ogTitle: t(page.title),
    ogDescription: description,
    ogType: "website",
    ogImage,
    ogUrl: canonicalUrl,
    ogSiteName: config.public.siteName,
    ogLocale: locale.value === "de" ? "de_CH" : "en_US",
    twitterCard: "summary_large_image",
    twitterTitle: t(page.title),
    twitterDescription: description,
    twitterImage: ogImage,
    twitterSite: config.public.twitterSite,
    twitterCreator: config.public.twitterCreator,
  })

  const pageGraph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      name: pageName,
      headline: pageName,
      description,
      datePublished: page.created_at,
      dateModified: page.updated_at,
      inLanguage: locale.value === "de" ? "de-CH" : "en",
      url: canonicalUrl,
      image: {
        "@type": "ImageObject",
        url: ogImage,
        width: "1200",
        height: "630",
      },
      mainEntity: {
        "@type": "Article",
        headline: pageName,
        description,
        datePublished: page.created_at,
        dateModified: page.updated_at,
        keywords,
        author: { "@id": orgId },
        publisher: { "@id": orgId },
      },
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      ...(isHome
        ? {}
        : {
            breadcrumb: {
              "@id": `${canonicalUrl}#breadcrumb`,
            },
          }),
    },
  ]

  if (!isHome) {
    pageGraph.push({
      "@id": `${canonicalUrl}#breadcrumb`,
      ...buildBreadcrumbList([
        { name: "Home", url: homeUrl },
        { name: pageName, url: canonicalUrl },
      ]),
    })
  }

  if (faqItems.length > 0) {
    pageGraph.push({
      "@id": `${canonicalUrl}#faq`,
      ...buildFaqPage(faqItems),
    })
  }

  const pageScripts = [
    jsonLdScript("webpage-schema", {
      "@context": "https://schema.org",
      "@graph": pageGraph,
    }),
  ]

  // Standalone BreadcrumbList — some SEO scanners miss @graph-only breadcrumbs.
  if (!isHome) {
    pageScripts.push(
      jsonLdScript("breadcrumb-list", {
        "@context": "https://schema.org",
        ...buildBreadcrumbList([
          { name: "Home", url: homeUrl },
          { name: pageName, url: canonicalUrl },
        ]),
      }),
    )
  }

  if (page.slug === "sprachtrainerin") {
    pageScripts.push(
      jsonLdScript("person-viviane", {
        "@context": "https://schema.org",
        ...buildPersonSchema(siteUrl),
      }),
    )
  }

  if (page.slug === "angebote") {
    pageScripts.push(
      jsonLdScript("angebote-courses", {
        "@context": "https://schema.org",
        "@graph": buildAngeboteCourseSchemas(siteUrl),
      }),
    )
  }

  useHead({
    ...page.head,
    link: useCanonicalLinks({
      canonicalPath,
      enPath,
      dePath,
      xDefaultPath: dePath,
    }),
    script: pageScripts,
  })
</script>

<template>
  <main v-if="page">
    <AnySection v-for="(section, i) of sections" :key="i" :data="section" />
  </main>
</template>
