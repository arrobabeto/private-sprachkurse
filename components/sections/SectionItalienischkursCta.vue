<script setup lang="ts">
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionItalienischkursCta" })

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
  <section class="px-[2.5%] py-8 md:py-11">
    <div
      class="relative mx-auto flex min-h-[318px] max-w-[1272px] items-center overflow-hidden rounded-[54px]"
    >
      <NuxtImg
        :src="image"
        alt=""
        width="2048"
        height="1365"
        class="absolute inset-0 h-full w-full object-cover object-[center_32%]"
        aria-hidden="true"
      />
      <div class="absolute inset-0 bg-black/50" aria-hidden="true" />

      <div
        class="relative z-10 grid w-full items-start gap-8 px-8 py-12 text-white md:grid-cols-2 md:gap-20 md:px-16 md:py-16"
      >
        <h2 class="text-[32px] font-bold leading-[1.2] md:text-[40px]">
          {{ t(title) }}
        </h2>
        <div>
          <p class="max-w-[458px] text-lg font-normal leading-[1.5]">
            {{ t(body) }}
          </p>
          <NuxtLinkLocale :to="ctaUrl" class="mt-8 inline-block">
            <ButtonV
              variant="orange"
              class="rounded-full px-8 py-4 text-lg font-normal md:px-14"
            >
              {{ t(ctaLabel) }}
            </ButtonV>
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
  </section>
</template>
