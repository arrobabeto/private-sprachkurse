<script setup lang="ts">
  defineOptions({ name: "SectionSpacer" })

  defineProps<{
    height?: number
  }>()
</script>

<template>
  <div
    class="w-full"
    :style="{ height: `${height ?? 0}px` }"
    aria-hidden="true"
  />
</template>
