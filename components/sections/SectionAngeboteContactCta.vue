<script setup lang="ts">
  import { computed } from "vue"
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  const props = defineProps<{
    title: I18nString
    body: I18nString
    ctaLabel: I18nString
    ctaUrl: string
  }>()

  const t = useTranslate()

  const paragraphs = computed(() =>
    t(props.body)
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean),
  )
</script>

<template>
  <section
    class="flex min-h-[480px] items-center justify-center bg-ps-gray px-[2.5%] py-16 md:min-h-[652px] md:py-0"
  >
    <div class="mx-auto w-full max-w-[768px] text-center">
      <h2
        class="text-3xl font-bold leading-tight text-white md:text-[42px] md:leading-snug"
      >
        {{ t(title) }}
      </h2>
      <div
        class="mx-auto mt-5 max-w-[768px] space-y-4 text-base leading-relaxed text-white/90 md:mt-6 md:text-lg md:leading-7"
      >
        <p v-for="(para, i) of paragraphs" :key="i">
          {{ para }}
        </p>
      </div>
      <div class="mt-8 md:mt-10">
        <NuxtLinkLocale :to="ctaUrl">
          <ButtonV variant="blue">{{ t(ctaLabel) }}</ButtonV>
        </NuxtLinkLocale>
      </div>
    </div>
  </section>
</template>
