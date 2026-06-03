<script setup lang="ts">
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  type ListItem = {
    icon: string
    label: I18nString
  }

  type CtaLink = {
    label: I18nString
    url: string
  }

  const props = defineProps<{
    image: string
    tagline?: I18nString
    title: I18nString
    body: I18nString
    items: ListItem[]
    imagePosition: "left" | "right"
    iconTint: "orange" | "blue"
    primaryCta?: CtaLink
    secondaryCta?: CtaLink
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="px-[2.5%] py-10 md:py-20">
    <div class="mx-auto max-w-[1276px]">
      <div
        class="flex flex-col gap-10 md:flex-row md:items-center md:gap-20"
        :class="imagePosition === 'right' ? 'md:flex-row-reverse' : ''"
      >
        <div
          class="min-h-[280px] flex-1 overflow-hidden rounded-[40px] md:min-h-[640px] md:rounded-[49px]"
        >
          <NuxtImg
            :src="image"
            :alt="t(title)"
            class="h-full w-full object-cover"
            width="600"
            height="640"
            sizes="(max-width: 768px) 100vw, 600px"
            loading="lazy"
          />
        </div>

        <div class="flex flex-1 flex-col gap-8">
          <div class="flex flex-col gap-4">
            <p
              v-if="tagline"
              class="text-base font-semibold leading-normal text-ps-green"
            >
              {{ t(tagline) }}
            </p>
            <h2
              class="text-3xl font-bold leading-tight text-ps-green md:text-[40px]"
            >
              {{ t(title) }}
            </h2>
            <p class="text-base leading-relaxed text-ps-dark md:text-lg">
              {{ t(body) }}
            </p>
          </div>

          <ul class="flex flex-col gap-4 py-2">
            <li
              v-for="(item, index) of items"
              :key="index"
              class="flex items-center gap-4"
            >
              <NuxtImg
                :src="item.icon"
                alt=""
                class="h-7 w-7 shrink-0"
                width="28"
                height="28"
              />
              <span class="text-base leading-normal text-ps-green">
                {{ t(item.label) }}
              </span>
            </li>
          </ul>

          <div
            v-if="primaryCta || secondaryCta"
            class="flex flex-wrap items-center gap-6"
          >
            <NuxtLinkLocale v-if="primaryCta" :to="primaryCta.url">
              <ButtonV :variant="iconTint === 'blue' ? 'blue' : 'green'">
                {{ t(primaryCta.label) }}
              </ButtonV>
            </NuxtLinkLocale>
            <NuxtLinkLocale
              v-if="secondaryCta"
              :to="secondaryCta.url"
              class="inline-flex items-center gap-2 text-base font-medium text-ps-green transition hover:text-ps-green/80"
            >
              {{ t(secondaryCta.label) }}
              <svg
                class="h-6 w-6 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M8.51 6.17L15.2 12l-6.69 5.83"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </NuxtLinkLocale>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
