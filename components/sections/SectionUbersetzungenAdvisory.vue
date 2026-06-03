<script setup lang="ts">
  import UbersetzungenSplitBlock from "~/components/sections/_UbersetzungenSplitBlock.vue"
  import type { I18nString } from "~/types/util/I18nString"

  defineProps<{
    image: string
    title: I18nString
    body: I18nString
    items: { icon: string; label: I18nString }[]
    primaryCta: { label: I18nString; url: string }
  }>()
</script>

<template>
  <UbersetzungenSplitBlock
    v-bind="$props"
    image-position="left"
    icon-tint="orange"
  />
</template>
