<script setup lang="ts">
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionItalienischkursHero" })

  defineProps<{
    titleHighlight: I18nString
    titleLine1Rest: I18nString
    titleLine2: I18nString
    subtitle: I18nString
    ctaLabel: I18nString
    ctaUrl: string
    circleImage: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="overflow-x-clip px-[2.5%] py-11">
    <div class="mx-auto flex max-w-[858px] flex-col items-center text-center">
      <h1
        class="text-[clamp(1.7rem,4.6vw,56px)] font-semibold leading-[1.2] text-ps-dark"
      >
        <span class="block">
          <span class="relative inline-block">
            <span class="relative z-10">{{ t(titleHighlight) }}</span>
            <span
              class="pointer-events-none absolute left-1/2 top-1/2 w-[127%] -translate-x-1/2 -translate-y-1/2 rotate-[3.96deg]"
              aria-hidden="true"
            >
              <NuxtImg
                :src="circleImage"
                alt=""
                width="466"
                height="100"
                class="block h-auto w-full"
              />
            </span>
          </span>
          <span>{{ t(titleLine1Rest) }}</span>
        </span>
        <span class="block">{{ t(titleLine2) }}</span>
      </h1>

      <p
        class="mx-auto mt-6 max-w-[768px] text-lg font-normal leading-[1.5] text-ps-dark"
      >
        {{ t(subtitle) }}
      </p>

      <NuxtLinkLocale :to="ctaUrl" class="mt-8 inline-block">
        <ButtonV
          variant="blue"
          class="rounded-full px-8 py-4 text-lg font-normal md:px-14"
        >
          {{ t(ctaLabel) }}
        </ButtonV>
      </NuxtLinkLocale>
    </div>
  </section>
</template>
