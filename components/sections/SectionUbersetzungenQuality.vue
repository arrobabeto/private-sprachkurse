<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  type Pillar = {
    tabIcon: string
    tabTheme: "green" | "cream" | "blue"
    title: I18nString
    body: I18nString
  }

  defineProps<{
    tagline: I18nString
    titleBefore: I18nString
    titleHighlight: I18nString
    titleAfter: I18nString
    body: I18nString
    pillars: Pillar[]
  }>()

  const t = useTranslate()

  function iconBoxClasses(theme: Pillar["tabTheme"]) {
    if (theme === "green") return "bg-ps-green"
    if (theme === "blue") return "bg-ps-blue"
    return "bg-ps-cream-alt"
  }
</script>

<template>
  <section class="px-[2.5%] py-12 md:py-20">
    <div class="mx-auto max-w-[1276px]">
      <div
        class="mx-auto flex max-w-[768px] flex-col items-center gap-4 text-center"
      >
        <p class="text-base font-semibold leading-normal text-ps-dark">
          {{ t(tagline) }}
        </p>
        <div class="flex w-full max-w-[992px] flex-col items-center gap-6">
          <h2
            class="text-3xl font-bold leading-[1.2] text-ps-blue md:text-[48px]"
          >
            {{ t(titleBefore) }}
            <span class="text-ps-green">{{ t(titleHighlight) }}</span>
            {{ t(titleAfter) }}
          </h2>
          <p
            class="max-w-[660px] text-base leading-relaxed text-ps-dark md:text-lg md:leading-[1.5]"
          >
            {{ t(body) }}
          </p>
        </div>
      </div>

      <div
        class="mx-auto mt-12 grid max-w-[953px] grid-cols-1 gap-10 md:mt-16 md:grid-cols-3 md:gap-8"
      >
        <article
          v-for="(pillar, index) of pillars"
          :key="index"
          class="flex flex-col items-center gap-6 text-center md:gap-[38px]"
        >
          <div
            class="flex h-[139px] w-full max-w-[300px] items-center justify-center rounded-[31px]"
            :class="iconBoxClasses(pillar.tabTheme)"
          >
            <NuxtImg
              :src="pillar.tabIcon"
              alt="Privater Sprachunterricht Schweiz flexibel"
              class="h-14 w-14 shrink-0"
              :class="pillar.tabTheme === 'cream' ? '' : 'brightness-0 invert'"
              width="56"
              height="56"
              aria-hidden="true"
            />
          </div>

          <div class="flex w-full flex-col items-center gap-4">
            <h3
              class="text-2xl font-bold leading-[1.3] text-ps-dark md:text-[28px]"
            >
              {{ t(pillar.title) }}
            </h3>
            <p class="text-base leading-[1.5] text-ps-dark">
              {{ t(pillar.body) }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
