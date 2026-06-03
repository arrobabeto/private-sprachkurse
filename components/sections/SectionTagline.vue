<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  const p = defineProps<{
    highlight: I18nString
    suffix: I18nString
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="px-4 py-10 md:py-14">
    <div class="ps-container text-center">
      <h2 class="text-2xl font-bold leading-snug text-ps-dark md:text-4xl">
        <span class="text-ps-blue">{{ t(highlight) }}</span>
        {{ t(suffix) }}
      </h2>
    </div>
  </section>
</template>
