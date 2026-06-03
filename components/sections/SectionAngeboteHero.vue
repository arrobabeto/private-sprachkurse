<script setup lang="ts">
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineProps<{
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
  <section class="py-12 md:py-16">
    <div class="mx-auto w-[95%] max-w-[768px] text-center">
      <h1
        class="text-3xl font-bold leading-tight text-ps-dark md:text-5xl md:leading-[1.15]"
      >
        {{ t(title) }}
      </h1>
      <p
        class="mx-auto mt-5 max-w-[768px] text-base leading-relaxed text-ps-dark/80 md:mt-6 md:text-lg"
      >
        {{ t(subtitle) }}
      </p>
      <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
        <NuxtLinkLocale :to="primaryCtaUrl">
          <ButtonV variant="orange">{{ t(primaryCtaLabel) }}</ButtonV>
        </NuxtLinkLocale>
        <NuxtLinkLocale :to="secondaryCtaUrl">
          <ButtonV variant="blue">{{ t(secondaryCtaLabel) }}</ButtonV>
        </NuxtLinkLocale>
      </div>
    </div>
  </section>
</template>
