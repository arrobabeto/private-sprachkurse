<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineProps<{
    title: I18nString
    subtitle: I18nString
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="py-10 md:py-14">
    <div class="mx-auto w-[95%] max-w-[768px] text-center">
      <h2 class="text-3xl font-bold text-ps-dark md:text-4xl">
        {{ t(title) }}
      </h2>
      <p class="mt-4 text-base leading-relaxed text-ps-dark/80 md:text-lg">
        {{ t(subtitle) }}
      </p>
    </div>
  </section>
</template>
