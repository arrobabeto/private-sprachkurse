<script setup lang="ts">
  import { ref } from "vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  type Slide = {
    title: I18nString
    body: I18nString
    image: string
  }

  defineProps<{
    slides: Slide[]
  }>()

  const t = useTranslate()
  const current = ref(0)

  function prev(total: number) {
    current.value = current.value === 0 ? total - 1 : current.value - 1
  }

  function next(total: number) {
    current.value = current.value >= total - 1 ? 0 : current.value + 1
  }
</script>

<template>
  <section id="philosophie" class="scroll-mt-24 px-[2.5%] py-6 md:py-8">
    <div
      class="relative mx-auto min-h-[520px] max-w-[1276px] overflow-hidden rounded-[32px] md:min-h-[653px] md:rounded-[43px]"
    >
      <template v-for="(slide, i) of slides" :key="i">
        <NuxtImg
          :src="slide.image"
          alt=""
          class="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
          :class="i === current ? 'opacity-100' : 'opacity-0'"
          width="1276"
          height="653"
        />
        <div
          class="absolute inset-0 bg-black/55 transition-opacity duration-500 md:bg-transparent md:bg-gradient-to-r md:from-black/65 md:via-black/40 md:to-black/20"
          :class="i === current ? 'opacity-100' : 'opacity-0'"
        />
        <div
          class="absolute inset-0 flex items-center transition-opacity duration-500"
          :class="
            i === current ? 'opacity-100' : 'pointer-events-none opacity-0'
          "
        >
          <div class="w-full px-14 py-10 md:px-24 md:py-16">
            <div class="max-w-[775px] text-white">
              <h2
                class="text-[1.65rem] font-bold leading-snug drop-shadow-sm md:text-[48px] md:leading-tight md:drop-shadow-none"
              >
                {{ t(slide.title) }}
              </h2>
              <div
                class="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-white drop-shadow-sm md:mt-6 md:space-y-4 md:text-lg md:leading-7 md:text-white/95 md:drop-shadow-none"
              >
                <p
                  v-for="(para, pi) of t(slide.body)
                    .split(/\n+/)
                    .filter(Boolean)"
                  :key="pi"
                >
                  {{ para }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </template>

      <button
        type="button"
        class="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-md md:left-6 md:h-12 md:w-12"
        aria-label="Previous slide"
        @click="prev(slides.length)"
      >
        <svg
          width="24"
          height="24"
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
        class="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-md md:right-6 md:h-12 md:w-12"
        aria-label="Next slide"
        @click="next(slides.length)"
      >
        <svg
          width="24"
          height="24"
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
        class="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2 md:bottom-6"
      >
        <button
          v-for="(_, i) of slides"
          :key="i"
          type="button"
          class="h-2 w-2 rounded-full transition"
          :class="i === current ? 'bg-white' : 'bg-white/50'"
          :aria-label="`Go to slide ${i + 1}`"
          @click="current = i"
        />
      </div>
    </div>
  </section>
</template>
