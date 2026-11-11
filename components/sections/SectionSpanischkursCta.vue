<script setup lang="ts">
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionSpanischkursCta" })

  defineProps<{
    title: I18nString
    body: I18nString
    ctaLabel: I18nString
    ctaUrl: string
    image: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="px-[2.5%] py-11">
    <div
      class="relative mx-auto flex min-h-[318px] max-w-[1272px] items-center overflow-hidden rounded-[54px] px-6 py-12 md:px-16"
    >
      <NuxtImg
        :src="image"
        alt=""
        class="absolute inset-0 h-full w-full object-cover"
        width="2048"
        height="1365"
      />
      <div class="absolute inset-0 bg-black/50" aria-hidden="true" />
      <div
        class="relative z-10 flex w-full flex-col items-start gap-8 text-white md:flex-row md:items-start md:gap-20"
      >
        <h2 class="flex-1 text-[2rem] font-bold leading-[1.2] md:text-[40px]">
          {{ t(title) }}
        </h2>
        <div class="flex flex-1 flex-col items-start gap-8">
          <p class="max-w-[458px] text-base leading-[1.5] md:text-lg">
            {{ t(body) }}
          </p>
          <NuxtLinkLocale :to="ctaUrl" class="inline-flex">
            <ButtonV
              variant="orange"
              class="h-auto w-auto px-10 py-4 text-center text-lg font-normal md:px-14"
            >
              {{ t(ctaLabel) }}
            </ButtonV>
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
  </section>
</template>
