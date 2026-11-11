<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionItalienischkursGoals" })

  type Goal = {
    title: I18nString
    body: I18nString
    icon: string
    iconWidth: number
    iconHeight: number
    tone: "blue" | "orange" | "green"
    tilt: "3.4" | "-4.62" | "-6"
    narrowTitle?: boolean
  }

  defineProps<{
    title: I18nString
    goals: Goal[]
  }>()

  const t = useTranslate()

  const toneClass = {
    blue: "bg-ps-blue",
    orange: "bg-ps-orange",
    green: "bg-ps-green",
  } as const

  const tiltClass = {
    "3.4": "md:rotate-[3.4deg]",
    "-4.62": "md:-rotate-[4.62deg]",
    "-6": "md:-rotate-6",
  } as const
</script>

<template>
  <section class="px-[2.5%] pb-8 pt-4 md:pb-12">
    <h2
      class="mx-auto max-w-[527px] text-center text-[clamp(1.75rem,4vw,44px)] font-bold leading-[1.2] text-ps-green"
    >
      {{ t(title) }}
    </h2>

    <div
      class="mx-auto mt-10 grid max-w-[760px] grid-cols-1 justify-items-center gap-8 md:mt-14 md:grid-cols-2 md:gap-x-14 md:gap-y-10"
    >
      <article
        v-for="(goal, i) of goals"
        :key="i"
        class="h-full w-full max-w-[322px]"
        :class="tiltClass[goal.tilt]"
      >
        <div
          class="flex h-full min-h-[358px] flex-col items-center justify-center gap-3 rounded-[20px] px-[30px] py-10 text-center text-white"
          :class="toneClass[goal.tone]"
        >
          <NuxtImg
            :src="goal.icon"
            alt=""
            :width="goal.iconWidth"
            :height="goal.iconHeight"
            aria-hidden="true"
          />
          <h3
            class="text-xl font-bold leading-[1.2]"
            :class="goal.narrowTitle ? 'max-w-[11rem]' : 'max-w-[16rem]'"
          >
            {{ t(goal.title) }}
          </h3>
          <p class="max-w-[16rem] text-base font-normal leading-[1.11]">
            {{ t(goal.body) }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>
