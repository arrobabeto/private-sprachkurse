<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref, watch } from "vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  type Item = {
    name: I18nString
    quote: I18nString
    initial: string
    image?: string
    tilt?: "left" | "right"
  }

  const props = defineProps<{
    title: I18nString
    subtitle: I18nString
    items: Item[]
  }>()

  const t = useTranslate()

  const subtitleParts = computed(() => {
    const text = t(props.subtitle).replace(/\s+/g, " ").trim()
    const colonIndex = text.indexOf(":")
    if (colonIndex === -1) {
      return { head: text, tail: "" }
    }
    return {
      head: text.slice(0, colonIndex + 1),
      tail: text.slice(colonIndex + 1).trimStart(),
    }
  })

  function tiltClass(item: Item, index: number) {
    const tilt = item.tilt ?? (index % 2 === 0 ? "left" : "right")
    if (tilt === "left") return "-rotate-2 md:-rotate-[2.5deg]"
    return "rotate-2 md:rotate-[2.5deg]"
  }

  const isWide = ref(false)
  const page = ref(0)
  const touchStartX = ref<number | null>(null)

  const SWIPE_THRESHOLD_PX = 48

  const perView = computed(() => (isWide.value ? 2 : 1))

  const pages = computed<Item[][]>(() => {
    const size = perView.value
    const chunks: Item[][] = []
    for (let i = 0; i < props.items.length; i += size) {
      chunks.push(props.items.slice(i, i + size))
    }
    return chunks
  })

  const pageCount = computed(() => pages.value.length)

  let mediaQuery: MediaQueryList | null = null

  function syncWidth() {
    if (mediaQuery) isWide.value = mediaQuery.matches
  }

  onMounted(() => {
    mediaQuery = window.matchMedia("(min-width: 640px)")
    syncWidth()
    mediaQuery.addEventListener("change", syncWidth)
  })

  onUnmounted(() => {
    mediaQuery?.removeEventListener("change", syncWidth)
  })

  watch(pageCount, (count) => {
    if (page.value > count - 1) page.value = Math.max(0, count - 1)
  })

  function goTo(i: number) {
    const total = pageCount.value
    if (total === 0) return
    page.value = ((i % total) + total) % total
  }

  function goPrev() {
    goTo(page.value - 1)
  }

  function goNext() {
    goTo(page.value + 1)
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      goPrev()
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      goNext()
    }
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
</script>

<template>
  <section id="erfahrungen" class="scroll-mt-24 py-12 md:py-16">
    <div class="mx-auto w-[95%] max-w-[1200px]">
      <div
        class="grid gap-10 md:grid-cols-[minmax(260px,340px)_1fr] md:items-start md:gap-10 lg:gap-14"
      >
        <div class="md:pt-2">
          <h2
            id="erfahrungen-heading"
            class="text-3xl font-bold leading-tight text-ps-dark md:text-[2.5rem] md:leading-[1.15]"
          >
            {{ t(title) }}
          </h2>
          <p
            class="mt-5 text-sm leading-relaxed text-ps-dark/75 md:text-base md:leading-7"
          >
            {{ subtitleParts.head }}
            <template v-if="subtitleParts.tail">
              <br />
              {{ subtitleParts.tail }}
            </template>
          </p>
        </div>

        <div
          class="relative"
          role="region"
          aria-roledescription="carousel"
          aria-labelledby="erfahrungen-heading"
          tabindex="0"
          @keydown="onKeydown"
        >
          <button
            v-if="pageCount > 1"
            type="button"
            class="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ps-blue text-white shadow-md transition hover:bg-ps-blue/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ps-blue md:h-11 md:w-11"
            aria-label="Previous testimonials"
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
            v-if="pageCount > 1"
            type="button"
            class="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-ps-blue text-white shadow-md transition hover:bg-ps-blue/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ps-blue md:h-11 md:w-11"
            aria-label="Next testimonials"
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
            class="overflow-hidden px-1 py-4 sm:px-6"
            aria-live="polite"
            @touchstart.passive="onTouchStart"
            @touchend.passive="onTouchEnd"
          >
            <div
              class="flex transition-transform duration-300 ease-out will-change-transform"
              :style="{ transform: `translateX(-${page * 100}%)` }"
            >
              <div
                v-for="(group, gi) of pages"
                :key="gi"
                class="w-full shrink-0"
                role="group"
                aria-roledescription="slide"
                :aria-label="`${gi + 1} of ${pageCount}`"
                :aria-hidden="gi !== page"
              >
                <div
                  class="grid gap-6 sm:grid-cols-2 sm:items-start sm:gap-5 md:gap-6"
                >
                  <article
                    v-for="item of group"
                    :key="t(item.name)"
                    class="relative flex min-h-[240px] flex-col rounded-[20px] bg-ps-cream p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-transform md:min-h-[260px] md:p-6"
                    :class="tiltClass(item, props.items.indexOf(item))"
                  >
                    <span
                      class="pointer-events-none absolute left-4 top-3 select-none text-6xl font-bold leading-none text-ps-dark/[0.08] md:left-5 md:top-4 md:text-7xl"
                      aria-hidden="true"
                    >
                      {{ item.initial }}
                    </span>

                    <div
                      class="relative z-10 flex justify-end"
                      :class="
                        item.image
                          ? 'min-h-14 md:min-h-16'
                          : 'min-h-[4.5rem] md:min-h-24'
                      "
                    >
                      <div
                        v-if="item.image"
                        class="h-14 w-14 shrink-0 overflow-hidden rounded-2xl shadow-sm md:h-16 md:w-16"
                      >
                        <NuxtImg
                          :src="item.image"
                          :alt="t(item.name)"
                          class="h-full w-full object-cover"
                          width="64"
                          height="64"
                        />
                      </div>
                    </div>

                    <div class="relative z-10 mt-auto pt-8 md:pt-10">
                      <h3 class="text-base font-bold text-ps-dark md:text-lg">
                        {{ t(item.name) }}
                      </h3>
                      <blockquote
                        class="mt-2 text-xs leading-relaxed text-ps-dark/85 md:text-sm md:leading-6"
                      >
                        «{{ t(item.quote) }}»
                      </blockquote>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="pageCount > 1"
            class="mt-4 flex items-center justify-center gap-2"
            role="tablist"
          >
            <button
              v-for="(_, i) of pages"
              :key="i"
              type="button"
              role="tab"
              class="h-2.5 rounded-full bg-ps-blue transition-all"
              :class="
                i === page
                  ? 'w-8 opacity-100'
                  : 'w-2.5 opacity-40 hover:opacity-60'
              "
              :aria-label="`Go to slide ${i + 1}`"
              :aria-selected="i === page"
              @click="goTo(i)"
            />
          </div>
        </div>
      </div>

      <div
        class="max-w-4xl mx-auto mt-12 border-b border-ps-blue/25 md:mt-16"
        aria-hidden="true"
      />
    </div>
  </section>
</template>
