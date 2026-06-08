<script setup lang="ts">
  import BookingAction from "~/components/common/BookingAction.vue"
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  type Feature = {
    text: I18nString
    icon: string
  }

  type Offer = {
    tagline?: I18nString
    title: I18nString
    body: I18nString
    features: Feature[]
    image: string
    ctaLabel: I18nString
    ctaUrl: string
    ctaVariant?: "orange" | "blue"
    layout: "image-left" | "image-right"
    showBookingAction?: boolean
    imageTilt?: "left" | "right"
    decorativeArrow?: "offer-arrow-1" | "offer-arrow-2" | "offer-arrow-3"
  }

  defineProps<{
    offers: Offer[]
  }>()

  const t = useTranslate()

  /** Figma Frame 483 (2420:627) — fixed positions for connector arrows. */
  const offerArrowLayout: Record<
    NonNullable<Offer["decorativeArrow"]>,
    string
  > = {
    "offer-arrow-1":
      "top-[18%] right-0 lg:-right-6 xl:-right-10 h-[220px] w-[114px] lg:h-[248px] lg:w-[131px]",
    "offer-arrow-3":
      "top-[41%] -left-1 h-[130px] w-[58px] md:-left-6 md:h-[148px] md:w-[66px] lg:-left-12",
    "offer-arrow-2":
      "top-[67%] right-0 lg:-right-6 xl:-right-10 h-[220px] w-[114px] lg:h-[248px] lg:w-[131px]",
  }

  function tiltClass(tilt?: "left" | "right") {
    if (tilt === "right") return "rotate-[4deg]"
    return "-rotate-[4deg]"
  }
</script>

<template>
  <section class="relative overflow-x-visible bg-ps-green py-12 md:py-20">
    <div class="relative mx-auto w-[95%] max-w-[1200px]">
      <div
        class="pointer-events-none absolute inset-0 z-10 hidden md:block"
        aria-hidden="true"
      >
        <template v-for="(offer, i) of offers" :key="`arrow-${i}`">
          <NuxtImg
            v-if="offer.decorativeArrow && i < offers.length - 1"
            :src="`/images/angebote/${offer.decorativeArrow}.svg`"
            alt=""
            class="absolute max-w-none"
            :class="offerArrowLayout[offer.decorativeArrow]"
            :width="offer.decorativeArrow === 'offer-arrow-3' ? 112 : 175"
            :height="offer.decorativeArrow === 'offer-arrow-3' ? 248 : 264"
          />
        </template>
      </div>

      <article
        v-for="(offer, i) of offers"
        :key="i"
        class="relative pb-16 last:pb-0 md:pb-28 md:last:pb-0"
      >
        <div
          class="grid items-center gap-8 md:gap-12"
          :class="
            offer.layout === 'image-left'
              ? 'md:grid-cols-[minmax(280px,620px)_1fr]'
              : 'md:grid-cols-[1fr_minmax(280px,620px)]'
          "
        >
          <!-- Image column -->
          <div
            class="relative w-full"
            :class="offer.layout === 'image-right' ? 'md:order-2' : ''"
          >
            <!-- Left-side: white card + CTA inside (Figma Frame 449 / 451) -->
            <div
              v-if="offer.layout === 'image-left'"
              class="mx-auto flex w-full max-w-[620px] flex-col overflow-hidden rounded-[37px] bg-white p-3 md:mx-0 md:min-h-[527px] md:p-4"
            >
              <NuxtImg
                :src="offer.image"
                alt=""
                class="aspect-[567/393] w-full rounded-[30px] object-cover"
                width="567"
                height="393"
              />
              <div
                v-if="offer.showBookingAction !== false"
                class="mt-4 flex justify-end pt-2 md:mt-auto"
              >
                <BookingAction
                  :label="t(offer.ctaLabel)"
                  :url="offer.ctaUrl"
                  :variant="offer.ctaVariant ?? 'orange'"
                />
              </div>
            </div>

            <!-- Right-side: photo only on green, no white container -->
            <div
              v-else
              class="relative mx-auto w-full max-w-[567px] md:mx-0 md:ml-auto"
            >
              <div
                class="overflow-hidden rounded-[30px]"
                :class="tiltClass(offer.imageTilt)"
              >
                <NuxtImg
                  :src="offer.image"
                  alt=""
                  class="aspect-[567/393] w-full object-cover"
                  width="567"
                  height="393"
                />
              </div>
            </div>
          </div>

          <!-- Text column -->
          <div
            class="flex flex-col gap-5 text-white md:gap-6"
            :class="offer.layout === 'image-right' ? 'md:order-1' : ''"
          >
            <div>
              <p
                v-if="offer.tagline"
                class="mb-2 text-base text-white/90 md:text-lg"
              >
                {{ t(offer.tagline) }}
              </p>
              <h2
                class="text-3xl font-bold leading-tight md:text-[48px] md:leading-[1.1]"
              >
                {{ t(offer.title) }}
              </h2>
              <p
                class="mt-4 text-base leading-relaxed text-white/90 md:text-lg"
              >
                {{ t(offer.body) }}
              </p>
            </div>

            <ul class="space-y-3 md:space-y-4">
              <li
                v-for="(feat, fi) of offer.features"
                :key="fi"
                class="flex items-start gap-3"
              >
                <NuxtImg
                  :src="feat.icon"
                  alt=""
                  class="mt-0.5 h-6 w-6 shrink-0 brightness-0 invert"
                  width="24"
                  height="24"
                />
                <span class="text-base leading-relaxed md:text-lg">
                  {{ t(feat.text) }}
                </span>
              </li>
            </ul>

            <div v-if="offer.showBookingAction === false" class="pt-2">
              <NuxtLinkLocale :to="offer.ctaUrl">
                <ButtonV :variant="offer.ctaVariant ?? 'blue'">
                  {{ t(offer.ctaLabel) }}
                </ButtonV>
              </NuxtLinkLocale>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
