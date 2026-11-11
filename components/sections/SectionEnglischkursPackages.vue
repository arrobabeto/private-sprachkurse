<script setup lang="ts">
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useCalculatorModal } from "~/composables/useCalculatorModal"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionEnglischkursPackages" })

  defineProps<{
    title: I18nString
    icon: string
    plans: {
      name: I18nString
      note?: I18nString
      price: string
      detailPrimary: I18nString
      detailSecondary: I18nString
      variant?: "gray" | "blue"
      tiltDeg: number
      cta: I18nString
      ctaUrl?: string
      ctaAction?: "calculator"
    }[]
  }>()

  const t = useTranslate()
  const { open: openCalculator } = useCalculatorModal()

  function isExternalUrl(url: string) {
    return /^https?:\/\//i.test(url)
  }
</script>

<template>
  <section id="pakete" class="scroll-mt-24 px-[2.5%] py-12 md:py-16">
    <div class="mx-auto flex max-w-[1200px] flex-col items-center">
      <div class="mb-10 flex items-center justify-center gap-3 md:mb-12">
        <NuxtImg
          :src="icon"
          alt=""
          width="35"
          height="43"
          class="max-w-none shrink-0"
          aria-hidden="true"
        />
        <h2 class="text-[32px] font-bold leading-10 text-[#0b0914]">
          {{ t(title) }}
        </h2>
      </div>

      <div
        class="flex flex-wrap items-center justify-center gap-x-8 gap-y-10 md:gap-x-12"
      >
        <article
          v-for="(plan, i) of plans"
          :key="i"
          class="flex h-[258px] w-[206px] shrink-0 flex-col items-center rounded-[27px] px-3 pb-5 pt-8 text-center"
          :class="
            plan.variant === 'blue'
              ? 'bg-ps-blue text-white'
              : 'bg-[#D9D9D9] text-ps-dark'
          "
          :style="{ transform: `rotate(${plan.tiltDeg}deg)` }"
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
          <p class="mt-3 flex items-baseline justify-center gap-1.5">
            <span class="text-[28px] font-semibold tracking-[0.84px]">CHF</span>
            <span class="text-[40px] font-medium leading-none tracking-[1.2px]">
              {{ plan.price }}
            </span>
          </p>
          <p class="mt-3 text-base font-medium capitalize tracking-[0.8px]">
            {{ t(plan.detailPrimary) }}
          </p>
          <p class="text-base font-medium capitalize tracking-[0.8px]">
            {{ t(plan.detailSecondary) }}
          </p>

          <ButtonV
            v-if="plan.ctaAction === 'calculator'"
            variant="green"
            class="mt-auto h-11 w-[177px] rounded-[26px] px-4 text-base font-semibold"
            @click="openCalculator('en')"
          >
            {{ t(plan.cta) }}
          </ButtonV>
          <a
            v-else-if="plan.ctaUrl && isExternalUrl(plan.ctaUrl)"
            :href="plan.ctaUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-auto inline-flex"
          >
            <ButtonV
              variant="green"
              class="h-11 w-[177px] rounded-[26px] px-4 text-base font-semibold"
            >
              {{ t(plan.cta) }}
            </ButtonV>
          </a>
          <NuxtLinkLocale
            v-else
            :to="plan.ctaUrl || '/#kontakt'"
            class="mt-auto inline-flex"
          >
            <ButtonV
              variant="green"
              class="h-11 w-[177px] rounded-[26px] px-4 text-base font-semibold"
            >
              {{ t(plan.cta) }}
            </ButtonV>
          </NuxtLinkLocale>
        </article>
      </div>
    </div>
  </section>
</template>
