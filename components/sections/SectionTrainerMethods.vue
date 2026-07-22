<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  type Method = {
    number: string
    title: I18nString
    body: I18nString
  }

  defineProps<{
    title: I18nString
    subtitle: I18nString
    intro: I18nString
    methods: Method[]
    arrowImage?: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section id="methoden" class="scroll-mt-24 px-[2.5%] py-6 md:py-8">
    <div
      class="relative mx-auto max-w-[1272px] rounded-[40px] bg-ps-cream-alt px-6 py-10 md:rounded-[53px] md:px-12 md:py-14"
    >
      <h2
        class="text-[32px] font-bold leading-tight text-ps-green md:text-[40px]"
      >
        {{ t(title) }}
        <span class="block">{{ t(subtitle) }}</span>
      </h2>

      <!-- Mobile: single column -->
      <div class="mt-8 md:hidden">
        <p class="text-base leading-relaxed text-ps-green">
          {{ t(intro) }}
        </p>
        <div class="mt-8 space-y-6">
          <article v-for="(method, i) of methods" :key="i" class="flex gap-4">
            <span class="shrink-0 text-5xl font-bold text-ps-orange">
              {{ method.number }}
            </span>
            <div class="min-w-0">
              <h3 class="text-lg font-bold text-ps-green">
                {{ t(method.title) }}
              </h3>
              <p
                class="mt-1 whitespace-pre-line text-base leading-relaxed text-ps-green/90"
              >
                {{ t(method.body) }}
              </p>
            </div>
          </article>
        </div>
      </div>

      <!-- Desktop: one main column, inner two-column rows (markers | copy) -->
      <div
        class="mt-20 hidden md:grid md:grid-cols-[minmax(5rem,11.375rem)_minmax(0,1fr)] md:gap-x-8 md:gap-y-8 lg:gap-x-10 lg:gap-y-10"
      >
        <div
          class="relative col-start-1 row-span-2 row-start-1 min-h-[17rem] self-start"
        >
          <NuxtImg
            v-if="arrowImage"
            :src="arrowImage"
            alt=""
            class="pointer-events-none absolute left-0 top-0 w-[11.375rem] max-w-none"
            width="182"
            height="271"
            aria-hidden="true"
          />
        </div>

        <p
          class="col-start-2 row-start-1 text-lg leading-relaxed text-ps-green"
        >
          {{ t(intro) }}
        </p>

        <template v-for="(method, i) of methods" :key="`method-${i}`">
          <span
            class="col-start-1 self-start justify-self-center text-[64px] font-bold leading-none text-ps-orange"
            :style="{ gridRow: `${i + 2}` }"
          >
            {{ method.number }}
          </span>
          <article
            class="col-start-2 min-w-0 self-start"
            :style="{ gridRow: `${i + 2}` }"
          >
            <h3 class="text-xl font-bold text-ps-green">
              {{ t(method.title) }}
            </h3>
            <p
              class="mt-1 whitespace-pre-line text-lg leading-relaxed text-ps-green/90"
            >
              {{ t(method.body) }}
            </p>
          </article>
        </template>
      </div>
    </div>
  </section>
</template>
