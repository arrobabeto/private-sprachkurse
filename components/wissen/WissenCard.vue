<script setup lang="ts">
  import type { WissenCard } from "~/data/wissen"

  defineProps<{
    card: WissenCard
  }>()

  const toneClass = {
    cream: "bg-ps-cream-alt text-ps-dark",
    green: "bg-ps-green text-white",
    blue: "bg-ps-blue text-white",
  }

  const titleClass = {
    cream: "text-ps-green",
    green: "text-white",
    blue: "text-white",
  }

  const linkClass = {
    cream: "text-ps-blue",
    green: "text-white",
    blue: "text-white",
  }
</script>

<template>
  <NuxtLinkLocale
    :to="`/wissen/${card.slug}`"
    class="flex h-full min-h-[477px] flex-col overflow-hidden rounded-[20px]"
    :class="toneClass[card.tone]"
  >
    <div class="relative h-[226px] shrink-0 overflow-hidden">
      <NuxtImg
        :src="card.image"
        :alt="card.title"
        width="1200"
        class="h-full w-full object-cover"
      />
    </div>
    <div class="flex flex-1 flex-col gap-2 px-[18px] pb-6 pt-6">
      <h3
        class="text-xl font-semibold leading-[1.4]"
        :class="titleClass[card.tone]"
      >
        {{ card.title }}
      </h3>
      <p class="text-sm font-normal leading-[1.5]">{{ card.excerpt }}</p>
      <p class="text-sm font-normal leading-[1.4]">⏱️ {{ card.readingTime }}</p>
      <p
        class="mt-auto pt-2 text-base font-semibold leading-[1.5]"
        :class="linkClass[card.tone]"
      >
        → Lesen
      </p>
    </div>
  </NuxtLinkLocale>
</template>
