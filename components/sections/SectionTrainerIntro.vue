<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  const p = defineProps<{
    headline: I18nString
    name: I18nString
    subtitle: I18nString
    image: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="px-4 py-10 md:py-14">
    <div class="ps-container">
      <p
        class="mb-8 text-center text-2xl font-semibold text-ps-dark md:text-3xl"
      >
        {{ t(headline) }}
      </p>

      <div
        class="flex flex-col items-center gap-6 md:flex-row md:items-end md:gap-10"
      >
        <div
          class="relative h-64 w-64 shrink-0 overflow-hidden rounded-full bg-gray-200 md:h-80 md:w-80"
        >
          <NuxtImg
            :src="image"
            :alt="t(name)"
            class="h-full w-full object-cover object-top"
            width="543"
            height="543"
          />
        </div>

        <div class="text-center md:text-left">
          <h2 class="text-3xl font-bold text-ps-dark md:text-4xl">
            Viviane
            <span class="text-ps-blue">Baier</span>
          </h2>
          <p class="mt-2 text-lg font-medium text-ps-blue md:text-xl">
            {{ t(subtitle) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
