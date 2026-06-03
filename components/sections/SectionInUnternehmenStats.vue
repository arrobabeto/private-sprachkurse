<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  type Stat = {
    value: string
    label: I18nString
    borderAccent: "blue" | "orange"
  }

  defineProps<{
    tagline: I18nString
    title: I18nString
    body: I18nString
    stats: Stat[]
    arrowImage?: string
  }>()

  const t = useTranslate()

  function borderClass(accent: Stat["borderAccent"]) {
    return accent === "orange" ? "border-ps-orange" : "border-ps-blue"
  }
</script>

<template>
  <section id="stats" class="scroll-mt-24 px-[2.5%] py-6 md:py-8">
    <div
      class="relative mx-auto w-full max-w-[1276px] rounded-[40px] bg-ps-cream-alt px-6 py-10 md:min-h-[611px] md:rounded-[53px] md:px-[65px] md:py-[69px] md:pb-[134px] md:pr-[33px]"
    >
      <NuxtImg
        v-if="arrowImage"
        :src="arrowImage"
        alt=""
        class="pointer-events-none absolute left-[426px] top-[345px] z-[1] hidden h-[266px] w-[280px] md:block"
        width="280"
        height="266"
        loading="lazy"
      />

      <div
        class="relative z-10 flex flex-col gap-10 md:flex-row md:items-start md:gap-[18px]"
      >
        <div class="w-full shrink-0 md:w-[576px]">
          <p class="text-base font-semibold text-ps-green">
            {{ t(tagline) }}
          </p>
          <h2
            class="mt-2 whitespace-pre-line text-[32px] font-bold leading-[1.2] text-ps-green md:text-[44px]"
          >
            {{ t(title) }}
          </h2>
          <p class="mt-4 max-w-[576px] text-lg leading-[1.5] text-ps-green">
            {{ t(body) }}
          </p>
        </div>

        <div class="w-full shrink-0 md:w-[584px]">
          <div
            class="grid grid-cols-2 gap-x-8 gap-y-12 md:gap-x-8 md:gap-y-[72px]"
          >
            <article
              v-for="(stat, i) of stats"
              :key="i"
              class="border-l-4 py-0 pl-8"
              :class="borderClass(stat.borderAccent)"
            >
              <p
                class="text-[48px] font-bold leading-[1.3] text-ps-green md:text-[80px]"
              >
                {{ stat.value }}
              </p>
              <p
                class="mt-2 text-base font-semibold leading-[1.4] text-ps-dark md:text-xl"
              >
                {{ t(stat.label) }}
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
