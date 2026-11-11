<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionItalienischkursProcess" })

  type Step = {
    title: I18nString
    body: I18nString
    titleWeight?: "semibold" | "bold"
  }

  defineProps<{
    title: I18nString
    steps: Step[]
    arrowImage: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="px-[2.5%] py-8 md:py-10">
    <div
      class="relative mx-auto max-w-[1272px] rounded-[53px] bg-ps-cream-alt px-6 py-12 md:px-16 md:pb-24 md:pt-16"
    >
      <div
        class="pointer-events-none absolute left-[38%] top-0 hidden origin-center rotate-[108deg] lg:block"
        aria-hidden="true"
      >
        <NuxtImg :src="arrowImage" alt="" width="133" height="248" />
      </div>

      <div
        class="relative z-10 flex max-w-[1040px] flex-col gap-10 md:gap-[78px]"
      >
        <h2
          class="max-w-[409px] text-[clamp(1.75rem,4vw,40px)] font-bold leading-[1.2] text-ps-green"
        >
          {{ t(title) }}
        </h2>

        <div
          v-for="(step, i) of steps"
          :key="i"
          class="flex items-center gap-5 md:gap-20"
        >
          <p
            class="shrink-0 text-[64px] font-medium leading-none text-ps-orange md:text-[96px]"
          >
            {{ i + 1 }}
          </p>
          <div class="max-w-[883px] text-ps-green">
            <h3
              class="text-2xl leading-[1.5]"
              :class="
                step.titleWeight === 'semibold' ? 'font-semibold' : 'font-bold'
              "
            >
              {{ t(step.title) }}
            </h3>
            <p class="text-lg font-normal leading-[1.5]">
              {{ t(step.body) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
