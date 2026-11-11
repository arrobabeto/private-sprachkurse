<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionSpanischkursInsights" })

  defineProps<{
    tagline: I18nString
    title: I18nString
    arrowImage: string
    items: { text: I18nString }[]
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="relative px-[2.5%] py-11">
    <div
      class="relative mx-auto max-w-[1276px] rounded-[53px] bg-ps-cream-alt px-6 pb-14 pt-8 md:px-16 md:pb-[72px] md:pt-10"
    >
      <div
        class="pointer-events-none relative mx-auto hidden h-[120px] w-[240px] md:block"
        aria-hidden="true"
      >
        <NuxtImg
          :src="arrowImage"
          alt=""
          width="133"
          height="254"
          class="absolute left-1/2 top-1/2 max-w-none"
          style="
            transform: translate(-50%, -50%) scaleY(-1) rotate(106deg)
              scale(0.58);
          "
        />
      </div>
      <p class="text-base font-semibold leading-[1.5] text-ps-green">
        {{ t(tagline) }}
      </p>
      <h2
        class="mt-4 max-w-[810px] text-[2rem] font-bold leading-[1.2] text-ps-green md:text-[48px]"
      >
        {{ t(title) }}
      </h2>
      <div class="mt-10 grid gap-8 md:mt-[52px] md:grid-cols-3 md:gap-12">
        <p
          v-for="(item, i) of items"
          :key="i"
          class="border-l-[3px] border-ps-orange pl-8 text-lg font-medium leading-[1.4] text-ps-green md:text-xl"
        >
          {{ t(item.text) }}
        </p>
      </div>
    </div>
  </section>
</template>
