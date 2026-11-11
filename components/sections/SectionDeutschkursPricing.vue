<script setup lang="ts">
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useCalculatorModal } from "~/composables/useCalculatorModal"
  import { useTranslate } from "~/composables/useTranslate"

  type Plan = {
    name: I18nString
    note?: I18nString
    price: string
    currency?: string
    lines: I18nString[]
    cta: I18nString
    ctaUrl?: string
    ctaAction?: "calculator"
    variant?: "gray" | "blue"
    tilt?: "left-strong" | "flat" | "left" | "right"
  }

  defineOptions({ name: "SectionDeutschkursPricing" })

  defineProps<{
    title: I18nString
    icon: string
    plans: Plan[]
  }>()

  const t = useTranslate()
  const { open: openCalculator } = useCalculatorModal()

  function isExternal(url?: string) {
    return !!url && /^https?:\/\//i.test(url)
  }

  function cardClass(variant?: Plan["variant"]) {
    if (variant === "blue") return "bg-ps-blue text-white"
    return "bg-[#d9d9d9] text-ps-dark"
  }

  function tiltClass(tilt?: Plan["tilt"]) {
    if (tilt === "left-strong") return "md:-rotate-[10deg]"
    if (tilt === "left") return "md:-rotate-[6deg]"
    if (tilt === "right") return "md:rotate-[6deg]"
    return "md:-rotate-[0.5deg]"
  }
</script>

<template>
  <section id="pakete" class="scroll-mt-24 px-[2.5%] py-12 md:py-16">
    <div class="mx-auto max-w-[1272px]">
      <div class="mb-10 flex items-center justify-center gap-3 md:mb-12">
        <NuxtImg
          :src="icon"
          alt=""
          class="h-[43px] w-[35px] shrink-0"
          width="35"
          height="43"
          aria-hidden="true"
        />
        <h2 class="text-[32px] font-bold leading-10 text-[#0b0914]">
          {{ t(title) }}
        </h2>
      </div>

      <div
        class="flex flex-wrap items-center justify-center gap-8 py-4 md:gap-10"
      >
        <article
          v-for="(plan, i) of plans"
          :key="i"
          class="flex min-h-[258px] w-[206px] flex-col rounded-[27px] px-3 pb-4 pt-8 text-center capitalize"
          :class="[cardClass(plan.variant), tiltClass(plan.tilt)]"
        >
          <h3 class="text-[26px] font-medium leading-none tracking-[0.78px]">
            {{ t(plan.name) }}
          </h3>
          <p
            v-if="plan.note"
            class="mt-2 text-[13px] font-medium tracking-[0.39px]"
          >
            {{ t(plan.note) }}
          </p>
          <p class="mt-3 flex items-baseline justify-center gap-1">
            <span class="text-[28px] font-semibold tracking-[0.84px]">
              {{ plan.currency ?? "CHF" }}
            </span>
            <span class="text-[40px] font-medium leading-none tracking-[1.2px]">
              {{ plan.price }}
            </span>
          </p>
          <p
            v-for="(line, li) of plan.lines"
            :key="li"
            class="mt-1 text-base font-medium tracking-[0.8px]"
          >
            {{ t(line) }}
          </p>

          <div class="mt-auto flex justify-center pt-4">
            <ButtonV
              v-if="plan.ctaAction === 'calculator'"
              variant="green"
              class="h-11 min-w-[177px] rounded-[26px] px-6 text-base font-semibold normal-case"
              @click="openCalculator()"
            >
              {{ t(plan.cta) }}
            </ButtonV>
            <a
              v-else-if="isExternal(plan.ctaUrl)"
              :href="plan.ctaUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ButtonV
                variant="green"
                class="h-11 min-w-[177px] rounded-[26px] px-6 text-base font-semibold normal-case"
              >
                {{ t(plan.cta) }}
              </ButtonV>
            </a>
            <NuxtLinkLocale v-else :to="plan.ctaUrl ?? '/#kontakt'">
              <ButtonV
                variant="green"
                class="h-11 min-w-[177px] rounded-[26px] px-6 text-base font-semibold normal-case"
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
