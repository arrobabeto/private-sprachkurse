<script setup lang="ts">
  import { useRoute } from "#app"
  import { useTranslate } from "~/composables/useTranslate"
  import { siteNavLinks } from "~/layouts/config/siteNavLinks"
  import type { I18nString } from "~/types/util/I18nString"

  const t = useTranslate()
  const route = useRoute()

  const nav = {
    links: [
      ...siteNavLinks,
      // AUTO-NAV:START
      // AUTO-NAV:END
    ] satisfies { name: I18nString; url: string }[],
  }

  function pathWithoutLocale() {
    const p = route.path
    if (p === "/en") return "/"
    if (p.startsWith("/en/")) return p.slice(3) || "/"
    return p
  }

  function isActive(url: string) {
    if (url.startsWith("/#")) {
      return route.hash === url.slice(1)
    }
    const path = pathWithoutLocale()
    return path === url || path.startsWith(`${url}/`)
  }

  function linkClass(url: string) {
    const active = isActive(url)
    return [
      "relative inline-block pb-1 text-sm font-medium transition-colors",
      active
        ? "text-ps-dark after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-ps-orange after:content-['']"
        : "text-ps-dark/90 hover:text-ps-dark",
    ]
  }
</script>

<template>
  <header class="sticky top-0 z-20 border-t-2 border-ps-blue bg-white">
    <nav class="ps-container flex items-center justify-between gap-6 py-5">
      <NuxtLinkLocale to="/" class="shrink-0 text-xl leading-none">
        <span class="font-medium text-ps-orange/80">Private</span>
        <span class="font-bold text-ps-orange">Sprachkurse</span>
      </NuxtLinkLocale>

      <div class="hidden items-center gap-10 md:flex">
        <NuxtLinkLocale
          v-for="l of nav.links"
          :key="l.url"
          :to="l.url"
          :class="linkClass(l.url)"
          :aria-current="isActive(l.url) ? 'page' : undefined"
        >
          {{ t(l.name) }}
        </NuxtLinkLocale>
      </div>

      <details class="relative md:hidden">
        <summary
          class="cursor-pointer list-none text-sm font-medium text-ps-dark [&::-webkit-details-marker]:hidden"
        >
          Menu
        </summary>
        <div
          class="absolute right-0 top-full z-30 mt-2 min-w-[12rem] rounded-2xl border border-black/10 bg-white p-2 shadow-lg"
        >
          <NuxtLinkLocale
            v-for="l of nav.links"
            :key="l.url"
            :to="l.url"
            class="block rounded-xl px-3 py-2 text-sm font-medium"
            :class="
              isActive(l.url)
                ? 'border-b border-ps-orange bg-ps-cream/60 text-ps-dark'
                : 'text-ps-dark hover:bg-ps-cream'
            "
            :aria-current="isActive(l.url) ? 'page' : undefined"
          >
            {{ t(l.name) }}
          </NuxtLinkLocale>
        </div>
      </details>
    </nav>
  </header>
</template>
