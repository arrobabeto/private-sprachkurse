<script setup lang="ts">
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineProps<{
    backgroundImage: string
    title: I18nString
    body: I18nString
    primaryCtaLabel: I18nString
    primaryCtaUrl: string
    secondaryCtaLabel: I18nString
    secondaryCtaUrl: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="px-[2.5%] py-10 md:py-16">
    <div
      class="relative mx-auto min-h-[280px] max-w-[1272px] overflow-hidden rounded-[32px] md:min-h-[318px] md:rounded-[44px]"
    >
      <NuxtImg
        :src="backgroundImage"
        alt=""
        class="absolute inset-0 h-full w-full object-cover"
        width="2544"
        height="636"
        sizes="(max-width: 768px) 100vw, 1272px"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-black/40" />
      <div
        class="relative flex flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:gap-20 md:px-16 md:py-[77px]"
      >
        <h2
          class="shrink-0 text-3xl font-bold leading-tight text-white md:max-w-[40%] md:text-[40px]"
        >
          {{ t(title) }}
        </h2>
        <div class="flex flex-col gap-8">
          <p class="text-base leading-relaxed text-white md:text-lg">
            {{ t(body) }}
          </p>
          <div class="flex flex-wrap items-center gap-4">
            <NuxtLinkLocale :to="primaryCtaUrl">
              <ButtonV variant="blue" class="min-w-[12rem]">
                {{ t(primaryCtaLabel) }}
              </ButtonV>
            </NuxtLinkLocale>
            <a
              :href="secondaryCtaUrl"
              class="inline-flex min-h-10 min-w-[9rem] items-center justify-center rounded-[37px] border border-white px-6 py-2.5 text-base text-white transition hover:bg-white/10"
            >
              {{ t(secondaryCtaLabel) }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
