<script setup lang="ts">
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionFranzoesischkursCta" })

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
  <section class="px-[2.5%] py-10 md:py-12">
    <div
      class="relative mx-auto flex min-h-[318px] max-w-[1272px] items-center overflow-hidden rounded-[54px]"
    >
      <NuxtImg
        :src="backgroundImage"
        alt=""
        class="absolute inset-0 h-full w-full object-cover"
        width="2048"
        height="1365"
        sizes="(max-width: 768px) 100vw, 1272px"
        loading="lazy"
        aria-hidden="true"
      />
      <div class="absolute inset-0 bg-black/50" />
      <div
        class="relative flex w-full flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:gap-20 md:px-16 md:py-12"
      >
        <h2
          class="text-[clamp(1.75rem,4vw,40px)] font-bold leading-[1.2] text-white md:max-w-[46%]"
        >
          {{ t(title) }}
        </h2>
        <div class="flex max-w-[458px] flex-col items-start gap-8">
          <p class="text-base leading-[1.5] text-white md:text-lg">
            {{ t(body) }}
          </p>
          <NuxtLinkLocale :to="ctaUrl">
            <ButtonV
              variant="orange"
              class="rounded-full px-14 py-4 text-lg font-normal"
            >
              {{ t(ctaLabel) }}
            </ButtonV>
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
  </section>
</template>
