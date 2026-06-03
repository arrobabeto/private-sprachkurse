<script setup lang="ts">
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineProps<{
    backgroundImage: string
    title: I18nString
    body: I18nString
    ctaLabel: I18nString
    ctaUrl: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="px-[2.5%] pt-4 md:px-[2.5%] md:pt-6">
    <div
      class="relative mx-auto min-h-[812px] max-w-[1276px] overflow-hidden rounded-[40px] md:min-h-[773px] md:rounded-[64px]"
    >
      <NuxtImg
        :src="backgroundImage"
        alt=""
        class="absolute inset-0 h-full w-full object-cover"
        width="1416"
        height="773"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/10 md:bg-gradient-to-r md:from-black/55 md:via-black/30 md:to-transparent"
      />
      <div
        class="relative flex min-h-[812px] items-end px-6 pb-10 md:min-h-[773px] md:items-center md:px-12 md:py-16 lg:px-16"
      >
        <div class="max-w-[560px] text-white">
          <h1
            class="whitespace-pre-line text-[32px] font-bold leading-[1.15] md:text-[56px]"
          >
            {{ t(title) }}
          </h1>
          <p
            class="mt-5 text-base leading-relaxed text-white/95 md:mt-6 md:text-lg"
          >
            {{ t(body) }}
          </p>
          <div class="mt-8">
            <NuxtLinkLocale :to="ctaUrl">
              <ButtonV variant="orange">{{ t(ctaLabel) }}</ButtonV>
            </NuxtLinkLocale>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
