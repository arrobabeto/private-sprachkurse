<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionKontaktHero" })

  defineProps<{
    tagline: I18nString
    title: I18nString
    bodyLead: I18nString
    bodyLeadHighlight: I18nString
    bodyMiddle: I18nString
    bodyEnd: I18nString
    heroImage: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="px-[2.5%] pb-6 pt-4 md:pb-8 md:pt-6">
    <div
      class="mx-auto grid max-w-[1276px] items-start gap-8 md:grid-cols-[minmax(0,579px)_744px] md:justify-between md:gap-6"
    >
      <div class="flex flex-col gap-4 md:gap-8">
        <p class="text-base font-semibold leading-[1.5] text-ps-green">
          {{ t(tagline) }}
        </p>
        <div class="flex flex-col gap-6">
          <h1
            class="text-3xl font-bold leading-[1.2] text-ps-green md:text-[48px]"
          >
            {{ t(title) }}
          </h1>
          <div class="space-y-4">
            <p
              class="text-xl font-medium leading-[1.44] text-ps-green md:text-2xl"
            >
              {{ t(bodyLead) }}{{ t(bodyLeadHighlight) }}
            </p>
            <p class="text-base leading-[1.5] text-ps-dark md:text-lg">
              {{ t(bodyMiddle) }}
            </p>
            <p class="text-base leading-[1.5] text-ps-dark md:text-lg">
              {{ t(bodyEnd) }}
            </p>
          </div>
        </div>
      </div>

      <div
        class="relative w-full max-w-[744px] justify-self-stretch overflow-hidden rounded-bl-[36px] md:justify-self-end md:rounded-bl-[48px]"
        style="aspect-ratio: 744 / 458"
      >
        <NuxtImg
          :src="heroImage"
          alt=""
          class="absolute inset-0 h-full w-full object-cover object-center"
          width="744"
          height="458"
          sizes="(max-width: 768px) 100vw, 744px"
          loading="eager"
          fetchpriority="high"
          format="png"
        />
      </div>
    </div>
  </section>
</template>
