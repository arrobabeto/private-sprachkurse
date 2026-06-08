<script setup lang="ts">
  import { ref } from "vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  type Qualification = {
    number: string
    tabLabel: I18nString
    title: I18nString
    body: I18nString
    image: string
    theme: "orange" | "cream" | "green"
  }

  const props = defineProps<{
    title: I18nString
    qualifications: Qualification[]
  }>()

  const t = useTranslate()
  const activeIndex = ref(0)
  const mobileOpen = ref<number | null>(0)

  function isActive(index: number) {
    return index === activeIndex.value
  }

  function activate(index: number) {
    activeIndex.value = index
  }

  function panelOrder(index: number) {
    if (index === activeIndex.value) return 0
    return index < activeIndex.value ? index + 1 : index
  }

  function collapsedBasis(number: string) {
    return number === "03" ? "98px" : "87px"
  }

  function panelStyle(index: number, qual: Qualification) {
    const active = isActive(index)
    return {
      order: panelOrder(index),
      flexBasis: active ? "0%" : collapsedBasis(qual.number),
      flexGrow: active ? 1 : 0,
      flexShrink: active ? 1 : 0,
    }
  }

  function themeClasses(theme: Qualification["theme"]) {
    if (theme === "orange") {
      return {
        bg: "bg-ps-orange",
        text: "text-ps-green",
        label: "text-ps-green",
      }
    }
    if (theme === "cream") {
      return {
        bg: "bg-ps-cream-alt",
        text: "text-ps-green",
        label: "text-ps-green",
      }
    }
    return { bg: "bg-ps-green", text: "text-white", label: "text-white" }
  }

  function onKeydown(event: KeyboardEvent, index: number) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      activate(index)
    }
  }
</script>

<template>
  <section id="qualifikationen" class="scroll-mt-24 px-[2.5%] py-6 md:py-8">
    <div class="mx-auto max-w-[1276px]">
      <h2
        class="mb-6 text-3xl font-bold text-ps-green md:mb-8 md:text-[48px] md:leading-tight"
      >
        {{ t(title) }}
      </h2>

      <!-- Desktop expanding carousel -->
      <div
        class="hidden h-[720px] overflow-hidden rounded-[32px] md:flex md:rounded-[35px]"
        role="tablist"
        aria-label="Qualifications"
      >
        <div
          v-for="(qual, index) of qualifications"
          :key="`${qual.number}-${isActive(index) ? 'open' : 'closed'}`"
          class="h-full min-w-0 overflow-hidden transition-[flex-grow,flex-basis] duration-300 ease-in-out"
          :class="[
            themeClasses(qual.theme).bg,
            isActive(index) ? 'min-w-0' : 'relative z-10 shrink-0',
          ]"
          :style="panelStyle(index, qual)"
        >
          <!-- Collapsed tab -->
          <button
            v-if="!isActive(index)"
            type="button"
            role="tab"
            :aria-selected="false"
            class="flex h-full w-full flex-col items-center justify-between px-1 py-8"
            :aria-label="t(qual.tabLabel)"
            @click="activate(index)"
            @keydown="onKeydown($event, index)"
          >
            <span
              class="text-2xl font-bold"
              :class="themeClasses(qual.theme).label"
            >
              {{ qual.number }}
            </span>
            <span
              class="rotate-180 whitespace-nowrap text-xs font-semibold [writing-mode:vertical-rl] md:text-sm"
              :class="themeClasses(qual.theme).label"
            >
              {{ t(qual.tabLabel) }}
            </span>
          </button>

          <!-- Expanded card -->
          <div
            v-else
            role="tabpanel"
            :aria-selected="true"
            class="flex h-full min-w-0 overflow-hidden"
            :class="themeClasses(qual.theme).bg"
          >
            <div
              class="flex w-[87px] shrink-0 flex-col items-center justify-between py-10 md:w-[93px]"
              :class="themeClasses(qual.theme).bg"
            >
              <span
                class="text-3xl font-bold md:text-4xl"
                :class="themeClasses(qual.theme).text"
              >
                {{ qual.number }}
              </span>
              <span
                class="rotate-180 whitespace-nowrap text-xs font-semibold [writing-mode:vertical-rl] md:text-sm"
                :class="themeClasses(qual.theme).label"
              >
                {{ t(qual.tabLabel) }}
              </span>
            </div>

            <div
              class="flex min-w-0 flex-1 flex-col gap-6 overflow-y-auto p-5 md:p-8 lg:p-10"
              :class="themeClasses(qual.theme).bg"
            >
              <div class="min-w-0">
                <h3
                  class="text-xl font-bold leading-tight md:text-[40px]"
                  :class="themeClasses(qual.theme).text"
                >
                  {{ t(qual.title) }}
                </h3>
                <p
                  class="mt-3 text-sm leading-relaxed md:mt-4 md:text-lg"
                  :class="themeClasses(qual.theme).text"
                >
                  {{ t(qual.body) }}
                </p>
              </div>
              <NuxtImg
                :src="qual.image"
                alt=""
                class="h-auto w-full min-w-0 max-w-[544px] self-start rounded-[30px] object-cover"
                width="544"
                height="400"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile accordion -->
      <div class="space-y-3 md:hidden">
        <article
          v-for="(qual, i) of qualifications"
          :key="qual.number"
          class="overflow-hidden rounded-2xl"
          :class="themeClasses(qual.theme).bg"
        >
          <button
            type="button"
            class="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
            :aria-expanded="mobileOpen === i"
            @click="mobileOpen = mobileOpen === i ? null : i"
          >
            <div class="flex items-center gap-3">
              <span
                class="text-xl font-bold"
                :class="themeClasses(qual.theme).text"
              >
                {{ qual.number }}
              </span>
              <span
                class="font-semibold"
                :class="themeClasses(qual.theme).text"
              >
                {{ t(qual.tabLabel) }}
              </span>
            </div>
            <span class="text-xl" :class="themeClasses(qual.theme).text">
              {{ mobileOpen === i ? "−" : "+" }}
            </span>
          </button>
          <div v-show="mobileOpen === i" class="space-y-4 px-5 pb-5">
            <h3
              class="text-xl font-bold"
              :class="themeClasses(qual.theme).text"
            >
              {{ t(qual.title) }}
            </h3>
            <p
              class="text-base leading-relaxed"
              :class="themeClasses(qual.theme).text"
            >
              {{ t(qual.body) }}
            </p>
            <NuxtImg
              :src="qual.image"
              alt=""
              class="w-full rounded-2xl object-cover"
              width="544"
              height="400"
            />
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
