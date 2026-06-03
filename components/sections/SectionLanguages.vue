<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref } from "vue"
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  const props = defineProps<{
    backgroundImage: string
    overlayTitle: I18nString
    languages: {
      name: I18nString
      description: I18nString
      availability?: I18nString
      cta: I18nString
      icon: string
    }[]
  }>()

  const t = useTranslate()
  const active = ref(0)
  const viewportRef = ref<HTMLElement | null>(null)
  const viewportWidth = ref(654)
  const isDesktop = ref(false)

  const CARD_WIDTH_DESKTOP = 654
  const SLIDE_GAP = 58
  const desktopStep = CARD_WIDTH_DESKTOP + SLIDE_GAP

  const trackOffset = computed(() => {
    if (isDesktop.value) {
      const center = viewportWidth.value / 2
      return center - (active.value * desktopStep + CARD_WIDTH_DESKTOP / 2)
    }
    return -active.value * viewportWidth.value
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
    active.value = i
  }

  function slideClasses(i: number) {
    return i === active.value
      ? "opacity-100 z-10"
      : "pointer-events-none opacity-0"
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
          alt=""
          class="absolute inset-0 h-full w-full object-cover"
          width="1200"
          height="600"
        />
        <div class="absolute inset-0 bg-black/50" />

        <div
          class="relative flex flex-col items-center gap-8 px-4 py-12 md:gap-10 md:px-8 md:py-16"
        >
          <h2
            class="max-w-[664px] text-center text-2xl font-bold text-white md:text-4xl"
          >
            {{ t(overlayTitle) }}
          </h2>

          <div ref="viewportRef" class="w-full max-w-[654px] overflow-hidden">
            <div
              class="flex transition-transform duration-300 ease-out md:gap-[58px]"
              :style="{ transform: `translateX(${trackOffset}px)` }"
            >
              <article
                v-for="(lang, i) of languages"
                :key="i"
                class="flex w-full shrink-0 flex-col gap-4 rounded-[20px] border border-white/40 bg-white/15 p-5 text-white backdrop-blur-md transition-opacity duration-300 md:w-[654px] md:p-6"
                :class="slideClasses(i)"
                :style="isDesktop ? undefined : { width: `${viewportWidth}px` }"
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
                  <ButtonV variant="orange">
                    {{ t(lang.cta) }}
                  </ButtonV>
                </div>
              </article>
            </div>
          </div>

          <div class="flex justify-center gap-2">
            <button
              v-for="(_, i) of languages"
              :key="i"
              type="button"
              class="h-2.5 rounded-full bg-white transition-all"
              :class="
                i === active
                  ? 'w-8 opacity-100'
                  : 'w-2.5 opacity-50 hover:opacity-70'
              "
              :aria-label="`Slide ${i + 1}`"
              :aria-current="i === active ? 'true' : undefined"
              @click="goTo(i)"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
