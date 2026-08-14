<script setup lang="ts">
  import ButtonV from "~/components/common/ButtonV.vue"

  defineProps<{
    label: string
    url: string
    variant?: "orange" | "blue"
  }>()
</script>

<template>
  <NuxtLinkLocale
    :to="url"
    class="inline-flex items-stretch overflow-hidden rounded-full"
  >
    <ButtonV :variant="variant ?? 'orange'" class="rounded-r-none px-6">
      {{ label }}
    </ButtonV>
    <span
      class="flex w-11 shrink-0 items-center justify-center bg-ps-blue"
      aria-hidden="true"
    >
      <NuxtImg
        src="/images/angebote/icon-arrow-up-right.svg"
        alt="Privater Sprachunterricht Schweiz flexibel"
        class="h-5 w-5 brightness-0 invert"
        width="20"
        height="20"
        aria-hidden="true"
      />
    </span>
  </NuxtLinkLocale>
</template>
