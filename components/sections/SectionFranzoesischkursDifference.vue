<script setup lang="ts">
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionFranzoesischkursDifference" })

  defineProps<{
    title: I18nString
    items: {
      title: I18nString
      body: I18nString
    }[]
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="bg-[#f7f7f7] px-[2.5%] py-16 md:py-24">
    <div class="mx-auto flex max-w-[1058px] flex-col items-center gap-4">
      <h2
        class="text-center text-[clamp(1.75rem,4vw,40px)] font-bold leading-[1.5] text-ps-green"
      >
        {{ t(title) }}
      </h2>
      <NuxtImg
        src="/images/franzoesischkurs/difference-line.svg"
        alt=""
        width="120"
        height="3"
        class="h-[3px] w-[120px]"
        aria-hidden="true"
      />
    </div>

    <div class="mx-auto mt-12 flex max-w-[1058px] flex-col gap-8 md:mt-16">
      <article
        v-for="(item, i) of items"
        :key="i"
        class="rounded-3xl bg-white p-8 text-[#041627] md:p-10"
      >
        <h3 class="text-xl font-semibold leading-[1.6] md:text-2xl">
          {{ t(item.title) }}
        </h3>
        <p class="mt-1 text-base leading-[1.6] md:text-lg">
          {{ t(item.body) }}
        </p>
      </article>
    </div>
  </section>
</template>
