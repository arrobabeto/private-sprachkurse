<script setup lang="ts">
  import { computed } from "vue"
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  const props = withDefaults(
    defineProps<{
      title: I18nString
      titleHighlight?: I18nString
      locations: {
        title: I18nString
        description: I18nString
        icon: string
        id?: string
      }[]
      kurslokal?: {
        title: I18nString
        body: I18nString
        image: string
        ctaLabel: I18nString
        ctaUrl: string
      }
      theme?: "light" | "blue"
      showKurslokal?: boolean
    }>(),
    {
      theme: "light",
      showKurslokal: true,
    },
  )

  const t = useTranslate()

  const isBlue = computed(() => props.theme === "blue")

  const kurslokalParagraphs = computed(() => {
    if (!props.kurslokal) return []
    return t(props.kurslokal.body)
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean)
  })

  function splitTitle(full: string, highlight?: string) {
    if (!highlight || !full.includes(highlight)) {
      return { before: full, highlight: "", after: "" }
    }
    const [before, after = ""] = full.split(highlight)
    return { before, highlight, after }
  }

  function isIconPath(icon: string) {
    return icon.startsWith("/")
  }
</script>

<template>
  <section class="py-12 md:py-16" :class="isBlue ? 'bg-ps-blue' : ''">
    <div class="mx-auto w-[95%] max-w-[1200px]">
      <h2
        class="mb-10 text-center text-3xl font-bold leading-tight md:mb-12 md:text-4xl"
        :class="isBlue ? 'text-white' : 'text-ps-dark'"
      >
        <template v-if="titleHighlight">
          {{ splitTitle(t(title), t(titleHighlight)).before }}
          <span class="relative inline-block px-1">
            <span
              class="relative z-10"
              :class="isBlue ? 'text-ps-orange' : 'text-ps-orange'"
            >
              {{ splitTitle(t(title), t(titleHighlight)).highlight }}
            </span>
            <NuxtImg
              src="/images/home/loop-orange.svg"
              alt="Privater Sprachunterricht Schweiz flexibel"
              class="pointer-events-none absolute left-1/2 top-[58%] z-0 w-[13.5rem] max-w-none -translate-x-1/2 -translate-y-1/2 md:w-[17.5rem]"
              width="350"
              height="148"
              aria-hidden="true"
            />
          </span>
          {{ splitTitle(t(title), t(titleHighlight)).after }}
        </template>
        <template v-else>{{ t(title) }}</template>
      </h2>

      <div class="relative">
        <div class="grid gap-10 md:grid-cols-3 md:gap-0">
          <article
            v-for="(loc, i) of locations"
            :key="i"
            :id="loc.id"
            class="flex scroll-mt-24 flex-col items-center px-4 text-center"
          >
            <NuxtImg
              v-if="isIconPath(loc.icon)"
              :src="loc.icon"
              :alt="`Online Sprachkurs individuell Schweiz — ${t(loc.title)}`"
              class="h-12 w-12"
              :class="isBlue ? 'brightness-0 invert' : ''"
              width="48"
              height="48"
              aria-hidden="true"
            />
            <span v-else class="text-4xl">{{ loc.icon }}</span>
            <h3
              class="mt-4 text-2xl font-bold md:text-[32px]"
              :class="isBlue ? 'text-white' : 'text-ps-dark'"
            >
              {{ t(loc.title) }}
            </h3>
            <p
              class="mt-2 max-w-[16rem] text-base leading-relaxed md:text-lg"
              :class="isBlue ? 'text-white/90' : 'text-ps-dark/80'"
            >
              {{ t(loc.description) }}
            </p>
          </article>
        </div>

        <NuxtImg
          :src="
            isBlue
              ? '/images/home/location-arrow-1.svg'
              : '/images/home/location-arrow-1.svg'
          "
          alt="Privater Sprachunterricht Schweiz flexibel"
          class="pointer-events-none absolute left-[26%] top-0 hidden w-[126px] md:block"
          :class="isBlue ? 'opacity-90 brightness-0 invert' : ''"
          width="132"
          height="44"
          aria-hidden="true"
        />
        <NuxtImg
          :src="
            isBlue
              ? '/images/home/location-arrow-2.svg'
              : '/images/home/location-arrow-2.svg'
          "
          alt="Privater Sprachunterricht Schweiz flexibel"
          class="pointer-events-none absolute left-[62%] top-[52%] hidden w-[126px] -translate-y-1/2 md:block"
          :class="isBlue ? 'opacity-90 brightness-0 invert' : ''"
          width="132"
          height="44"
          aria-hidden="true"
        />
      </div>

      <div
        v-if="showKurslokal && kurslokal"
        class="mt-12 grid items-center overflow-hidden rounded-[40px] bg-ps-green md:mt-14 md:grid-cols-[minmax(240px,360px)_1fr]"
      >
        <div
          class="flex items-center justify-center p-8 pl-[57px] md:p-10 md:pl-[65px]"
        >
          <div
            class="size-[240px] shrink-0 overflow-hidden rounded-full sm:size-[280px] md:size-[320px]"
          >
            <NuxtImg
              :src="kurslokal.image"
              :alt="'Privater Sprachunterricht Schweiz flexibel'"
              class="size-full object-cover"
              width="320"
              height="320"
              sizes="(max-width: 768px) 280px, 320px"
            />
          </div>
        </div>
        <div
          class="flex flex-col justify-center gap-5 p-8 text-left text-white md:gap-6 md:p-10 md:pr-12"
        >
          <h3 class="text-2xl font-bold md:text-[32px]">
            {{ t(kurslokal.title) }}
          </h3>
          <div
            class="space-y-4 text-base leading-relaxed text-white/90 md:text-lg md:leading-7"
          >
            <p v-for="(para, i) of kurslokalParagraphs" :key="i">
              {{ para }}
            </p>
          </div>
          <div class="mt-2 md:self-end">
            <NuxtLinkLocale :to="kurslokal.ctaUrl">
              <ButtonV variant="blue">{{ t(kurslokal.ctaLabel) }}</ButtonV>
            </NuxtLinkLocale>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
