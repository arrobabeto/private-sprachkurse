<script setup lang="ts">
  import { LANGS, useConfigurator } from "~/composables/useConfigurator"

  const { avLangs, pickLang } = useConfigurator()
  const available = avLangs()
</script>

<template>
  <div class="animate-fade-in">
    <div
      class="rounded-card border border-ps-line bg-white p-6 shadow-[0_2px_12px_rgba(10,37,64,.06)]"
    >
      <div
        class="mb-1.5 text-[11px] font-semibold uppercase tracking-[1px] text-ps-hint"
      >
        Frage 1 von 2
      </div>
      <div class="mb-1.5 text-lg font-bold leading-[1.3] text-ps-green">
        Welche Sprache möchtest du lernen?
      </div>
      <div class="mb-5 text-[13px] text-ps-muted">
        Wähle die Sprache, die dich interessiert.
      </div>
      <div class="grid grid-cols-2 gap-2.5 max-[380px]:grid-cols-1">
        <button
          v-for="l of LANGS"
          :key="l.code"
          type="button"
          :disabled="!available.includes(l.code)"
          class="flex cursor-pointer flex-col gap-[3px] rounded-sm border-[1.5px] border-ps-line bg-white p-3 text-left transition-all duration-150 hover:-translate-y-px hover:border-ps-blue hover:bg-ps-blue-light hover:shadow-[0_3px_10px_rgba(42,166,176,.12)] disabled:cursor-not-allowed disabled:opacity-[.38] disabled:hover:translate-y-0 disabled:hover:border-ps-line disabled:hover:bg-white disabled:hover:shadow-none"
          @click="pickLang(l.code)"
        >
          <span class="mb-1 text-xl">{{ l.flag }}</span>
          <span class="text-sm font-semibold text-ps-green">{{ l.name }}</span>
          <span class="text-[11px] leading-[1.4] text-ps-muted">
            {{ l.desc }}
          </span>
          <span
            v-if="!available.includes(l.code)"
            class="mt-0.5 text-[10px] text-ps-hint"
          >
            Kein Kurs verfügbar
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
