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
  <section class="px-[2.5%] py-6 md:py-8">
    <div
      class="mx-auto flex min-h-[320px] max-w-[1272px] items-center justify-center rounded-[40px] bg-ps-blue px-6 py-12 md:min-h-[396px] md:rounded-[53px] md:px-12 md:py-16"
    >
      <div class="max-w-[768px] text-center text-white">
        <h2 class="text-3xl font-bold md:text-[40px] md:leading-tight">
          {{ t(title) }}
        </h2>
        <p class="mt-4 text-lg">
          {{ t(subtitle) }}
        </p>
        <div
          class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <NuxtLinkLocale :to="primaryCtaUrl">
            <ButtonV variant="orange">{{ t(primaryCtaLabel) }}</ButtonV>
          </NuxtLinkLocale>
          <NuxtLinkLocale :to="secondaryCtaUrl">
            <ButtonV variant="green">{{ t(secondaryCtaLabel) }}</ButtonV>
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
  </section>
</template>
