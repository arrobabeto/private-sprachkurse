<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionDeutschkursStats" })

  defineProps<{
    tagline: I18nString
    title: I18nString
    items: { text: I18nString }[]
    arrowImage: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="px-[2.5%] py-8 md:py-11">
    <div
      class="relative mx-auto max-w-[1276px] overflow-hidden rounded-[32px] bg-ps-cream-alt px-6 py-12 md:min-h-[611px] md:rounded-[53px] md:px-16 md:py-[72px]"
    >
      <NuxtImg
        :src="arrowImage"
        alt=""
        class="pointer-events-none absolute right-[8%] top-0 hidden h-[210px] w-[110px] max-w-none origin-center rotate-[100deg] -scale-y-100 lg:block"
        width="133"
        height="254"
        aria-hidden="true"
      />

      <div class="relative max-w-[810px]">
        <p class="text-base font-semibold leading-[1.5] text-ps-green">
          {{ t(tagline) }}
        </p>
        <h2
          class="mt-4 text-[32px] font-bold leading-[1.2] text-ps-green md:text-[48px]"
        >
          {{ t(title) }}
        </h2>
      </div>

      <div
        class="relative mt-10 grid gap-8 md:mt-[52px] md:grid-cols-3 md:gap-12"
      >
        <article
          v-for="(item, i) of items"
          :key="i"
          class="border-l-[3px] border-ps-orange pl-8"
        >
          <p class="text-xl font-medium leading-[1.4] text-ps-green">
            {{ t(item.text) }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
