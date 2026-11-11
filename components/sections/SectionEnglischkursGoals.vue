<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionEnglischkursGoals" })

  defineProps<{
    title: I18nString
    cards: {
      title: I18nString
      body: I18nString
      icon: string
      iconWidth: number
      iconHeight: number
      tone: "blue" | "orange" | "green"
      tiltDeg: number
    }[]
  }>()

  const t = useTranslate()

  function toneClass(tone: "blue" | "orange" | "green") {
    if (tone === "blue") return "bg-ps-blue"
    if (tone === "orange") return "bg-ps-orange"
    return "bg-ps-green"
  }
</script>

<template>
  <section class="px-[2.5%] pb-8 pt-4 md:pb-16">
    <h2
      class="mx-auto mb-10 max-w-[527px] text-center text-[32px] font-bold leading-[1.2] text-ps-green md:mb-14 md:text-[44px]"
    >
      {{ t(title) }}
    </h2>
    <div
      class="mx-auto grid max-w-[760px] grid-cols-1 justify-items-center gap-x-14 gap-y-10 sm:grid-cols-2"
    >
      <article
        v-for="(card, i) of cards"
        :key="i"
        class="flex min-h-[358px] w-full max-w-[322px] flex-col items-center justify-center gap-3 rounded-[20px] px-[30px] py-12 text-center text-white"
        :class="toneClass(card.tone)"
        :style="{ transform: `rotate(${card.tiltDeg}deg)` }"
      >
        <NuxtImg
          :src="card.icon"
          alt=""
          :width="card.iconWidth"
          :height="card.iconHeight"
          class="max-w-none shrink-0"
          aria-hidden="true"
        />
        <h3 class="text-xl font-bold leading-snug">
          {{ t(card.title) }}
        </h3>
        <p class="text-base font-normal leading-[1.15]">
          {{ t(card.body) }}
        </p>
      </article>
    </div>
  </section>
</template>
