<script setup lang="ts">
  import { computed } from "vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  const props = defineProps<{
    title: I18nString
    subtitle: I18nString
    items: {
      name: I18nString
      quote: I18nString
      initial: string
      image?: string
      tilt?: "left" | "right"
    }[]
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

  function tiltClass(tilt?: "left" | "right") {
    if (tilt === "left") return "-rotate-2 md:-rotate-[2.5deg]"
    if (tilt === "right") return "rotate-2 md:rotate-[2.5deg]"
    return ""
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

        <div class="grid gap-6 sm:grid-cols-2 sm:items-start sm:gap-5 md:gap-6">
          <article
            v-for="(item, i) of items"
            :key="i"
            class="relative flex min-h-[240px] flex-col rounded-[20px] bg-ps-cream p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-transform md:min-h-[260px] md:p-6"
            :class="tiltClass(item.tilt ?? (i === 0 ? 'left' : 'right'))"
          >
            <span
              class="pointer-events-none absolute left-4 top-3 select-none text-6xl font-bold leading-none text-ps-dark/[0.08] md:left-5 md:top-4 md:text-7xl"
              aria-hidden="true"
            >
              {{ item.initial }}
            </span>

            <div class="relative z-10 flex justify-end">
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

      <div
        class="max-w-4xl mx-auto mt-12 border-b border-ps-blue/25 md:mt-16"
        aria-hidden="true"
      />
    </div>
  </section>
</template>
