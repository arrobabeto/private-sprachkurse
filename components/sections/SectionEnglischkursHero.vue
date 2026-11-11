<script setup lang="ts">
  import { computed } from "vue"
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionEnglischkursHero" })

  const props = defineProps<{
    title: I18nString
    titleHighlight: I18nString
    subtitle: I18nString
    ctaLabel: I18nString
    ctaUrl: string
    circleImage: string
  }>()

  const t = useTranslate()

  const lines = computed(() => t(props.title).split("\n"))
  const highlight = computed(() => t(props.titleHighlight))
  const line1Rest = computed(() => {
    const line = lines.value[0] ?? ""
    const mark = highlight.value
    if (mark && line.startsWith(mark)) return line.slice(mark.length)
    return line
  })
  const line2 = computed(() => lines.value[1] ?? "")
</script>

<template>
  <section class="px-[2.5%] py-11">
    <div class="mx-auto flex max-w-[858px] flex-col items-center text-center">
      <h1
        class="text-[2rem] font-semibold leading-[1.2] text-ps-dark md:text-[56px]"
      >
        <span class="relative inline-block">
          <span class="relative z-10">{{ highlight }}</span>
          <span
            class="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 rotate-[3.96deg] scale-[0.55] md:scale-100"
          >
            <NuxtImg
              :src="circleImage"
              alt=""
              width="398.274"
              height="99.6607"
              class="max-w-none"
              aria-hidden="true"
            />
          </span>
        </span>
        {{ line1Rest }}
        <br />
        {{ line2 }}
      </h1>
      <p
        class="mx-auto mt-6 max-w-[768px] text-base leading-[1.5] text-ps-dark md:text-lg"
      >
        {{ t(subtitle) }}
      </p>
      <NuxtLinkLocale :to="ctaUrl" class="mt-8 inline-flex">
        <ButtonV
          variant="blue"
          class="rounded-[30px] px-14 py-4 text-lg font-normal"
        >
          {{ t(ctaLabel) }}
        </ButtonV>
      </NuxtLinkLocale>
    </div>
  </section>
</template>
