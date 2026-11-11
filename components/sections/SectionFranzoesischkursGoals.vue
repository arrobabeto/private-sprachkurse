<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionFranzoesischkursGoals" })

  defineProps<{
    title: I18nString
    goals: {
      title: I18nString
      body: I18nString
      icon: string
      variant: "blue" | "orange" | "green"
      tilt: number
    }[]
  }>()

  const t = useTranslate()

  function cardClass(variant: "blue" | "orange" | "green") {
    if (variant === "blue") return "bg-ps-blue"
    if (variant === "orange") return "bg-ps-orange"
    return "bg-ps-green"
  }
</script>

<template>
  <section class="overflow-x-clip px-[2.5%] py-10 md:py-16">
    <h2
      class="mx-auto max-w-[527px] text-center text-[clamp(1.75rem,4vw,44px)] font-bold leading-[1.2] text-ps-green"
    >
      {{ t(title) }}
    </h2>

    <div
      class="mx-auto mt-12 grid max-w-[820px] grid-cols-1 justify-items-center gap-8 sm:mt-14 sm:grid-cols-2 sm:gap-x-14 sm:gap-y-12"
    >
      <article
        v-for="(goal, i) of goals"
        :key="i"
        class="goal-card flex min-h-[358px] w-full max-w-[322px] flex-col items-center justify-center gap-3 rounded-[20px] px-[30px] py-12 text-center text-white"
        :class="cardClass(goal.variant)"
        :style="{ '--tilt': `${goal.tilt}deg` }"
      >
        <NuxtImg
          :src="goal.icon"
          alt=""
          width="44"
          height="44"
          class="mb-1 h-11 w-auto"
          aria-hidden="true"
        />
        <h3 class="text-xl font-bold leading-snug">
          {{ t(goal.title) }}
        </h3>
        <p class="text-base leading-[1.15]">
          {{ t(goal.body) }}
        </p>
      </article>
    </div>
  </section>
</template>

<style scoped>
  @media (min-width: 640px) {
    .goal-card {
      transform: rotate(var(--tilt));
    }
  }
</style>
