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
      { name: { de: "Impressum", en: "Imprint" }, url: "/impressum" },
    ] satisfies { name: I18nString; url: string }[],
    phone: {
      label: "+41 78 943 39 63",
      href: "tel:+41789433963",
      icon: "/images/footer/icon-phone.svg",
    },
    email: {
      label: "info@privatesprachkurse.ch",
      href: "mailto:info@privatesprachkurse.ch",
      icon: "/images/footer/icon-mail.svg",
    },
  }
</script>

<template>
  <footer role="contentinfo">
    <div class="bg-ps-orange px-[2.5%] py-12 text-white md:py-14">
      <div
        class="mx-auto flex max-w-[1300px] flex-col items-center gap-8 text-center"
      >
        <NuxtLinkLocale to="/" class="text-2xl leading-none text-white">
          <span class="font-normal">Private</span>
          <span class="font-bold">Sprachkurse</span>
        </NuxtLinkLocale>

        <div
          class="flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-6"
          aria-label="Kontakt"
        >
          <a
            :href="footer.phone.href"
            class="inline-flex items-center gap-2 rounded-full transition hover:opacity-80"
            :aria-label="`Telefon ${footer.phone.label}`"
          >
            <NuxtImg
              :src="footer.phone.icon"
              alt="Telefon Private Sprachkurse Schweiz"
              class="h-9 w-9"
              width="36"
              height="36"
            />
            <span class="text-sm font-medium md:text-base">
              {{ footer.phone.label }}
            </span>
          </a>

          <a
            :href="footer.email.href"
            class="inline-flex items-center gap-2 rounded-full transition hover:opacity-80"
            :aria-label="`E-Mail ${footer.email.label}`"
          >
            <NuxtImg
              :src="footer.email.icon"
              alt="E-Mail Private Sprachkurse Schweiz"
              class="h-9 w-9"
              width="36"
              height="36"
            />
            <span class="text-sm font-medium md:text-base">
              {{ footer.email.label }}
            </span>
          </a>
        </div>

        <nav
          class="flex flex-wrap justify-center gap-x-8 gap-y-2"
          aria-label="Footer"
        >
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
      <p id="site-copyright" class="text-center text-sm text-ps-dark/80">
        © 2026 Private Sprachkurse
      </p>
    </div>
  </footer>
</template>
