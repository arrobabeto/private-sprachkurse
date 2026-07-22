<script setup lang="ts">
  import { ref } from "vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionKontaktLocations" })

  type LocationTab = {
    title: I18nString
    description: I18nString
    image: string
  }

  defineProps<{
    title: I18nString
    arrowImage: string
    tabs: LocationTab[]
  }>()

  const t = useTranslate()
  const activeIndex = ref(0)

  function selectTab(index: number) {
    activeIndex.value = index
  }
</script>

<template>
  <section class="relative px-[2.5%] py-12 md:py-20">
    <div class="relative mx-auto max-w-[1276px]">
      <h2
        class="max-w-[768px] text-3xl font-bold leading-[1.2] text-ps-green md:text-[48px]"
      >
        {{ t(title) }}
      </h2>

      <NuxtImg
        :src="arrowImage"
        alt=""
        class="pointer-events-none absolute left-[18%] top-[72px] z-10 hidden w-[200px] md:block lg:left-[22%] lg:w-[281px]"
        width="281"
        height="197"
        loading="lazy"
        aria-hidden="true"
      />

      <div
        class="relative mt-10 flex flex-col gap-10 lg:mt-20 lg:flex-row lg:gap-20"
      >
        <div
          class="flex shrink-0 flex-col gap-10 lg:max-w-[460px] lg:gap-10"
          role="tablist"
          aria-label="Örtlichkeiten"
        >
          <button
            v-for="(tab, index) of tabs"
            :key="`kontakt-loc-tab-${index}`"
            type="button"
            role="tab"
            :id="`kontakt-locations-tab-${index}`"
            :aria-controls="`kontakt-locations-panel-${index}`"
            :aria-selected="activeIndex === index"
            class="cursor-pointer border-l-4 py-1 pl-8 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-ps-green focus-visible:ring-offset-2"
            :class="
              activeIndex === index
                ? 'border-ps-orange bg-white'
                : 'border-transparent bg-transparent'
            "
            @click="selectTab(index)"
          >
            <span class="block text-2xl font-bold leading-[1.4] text-ps-green">
              {{ t(tab.title) }}
            </span>
            <span
              class="mt-4 block max-w-[428px] whitespace-pre-line text-base font-normal leading-[1.5] text-ps-green"
            >
              {{ t(tab.description) }}
            </span>
          </button>
        </div>

        <div
          class="relative min-h-[280px] w-full flex-1 overflow-hidden rounded-[80px] md:min-h-[400px] md:max-w-[732px] md:rounded-[143px]"
        >
          <div
            v-for="(tab, index) of tabs"
            :id="`kontakt-locations-panel-${index}`"
            :key="`kontakt-loc-panel-${index}`"
            role="tabpanel"
            :aria-labelledby="`kontakt-locations-tab-${index}`"
            class="absolute inset-0 transition-opacity duration-300"
            :class="
              activeIndex === index
                ? 'opacity-100'
                : 'pointer-events-none opacity-0'
            "
          >
            <NuxtImg
              :src="tab.image"
              :alt="t(tab.title)"
              class="h-full min-h-[280px] w-full rounded-[27px] object-cover md:min-h-[400px]"
              width="732"
              height="500"
              sizes="(max-width: 1024px) 100vw, 732px"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
