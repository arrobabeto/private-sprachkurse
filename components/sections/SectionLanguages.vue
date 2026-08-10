<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref } from "vue"
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { LangCode } from "~/data/types"
  import type { I18nString } from "~/types/util/I18nString"
  import { useCalculatorModal } from "~/composables/useCalculatorModal"
  import { useTranslate } from "~/composables/useTranslate"

  const props = defineProps<{
    backgroundImage: string
    overlayTitle: I18nString
    languages: {
      langCode?: LangCode
      name: I18nString
      description: I18nString
      availability?: I18nString
      cta: I18nString
      icon: string
    }[]
  }>()

  const t = useTranslate()
  const { open: openCalculator } = useCalculatorModal()
  const active = ref(0)
  const viewportRef = ref<HTMLElement | null>(null)
  const viewportWidth = ref(654)
  const isDesktop = ref(false)
  const touchStartX = ref<number | null>(null)

  const CARD_WIDTH_DESKTOP = 654
  const SLIDE_GAP_DESKTOP = 58
  const desktopStep = CARD_WIDTH_DESKTOP + SLIDE_GAP_DESKTOP
  const SWIPE_THRESHOLD_PX = 48

  const slideCount = computed(() => props.languages.length)

  const cardWidth = computed(() =>
    isDesktop.value ? CARD_WIDTH_DESKTOP : viewportWidth.value,
  )

  const slideStep = computed(() =>
    isDesktop.value ? desktopStep : viewportWidth.value,
  )

  const trackOffset = computed(() => {
    const center = viewportWidth.value / 2
    return center - (active.value * slideStep.value + cardWidth.value / 2)
  })

  let resizeObserver: ResizeObserver | null = null
  let mediaQuery: MediaQueryList | null = null

  function syncDesktop() {
    if (mediaQuery) isDesktop.value = mediaQuery.matches
  }

  onMounted(() => {
    mediaQuery = window.matchMedia("(min-width: 768px)")
    syncDesktop()
    mediaQuery.addEventListener("change", syncDesktop)

    if (!viewportRef.value) return
    resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) viewportWidth.value = entry.contentRect.width
    })
    resizeObserver.observe(viewportRef.value)
  })

  onUnmounted(() => {
    mediaQuery?.removeEventListener("change", syncDesktop)
    resizeObserver?.disconnect()
  })

  function goTo(i: number) {
    const total = slideCount.value
    if (total === 0) return
    active.value = ((i % total) + total) % total
  }

  function goPrev() {
    goTo(active.value - 1)
  }

  function goNext() {
    goTo(active.value + 1)
  }

  function onTouchStart(event: TouchEvent) {
    touchStartX.value = event.touches[0]?.clientX ?? null
  }

  function onTouchEnd(event: TouchEvent) {
    if (touchStartX.value === null) return
    const endX = event.changedTouches[0]?.clientX
    if (endX === undefined) return
    const delta = endX - touchStartX.value
    touchStartX.value = null
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return
    if (delta < 0) goNext()
    else goPrev()
  }

  function onCarouselKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      goPrev()
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      goNext()
    } else if (event.key === "Home") {
      event.preventDefault()
      goTo(0)
    } else if (event.key === "End") {
      event.preventDefault()
      goTo(slideCount.value - 1)
    }
  }
</script>

<template>
  <section id="sprachkurse" class="scroll-mt-24 py-8 md:py-12">
    <div class="mx-auto w-[95%] max-w-[1200px]">
      <div
        class="relative min-h-[28rem] overflow-hidden rounded-[20px] shadow-lg md:min-h-[32rem]"
      >
        <NuxtImg
          :src="backgroundImage"
          :alt="t(overlayTitle)"
          class="absolute inset-0 h-full w-full object-cover"
          width="1200"
          height="600"
        />
        <div class="absolute inset-0 bg-black/50" />

        <div
          class="relative flex flex-col items-center gap-8 px-4 py-12 md:gap-10 md:px-8 md:py-16"
        >
          <h2
            id="sprachkurse-heading"
            class="max-w-[664px] text-center text-2xl font-bold text-white md:text-4xl"
          >
            {{ t(overlayTitle) }}
          </h2>

          <div
            class="relative w-full max-w-[654px]"
            role="region"
            aria-roledescription="carousel"
            aria-labelledby="sprachkurse-heading"
            tabindex="0"
            @keydown="onCarouselKeydown"
          >
            <button
              type="button"
              class="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:h-11 md:w-11"
              aria-label="Previous language"
              @click="goPrev"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M15 6L9 12L15 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              class="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:h-11 md:w-11"
              aria-label="Next language"
              @click="goNext"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9 6L15 12L9 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

            <div
              ref="viewportRef"
              class="overflow-hidden"
              aria-live="polite"
              aria-atomic="true"
              @touchstart.passive="onTouchStart"
              @touchend.passive="onTouchEnd"
            >
              <div
                class="flex transition-transform duration-300 ease-out will-change-transform md:gap-[58px]"
                :style="{ transform: `translateX(${trackOffset}px)` }"
              >
                <article
                  v-for="(lang, i) of languages"
                  :id="`sprachkurse-slide-${i}`"
                  :key="i"
                  role="group"
                  aria-roledescription="slide"
                  :aria-label="`${i + 1} of ${languages.length}`"
                  :aria-hidden="i !== active"
                  class="flex shrink-0 flex-col gap-4 rounded-[20px] border border-white/40 bg-white/15 p-5 text-white backdrop-blur-md transition-[opacity,transform] duration-300 md:w-[654px] md:p-6"
                  :class="
                    i === active
                      ? 'z-10 opacity-100'
                      : 'pointer-events-none opacity-40 md:opacity-60'
                  "
                  :style="{ width: `${cardWidth}px` }"
                >
                  <div
                    class="flex items-center justify-center gap-4 md:justify-start"
                  >
                    <div
                      class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/20 p-1 md:h-20 md:w-20"
                    >
                      <NuxtImg
                        :src="lang.icon"
                        :alt="t(lang.name)"
                        class="h-full w-full rounded-full object-contain"
                        width="80"
                        height="80"
                      />
                    </div>
                    <h3 class="text-xl font-bold md:text-2xl">
                      {{ t(lang.name) }}
                    </h3>
                  </div>

                  <p class="text-center text-sm leading-relaxed text-white/90">
                    {{ t(lang.description) }}
                  </p>

                  <p
                    v-if="lang.availability"
                    class="text-center text-xs italic text-white/80"
                  >
                    {{ t(lang.availability) }}
                  </p>

                  <div class="mt-1 flex justify-center">
                    <ButtonV
                      variant="orange"
                      @click="openCalculator(lang.langCode)"
                    >
                      {{ t(lang.cta) }}
                    </ButtonV>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <div
            class="flex justify-center gap-2"
            role="tablist"
            aria-label="Language slides"
          >
            <button
              v-for="(_, i) of languages"
              :key="i"
              type="button"
              role="tab"
              class="h-2.5 rounded-full bg-white transition-all"
              :class="
                i === active
                  ? 'w-8 opacity-100'
                  : 'w-2.5 opacity-50 hover:opacity-70'
              "
              :aria-label="`Go to slide ${i + 1}`"
              :aria-selected="i === active"
              :aria-controls="`sprachkurse-slide-${i}`"
              @click="goTo(i)"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
