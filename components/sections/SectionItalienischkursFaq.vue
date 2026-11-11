<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionItalienischkursFaq" })

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
  <section class="bg-white px-[2.5%] py-16 md:px-[7.5%] md:py-20">
    <h2
      class="mx-auto mb-12 max-w-[850px] text-center text-[clamp(1.75rem,4vw,40px)] font-bold leading-normal text-ps-green"
    >
      {{ t(title) }}
    </h2>

    <div class="mx-auto flex max-w-[1082px] flex-col gap-6">
      <details
        v-for="(item, i) of items"
        :key="i"
        open
        class="group rounded-[20px] border border-ps-green px-6 py-8 md:px-10"
      >
        <summary class="cursor-pointer list-none marker:content-none">
          <span class="flex items-center justify-between gap-6">
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
              class="hidden shrink-0 group-open:block"
              aria-hidden="true"
            />
            <span
              class="shrink-0 text-2xl font-semibold leading-none text-ps-green group-open:hidden"
              aria-hidden="true"
            >
              +
            </span>
          </span>
        </summary>
        <p
          class="mt-6 max-w-[939px] text-lg font-normal leading-[1.26] text-black"
        >
          {{ t(item.answer) }}
        </p>
      </details>
    </div>
  </section>
</template>

<style scoped>
  summary::-webkit-details-marker {
    display: none;
  }
</style>
