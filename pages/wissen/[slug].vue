<script setup lang="ts">
  import {
    showError,
    useHead,
    useRoute,
    useRuntimeConfig,
    useSeoMeta,
  } from "#app"
  import { computed } from "vue"
  import { findWissenCard } from "~/data/wissen"
  import {
    findWissenArticle,
    type ArticleBlock,
    type ArticlePart,
  } from "~/data/wissenArticle"
  import {
    buildBreadcrumbList,
    buildFaqPage,
    jsonLdScript,
  } from "~/utils/jsonLd"

  const route = useRoute()
  const config = useRuntimeConfig()
  const rawSlug = route.params["slug"]
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug
  const card = findWissenCard(slug || "")
  const article = findWissenArticle(slug || "")

  if (!card || !article) {
    throw showError({
      statusCode: 404,
      statusMessage: "Beitrag nicht gefunden",
    })
  }

  const headings = computed(() =>
    article.blocks.filter(
      (block): block is Extract<ArticleBlock, { kind: "h2" }> =>
        block.kind === "h2",
    ),
  )

  function partsOf(block: Extract<ArticleBlock, { kind: "p" }>): ArticlePart[] {
    return block.parts?.length
      ? block.parts
      : [{ type: "text", text: block.text }]
  }

  const siteUrl = String(config.public.siteUrl || "").replace(/\/$/, "")
  const canonicalUrl = `${siteUrl}/wissen/${article.slug}`
  const imageUrl = `${siteUrl}${article.hero}`

  useSeoMeta({
    title: article.seoTitle,
    description: article.description,
    ogTitle: article.seoTitle,
    ogDescription: article.description,
    ogType: "article",
    ogImage: imageUrl,
    ogUrl: canonicalUrl,
  })

  useHead({
    link: [{ rel: "canonical", href: canonicalUrl }],
    script: [
      jsonLdScript(`wissen-article-${article.slug}`, {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BlogPosting",
            "@id": `${canonicalUrl}#article`,
            headline: article.title,
            description: article.description,
            inLanguage: "de-CH",
            datePublished: article.datePublished,
            dateModified: article.datePublished,
            wordCount: article.wordCount,
            image: imageUrl,
            mainEntityOfPage: canonicalUrl,
            author: {
              "@type": "Person",
              name: article.author,
              url: `${siteUrl}/sprachtrainerin`,
            },
            publisher: {
              "@type": "Organization",
              name: "Private Sprachkurse",
              url: siteUrl,
            },
          },
          {
            "@id": `${canonicalUrl}#breadcrumb`,
            ...buildBreadcrumbList([
              { name: "Home", url: `${siteUrl}/` },
              { name: "Wissen", url: `${siteUrl}/wissen` },
              { name: article.title, url: canonicalUrl },
            ]),
          },
          ...(article.faqs.length
            ? [{ "@id": `${canonicalUrl}#faq`, ...buildFaqPage(article.faqs) }]
            : []),
        ],
      }),
    ],
  })

  const cta = {
    title: "Einschätzung anfragen",
    body: "Schildern Sie Ihr Ziel, Ihre Vorkenntnisse und Ihre möglichen Zeitfenster. Sie erhalten eine Einschätzung Ihres Ausgangsniveaus und einen Vorschlag, bevor Sie etwas buchen.",
    label: "Ziel schildern",
    url: article.ctaUrl,
    image: "/images/wissen/article-cta.png",
  }
</script>

<template>
  <main class="bg-white pb-8">
    <section class="px-4 pt-8 md:px-[123px]">
      <NuxtImg
        :src="article.hero"
        :alt="article.imageAlt"
        width="1600"
        class="mx-auto h-[280px] w-full max-w-[1266px] rounded-[30px] object-cover md:h-[405px]"
      />
    </section>

    <header
      class="mx-auto flex max-w-[858px] flex-col items-center px-4 py-11 text-center"
    >
      <h1
        class="text-[32px] font-semibold leading-[1.2] text-black md:text-[56px]"
      >
        {{ article.title }}
      </h1>
      <div
        class="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-[10px] border border-[#eeeeee] bg-white px-3 py-1.5 text-base font-medium leading-[1.5] text-[#a5a5a5]"
      >
        <span class="inline-flex items-center gap-2">
          <span class="h-6 w-6 rounded-full bg-[#d9d9d9]" aria-hidden="true" />
          {{ article.author }}
        </span>
        <span class="hidden h-6 w-px bg-[#eeeeee] sm:block" />
        <span>{{ article.date }}</span>
        <span class="hidden h-6 w-px bg-[#eeeeee] sm:block" />
        <span>⏱️ {{ article.readingLabel }}</span>
      </div>
    </header>

    <section
      class="mx-auto grid w-full max-w-[1280px] items-start gap-8 px-4 pb-12 lg:grid-cols-[400px_minmax(0,1fr)] lg:px-6"
    >
      <aside
        v-if="headings.length"
        class="rounded-[16px] border border-[#eeeeee] bg-white p-6 lg:sticky lg:top-24"
      >
        <p class="text-xl font-medium leading-[1.5] text-ps-green">
          Inhaltsverzeichnis
        </p>
        <nav class="mt-6 flex flex-col">
          <a
            v-for="heading of headings"
            :key="heading.id"
            :href="`#${heading.id}`"
            class="border-t border-[#eeeeee] py-4 text-lg font-medium leading-[1.4] tracking-[-0.36px] text-[#292929] last:border-b"
          >
            {{ heading.text }}
          </a>
        </nav>
      </aside>

      <article
        class="flex flex-col gap-7 rounded-[16px] border border-[#eeeeee] bg-white p-6"
        :class="headings.length ? '' : 'lg:col-span-2'"
      >
        <template v-for="(block, index) of article.blocks" :key="index">
          <p
            v-if="block.kind === 'p'"
            class="text-lg font-light leading-[1.5] text-black"
          >
            <template
              v-for="(part, partIndex) of partsOf(block)"
              :key="partIndex"
            >
              <NuxtLinkLocale
                v-if="part.type === 'link' && part.href.startsWith('/')"
                :to="part.href"
                class="text-ps-blue underline"
              >
                {{ part.text }}
              </NuxtLinkLocale>
              <a
                v-else-if="part.type === 'link'"
                :href="part.href"
                class="text-ps-blue underline"
                rel="nofollow noopener noreferrer"
                target="_blank"
              >
                {{ part.text }}
              </a>
              <template v-else>{{ part.text }}</template>
            </template>
          </p>
          <h2
            v-else-if="block.kind === 'h2'"
            :id="block.id"
            class="scroll-mt-28 border-t border-[#eeeeee] pt-6 text-xl font-medium leading-[1.5] text-[#292929]"
          >
            {{ block.text }}
          </h2>
          <p
            v-else-if="block.kind === 'strong'"
            class="text-lg font-bold leading-[1.5] text-black"
          >
            {{ block.text }}
          </p>
          <ul
            v-else-if="block.kind === 'ul'"
            class="list-disc space-y-1 pl-7 text-lg font-light leading-[1.5] text-black"
          >
            <li v-for="item of block.items" :key="item">{{ item }}</li>
          </ul>
          <ol
            v-else-if="block.kind === 'ol'"
            class="list-decimal space-y-1 pl-7 text-lg font-light leading-[1.5] text-black"
          >
            <li v-for="item of block.items" :key="item">{{ item }}</li>
          </ol>
          <div
            v-else-if="block.kind === 'table'"
            class="overflow-x-auto rounded-[4px] border border-ps-green"
          >
            <table class="w-full min-w-[640px] border-collapse text-ps-green">
              <thead>
                <tr>
                  <th
                    v-for="(header, headerIndex) of block.headers"
                    :key="headerIndex"
                    class="border-l border-t border-ps-green px-3 py-2.5 text-center text-sm font-semibold leading-[1.3] first:border-l-0"
                  >
                    {{ header }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, rowIndex) of block.rows" :key="rowIndex">
                  <td
                    v-for="(cell, cellIndex) of row"
                    :key="cellIndex"
                    class="border-l border-t border-ps-green px-3 py-2.5 text-[13px] font-normal leading-[1.3] first:border-l-0"
                  >
                    {{ cell }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p v-else-if="block.kind === 'link'">
            <NuxtLinkLocale
              :to="block.href"
              class="text-lg font-light leading-[1.5] text-ps-blue underline"
            >
              {{ block.text }}
            </NuxtLinkLocale>
          </p>
        </template>
      </article>
    </section>

    <section class="px-4 py-11 md:px-[120px]">
      <div
        class="relative mx-auto flex min-h-[318px] max-w-[1272px] items-center overflow-hidden rounded-[54px] px-6 py-12 md:px-16"
      >
        <NuxtImg
          :src="cta.image"
          alt=""
          width="1272"
          height="318"
          class="absolute inset-0 h-full w-full object-cover"
        />
        <div class="absolute inset-0 bg-black/50" />
        <div
          class="relative z-10 grid w-full gap-8 text-white md:grid-cols-2 md:gap-20"
        >
          <h2 class="text-[32px] font-bold leading-[1.2] md:text-[40px]">
            {{ cta.title }}
          </h2>
          <div class="flex flex-col items-start gap-8">
            <p class="max-w-[458px] text-lg font-normal leading-[1.5]">
              {{ cta.body }}
            </p>
            <NuxtLinkLocale
              :to="cta.url"
              class="inline-flex items-center justify-center rounded-[30px] bg-ps-orange px-10 py-4 text-lg font-normal text-white md:px-14"
            >
              {{ cta.label }}
            </NuxtLinkLocale>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
