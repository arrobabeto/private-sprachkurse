<script setup lang="ts">
  import { computed } from "vue"
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  const props = defineProps<{
    tagline: I18nString
    title: I18nString
    body: I18nString
    ctaLabel: I18nString
    ctaUrl: string
    backgroundImage: string
    align?: "left" | "right"
  }>()

  const t = useTranslate()

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
      class="relative mx-auto min-h-[480px] max-w-[1272px] overflow-hidden rounded-[40px] md:min-h-[660px] md:rounded-[47px]"
    >
      <NuxtImg
        :src="backgroundImage"
        alt=""
        class="absolute inset-0 h-full w-full object-cover"
        width="2540"
        height="1340"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-black/45" />

      <div
        class="relative flex min-h-[480px] flex-col justify-center px-6 py-12 md:min-h-[660px] md:px-12 md:py-16"
        :class="
          align === 'right'
            ? 'items-end text-right md:pl-[38%] md:pr-16 lg:pr-20'
            : 'items-start text-left md:pl-16 md:pr-[38%] lg:pl-20'
        "
      >
        <div class="max-w-[760px] text-white">
          <p class="text-base font-semibold md:text-lg">
            {{ t(tagline) }}
          </p>
          <h2
            class="mt-3 text-3xl font-bold leading-tight md:text-[48px] md:leading-tight"
          >
            {{ t(title) }}
          </h2>
          <div
            class="mt-5 space-y-4 text-base leading-relaxed text-white/95 md:text-lg"
          >
            <p v-for="(para, i) of paragraphs" :key="i">
              {{ para }}
            </p>
          </div>
          <div class="mt-8 md:mt-10">
            <NuxtLinkLocale :to="ctaUrl">
              <ButtonV variant="orange">{{ t(ctaLabel) }}</ButtonV>
            </NuxtLinkLocale>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
