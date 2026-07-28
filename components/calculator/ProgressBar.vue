<script setup lang="ts">
  defineProps<{
    label: string
    pct: number
  }>()
</script>

<template>
  <div class="mb-6">
    <div class="mb-2 flex justify-between text-xs text-ps-hint">
      <span>{{ label }}</span>
      <span>{{ pct }}%</span>
    </div>
    <div class="h-1 overflow-hidden rounded bg-ps-line">
      <div
        class="h-full rounded bg-gradient-to-r from-ps-blue to-ps-green transition-[width] duration-[400ms] ease-out"
        :style="{ width: pct + '%' }"
      />
    </div>
  </div>
</template>
