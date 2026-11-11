<script setup lang="ts">
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionEnglischkursCta" })

  defineProps<{
    backgroundImage: string
    title: I18nString
    body: I18nString
    ctaLabel: I18nString
    ctaUrl: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="px-[2.5%] py-11">
    <div
      class="relative mx-auto min-h-[318px] max-w-[1272px] overflow-hidden rounded-[40px] md:rounded-[54px]"
    >
      <NuxtImg
        :src="backgroundImage"
        :alt="t(title)"
        class="absolute inset-0 h-full w-full object-cover"
        width="1272"
        height="318"
        sizes="(max-width: 768px) 100vw, 1272px"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-black/50" />
      <div
        class="relative flex min-h-[318px] flex-col justify-center gap-8 px-6 py-10 md:flex-row md:items-center md:gap-20 md:px-16"
      >
        <h2
          class="text-[32px] font-bold leading-[1.2] text-white md:w-1/2 md:text-[40px]"
        >
          {{ t(title) }}
        </h2>
        <div class="flex flex-col items-start gap-8 md:w-1/2">
          <p
            class="max-w-[458px] text-base leading-[1.5] text-white md:text-lg"
          >
            {{ t(body) }}
          </p>
          <NuxtLinkLocale :to="ctaUrl" class="inline-flex">
            <ButtonV
              variant="orange"
              class="rounded-[30px] px-14 py-4 text-lg font-normal"
            >
              {{ t(ctaLabel) }}
            </ButtonV>
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
  </section>
</template>
