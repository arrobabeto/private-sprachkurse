<script setup lang="ts">
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionDeutschkursCta" })

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
  <section class="px-[2.5%] py-11">
    <div
      class="relative mx-auto flex min-h-[280px] max-w-[1272px] items-center overflow-hidden rounded-[36px] md:min-h-[318px] md:rounded-[54px]"
    >
      <NuxtImg
        :src="backgroundImage"
        :alt="t(title)"
        class="absolute inset-0 h-full w-full object-cover"
        width="1272"
        height="318"
        sizes="(max-width: 768px) 100vw, 1272px"
        loading="lazy"
        aria-hidden="true"
      />
      <div class="absolute inset-0 bg-black/50" />

      <div
        class="relative flex w-full flex-col gap-8 px-8 py-12 md:flex-row md:items-start md:gap-20 md:px-16 md:py-16"
      >
        <h2
          class="flex-1 text-[32px] font-bold leading-[1.2] text-white md:text-[40px]"
        >
          {{ t(title) }}
        </h2>
        <div class="flex flex-1 flex-col items-start gap-8">
          <p class="max-w-[458px] text-lg font-normal leading-[1.5] text-white">
            {{ t(body) }}
          </p>
          <NuxtLinkLocale :to="ctaUrl">
            <ButtonV
              variant="orange"
              class="min-h-[52px] rounded-[30px] px-14 py-4 text-lg font-normal"
            >
              {{ t(ctaLabel) }}
            </ButtonV>
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
  </section>
</template>
