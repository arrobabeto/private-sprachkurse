<script setup lang="ts">
  import { computed } from "vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  const props = defineProps<{
    tagline: I18nString
    title: I18nString
    titleHighlight?: I18nString
    body: I18nString
  }>()

  const t = useTranslate()

  const titleParts = computed(() => {
    const full = t(props.title)
    const highlight = props.titleHighlight ? t(props.titleHighlight) : ""
    if (!highlight || !full.includes(highlight)) {
      return { before: full, highlight: "", after: "" }
    }
    const idx = full.indexOf(highlight)
    return {
      before: full.slice(0, idx),
      highlight,
      after: full.slice(idx + highlight.length),
    }
  })

  const paragraphs = computed(() =>
    t(props.body)
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean),
  )
</script>

<template>
  <section class="px-[2.5%] py-4 md:py-6">
    <div
      class="mx-auto max-w-[1272px] rounded-[40px] bg-ps-blue px-6 py-12 md:rounded-[53px] md:px-16 md:py-16 lg:px-24"
    >
      <div class="mx-auto max-w-[900px] text-center text-white">
        <p class="text-sm font-semibold text-ps-orange md:text-base">
          {{ t(tagline) }}
        </p>
        <h2
          class="mt-3 text-3xl font-bold leading-tight md:text-[42px] md:leading-snug"
        >
          <span>{{ titleParts.before }}</span>
          <span v-if="titleParts.highlight" class="text-ps-orange">
            {{ titleParts.highlight }}
          </span>
          <span>{{ titleParts.after }}</span>
        </h2>
        <div
          class="mx-auto mt-6 max-w-[768px] space-y-4 text-base leading-relaxed text-white/95 md:text-lg"
        >
          <p v-for="(para, i) of paragraphs" :key="i">
            {{ para }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
