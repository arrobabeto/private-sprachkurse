<script setup lang="ts">
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionFranzoesischkursHero" })

  defineProps<{
    titleHighlight: I18nString
    titleLine1Rest: I18nString
    titleLine2: I18nString
    subtitle: I18nString
    ctaLabel: I18nString
    ctaUrl: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="px-[2.5%] py-11 md:py-14">
    <div class="mx-auto flex max-w-[858px] flex-col items-center text-center">
      <h1
        class="text-[clamp(2rem,5vw,56px)] font-semibold leading-[1.2] text-ps-dark"
      >
        <span class="block">
          <span class="relative inline-block">
            <NuxtImg
              src="/images/franzoesischkurs/hero-circle.svg"
              alt=""
              width="466"
              height="100"
              class="pointer-events-none absolute left-1/2 top-1/2 z-0 h-auto w-[128%] max-w-none -translate-x-1/2 -translate-y-1/2 rotate-[4deg]"
              aria-hidden="true"
            />
            <span class="relative z-10">{{ t(titleHighlight) }}</span>
          </span>
          <span>{{ t(titleLine1Rest) }}</span>
        </span>
        <span class="mt-1 block">{{ t(titleLine2) }}</span>
      </h1>
      <p
        class="mx-auto mt-6 max-w-[768px] text-base leading-[1.5] text-ps-dark md:text-lg"
      >
        {{ t(subtitle) }}
      </p>
      <NuxtLinkLocale :to="ctaUrl" class="mt-8">
        <ButtonV
          variant="blue"
          class="rounded-full px-14 py-4 text-lg font-normal"
        >
          {{ t(ctaLabel) }}
        </ButtonV>
      </NuxtLinkLocale>
    </div>
  </section>
</template>
