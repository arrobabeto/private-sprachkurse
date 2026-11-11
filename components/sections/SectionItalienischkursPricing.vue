<script setup lang="ts">
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import type { LangCode } from "~/data/types"
  import { useCalculatorModal } from "~/composables/useCalculatorModal"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionItalienischkursPricing" })

  type Plan = {
    name: I18nString
    note?: I18nString
    price: string
    detailTop: I18nString
    detailBottom: I18nString
    tone: "gray" | "blue"
    tilt: "-10.26" | "-0.43" | "-6.2" | "5.91"
    cta: I18nString
    ctaAction?: "calculator" | "external"
    ctaUrl?: string
    calculatorLang?: LangCode
  }

  defineProps<{
    title: I18nString
    icon: string
    plans: Plan[]
  }>()

  const t = useTranslate()
  const { open: openCalculator } = useCalculatorModal()

  const toneClass = {
    gray: "bg-[#d9d9d9] text-ps-dark",
    blue: "bg-ps-blue text-white",
  } as const

  const tiltClass = {
    "-10.26": "md:-rotate-[10.26deg]",
    "-0.43": "md:-rotate-[0.43deg]",
    "-6.2": "md:-rotate-[6.2deg]",
    "5.91": "md:rotate-[5.91deg]",
  } as const

  function isExternal(url: string) {
    return /^https?:\/\//i.test(url)
  }
</script>

<template>
  <section class="px-[2.5%] py-12 md:py-16">
    <div class="mx-auto flex max-w-[1200px] flex-col items-center">
      <div class="mb-10 flex items-center justify-center gap-3 md:mb-12">
        <NuxtImg :src="icon" alt="" width="35" height="43" aria-hidden="true" />
        <h2 class="text-[32px] font-bold leading-10 text-ps-dark">
          {{ t(title) }}
        </h2>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        <article
          v-for="(plan, i) of plans"
          :key="i"
          class="w-[206px] shrink-0"
          :class="tiltClass[plan.tilt]"
        >
          <div
            class="flex h-[258px] flex-col items-center rounded-[27px] px-3 pb-4 pt-8 text-center"
            :class="toneClass[plan.tone]"
          >
            <p class="text-[26px] font-medium leading-none tracking-[0.03em]">
              {{ t(plan.name) }}
            </p>
            <p
              v-if="plan.note"
              class="mt-1 text-[13px] font-medium capitalize leading-normal tracking-[0.03em]"
            >
              {{ t(plan.note) }}
            </p>
            <p class="mt-3 flex items-baseline justify-center gap-1">
              <span class="text-[28px] font-semibold tracking-[0.03em]">
                CHF
              </span>
              <span
                class="text-[40px] font-medium leading-none tracking-[0.03em]"
              >
                {{ plan.price }}
              </span>
            </p>
            <p
              class="mt-2 text-base font-medium capitalize leading-normal tracking-[0.05em]"
            >
              {{ t(plan.detailTop) }}
            </p>
            <p
              class="text-base font-medium capitalize leading-normal tracking-[0.05em]"
            >
              {{ t(plan.detailBottom) }}
            </p>

            <div class="mt-auto w-[177px]">
              <ButtonV
                v-if="plan.ctaAction === 'calculator'"
                variant="green"
                class="h-11 min-h-0 rounded-[26px] px-3 py-0 text-base"
                @click="openCalculator(plan.calculatorLang)"
              >
                {{ t(plan.cta) }}
              </ButtonV>
              <a
                v-else-if="plan.ctaUrl && isExternal(plan.ctaUrl)"
                :href="plan.ctaUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ButtonV
                  variant="green"
                  class="h-11 min-h-0 rounded-[26px] px-3 py-0 text-base"
                >
                  {{ t(plan.cta) }}
                </ButtonV>
              </a>
              <NuxtLinkLocale v-else :to="plan.ctaUrl ?? '/#kontakt'">
                <ButtonV
                  variant="green"
                  class="h-11 min-h-0 rounded-[26px] px-3 py-0 text-base"
                >
                  {{ t(plan.cta) }}
                </ButtonV>
              </NuxtLinkLocale>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
