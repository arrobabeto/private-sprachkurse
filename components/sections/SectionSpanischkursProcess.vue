<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionSpanischkursProcess" })

  defineProps<{
    title: I18nString
    arrowImage: string
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
      class="relative mx-auto max-w-[1272px] rounded-[53px] bg-ps-cream-alt px-6 py-14 md:px-16 md:pb-24 md:pt-16"
    >
      <div class="flex items-center justify-between gap-6">
        <h2
          class="max-w-[409px] text-[2rem] font-bold leading-[1.2] text-ps-green md:text-[40px]"
        >
          {{ t(title) }}
        </h2>
        <div
          class="relative hidden h-[92px] w-[210px] shrink-0 md:block"
          aria-hidden="true"
        >
          <NuxtImg
            :src="arrowImage"
            alt=""
            width="133"
            height="248"
            class="pointer-events-none absolute left-1/2 top-1/2 max-w-none"
            style="transform: translate(-50%, -50%) rotate(108deg) scale(0.62)"
          />
        </div>
      </div>
      <ol class="relative mt-12 flex flex-col gap-10 md:mt-16 md:gap-16">
        <li
          v-for="(step, i) of steps"
          :key="i"
          class="flex items-center gap-6 md:gap-[4.5rem]"
        >
          <span
            class="w-14 shrink-0 text-[4.5rem] font-medium leading-none text-ps-orange md:w-20 md:text-[96px]"
          >
            {{ i + 1 }}
          </span>
          <div class="max-w-[883px] text-ps-green">
            <h3 class="text-xl font-bold leading-[1.5] md:text-2xl">
              {{ t(step.title) }}
            </h3>
            <p class="text-base font-normal leading-[1.5] md:text-lg">
              {{ t(step.body) }}
            </p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
