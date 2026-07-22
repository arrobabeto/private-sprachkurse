<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineProps<{
    backgroundImage: string
    titlePrefix: I18nString
    titleHighlight: I18nString
    titleSuffix: I18nString
    body: I18nString
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="px-[2.5%] pt-4 md:pt-6">
    <div
      class="relative mx-auto min-h-[340px] max-w-[1276px] overflow-hidden rounded-[40px] md:min-h-[564px] md:rounded-[64px]"
    >
      <NuxtImg
        :src="backgroundImage"
        :alt="`${t(titlePrefix)} ${t(titleHighlight)} ${t(titleSuffix)}`.trim()"
        class="absolute inset-0 h-full w-full object-cover"
        width="2576"
        height="1128"
        sizes="(max-width: 768px) 100vw, 1276px"
        loading="eager"
        fetchpriority="high"
      />
      <div class="absolute inset-0 bg-black/40" />
      <div
        class="relative flex min-h-[340px] items-center justify-center px-6 py-12 md:min-h-[564px] md:px-16 md:py-16"
      >
        <div class="max-w-[816px] text-center text-white">
          <h1
            class="text-[32px] font-bold leading-[1.2] md:text-[56px] md:leading-[1.2]"
          >
            {{ t(titlePrefix) }}
            <br />
            <span class="text-ps-orange">{{ t(titleHighlight) }}</span>
            {{ t(titleSuffix) }}
          </h1>
          <p
            class="mx-auto mt-6 max-w-[816px] text-base font-medium leading-relaxed text-white/95 md:text-lg"
          >
            {{ t(body) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
