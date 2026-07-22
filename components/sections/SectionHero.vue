<script setup lang="ts">
  import { computed } from "vue"
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  const props = defineProps<{
    headlineHighlight: I18nString
    headlineLine1Tail?: I18nString
    headlineLine2?: I18nString
    /** @deprecated CMS may still send a single suffix string */
    headlineSuffix?: I18nString
    subtext: I18nString
    ctaLabel: I18nString
    ctaUrl: string
    cards: {
      text: I18nString
      variant?: "blue" | "orange"
      icon: string
    }[]
  }>()

  const t = useTranslate()

  const defaultHeadlineLines = {
    line1Tail: {
      de: " sind lebendig und",
      en: " are alive and",
    },
    line2: {
      de: "genau so lernt man sie",
      en: "that's exactly how you learn them",
    },
  } satisfies { line1Tail: I18nString; line2: I18nString }

  function splitLegacySuffix(suffix: I18nString): {
    line1Tail: I18nString
    line2: I18nString
  } {
    const split = { ...defaultHeadlineLines }
    for (const locale of ["de", "en"] as const) {
      const text = suffix[locale]
      if (!text) continue
      const marker = locale === "de" ? " genau so " : " and that's "
      const idx = text.indexOf(marker)
      if (idx === -1) continue
      split.line1Tail[locale] = text.slice(0, idx)
      split.line2[locale] = text.slice(idx + marker.length).trim()
      if (locale === "de" && !split.line2[locale].startsWith("genau so")) {
        split.line2[locale] = `genau so ${split.line2[locale]}`
      }
    }
    return split
  }

  const resolvedHeadline = computed(() => {
    if (props.headlineLine1Tail && props.headlineLine2) {
      return {
        line1Tail: props.headlineLine1Tail,
        line2: props.headlineLine2,
      }
    }
    if (props.headlineSuffix) {
      return splitLegacySuffix(props.headlineSuffix)
    }
    return defaultHeadlineLines
  })

  const cardTilt = [
    "md:-rotate-[4deg] md:translate-y-2",
    "md:rotate-[3deg] md:-translate-y-1",
    "md:-rotate-[3deg] md:translate-y-1.5",
    "md:rotate-[4deg]",
  ]

  function cardClass(variant?: "blue" | "orange") {
    return variant === "orange" ? "bg-ps-orange" : "bg-ps-blue"
  }
</script>

<template>
  <section class="pb-10 pt-8 md:pb-14 md:pt-12">
    <div class="ps-container">
      <div class="text-center">
        <h1
          class="max-w-4xl mx-auto text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight text-ps-dark"
        >
          <span class="block">
            <span class="relative inline-block align-middle">
              <span class="relative z-10 text-ps-orange">
                {{ t(headlineHighlight) }}
              </span>
              <NuxtImg
                src="/images/home/loop-orange.svg"
                alt=""
                class="pointer-events-none absolute left-1/2 top-[42%] z-0 w-[min(100vw,22rem)] max-w-none -translate-x-1/2 -translate-y-1/2 md:w-[26rem]"
                width="481"
                height="124"
                aria-hidden="true"
              />
            </span>
            <span>{{ t(resolvedHeadline.line1Tail) }}</span>
          </span>
          <span class="mt-1 block">{{ t(resolvedHeadline.line2) }}</span>
        </h1>

        <p
          class="max-w-2xl mx-auto mt-5 text-base leading-relaxed text-ps-dark/70 md:mt-6 md:text-lg"
        >
          {{ t(subtext) }}
        </p>

        <div class="mt-7 md:mt-8">
          <NuxtLinkLocale :to="ctaUrl">
            <ButtonV
              variant="orange"
              class="min-w-[11rem] rounded-full px-8 py-3 text-base font-semibold"
            >
              {{ t(ctaLabel) }}
            </ButtonV>
          </NuxtLinkLocale>
        </div>
      </div>

      <div class="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:mt-16 md:hidden">
        <article
          v-for="(card, i) of cards"
          :key="i"
          class="flex flex-col items-center justify-between gap-4 rounded-[20px] p-4 text-center text-white shadow-md"
          :class="cardClass(card.variant ?? (i % 2 === 0 ? 'blue' : 'orange'))"
        >
          <NuxtImg
            :src="card.icon"
            alt=""
            class="h-11 w-11 object-contain"
            width="48"
            height="48"
            aria-hidden="true"
          />
          <p class="text-xs font-semibold leading-snug">
            {{ t(card.text) }}
          </p>
        </article>
      </div>

      <div class="relative mt-12 hidden md:mt-16 md:block">
        <div class="flex items-end justify-center">
          <template v-for="(card, i) of cards" :key="i">
            <article
              class="relative z-[1] flex h-[200px] w-[150px] shrink-0 flex-col items-center justify-between rounded-[20px] p-5 text-center text-white shadow-md"
              :class="[
                cardClass(card.variant ?? (i % 2 === 0 ? 'blue' : 'orange')),
                cardTilt[i],
              ]"
            >
              <NuxtImg
                :src="card.icon"
                alt=""
                class="h-12 w-12 object-contain"
                width="48"
                height="48"
                aria-hidden="true"
              />
              <p class="text-sm font-semibold leading-snug">
                {{ t(card.text) }}
              </p>
            </article>

            <div
              v-if="i < cards.length - 1"
              class="relative z-0 h-[200px] w-12 shrink-0 lg:w-14"
              aria-hidden="true"
            >
              <!-- Below cards 1→2 and 3→4: downward arc (Figma arrow 11:47) -->
              <NuxtImg
                v-if="i === 0 || i === 2"
                src="/images/home/hero/arrow1.svg"
                alt=""
                class="pointer-events-none absolute bottom-1 left-1/2 w-[8.25rem] max-w-none -translate-x-1/2"
                width="132"
                height="44"
                aria-hidden="true"
              />
              <!-- Above cards 2→3: upward arc (Figma arrow 11:90) -->
              <NuxtImg
                v-if="i === 1"
                src="/images/home/hero/arrow3.svg"
                alt=""
                class="pointer-events-none absolute -top-1 left-1/2 w-[8.25rem] max-w-none -translate-x-1/2"
                width="132"
                height="44"
                aria-hidden="true"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
