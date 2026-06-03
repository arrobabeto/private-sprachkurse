<script setup lang="ts">
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineProps<{
    title: I18nString
    body: I18nString
    ctaLabel: I18nString
    ctaUrl: string
    backgroundImage: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="px-[2.5%] py-4 md:py-6">
    <div
      class="relative mx-auto flex min-h-[280px] max-w-[1272px] items-center overflow-hidden rounded-[36px] md:min-h-[318px] md:rounded-[44px]"
    >
      <NuxtImg
        :src="backgroundImage"
        alt=""
        class="absolute inset-0 h-full w-full object-cover"
        width="1272"
        height="318"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-black/40" />

      <div
        class="relative flex w-full flex-col gap-6 px-8 py-12 md:flex-row md:items-center md:justify-between md:gap-12 md:px-16 md:py-14"
      >
        <h2
          class="text-3xl font-bold text-white md:text-[40px] md:leading-tight"
        >
          {{ t(title) }}
        </h2>
        <div class="max-w-[520px] md:text-right">
          <p class="text-base leading-relaxed text-white/95 md:text-lg">
            {{ t(body) }}
          </p>
          <div class="mt-6 flex md:justify-end">
            <NuxtLinkLocale :to="ctaUrl">
              <ButtonV variant="orange">{{ t(ctaLabel) }}</ButtonV>
            </NuxtLinkLocale>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
