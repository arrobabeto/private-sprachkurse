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
    arrowImage2?: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section id="methoden" class="scroll-mt-24 px-[2.5%] py-6 md:py-8">
    <div
      class="relative mx-auto max-w-[1272px] overflow-hidden rounded-[40px] bg-ps-cream-alt px-6 py-10 md:rounded-[53px] md:px-12 md:py-14"
    >
      <div
        class="md:grid md:grid-cols-[minmax(260px,464px)_1fr] md:gap-x-10 lg:gap-x-16"
      >
        <div class="relative md:pt-2">
          <h2
            class="text-[32px] font-bold leading-tight text-ps-green md:text-[40px]"
          >
            {{ t(title) }}
            <span class="block">{{ t(subtitle) }}</span>
          </h2>
          <NuxtImg
            v-if="arrowImage2"
            :src="arrowImage2"
            alt=""
            class="pointer-events-none absolute -bottom-4 left-0 hidden w-28 opacity-90 md:block lg:w-36"
            width="182"
            height="271"
          />
        </div>

        <div class="relative mt-8 md:mt-0">
          <p class="text-base leading-relaxed text-ps-green md:text-lg">
            {{ t(intro) }}
          </p>

          <div class="relative mt-8 space-y-6 md:mt-10 md:space-y-8">
            <article
              v-for="(method, i) of methods"
              :key="i"
              class="flex gap-4 md:gap-5"
            >
              <span
                class="shrink-0 text-4xl font-bold text-ps-orange md:text-5xl"
              >
                {{ method.number }}
              </span>
              <div class="min-w-0">
                <h3 class="text-lg font-bold text-ps-green md:text-xl">
                  {{ t(method.title) }}
                </h3>
                <p
                  class="mt-1 whitespace-pre-line text-base leading-relaxed text-ps-green/90 md:text-lg"
                >
                  {{ t(method.body) }}
                </p>
              </div>
            </article>
          </div>

          <NuxtImg
            v-if="arrowImage"
            :src="arrowImage"
            alt=""
            class="pointer-events-none absolute -left-16 top-0 hidden w-40 opacity-90 xl:block"
            width="281"
            height="197"
          />
        </div>
      </div>
    </div>
  </section>
</template>
