<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionKontaktContactBar" })

  defineProps<{
    tagline: I18nString
    email: string
    phone: string
    phoneLabel: I18nString
    connector: I18nString
    dottedArcImage: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="relative bg-ps-cream-alt">
    <div
      class="relative mx-auto max-w-[1276px] px-[2.5%] py-16 text-center md:py-20 md:pl-[10%] md:pr-[6%]"
    >
      <p class="text-base font-semibold leading-[1.5] text-ps-green">
        {{ t(tagline) }}
      </p>
      <p
        class="mt-0.5 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 text-2xl font-bold leading-[1.2] text-ps-green md:text-[40px]"
      >
        <a
          :href="`mailto:${email}`"
          class="underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ps-green focus-visible:ring-offset-2"
        >
          {{ email }}
        </a>
        <span>{{ t(connector) }}</span>
        <span>
          {{ t(phoneLabel) }}
          <a
            :href="`tel:${phone.replace(/\s/g, '')}`"
            class="text-ps-orange underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ps-orange focus-visible:ring-offset-2"
          >
            {{ phone }}
          </a>
        </span>
      </p>
    </div>

    <NuxtImg
      :src="dottedArcImage"
      alt=""
      class="pointer-events-none absolute bottom-0 right-[12%] z-10 hidden h-auto w-[62px] translate-y-1/2 md:block"
      width="62"
      height="131"
      loading="lazy"
    />
  </section>
</template>
