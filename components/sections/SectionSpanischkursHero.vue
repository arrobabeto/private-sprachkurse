<script setup lang="ts">
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionSpanischkursHero" })

  defineProps<{
    titleLine1: I18nString
    titleLine2: I18nString
    subtitle: I18nString
    ctaLabel: I18nString
    ctaUrl: string
    circleImage: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="px-[2.5%] py-11">
    <div
      class="mx-auto flex max-w-[858px] flex-col items-center gap-8 text-center"
    >
      <h1
        class="text-[2.5rem] font-semibold leading-[1.2] text-black md:text-[56px]"
      >
        <span class="relative inline-block px-3">
          <NuxtImg
            :src="circleImage"
            alt=""
            width="432"
            height="100"
            class="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[4.5rem] w-[118%] max-w-none -translate-x-1/2 -translate-y-1/2 rotate-[4deg] object-fill md:h-[5.75rem]"
            aria-hidden="true"
          />
          <span class="relative z-10">{{ t(titleLine1) }}</span>
        </span>
        <br />
        {{ t(titleLine2) }}
      </h1>
      <p class="max-w-[655px] text-base leading-[1.5] text-black md:text-lg">
        {{ t(subtitle) }}
      </p>
      <NuxtLinkLocale :to="ctaUrl" class="inline-flex">
        <ButtonV
          variant="blue"
          class="h-auto w-auto px-10 py-4 text-center text-lg font-normal md:px-14"
        >
          {{ t(ctaLabel) }}
        </ButtonV>
      </NuxtLinkLocale>
    </div>
  </section>
</template>
