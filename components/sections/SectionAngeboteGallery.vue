<script setup lang="ts">
  import { ref } from "vue"

  defineProps<{
    images: string[]
  }>()

  const current = ref(0)

  function prev(total: number) {
    current.value = current.value === 0 ? total - 1 : current.value - 1
  }

  function next(total: number) {
    current.value = current.value >= total - 1 ? 0 : current.value + 1
  }
</script>

<template>
  <section class="relative w-full overflow-hidden">
    <div class="relative aspect-[5/3] w-full">
      <NuxtImg
        v-for="(img, i) of images"
        :key="i"
        :src="img"
        alt=""
        class="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
        :class="i === current ? 'opacity-100' : 'opacity-0'"
        width="1509"
        height="900"
      />

      <button
        type="button"
        class="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-white/95 md:left-8"
        aria-label="Previous slide"
        @click="prev(images.length)"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M15 6L9 12L15 18"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        class="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-white/95 md:right-8"
        aria-label="Next slide"
        @click="next(images.length)"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M9 6L15 12L9 18"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <div class="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        <button
          v-for="(_, i) of images"
          :key="i"
          type="button"
          class="h-2 w-2 rounded-full transition"
          :class="i === current ? 'bg-white' : 'bg-white/50'"
          :aria-label="`Go to slide ${i + 1}`"
          @click="current = i"
        />
      </div>
    </div>
  </section>
</template>
