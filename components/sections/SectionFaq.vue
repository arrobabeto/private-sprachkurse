<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineProps<{
    title: I18nString
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
    class="bg-[#fafafa] px-[2.5%] py-12 md:py-16"
    aria-labelledby="faq-heading"
  >
    <div class="mx-auto w-full max-w-[800px]">
      <h2
        id="faq-heading"
        class="mb-8 text-center text-2xl font-bold text-ps-dark md:text-3xl"
      >
        {{ t(title) }}
      </h2>

      <div class="space-y-3">
        <details
          v-for="(item, i) of items"
          :key="i"
          class="group rounded-2xl border border-[#e8e8e8] bg-white px-5 py-4 shadow-sm open:shadow-md"
        >
          <summary
            class="cursor-pointer list-none text-base font-semibold text-ps-dark marker:content-none md:text-lg"
          >
            <span class="flex items-start justify-between gap-4">
              <span>{{ t(item.question) }}</span>
              <span
                class="mt-0.5 shrink-0 text-ps-orange transition group-open:rotate-45"
                aria-hidden="true"
              >
                +
              </span>
            </span>
          </summary>
          <p class="mt-3 text-sm leading-relaxed text-ps-dark/80 md:text-base">
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
