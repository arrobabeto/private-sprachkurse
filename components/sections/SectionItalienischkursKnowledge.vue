<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionItalienischkursKnowledge" })

  defineProps<{
    tagline: I18nString
    title: I18nString
    points: I18nString[]
    arrowImage: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="overflow-x-clip px-[2.5%] py-8 md:py-10">
    <div
      class="relative mx-auto max-w-[1276px] rounded-[53px] bg-ps-cream-alt px-6 py-12 md:px-16 md:pb-16 md:pt-[72px]"
    >
      <div
        class="pointer-events-none absolute left-[52%] top-4 hidden origin-center rotate-[105.76deg] -scale-y-100 lg:block"
        aria-hidden="true"
      >
        <NuxtImg :src="arrowImage" alt="" width="133" height="254" />
      </div>

      <div class="relative z-10 max-w-[1152px]">
        <p class="text-base font-semibold leading-[1.5] text-ps-green">
          {{ t(tagline) }}
        </p>
        <h2
          class="mt-4 max-w-[810px] text-[clamp(2rem,4vw,48px)] font-bold leading-[1.2] text-ps-green"
        >
          {{ t(title) }}
        </h2>

        <div class="mt-12 grid gap-8 md:grid-cols-3 md:gap-12">
          <p
            v-for="(point, i) of points"
            :key="i"
            class="border-l-[3px] border-ps-orange py-0 pl-8 text-xl font-medium leading-[1.4] text-ps-green"
          >
            {{ t(point) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
