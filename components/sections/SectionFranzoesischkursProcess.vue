<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionFranzoesischkursProcess" })

  defineProps<{
    title: I18nString
    steps: {
      title: I18nString
      body: I18nString
    }[]
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="px-[2.5%] py-8 md:py-12">
    <div
      class="relative mx-auto max-w-[1272px] overflow-hidden rounded-[53px] bg-ps-cream-alt px-6 py-12 md:px-16 md:pb-20 md:pt-16"
    >
      <div class="relative flex items-start justify-between gap-6">
        <h2
          class="max-w-[420px] text-[clamp(1.75rem,4vw,40px)] font-bold leading-[1.2] text-ps-green"
        >
          {{ t(title) }}
        </h2>
        <div
          class="pointer-events-none hidden h-[150px] w-[280px] shrink-0 items-center justify-center overflow-hidden lg:flex"
        >
          <NuxtImg
            src="/images/franzoesischkurs/process-arrow.svg"
            alt=""
            width="133"
            height="248"
            class="h-auto w-[140px] max-w-none origin-center rotate-[108deg]"
            aria-hidden="true"
          />
        </div>
      </div>

      <ol class="mt-12 flex max-w-[1040px] flex-col gap-10 md:mt-16 md:gap-16">
        <li
          v-for="(step, i) of steps"
          :key="i"
          class="flex items-center gap-5 md:gap-16"
        >
          <p
            class="w-12 shrink-0 text-[64px] font-medium leading-none text-ps-orange md:w-20 md:text-[96px]"
          >
            {{ i + 1 }}
          </p>
          <div class="text-ps-green">
            <h3 class="text-xl font-bold leading-snug md:text-2xl">
              {{ t(step.title) }}
            </h3>
            <p class="mt-1 text-base leading-[1.5] md:text-lg">
              {{ t(step.body) }}
            </p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
