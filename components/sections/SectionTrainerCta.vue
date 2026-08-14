<script setup lang="ts">
  import { computed } from "vue"
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  const props = defineProps<{
    title: I18nString
    titleHighlight?: I18nString
    subtitle: I18nString
    primaryCtaLabel: I18nString
    primaryCtaUrl: string
    secondaryCtaLabel: I18nString
    secondaryCtaUrl: string
    circleImage?: string
  }>()

  const t = useTranslate()

  const highlightText = computed(() =>
    props.titleHighlight
      ? t(props.titleHighlight)
      : t({
          de: "zu begleiten.",
          en: "on your journey.",
        }),
  )

  const circleSrc = computed(
    () => props.circleImage ?? "/images/sprachtrainerin/cta-circle.svg",
  )

  const titleParts = computed(() => {
    const full = t(props.title)
    const highlight = highlightText.value
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
</script>

<template>
  <section class="px-[2.5%] py-6 md:py-8">
    <div
      class="mx-auto flex min-h-[320px] max-w-[1272px] items-center justify-center rounded-[40px] bg-ps-blue px-6 py-12 md:min-h-[396px] md:rounded-[53px] md:px-12 md:py-16"
    >
      <div class="max-w-[768px] text-center text-white">
        <h2 class="text-3xl font-bold md:text-[40px] md:leading-tight">
          <template v-if="titleParts.highlight">
            {{ titleParts.before }}
            <span class="relative inline-block px-1">
              <span class="relative z-10">{{ titleParts.highlight }}</span>
              <NuxtImg
                :src="circleSrc"
                alt="Sprachtrainerin privater Sprachkurs Schweiz"
                class="pointer-events-none absolute left-1/2 top-[58%] z-0 w-[10.5rem] max-w-none -translate-x-1/2 -translate-y-1/2 md:w-[17rem]"
                width="272"
                height="87"
                aria-hidden="true"
              />
            </span>
            {{ titleParts.after }}
          </template>
          <template v-else>{{ t(title) }}</template>
        </h2>
        <p class="mt-4 text-lg">
          {{ t(subtitle) }}
        </p>
        <div
          class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <NuxtLinkLocale :to="primaryCtaUrl">
            <ButtonV variant="orange">{{ t(primaryCtaLabel) }}</ButtonV>
          </NuxtLinkLocale>
          <NuxtLinkLocale :to="secondaryCtaUrl">
            <ButtonV variant="green">{{ t(secondaryCtaLabel) }}</ButtonV>
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
  </section>
</template>
