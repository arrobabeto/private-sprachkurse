<script setup lang="ts">
  import { computed } from "vue"
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  const props = defineProps<{
    tagline: I18nString
    title: I18nString
    titleHighlight?: I18nString
    subtitle: I18nString
    ctaLabel: I18nString
    ctaUrl: string
    circleImage?: string
    arrowImage?: string
  }>()

  const t = useTranslate()

  const titleParts = computed(() => {
    const full = t(props.title)
    const highlight = props.titleHighlight ? t(props.titleHighlight) : ""
    if (!highlight || !full.includes(highlight)) {
      return { before: full, highlight: "", after: "" }
    }
    const idx = full.indexOf(highlight)
    return {
      before: full.slice(0, idx),
      highlight,
      after: full.slice(idx + highlight.length),
    }
  })
</script>

<template>
  <section class="relative px-[2.5%] pb-8 pt-6 md:pb-12 md:pt-8">
    <div class="relative mx-auto max-w-[768px] text-center">
      <p
        class="text-sm font-semibold uppercase tracking-wide text-ps-dark/70 md:text-base"
      >
        {{ t(tagline) }}
      </p>
      <h1
        class="mt-4 text-[32px] font-bold leading-[1.12] text-ps-dark md:text-[56px] md:leading-[1.1]"
      >
        <span>{{ titleParts.before }}</span>
        <span
          v-if="titleParts.highlight"
          class="relative inline-block text-ps-orange"
        >
          {{ titleParts.highlight }}
          <NuxtImg
            v-if="circleImage"
            :src="circleImage"
            alt="Online Sprachkurs individuell Schweiz"
            class="pointer-events-none absolute left-1/2 top-1/2 w-[118%] max-w-none -translate-x-1/2 -translate-y-1/2"
            width="456"
            height="134"
            aria-hidden="true"
          />
        </span>
        <span>{{ titleParts.after }}</span>
      </h1>
      <p
        class="mx-auto mt-5 max-w-[640px] text-base leading-relaxed text-ps-dark/80 md:mt-6 md:text-lg"
      >
        {{ t(subtitle) }}
      </p>
      <div class="mt-8 flex justify-center md:mt-10">
        <NuxtLinkLocale :to="ctaUrl">
          <ButtonV variant="green">{{ t(ctaLabel) }}</ButtonV>
        </NuxtLinkLocale>
      </div>
    </div>

    <NuxtImg
      v-if="arrowImage"
      :src="arrowImage"
      alt="Online Sprachkurs individuell Schweiz"
      class="pointer-events-none absolute left-[38%] top-[420px] hidden w-[200px] md:block lg:w-[280px]"
      width="280"
      height="266"
      loading="lazy"
      aria-hidden="true"
    />
  </section>
</template>
