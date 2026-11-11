<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionEnglischkursProcess" })

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
      class="relative mx-auto max-w-[1272px] rounded-[40px] bg-ps-cream-alt px-6 py-12 md:rounded-[53px] md:px-16 md:pb-24 md:pt-16"
    >
      <NuxtImg
        :src="arrowImage"
        alt=""
        width="132.952"
        height="248.398"
        class="pointer-events-none absolute right-[8%] top-2 hidden max-w-none lg:block"
        style="transform: rotate(107.96deg)"
        aria-hidden="true"
      />
      <h2
        class="relative max-w-[409px] text-[32px] font-bold leading-[1.2] text-ps-green md:text-[40px]"
      >
        {{ t(title) }}
      </h2>
      <ol class="relative mt-12 flex flex-col gap-10 md:mt-20 md:gap-[4.75rem]">
        <li
          v-for="(step, i) of steps"
          :key="i"
          class="flex items-center gap-6 md:gap-20"
        >
          <span
            class="w-14 shrink-0 text-[64px] font-medium leading-none text-ps-orange md:w-24 md:text-[96px]"
          >
            {{ i + 1 }}
          </span>
          <div class="max-w-[883px]">
            <h3
              class="text-xl font-bold leading-[1.5] text-ps-green md:text-2xl"
            >
              {{ t(step.title) }}
            </h3>
            <p
              class="text-base font-normal leading-[1.5] text-ps-green md:text-lg"
            >
              {{ t(step.body) }}
            </p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
