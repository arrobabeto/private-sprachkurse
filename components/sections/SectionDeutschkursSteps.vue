<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  type Step = {
    title: I18nString
    body: I18nString
    /** Title and body share one paragraph, as in step 2 of the design. */
    inlineBody?: boolean
  }

  defineOptions({ name: "SectionDeutschkursSteps" })

  defineProps<{
    title: I18nString
    steps: Step[]
    arrowImage: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section id="ablauf" class="scroll-mt-24 px-[2.5%] py-8 md:py-11">
    <div
      class="relative mx-auto max-w-[1272px] rounded-[32px] bg-ps-cream-alt px-6 py-12 md:rounded-[53px] md:px-[79px] md:pb-[104px] md:pr-[65px] md:pt-[68px]"
    >
      <NuxtImg
        :src="arrowImage"
        alt=""
        class="pointer-events-none absolute right-[14%] top-1 hidden h-[248px] w-[133px] max-w-none origin-center rotate-[108deg] md:block"
        width="133"
        height="248"
        aria-hidden="true"
      />

      <h2
        class="text-[32px] font-bold leading-[1.2] text-ps-green md:text-[40px]"
      >
        {{ t(title) }}
      </h2>

      <ol class="mt-10 flex flex-col gap-10 md:mt-[78px] md:gap-[78px]">
        <li
          v-for="(step, i) of steps"
          :key="i"
          class="flex items-center gap-4 md:gap-[76px]"
        >
          <p
            class="w-[64px] shrink-0 text-[64px] font-medium leading-[1.2] text-ps-orange md:w-[96px] md:text-[96px]"
          >
            {{ i + 1 }}
          </p>
          <div class="max-w-[883px] text-ps-green">
            <p v-if="step.inlineBody" class="leading-[1.5]">
              <span class="text-2xl font-semibold">
                {{ `${t(step.title)} ` }}
              </span>
              <span class="whitespace-pre-line text-lg font-normal">
                {{ t(step.body) }}
              </span>
            </p>
            <template v-else>
              <p class="text-2xl font-bold leading-[1.5]">
                {{ t(step.title) }}
              </p>
              <p class="text-lg font-normal leading-[1.5]">
                {{ t(step.body) }}
              </p>
            </template>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
