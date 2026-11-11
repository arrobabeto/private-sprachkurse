<script setup lang="ts">
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useCalculatorModal } from "~/composables/useCalculatorModal"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionSpanischkursPackages" })

  type Plan = {
    name: I18nString
    note?: I18nString
    price: string
    line1: I18nString
    line2: I18nString
    variant: "gray" | "blue"
    rotate: number
    cta: I18nString
    ctaUrl?: string
    ctaAction?: "calculator"
  }

  defineProps<{
    title: I18nString
    icon: string
    plans: Plan[]
  }>()

  const t = useTranslate()
  const { open: openCalculator } = useCalculatorModal()

  function isExternalUrl(url: string) {
    return /^https?:\/\//i.test(url)
  }
</script>

<template>
  <section class="overflow-x-hidden px-[2.5%] py-14 md:py-20">
    <div class="mx-auto flex max-w-[1272px] flex-col items-center">
      <div class="mb-10 flex items-center justify-center gap-3 md:mb-12">
        <NuxtImg
          :src="icon"
          alt=""
          width="35"
          height="43"
          class="h-auto w-auto max-w-none"
          aria-hidden="true"
        />
        <h2 class="text-[2rem] font-bold leading-10 text-[#0b0914]">
          {{ t(title) }}
        </h2>
      </div>
      <div
        class="flex w-full flex-wrap items-center justify-center gap-8 md:gap-12"
      >
        <article
          v-for="(plan, i) of plans"
          :key="i"
          class="flex h-[258px] w-[206px] flex-col items-center rounded-[27px] px-3 pb-4 pt-7 text-center shadow-[0_10px_24px_rgba(0,0,0,0.06)]"
          :class="
            plan.variant === 'blue'
              ? 'bg-ps-blue text-white'
              : 'bg-[#d9d9d9] text-[#1b1919]'
          "
          :style="{ transform: `rotate(${plan.rotate}deg)` }"
        >
          <h3
            class="text-[26px] font-medium capitalize leading-none tracking-[0.78px]"
          >
            {{ t(plan.name) }}
          </h3>
          <p
            v-if="plan.note"
            class="mt-1 text-[13px] font-medium capitalize tracking-[0.39px]"
          >
            {{ t(plan.note) }}
          </p>
          <p class="mt-3 flex items-end justify-center gap-1.5 capitalize">
            <span class="mb-1 text-[28px] font-semibold tracking-[0.84px]">
              CHF
            </span>
            <span class="text-[40px] font-medium leading-none tracking-[1.2px]">
              {{ plan.price }}
            </span>
          </p>
          <p class="mt-3 text-base font-medium capitalize tracking-[0.8px]">
            {{ t(plan.line1) }}
          </p>
          <p class="text-base font-medium capitalize tracking-[0.8px]">
            {{ t(plan.line2) }}
          </p>
          <div class="mt-auto">
            <ButtonV
              v-if="plan.ctaAction === 'calculator'"
              variant="green"
              class="h-11 w-auto min-w-[177px] rounded-[26px] px-6 text-center text-base font-semibold leading-10"
              @click="openCalculator('es')"
            >
              {{ t(plan.cta) }}
            </ButtonV>
            <a
              v-else-if="plan.ctaUrl && isExternalUrl(plan.ctaUrl)"
              :href="plan.ctaUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex"
            >
              <ButtonV
                variant="green"
                class="h-11 w-auto min-w-[177px] rounded-[26px] px-6 text-center text-base font-semibold leading-10"
              >
                {{ t(plan.cta) }}
              </ButtonV>
            </a>
            <NuxtLinkLocale
              v-else
              :to="plan.ctaUrl ?? '/#kontakt'"
              class="inline-flex"
            >
              <ButtonV
                variant="green"
                class="h-11 w-auto min-w-[177px] rounded-[26px] px-6 text-center text-base font-semibold leading-10"
              >
                {{ t(plan.cta) }}
              </ButtonV>
            </NuxtLinkLocale>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
