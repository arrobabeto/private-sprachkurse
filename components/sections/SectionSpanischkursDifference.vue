<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionSpanischkursDifference" })

  defineProps<{
    title: I18nString
    lineImage: string
    items: {
      title: I18nString
      body: I18nString
    }[]
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="bg-[#f7f7f7] px-[2.5%] py-16 md:py-[120px]">
    <div
      class="mx-auto flex max-w-[1058px] flex-col items-center gap-12 md:gap-16"
    >
      <div class="flex flex-col items-center gap-4">
        <h2
          class="text-center text-[2rem] font-bold leading-[1.5] text-ps-green md:text-[40px]"
        >
          {{ t(title) }}
        </h2>
        <NuxtImg
          :src="lineImage"
          alt=""
          width="120"
          height="3"
          class="h-auto w-auto max-w-none"
          aria-hidden="true"
        />
      </div>
      <div class="flex w-full flex-col gap-8">
        <article
          v-for="(item, i) of items"
          :key="i"
          class="rounded-[24px] bg-white p-8 md:p-10"
        >
          <h3
            class="text-xl font-semibold leading-[1.6] text-[#041627] md:text-2xl"
          >
            {{ t(item.title) }}
          </h3>
          <p
            class="mt-0 max-w-[923px] text-base leading-[1.6] text-[#041627] md:text-lg"
          >
            {{ t(item.body) }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
