<script setup lang="ts">
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useCalculatorModal } from "~/composables/useCalculatorModal"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionFranzoesischkursPricing" })

  type Plan = {
    name: I18nString
    note?: I18nString
    price: string
    detailPrimary: I18nString
    detailSecondary: I18nString
    variant?: "blue"
    tilt: number
    cta: I18nString
    ctaUrl?: string
    ctaAction?: "calculator"
  }

  defineProps<{
    title: I18nString
    plans: Plan[]
  }>()

  const t = useTranslate()
  const { open: openCalculator } = useCalculatorModal()

  function isExternalUrl(url: string) {
    return /^https?:\/\//i.test(url)
  }
</script>

<template>
  <section class="overflow-x-clip px-[2.5%] py-12 md:py-16">
    <div class="mb-8 flex items-center justify-center gap-3 md:mb-10">
      <NuxtImg
        src="/images/franzoesischkurs/icon-online.svg"
        alt=""
        width="35"
        height="43"
        class="h-[43px] w-[35px]"
        aria-hidden="true"
      />
      <h2
        class="text-[clamp(1.5rem,3vw,32px)] font-bold leading-10 text-ps-dark"
      >
        {{ t(title) }}
      </h2>
    </div>

    <div
      class="mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-8 md:gap-12"
    >
      <article
        v-for="(plan, i) of plans"
        :key="i"
        class="plan-card flex min-h-[258px] w-[206px] flex-col items-center rounded-[27px] px-3 pb-4 pt-8 text-center"
        :class="
          plan.variant === 'blue'
            ? 'bg-ps-blue text-white'
            : 'bg-[#d9d9d9] text-[#1b1919]'
        "
        :style="{ '--tilt': `${plan.tilt}deg` }"
      >
        <h3 class="text-[26px] font-medium leading-none tracking-wide">
          {{ t(plan.name) }}
        </h3>
        <p
          v-if="plan.note"
          class="mt-1 text-[13px] font-medium capitalize tracking-wide"
        >
          {{ t(plan.note) }}
        </p>
        <p class="mt-3 flex items-baseline justify-center gap-1">
          <span class="text-[28px] font-semibold tracking-wide">CHF</span>
          <span class="text-[40px] font-medium leading-none tracking-tight">
            {{ plan.price }}
          </span>
        </p>
        <p class="mt-3 text-base font-medium capitalize tracking-wide">
          {{ t(plan.detailPrimary) }}
        </p>
        <p class="text-base font-medium capitalize tracking-wide">
          {{ t(plan.detailSecondary) }}
        </p>

        <ButtonV
          v-if="plan.ctaAction === 'calculator'"
          variant="green"
          class="mt-auto w-[177px] rounded-full px-4 py-2 text-base font-semibold"
          @click="openCalculator('fr')"
        >
          {{ t(plan.cta) }}
        </ButtonV>
        <a
          v-else-if="plan.ctaUrl && isExternalUrl(plan.ctaUrl)"
          :href="plan.ctaUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-auto"
        >
          <ButtonV
            variant="green"
            class="w-[177px] rounded-full px-4 py-2 text-base font-semibold"
          >
            {{ t(plan.cta) }}
          </ButtonV>
        </a>
        <NuxtLinkLocale v-else :to="plan.ctaUrl ?? '/#kontakt'" class="mt-auto">
          <ButtonV
            variant="green"
            class="w-[177px] rounded-full px-4 py-2 text-base font-semibold"
          >
            {{ t(plan.cta) }}
          </ButtonV>
        </NuxtLinkLocale>
      </article>
    </div>
  </section>
</template>

<style scoped>
  @media (min-width: 768px) {
    .plan-card {
      transform: rotate(var(--tilt));
    }
  }
</style>
