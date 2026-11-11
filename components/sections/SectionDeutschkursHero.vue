<script setup lang="ts">
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionDeutschkursHero" })

  defineProps<{
    line1: I18nString
    line2: I18nString
    subtitle: I18nString
    ctaLabel: I18nString
    ctaUrl: string
    circleImage: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="px-[2.5%] py-11">
    <div class="mx-auto flex max-w-[858px] flex-col items-center gap-8">
      <div class="text-center">
        <h1
          class="text-[40px] font-semibold leading-[1.2] text-ps-dark md:text-[56px]"
        >
          <span class="relative inline-block px-3">
            <span class="relative z-10">{{ t(line1) }}</span>
            <NuxtImg
              :src="circleImage"
              alt=""
              class="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[96px] w-[112%] max-w-none -translate-x-1/2 -translate-y-[58%] rotate-[4deg]"
              width="398"
              height="100"
              aria-hidden="true"
            />
          </span>
          <span class="mt-1 block">{{ t(line2) }}</span>
        </h1>
        <p
          class="mx-auto mt-6 max-w-[768px] text-lg font-normal leading-[1.5] text-ps-dark"
        >
          {{ t(subtitle) }}
        </p>
      </div>
      <NuxtLinkLocale :to="ctaUrl">
        <ButtonV
          variant="blue"
          class="min-h-[52px] rounded-[30px] px-14 py-4 text-lg font-normal"
        >
          {{ t(ctaLabel) }}
        </ButtonV>
      </NuxtLinkLocale>
    </div>
  </section>
</template>
