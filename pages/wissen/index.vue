<script setup lang="ts">
  import { useHead, useRuntimeConfig } from "#imports"
  import { useI18n } from "#i18n"
  import WissenCard from "~/components/wissen/WissenCard.vue"
  import { wissenCta, wissenGroups, wissenHero } from "~/data/wissen"
  import { buildBreadcrumbList, jsonLdScript } from "~/utils/jsonLd"

  const { locale } = useI18n()
  const config = useRuntimeConfig()
  const siteUrl = String(config.public.siteUrl || "").replace(/\/$/, "")
  const path = locale.value === "en" ? "/en/wissen" : "/wissen"
  const pageUrl = `${siteUrl}${path}`

  useHead({
    title: "Wissen",
    script: [
      jsonLdScript("wissen-breadcrumb", {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": `${pageUrl}#webpage`,
            name: "Wissen",
            description: wissenHero.subtitle,
            url: pageUrl,
            isPartOf: { "@id": `${siteUrl}/#website` },
          },
          {
            "@id": `${pageUrl}#breadcrumb`,
            ...buildBreadcrumbList([
              { name: "Home", url: `${siteUrl}/` },
              { name: "Wissen", url: pageUrl },
            ]),
          },
        ],
      }),
    ],
  })
</script>

<template>
  <main class="bg-white pb-16">
    <section class="px-4 py-8 md:px-[112px] md:py-11">
      <div
        class="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-[40px] px-6 py-16 md:min-h-[564px] md:rounded-[64px]"
      >
        <NuxtImg
          :src="wissenHero.image"
          alt=""
          width="1288"
          height="564"
          class="absolute inset-0 h-full w-full object-cover"
        />
        <div class="absolute inset-0 bg-black/40" />
        <div
          class="relative z-10 flex max-w-[816px] flex-col items-center gap-6 text-center text-white"
        >
          <h1 class="text-[40px] font-bold leading-[1.2] md:text-[56px]">
            {{ wissenHero.title }}
          </h1>
          <p class="text-base font-medium leading-[1.5] md:text-lg">
            {{ wissenHero.subtitle }}
          </p>
        </div>
      </div>
    </section>

    <section
      v-for="group of wissenGroups"
      :key="group.title"
      class="mx-auto flex w-full max-w-[1512px] flex-col gap-10 px-4 py-8 md:gap-14 md:px-[112px] md:py-9"
    >
      <h2
        class="text-[32px] font-semibold leading-[1.4] text-black md:text-[40px]"
      >
        {{ group.title }}
      </h2>
      <div
        class="grid gap-8"
        :class="
          group.columns === 2
            ? 'md:grid-cols-2'
            : 'md:grid-cols-2 lg:grid-cols-3'
        "
      >
        <WissenCard v-for="card of group.cards" :key="card.slug" :card="card" />
      </div>
    </section>

    <section class="px-4 py-8 md:px-[112px] md:py-11">
      <div
        class="relative mx-auto flex min-h-[318px] max-w-[1272px] items-center overflow-hidden rounded-[44px] px-6 py-12 md:px-16"
      >
        <NuxtImg
          :src="wissenCta.image"
          alt=""
          width="1272"
          height="318"
          class="absolute inset-0 h-full w-full object-cover"
        />
        <div class="absolute inset-0 bg-black/40" />
        <div
          class="relative z-10 grid w-full gap-8 text-white md:grid-cols-2 md:gap-20"
        >
          <h2 class="text-[32px] font-bold leading-[1.2] md:text-[40px]">
            {{ wissenCta.title }}
          </h2>
          <div class="flex flex-col items-start gap-8">
            <p class="max-w-[458px] text-lg font-normal leading-[1.5]">
              {{ wissenCta.body }}
            </p>
            <NuxtLinkLocale
              :to="wissenCta.url"
              class="inline-flex items-center justify-center rounded-[30px] bg-ps-blue px-10 py-4 text-lg font-normal text-white md:px-14"
            >
              {{ wissenCta.label }}
            </NuxtLinkLocale>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
