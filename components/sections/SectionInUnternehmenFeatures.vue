<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  type Feature = {
    icon: string
    title: I18nString
    body: I18nString
    accent: "blue" | "orange" | "green"
  }

  defineProps<{
    features: Feature[]
  }>()

  const t = useTranslate()

  const cardTilt = [
    "md:-rotate-[3deg] md:translate-y-2",
    "md:rotate-[3deg] md:-translate-y-1",
    "md:-rotate-[3deg] md:translate-y-1",
    "md:rotate-[3deg] md:-translate-y-2",
  ]

  function accentClass(accent: Feature["accent"]) {
    if (accent === "orange") return "bg-ps-orange"
    if (accent === "green") return "bg-ps-green"
    return "bg-ps-blue"
  }
</script>

<template>
  <section class="px-[2.5%] pb-10 pt-2 md:pb-14 md:pt-4">
    <div class="relative mx-auto max-w-[1276px]">
      <div
        class="grid grid-cols-2 gap-3 sm:gap-4 md:flex md:items-end md:justify-center md:gap-14"
      >
        <article
          v-for="(feature, i) of features"
          :key="i"
          class="flex min-h-[280px] w-full flex-col items-center justify-center rounded-[20px] px-6 py-10 text-center text-white shadow-md transition-transform md:min-h-[344px] md:w-[250px] md:shrink-0 md:px-8 md:py-12"
          :class="[accentClass(feature.accent), cardTilt[i]]"
        >
          <NuxtImg
            :src="feature.icon"
            alt=""
            class="mb-4 h-12 w-12 brightness-0 invert md:h-14 md:w-14"
            width="56"
            height="56"
            loading="lazy"
            aria-hidden="true"
          />
          <h2 class="text-base font-bold leading-snug md:text-lg">
            {{ t(feature.title) }}
          </h2>
          <p
            v-if="t(feature.body)"
            class="mt-3 text-sm leading-relaxed text-white/95 md:text-base"
          >
            {{ t(feature.body) }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
