<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  type AudienceCard = {
    title: I18nString
    body: I18nString
    icon: string
    iconWidth: number
    iconHeight: number
    variant: "blue" | "orange" | "green"
  }

  defineOptions({ name: "SectionDeutschkursAudience" })

  defineProps<{
    tagline: I18nString
    title: I18nString
    body: I18nString
    cards: AudienceCard[]
  }>()

  const t = useTranslate()

  const tilts = [
    "md:rotate-[3.4deg]",
    "md:-rotate-[4.6deg]",
    "md:rotate-[3.4deg]",
  ]

  function cardClass(variant: AudienceCard["variant"]) {
    if (variant === "orange") return "bg-ps-orange"
    if (variant === "green") return "bg-ps-green"
    return "bg-ps-blue"
  }
</script>

<template>
  <section class="px-[2.5%] py-8 md:py-11">
    <div class="mx-auto max-w-[1272px]">
      <div class="max-w-[576px]">
        <p class="text-base font-semibold leading-[1.5] text-ps-green">
          {{ t(tagline) }}
        </p>
        <h2
          class="mt-1 whitespace-pre-line text-[32px] font-bold leading-[1.2] text-ps-green md:text-[44px]"
        >
          {{ t(title) }}
        </h2>
        <p class="mt-4 text-lg font-normal leading-[1.5] text-ps-green">
          {{ t(body) }}
        </p>
      </div>

      <div
        class="mt-10 flex flex-col items-center gap-6 md:mt-12 md:flex-row md:justify-center md:gap-14"
      >
        <article
          v-for="(card, i) of cards"
          :key="i"
          class="flex min-h-[360px] w-full max-w-[322px] flex-col items-center justify-center gap-3 rounded-[20px] px-[30px] py-12 text-center text-white md:min-h-[398px] md:w-[322px]"
          :class="[cardClass(card.variant), tilts[i] ?? '']"
        >
          <NuxtImg
            :src="card.icon"
            alt=""
            class="shrink-0"
            :width="card.iconWidth"
            :height="card.iconHeight"
            :style="{
              width: `${card.iconWidth}px`,
              height: `${card.iconHeight}px`,
            }"
            aria-hidden="true"
          />
          <h3 class="max-w-[257px] text-xl font-bold leading-[1.4] text-white">
            {{ t(card.title) }}
          </h3>
          <p
            class="max-w-[257px] text-base font-normal leading-[1.11] text-white"
          >
            {{ t(card.body) }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
