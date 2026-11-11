<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionFranzoesischkursInsights" })

  defineProps<{
    eyebrow: I18nString
    title: I18nString
    items: I18nString[]
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="px-[2.5%] py-10 md:py-14">
    <div
      class="relative mx-auto max-w-[1276px] overflow-hidden rounded-[53px] bg-ps-cream-alt px-6 py-12 md:px-16 md:py-[72px]"
    >
      <div
        class="pointer-events-none absolute right-[14%] top-6 hidden h-[150px] w-[260px] items-center justify-center overflow-hidden lg:flex"
      >
        <NuxtImg
          src="/images/franzoesischkurs/insights-arrow.svg"
          alt=""
          width="133"
          height="254"
          class="h-auto w-[132px] max-w-none origin-center rotate-[92deg]"
          aria-hidden="true"
        />
      </div>
      <p class="text-base font-semibold leading-[1.5] text-ps-green">
        {{ t(eyebrow) }}
      </p>
      <h2
        class="mt-4 max-w-[640px] text-[clamp(2rem,4vw,48px)] font-bold leading-[1.2] text-ps-green lg:max-w-[720px]"
      >
        {{ t(title) }}
      </h2>

      <div class="mt-12 grid gap-8 md:mt-14 md:grid-cols-3 md:gap-12">
        <p
          v-for="(item, i) of items"
          :key="i"
          class="border-l-[3px] border-ps-orange pl-8 text-lg font-medium leading-[1.4] text-ps-green md:text-xl"
        >
          {{ t(item) }}
        </p>
      </div>
    </div>
  </section>
</template>
