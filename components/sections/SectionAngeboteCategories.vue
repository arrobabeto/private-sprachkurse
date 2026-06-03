<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  type Category = {
    title: I18nString
    description: I18nString
    tileType: "green" | "blue" | "image"
    icon?: string
    image?: string
  }

  defineProps<{
    languages: I18nString
    categories: Category[]
  }>()

  const t = useTranslate()
</script>

<template>
  <section id="kurse" class="scroll-mt-24 bg-ps-cream-alt py-12 md:py-16">
    <div class="mx-auto w-[95%] max-w-[1200px]">
      <p
        class="mb-10 text-center text-lg font-medium text-ps-muted md:mb-12 md:text-xl"
      >
        {{ t(languages) }}
      </p>

      <div class="mb-10 hidden grid-cols-4 gap-4 md:mb-12 md:grid">
        <div
          v-for="(cat, i) of categories"
          :key="i"
          class="relative flex h-[100px] items-center justify-center overflow-hidden rounded-2xl md:h-[139px]"
          :class="{
            'bg-ps-green': cat.tileType === 'green',
            'bg-ps-blue': cat.tileType === 'blue',
          }"
        >
          <NuxtImg
            v-if="cat.tileType === 'image' && cat.image"
            :src="cat.image"
            alt=""
            class="h-full w-full object-cover"
            width="300"
            height="139"
          />
          <NuxtImg
            v-else-if="cat.icon"
            :src="cat.icon"
            alt=""
            class="h-12 w-12 brightness-0 invert md:h-14 md:w-14"
            width="67"
            height="67"
          />
        </div>
      </div>

      <div class="grid gap-8 md:grid-cols-4 md:gap-6">
        <article v-for="(cat, i) of categories" :key="`text-${i}`">
          <h3
            class="text-xl font-bold text-ps-dark md:text-[32px] md:leading-tight"
          >
            {{ t(cat.title) }}
          </h3>
          <p class="mt-2 text-base leading-relaxed text-ps-dark/80 md:text-lg">
            {{ t(cat.description) }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
