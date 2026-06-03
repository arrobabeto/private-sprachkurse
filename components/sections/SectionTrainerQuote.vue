<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineProps<{
    quote: I18nString
    author: I18nString
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="px-[2.5%] py-10 md:py-14">
    <div class="mx-auto max-w-[768px] text-center">
      <blockquote
        class="text-xl font-bold leading-relaxed text-ps-green md:text-2xl"
      >
        „{{ t(quote) }}"
      </blockquote>
      <p class="mt-4 text-base font-semibold text-ps-green">
        {{ t(author) }}
      </p>
    </div>
  </section>
</template>
