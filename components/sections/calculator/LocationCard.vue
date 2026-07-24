<script setup lang="ts">
  import Icon from "~/components/sections/calculator/Icon.vue"
  import { LOCATION } from "~/composables/useConfigurator"
</script>

<template>
  <div
    class="mb-5 flex items-center gap-3 rounded-sm border border-ps-line bg-white px-4 py-3"
  >
    <div
      class="flex h-9 w-9 min-w-[36px] items-center justify-center rounded-sm bg-ps-green"
    >
      <Icon name="pin" class="h-[18px] w-[18px] text-white" />
    </div>
    <div>
      <div class="mb-px text-[13px] font-bold text-ps-green">
        {{ LOCATION.name }}
      </div>
      <div class="text-xs text-ps-muted">{{ LOCATION.addr }}</div>
    </div>
    <a
      class="ml-auto flex flex-shrink-0 items-center gap-1 whitespace-nowrap text-[11px] font-semibold text-ps-blue hover:underline"
      :href="LOCATION.maps"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon name="ext" />
      Google Maps
    </a>
  </div>
</template>
