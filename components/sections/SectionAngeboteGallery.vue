<script setup lang="ts">
  import { ref } from "vue"

  const props = defineProps<{
    images: string[]
  }>()

  const current = ref(0)

  function prev() {
    const total = props.images.length
    if (total === 0) return
    current.value = current.value === 0 ? total - 1 : current.value - 1
  }

  function next() {
    const total = props.images.length
    if (total === 0) return
    current.value = current.value >= total - 1 ? 0 : current.value + 1
  }
</script>

<template>
  <section
    class="relative w-full overflow-hidden"
    role="region"
    aria-roledescription="carousel"
    aria-label="Unterrichtsräume"
  >
    <div class="relative aspect-[5/3] w-full">
      <NuxtImg
        v-for="(img, i) of images"
        :key="img"
        :src="img"
        :alt="`Unterrichtsraum ${i + 1}`"
        class="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
        :class="
          i === current
            ? 'z-10 opacity-100'
            : 'pointer-events-none z-0 opacity-0'
        "
        width="1509"
        height="900"
      />

      <div
        class="absolute left-8 top-1/2 z-20 size-14 -translate-y-1/2 md:left-9 md:size-12"
      >
        <button
          type="button"
          class="inline-flex size-full items-center justify-center transition hover:opacity-90"
          aria-label="Previous slide"
          @click="prev"
        >
          <NuxtImg
            src="/images/angebote/icon-gallery-back.svg"
            alt="Englischkurs privat Schweiz online"
            class="size-full"
            width="48"
            height="48"
            aria-hidden="true"
          />
        </button>
      </div>
      <div
        class="absolute right-8 top-1/2 z-20 size-14 -translate-y-1/2 md:right-3 md:size-12"
      >
        <button
          type="button"
          class="inline-flex size-full items-center justify-center transition hover:opacity-90"
          aria-label="Next slide"
          @click="next"
        >
          <NuxtImg
            src="/images/angebote/icon-gallery-forward.svg"
            alt="Englischkurs privat Schweiz online"
            class="size-full"
            width="48"
            height="48"
            aria-hidden="true"
          />
        </button>
      </div>

      <div class="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        <span
          v-for="(_, i) of images"
          :key="i"
          class="inline-block size-2 shrink-0"
        >
          <button
            type="button"
            class="size-full rounded-full transition"
            :class="i === current ? 'bg-white' : 'bg-white/50'"
            :aria-label="`Go to slide ${i + 1}`"
            :aria-current="i === current ? 'true' : undefined"
            @click="current = i"
          />
        </span>
      </div>
    </div>
  </section>
</template>
