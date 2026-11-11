<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionSpanischkursGoals" })

  defineProps<{
    title: I18nString
    goals: {
      title: I18nString
      body: I18nString
      icon: string
      tone: "blue" | "orange" | "green"
      rotate: number
    }[]
  }>()

  const t = useTranslate()

  function toneClass(tone: "blue" | "orange" | "green") {
    if (tone === "blue") return "bg-ps-blue"
    if (tone === "orange") return "bg-ps-orange"
    return "bg-ps-green"
  }
</script>

<template>
  <section class="overflow-x-hidden px-[2.5%] pb-16 pt-6 md:pb-24">
    <div
      class="mx-auto flex max-w-[820px] flex-col items-center gap-12 md:gap-14"
    >
      <h2
        class="max-w-[527px] text-center text-3xl font-bold leading-[1.2] text-ps-green md:text-[44px]"
      >
        {{ t(title) }}
      </h2>
      <div
        class="grid w-full justify-items-center gap-10 sm:grid-cols-2 sm:gap-x-14 sm:gap-y-12"
      >
        <article
          v-for="(goal, i) of goals"
          :key="i"
          class="flex min-h-[358px] w-full max-w-[322px] flex-col items-center justify-center gap-3 rounded-[20px] px-7 py-12 text-center text-white"
          :class="toneClass(goal.tone)"
          :style="{ transform: `rotate(${goal.rotate}deg)` }"
        >
          <NuxtImg
            :src="goal.icon"
            alt=""
            class="h-auto w-auto max-w-none"
            aria-hidden="true"
          />
          <h3 class="text-xl font-bold leading-[1.2]">
            {{ t(goal.title) }}
          </h3>
          <p class="text-base font-normal leading-[1.11]">
            {{ t(goal.body) }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
