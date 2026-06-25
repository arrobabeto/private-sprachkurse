<script setup lang="ts">
  import SafeHtml from "~/components/common/SafeHtml.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  defineOptions({ name: "SectionImpressumContent" })

  defineProps<{
    title: I18nString
    body: I18nString
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="px-[2.5%] pb-16 pt-2 md:pb-24 md:pt-4">
    <div class="mx-auto flex max-w-[1058px] flex-col items-start gap-8">
      <h2
        class="text-[32px] font-bold leading-[1.2] text-ps-green md:text-[40px]"
      >
        {{ t(title) }}
      </h2>
      <SafeHtml
        :html="t(body)"
        class="text-base leading-[1.5] text-ps-green [&>p:last-child]:mb-0 [&>p]:mb-4"
      />
    </div>
  </section>
</template>
