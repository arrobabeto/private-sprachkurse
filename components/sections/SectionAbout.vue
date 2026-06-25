<script setup lang="ts">
  import { computed } from "vue"
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  const props = defineProps<{
    image: string
    name: I18nString
    role: I18nString
    eyebrow: I18nString
    title: I18nString
    body: I18nString
    ctaLabel: I18nString
    ctaUrl: string
  }>()

  const t = useTranslate()

  const nameParts = computed(() => {
    const full = t(props.name).trim()
    const parts = full.split(/\s+/)
    if (parts.length >= 2) {
      return {
        first: parts.slice(0, -1).join(" "),
        last: parts[parts.length - 1]!,
      }
    }
    return { first: full, last: "" }
  })
</script>

<template>
  <section id="ueber-mich" class="scroll-mt-24 py-12 md:py-16">
    <div class="mx-auto w-[95%] max-w-[1200px]">
      <div
        class="grid gap-10 md:grid-cols-[minmax(280px,360px)_1fr] md:items-start md:gap-14 lg:gap-20"
      >
        <div class="flex flex-col items-center gap-5 md:items-start">
          <div
            class="relative h-64 w-64 overflow-hidden rounded-full bg-gray-100 shadow-[0_8px_32px_rgba(0,0,0,0.12)] md:h-80 md:w-80"
          >
            <NuxtImg
              :src="image"
              :alt="t(name)"
              class="h-full w-full object-cover object-top"
              width="543"
              height="543"
            />
          </div>
          <div class="text-center md:text-left">
            <p
              class="text-3xl font-bold leading-tight text-ps-dark md:text-4xl"
            >
              {{ nameParts.first }}
              <span v-if="nameParts.last" class="text-ps-orange">
                {{ nameParts.last }}
              </span>
            </p>
            <p class="mt-2 text-base italic text-ps-blue md:text-lg">
              {{ t(role) }}
            </p>
          </div>
        </div>

        <div class="flex flex-col gap-6 md:pt-4">
          <div>
            <p class="text-xl font-bold text-ps-orange md:text-2xl">
              {{ t(eyebrow) }}
            </p>
            <div class="mt-2 flex items-center gap-2.5">
              <NuxtImg
                src="/images/home/icon-trainer.svg"
                alt=""
                class="h-7 w-7 shrink-0"
                width="28"
                height="28"
                aria-hidden="true"
              />
              <h2 class="text-xl font-bold text-ps-blue md:text-2xl">
                {{ t(title) }}
              </h2>
            </div>
          </div>

          <p
            class="whitespace-pre-line text-base leading-relaxed text-ps-dark md:text-[15px] md:leading-7"
          >
            {{ t(body) }}
          </p>

          <div>
            <NuxtLinkLocale :to="ctaUrl">
              <ButtonV
                variant="blue"
                class="px-[35px] py-3 text-base font-semibold"
              >
                {{ t(ctaLabel) }}
              </ButtonV>
            </NuxtLinkLocale>
          </div>
        </div>
      </div>

      <div
        class="max-w-4xl mx-auto mt-12 border-b border-ps-blue/25 md:mt-16"
        aria-hidden="true"
      />
    </div>
  </section>
</template>
