<script setup lang="ts">
  import { useTranslate } from "~/composables/useTranslate"
  import { siteNavLinks } from "~/layouts/config/siteNavLinks"
  import type { I18nString } from "~/types/util/I18nString"

  const t = useTranslate()

  const footer = {
    links: [
      ...siteNavLinks,
      // AUTO-FOOTER:START
      // AUTO-FOOTER:END
    ] satisfies { name: I18nString; url: string }[],
    copyright: {
      de: "© 2026 PrivateSprachkurse",
      en: "© 2026 Private Sprachkurse",
    },
    social: [
      { label: "Facebook", href: "https://facebook.com", icon: "f" },
      { label: "Instagram", href: "https://instagram.com", icon: "ig" },
      { label: "LinkedIn", href: "https://linkedin.com", icon: "in" },
      { label: "YouTube", href: "https://youtube.com", icon: "yt" },
    ],
  }
</script>

<template>
  <footer>
    <div class="bg-ps-orange px-[2.5%] py-12 text-white md:py-14">
      <div
        class="mx-auto flex max-w-[1300px] flex-col items-center gap-8 text-center"
      >
        <NuxtLinkLocale to="/" class="text-2xl leading-none text-white">
          <span class="font-normal">Private</span>
          <span class="font-bold">Sprachkurse</span>
        </NuxtLinkLocale>

        <div class="flex gap-3">
          <a
            v-for="s of footer.social"
            :key="s.label"
            :href="s.href"
            target="_blank"
            rel="noopener noreferrer"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xs font-bold uppercase text-ps-orange transition hover:bg-white/90"
            :aria-label="s.label"
          >
            {{ s.icon }}
          </a>
        </div>

        <nav class="flex flex-wrap justify-center gap-x-8 gap-y-2">
          <NuxtLinkLocale
            v-for="l of footer.links"
            :key="l.url"
            :to="l.url"
            class="text-sm font-medium text-white transition hover:text-white/80"
          >
            {{ t(l.name) }}
          </NuxtLinkLocale>
        </nav>
      </div>
    </div>

    <div class="bg-white px-[2.5%] py-5">
      <p class="text-center text-sm text-ps-dark/80">
        {{ t(footer.copyright) }}
      </p>
    </div>
  </footer>
</template>
