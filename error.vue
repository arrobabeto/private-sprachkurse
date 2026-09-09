<script setup lang="ts">
  import { computed } from "vue"
  import { clearError, useHead } from "#app"
  import { useI18n } from "#i18n"
  import type { NuxtError } from "#app"
  import AppShell from "~/layouts/components/AppShell.vue"

  const props = defineProps<{
    error: NuxtError
  }>()

  const { locale } = useI18n()

  const isNotFound = computed(() => props.error?.statusCode === 404)

  const copy = computed(() => {
    const isEn = locale.value === "en"
    if (isNotFound.value) {
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
    }
    return {
      title: isEn ? "Something went wrong" : "Etwas ist schiefgelaufen",
      body: isEn
        ? "An unexpected error occurred. Please try again later."
        : "Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
      cta: isEn ? "Back to home" : "Zur Startseite",
      headTitle: isEn ? "Error" : "Fehler",
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

  function goHome() {
    clearError({ redirect: locale.value === "en" ? "/en" : "/" })
  }
</script>

<template>
  <AppShell>
    <main
      class="flex min-h-[calc(100dvh-12rem)] items-center justify-center bg-ps-cream px-[2.5%] py-16 md:py-24"
    >
      <div
        class="mx-auto flex max-w-[720px] animate-fade-in flex-col items-center text-center"
      >
        <p
          class="text-base font-semibold tracking-wide text-ps-green md:text-lg"
        >
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

        <button
          type="button"
          class="mt-10 inline-flex items-center justify-center rounded-full bg-ps-green px-10 py-3 text-base font-semibold text-white transition hover:bg-ps-green-dark md:px-14 md:py-4 md:text-lg"
          @click="goHome"
        >
          {{ copy.cta }}
        </button>
      </div>
    </main>
  </AppShell>
</template>
