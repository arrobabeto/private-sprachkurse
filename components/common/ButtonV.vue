<script setup lang="ts">
  defineOptions({ inheritAttrs: false })

  defineProps<{
    disabled?: boolean
    submit?: boolean
    variant?: "primary" | "orange" | "green" | "blue"
  }>()
</script>

<template>
  <button
    v-bind="$attrs"
    :type="submit ? 'submit' : 'button'"
    :disabled="disabled"
    class="inline-flex h-auto min-h-10 w-auto items-center justify-center rounded-full px-6 py-2.5 text-center text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
    :class="{
      'bg-ps-green text-white hover:bg-ps-green/90':
        !variant || variant === 'primary' || variant === 'green',
      'bg-ps-orange text-white hover:bg-ps-orange/90': variant === 'orange',
      'bg-ps-blue text-white hover:bg-ps-blue/90': variant === 'blue',
    }"
  >
    <slot />
  </button>
</template>
