<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionEnglischkursInsights" })

  defineProps<{
    tagline: I18nString
    title: I18nString
    arrowImage: string
    points: I18nString[]
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="px-[2.5%] py-8 md:py-12">
    <div
      class="relative mx-auto max-w-[1276px] rounded-[40px] bg-ps-cream-alt px-6 py-12 md:rounded-[53px] md:px-16 md:py-[72px]"
    >
      <NuxtImg
        :src="arrowImage"
        alt=""
        width="132.939"
        height="254.21"
        class="pointer-events-none absolute right-[6%] top-4 hidden max-w-none lg:block"
        style="transform: rotate(105.76deg) scaleY(-1)"
        aria-hidden="true"
      />
      <p
        class="relative z-10 text-base font-semibold leading-[1.5] text-ps-green"
      >
        {{ t(tagline) }}
      </p>
      <h2
        class="relative z-10 mt-4 max-w-[640px] whitespace-pre-line text-[32px] font-bold leading-[1.2] text-ps-green md:max-w-[720px] md:text-[48px]"
      >
        {{ t(title) }}
      </h2>
      <div
        class="relative z-10 mt-10 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-3 md:gap-12"
      >
        <p
          v-for="(point, i) of points"
          :key="i"
          class="border-l-[3px] border-ps-orange pl-8 text-xl font-medium leading-[1.4] text-ps-green"
        >
          {{ t(point) }}
        </p>
      </div>
    </div>
  </section>
</template>
