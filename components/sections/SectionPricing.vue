<script setup lang="ts">
  import { computed } from "vue"
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useCalculatorModal } from "~/composables/useCalculatorModal"
  import { useTranslate } from "~/composables/useTranslate"

  type Plan = {
    name?: I18nString
    subtitle?: I18nString
    price: string
    currency?: string
    unit?: I18nString
    duration?: I18nString
    perLesson?: string
    note?: I18nString
    variant?: "default" | "blue" | "orange" | "green"
    cta: I18nString
    ctaUrl?: string
    /** "calculator" opens the course configurator instead of following ctaUrl. */
    ctaAction?: "calculator"
    tilt?: "left" | "right"
  }

  const props = defineProps<{
    title: I18nString
    titleHighlight?: I18nString
    introHeading?: I18nString
    introHeadingHighlight?: I18nString
    intro: I18nString
    categories: {
      title: I18nString
      plans: Plan[]
    }[]
  }>()

  const t = useTranslate()
  const { open: openCalculator } = useCalculatorModal()

  const introHeadingText = computed(() =>
    t(
      props.introHeading ?? {
        de: "Welches Paket passt zu Ihnen?",
        en: "Which package suits you?",
      },
    ),
  )

  const introHeadingHighlightText = computed(() => {
    if (props.introHeadingHighlight) return t(props.introHeadingHighlight)
    return introHeadingText.value.includes("passt zu Ihnen")
      ? "passt zu Ihnen?"
      : "suits you?"
  })

  const introParagraphs = computed(() =>
    t(props.intro)
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean),
  )

  function cardClass(plan: Plan) {
    if (plan.variant === "blue") return "bg-ps-blue text-white"
    if (plan.variant === "orange") return "bg-ps-orange text-white"
    if (plan.variant === "green") return "bg-ps-green text-white"
    return "bg-[#E8E8E8] text-ps-dark"
  }

  function btnVariant(plan: Plan) {
    return plan.variant === "green" ? "orange" : "green"
  }

  function tiltClass(tilt?: "left" | "right", index = 0) {
    const direction = tilt ?? (index % 2 === 0 ? "left" : "right")
    if (direction === "left") return "-rotate-2 md:-rotate-[2.5deg]"
    return "rotate-2 md:rotate-[2.5deg]"
  }

  function splitTitle(full: string, highlight?: string) {
    if (!highlight || !full.includes(highlight)) {
      return { before: full, highlight: "", after: "" }
    }
    const [before, after = ""] = full.split(highlight)
    return { before, highlight, after }
  }
</script>

<template>
  <section id="preise" class="scroll-mt-24 py-12 md:py-16">
    <div class="mx-auto w-[95%] max-w-[1200px]">
      <h2
        class="mb-8 text-center text-3xl font-bold leading-tight text-ps-dark md:mb-10 md:text-4xl"
      >
        <template v-if="titleHighlight">
          {{ splitTitle(t(title), t(titleHighlight)).before }}
          <span class="text-ps-orange">
            {{ splitTitle(t(title), t(titleHighlight)).highlight }}
          </span>
          {{ splitTitle(t(title), t(titleHighlight)).after }}
        </template>
        <template v-else>{{ t(title) }}</template>
      </h2>

      <div
        class="relative mb-12 overflow-hidden rounded-[27px] bg-ps-green px-6 py-8 text-white md:mb-14 md:px-10 md:py-10"
      >
        <h3 class="text-2xl leading-snug md:text-[2rem]">
          {{ splitTitle(introHeadingText, introHeadingHighlightText).before }}
          <span class="font-bold">
            {{
              splitTitle(introHeadingText, introHeadingHighlightText).highlight
            }}
          </span>
          {{ splitTitle(introHeadingText, introHeadingHighlightText).after }}
        </h3>
        <div
          class="max-w-3xl mt-5 space-y-4 text-sm leading-relaxed text-white/95 md:text-base md:leading-7"
        >
          <p v-for="(para, i) of introParagraphs" :key="i">
            {{ para }}
          </p>
        </div>
        <NuxtImg
          src="/images/home/icon-pricing-arrow.svg"
          alt=""
          class="absolute bottom-5 right-5 h-8 w-8 opacity-90 md:bottom-6 md:right-8 md:h-10 md:w-10"
          width="40"
          height="40"
          aria-hidden="true"
        />
      </div>

      <div
        v-for="(cat, ci) of categories"
        :key="ci"
        class="mb-12 last:mb-0 md:mb-14"
      >
        <div class="mb-6 flex flex-col items-center gap-2 md:mb-8">
          <NuxtImg
            src="/images/home/icon-pricing-category.svg"
            alt=""
            class="h-10 w-10 md:h-12 md:w-12"
            width="48"
            height="48"
            aria-hidden="true"
          />
          <h3 class="text-lg font-bold text-ps-dark md:text-xl">
            {{ t(cat.title) }}
          </h3>
        </div>

        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="(plan, pi) of cat.plans"
            :key="pi"
            class="flex min-h-[220px] flex-col rounded-[27px] p-5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-transform md:min-h-[240px] md:p-6"
            :class="[
              cardClass(plan),
              tiltClass(plan.tilt, pi),
              cat.plans.length === 2 && pi === 0 ? 'lg:col-start-2' : '',
            ]"
          >
            <div class="flex flex-col gap-1">
              <p
                v-if="plan.subtitle"
                class="text-sm font-bold leading-snug md:text-base"
              >
                {{ t(plan.subtitle) }}
              </p>
              <h4
                v-if="plan.name && t(plan.name).trim()"
                class="text-base font-bold leading-snug md:text-lg"
              >
                {{ t(plan.name) }}
              </h4>
              <p v-if="plan.note" class="text-xs opacity-80 md:text-sm">
                {{ t(plan.note) }}
              </p>
            </div>

            <div class="my-4 flex items-baseline justify-center gap-1.5">
              <span class="text-sm font-semibold md:text-base">
                {{ plan.currency ?? "CHF" }}
              </span>
              <span class="text-4xl font-bold leading-none md:text-[2.75rem]">
                {{ plan.price }}
              </span>
            </div>

            <div class="mb-4 flex flex-col gap-0.5 text-xs md:text-sm">
              <p v-if="plan.unit" class="opacity-90">
                {{ t(plan.unit) }}
              </p>
              <p v-if="plan.duration" class="opacity-80">
                {{ t(plan.duration) }}
              </p>
              <p v-if="plan.perLesson" class="opacity-90">
                {{ plan.perLesson }}
              </p>
            </div>

            <ButtonV
              v-if="plan.ctaAction === 'calculator'"
              :variant="btnVariant(plan)"
              class="mt-auto w-full px-4 py-2.5 text-sm font-semibold"
              @click="openCalculator()"
            >
              {{ t(plan.cta) }}
            </ButtonV>
            <NuxtLinkLocale
              v-else
              :to="plan.ctaUrl ?? '/#kontakt'"
              class="mt-auto"
            >
              <ButtonV
                :variant="btnVariant(plan)"
                class="w-full px-4 py-2.5 text-sm font-semibold"
              >
                {{ t(plan.cta) }}
              </ButtonV>
            </NuxtLinkLocale>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
