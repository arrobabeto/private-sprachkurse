<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionDeutschkursFeatures" })

  defineProps<{
    title: I18nString
    lineImage: string
    items: { text: I18nString }[]
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="bg-[#f7f7f7] px-[2.5%] py-16 md:py-[120px]">
    <div
      class="mx-auto flex max-w-[1272px] flex-col items-center gap-10 md:gap-16"
    >
      <div class="flex flex-col items-center gap-4">
        <h2
          class="text-center text-[32px] font-bold leading-[1.5] text-ps-green md:text-[40px]"
        >
          {{ t(title) }}
        </h2>
        <NuxtImg
          :src="lineImage"
          alt=""
          class="h-[3px] w-[120px]"
          width="120"
          height="3"
          aria-hidden="true"
        />
      </div>

      <div class="flex w-full flex-col items-center gap-8">
        <article
          v-for="(item, i) of items"
          :key="i"
          class="w-full max-w-[1058px] rounded-[24px] bg-white p-8 md:p-10"
        >
          <p
            class="max-w-[722px] text-lg font-normal leading-[1.6] tracking-[-0.03em] text-[#041627]"
          >
            {{ t(item.text) }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
