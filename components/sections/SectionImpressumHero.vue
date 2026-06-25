<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionImpressumHero" })

  defineProps<{
    tagline: I18nString
    title: I18nString
    subtitle: I18nString
    primaryCtaLabel: I18nString
    primaryCtaUrl: string
    secondaryCtaLabel: I18nString
    secondaryCtaUrl: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="px-[2.5%] py-10 md:py-12">
    <div
      class="mx-auto flex max-w-[1276px] flex-col items-center gap-6 text-center"
    >
      <p class="text-base font-semibold leading-[1.5] text-ps-green">
        {{ t(tagline) }}
      </p>
      <h1
        class="text-[40px] font-bold leading-[1.2] text-ps-orange md:text-[56px]"
      >
        {{ t(title) }}
      </h1>
      <p class="max-w-[760px] text-base leading-[1.5] text-ps-green md:text-lg">
        {{ t(subtitle) }}
      </p>
      <div class="flex flex-wrap items-center justify-center gap-4">
        <NuxtLinkLocale
          :to="primaryCtaUrl"
          class="inline-flex items-center justify-center rounded-full bg-ps-blue px-10 py-3 text-base font-medium text-white transition hover:bg-ps-blue/90 md:px-14 md:py-4 md:text-lg"
        >
          {{ t(primaryCtaLabel) }}
        </NuxtLinkLocale>
        <NuxtLinkLocale
          :to="secondaryCtaUrl"
          class="inline-flex items-center justify-center rounded-full border border-ps-green px-10 py-3 text-base font-medium text-ps-green transition hover:bg-ps-green/5 md:px-14 md:py-4 md:text-lg"
        >
          {{ t(secondaryCtaLabel) }}
        </NuxtLinkLocale>
      </div>
    </div>
  </section>
</template>
