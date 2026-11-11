<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionEnglischkursFaq" })

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
  <section
    id="faq"
    class="bg-white px-[2.5%] py-16 md:px-[120px] md:py-20"
    aria-labelledby="englischkurs-faq-heading"
  >
    <div
      class="mx-auto flex w-full max-w-[1082px] flex-col items-center gap-12"
    >
      <h2
        id="englischkurs-faq-heading"
        class="w-full max-w-[850px] text-center text-[32px] font-bold text-ps-green md:text-[40px]"
      >
        {{ t(title) }}
      </h2>
      <div class="flex w-full flex-col gap-6">
        <details
          v-for="(item, i) of items"
          :key="i"
          open
          class="group rounded-[20px] border border-ps-green px-6 py-8 md:px-10"
        >
          <summary
            class="flex cursor-pointer list-none items-center justify-between gap-6"
          >
            <span
              class="text-xl font-semibold leading-7 text-ps-green md:text-2xl"
            >
              {{ t(item.question) }}
            </span>
            <NuxtImg
              :src="minusIcon"
              alt=""
              width="22"
              height="8"
              class="max-w-none shrink-0 group-open:block"
              aria-hidden="true"
            />
          </summary>
          <p
            class="mt-6 max-w-[940px] text-lg font-normal leading-[1.26] text-black"
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
