<script setup lang="ts">
  import { computed } from "vue"
  import { useHead } from "#imports"
  import { useI18n } from "#i18n"

  const { locale } = useI18n()

  const copy = computed(() => {
    const isEn = locale.value === "en"
    return {
      title: isEn
        ? "We couldn’t find the page you’re looking for"
        : "Wir haben die gesuchte Seite nicht gefunden",
      body: isEn
        ? "The link may be broken or the page may have been moved."
        : "Der Link ist möglicherweise fehlerhaft oder die Seite wurde verschoben.",
      cta: isEn ? "Back to home" : "Zur Startseite",
      headTitle: isEn ? "404 Page not found" : "404 Seite nicht gefunden",
    }
  })

  useHead({
    title: () => copy.value.headTitle,
    meta: [
      {
        name: "robots",
        content: "noindex, nofollow",
      },
    ],
  })
</script>

<template>
  <main
    class="flex min-h-[calc(100dvh-12rem)] items-center justify-center bg-ps-cream px-[2.5%] py-16 md:py-24"
  >
    <div
      class="mx-auto flex max-w-[720px] animate-fade-in flex-col items-center text-center"
    >
      <p class="text-base font-semibold tracking-wide text-ps-green md:text-lg">
        Private Sprachkurse
      </p>

      <h1
        class="mt-6 text-3xl font-bold leading-tight text-ps-green md:text-[48px] md:leading-[1.2]"
      >
        {{ copy.title }}
      </h1>

      <p
        class="mt-4 max-w-[480px] text-base leading-relaxed text-ps-green/80 md:text-lg"
      >
        {{ copy.body }}
      </p>

      <NuxtLinkLocale
        to="/"
        class="mt-10 inline-flex items-center justify-center rounded-full bg-ps-green px-10 py-3 text-base font-semibold text-white transition hover:bg-ps-green-dark md:px-14 md:py-4 md:text-lg"
      >
        {{ copy.cta }}
      </NuxtLinkLocale>
    </div>
  </main>
</template>
