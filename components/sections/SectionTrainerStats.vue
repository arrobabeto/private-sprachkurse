<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  type Stat = {
    value: string
    label: I18nString
    accent?: "blue" | "green"
  }

  defineProps<{
    tagline: I18nString
    title: I18nString
    stats: Stat[]
    arrowImage?: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section id="stats" class="scroll-mt-24 px-[2.5%] py-6 md:py-8">
    <div
      class="relative mx-auto max-w-[1276px] overflow-hidden rounded-[40px] bg-ps-cream-alt px-6 py-10 md:rounded-[53px] md:px-12 md:py-14"
    >
      <NuxtImg
        v-if="arrowImage"
        :src="arrowImage"
        alt=""
        class="pointer-events-none absolute right-6 top-6 hidden w-40 md:block lg:right-10 lg:top-8 lg:w-48"
        width="281"
        height="197"
      />

      <p class="text-base font-semibold text-ps-green md:text-lg">
        {{ t(tagline) }}
      </p>
      <h2
        class="max-w-xl mt-2 text-3xl font-bold text-ps-green md:text-[48px] md:leading-tight"
      >
        {{ t(title) }}
      </h2>

      <div
        class="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-10"
      >
        <article v-for="(stat, i) of stats" :key="i">
          <p
            class="text-[64px] font-bold leading-none md:text-[80px]"
            :class="stat.accent === 'blue' ? 'text-ps-blue' : 'text-ps-green'"
          >
            {{ stat.value }}
          </p>
          <p
            class="mt-2 text-lg font-bold md:text-xl"
            :class="stat.accent === 'blue' ? 'text-ps-blue' : 'text-ps-green'"
          >
            {{ t(stat.label) }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
