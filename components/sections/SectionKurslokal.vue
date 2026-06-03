<script setup lang="ts">
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  const p = defineProps<{
    title: I18nString
    body: I18nString
    image: string
    ctaLabel: I18nString
    ctaUrl: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="px-4 py-12 md:py-16">
    <div
      class="ps-container grid overflow-hidden rounded-[40px] bg-ps-green md:grid-cols-2"
    >
      <div class="overflow-hidden">
        <NuxtImg
          :src="image"
          alt=""
          class="h-full min-h-[16rem] w-full object-cover"
          width="600"
          height="400"
        />
      </div>

      <div class="flex flex-col justify-center gap-6 p-8 text-white md:p-12">
        <h2 class="text-2xl font-bold md:text-3xl">{{ t(title) }}</h2>
        <p
          class="whitespace-pre-line text-sm leading-relaxed text-white/90 md:text-base"
        >
          {{ t(body) }}
        </p>
        <div>
          <NuxtLinkLocale :to="ctaUrl">
            <ButtonV variant="orange">{{ t(ctaLabel) }}</ButtonV>
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
  </section>
</template>
