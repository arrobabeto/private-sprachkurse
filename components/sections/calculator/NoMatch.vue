<script setup lang="ts">
  import { CONTACT, useConfigurator } from "~/composables/useConfigurator"

  const { restart } = useConfigurator()

  // Placeholder until the Calendly link for private lessons is provided.
  const PRIVATE_CALENDLY = ""

  function requestPrivate() {
    if (PRIVATE_CALENDLY) {
      window.open(PRIVATE_CALENDLY, "_blank", "noopener,noreferrer")
    } else {
      window.location.href = `mailto:${CONTACT}?subject=${encodeURIComponent(
        "Anfrage Privatstunde",
      )}`
    }
  }
</script>

<template>
  <div
    class="animate-fade-in rounded-card border-[1.5px] border-ps-line bg-white p-6 text-center"
  >
    <div class="mb-3 text-[32px]">🔍</div>
    <div class="mb-2 text-base font-bold text-ps-green">
      Für diese Kombination gibt es aktuell keinen Kurs
    </div>
    <div class="mb-[18px] text-[13px] leading-[1.6] text-ps-muted">
      Kein Problem — wir bieten auch
      <strong>Privatstunden</strong>
      an, ganz nach deinen Wünschen und Zeiten. Meld dich einfach bei uns.
    </div>
    <button
      type="button"
      class="cursor-pointer rounded-sm bg-ps-green px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-ps-green-dark"
      @click="requestPrivate"
    >
      Privatstunde anfragen
    </button>
    <div class="mt-3.5 text-xs text-ps-hint">
      Oder direkt schreiben:
      <a
        :href="`mailto:${CONTACT}`"
        class="font-semibold text-ps-blue hover:underline"
      >
        {{ CONTACT }}
      </a>
    </div>
    <button
      type="button"
      class="mt-2.5 block w-full cursor-pointer text-center text-xs text-ps-hint underline hover:text-ps-blue"
      @click="restart"
    >
      Neue Suche starten
    </button>
  </div>
</template>
