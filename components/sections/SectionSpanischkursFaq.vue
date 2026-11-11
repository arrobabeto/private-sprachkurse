<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionSpanischkursFaq" })

  defineProps<{
    title: I18nString
    minusIcon: string
    items: {
      question: I18nString
      answer: I18nString
    }[]
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="bg-white px-[2.5%] py-16 md:px-8 md:py-20">
    <div
      class="mx-auto flex w-full max-w-[1082px] flex-col items-center gap-12"
    >
      <h2
        class="w-full max-w-[850px] text-center text-[2rem] font-bold leading-normal text-ps-green md:text-[40px]"
      >
        {{ t(title) }}
      </h2>
      <div class="flex w-full flex-col gap-6">
        <details
          v-for="(item, i) of items"
          :key="i"
          open
          class="group rounded-[20px] border border-ps-green px-6 py-6 md:px-10 md:py-8"
        >
          <summary
            class="flex cursor-pointer list-none items-center justify-between gap-6 marker:content-none"
          >
            <span
              class="text-lg font-semibold leading-7 text-ps-green md:text-2xl"
            >
              {{ t(item.question) }}
            </span>
            <NuxtImg
              :src="minusIcon"
              alt=""
              width="22"
              height="8"
              class="hidden h-auto w-auto max-w-none shrink-0 group-open:block"
              aria-hidden="true"
            />
            <span
              class="shrink-0 text-2xl font-semibold leading-none text-ps-green group-open:hidden"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <p
            class="mt-6 max-w-[920px] text-base leading-[1.26] text-black md:text-lg"
          >
            {{ t(item.answer) }}
          </p>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
  summary::-webkit-details-marker {
    display: none;
  }
</style>
