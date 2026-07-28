<script setup lang="ts">
  import { computed } from "vue"
  import Icon from "~/components/calculator/Icon.vue"
  import {
    CONFIRM,
    LANGS,
    NIVEAUS,
    useConfigurator,
  } from "~/composables/useConfigurator"
  import type { LangCode } from "~/data/types"

  const { state, avNiv, pickNiveau, goBack } = useConfigurator()

  const lang = computed(() => LANGS.find((l) => l.code === state.lang)!)
  const available = computed(() => avNiv(state.lang as LangCode))
</script>

<template>
  <div class="animate-fade-in">
    <div
      class="rounded-card border border-ps-line bg-white p-6 shadow-[0_2px_12px_rgba(10,37,64,.06)]"
    >
      <div
        class="mb-[18px] flex items-center gap-2 rounded-sm border border-ps-blue-mid bg-ps-blue-light px-3.5 py-2.5 text-[13px] text-ps-blue-text"
      >
        <div
          class="flex h-[18px] w-[18px] min-w-[18px] items-center justify-center rounded-full bg-ps-blue"
        >
          <Icon name="chk" class="h-2.5 w-2.5 text-white" />
        </div>
        <span>{{ CONFIRM.lang[state.lang as LangCode] || "Gute Wahl!" }}</span>
      </div>

      <div class="mb-3 flex flex-wrap gap-1.5">
        <span
          class="inline-flex items-center gap-1.5 rounded-pill border border-ps-blue-mid bg-ps-blue-light px-3 py-1 text-xs font-semibold text-ps-blue-text"
        >
          {{ lang.flag }} {{ lang.name }}
        </span>
      </div>

      <div
        class="mb-1.5 text-[11px] font-semibold uppercase tracking-[1px] text-ps-hint"
      >
        Frage 2 von 2
      </div>
      <div class="mb-1.5 text-lg font-bold leading-[1.3] text-ps-green">
        Was kannst du schon?
      </div>
      <div class="mb-5 text-[13px] text-ps-muted">
        Wähle das, was am besten auf dich zutrifft — kein Test, kein Druck.
      </div>

      <div class="grid grid-cols-2 gap-2.5 max-[380px]:grid-cols-1">
        <button
          v-for="n of NIVEAUS"
          :key="n.code"
          type="button"
          :disabled="!available.includes(n.code)"
          class="flex cursor-pointer flex-col gap-[3px] rounded-sm border-[1.5px] border-ps-line bg-white p-3 text-left transition-all duration-150 hover:-translate-y-px hover:border-ps-blue hover:bg-ps-blue-light hover:shadow-[0_3px_10px_rgba(42,166,176,.12)] disabled:cursor-not-allowed disabled:opacity-[.38] disabled:hover:translate-y-0 disabled:hover:border-ps-line disabled:hover:bg-white disabled:hover:shadow-none"
          @click="pickNiveau(n.code)"
        >
          <span class="text-sm font-semibold text-ps-green">{{ n.label }}</span>
          <span class="text-[11px] leading-[1.4] text-ps-muted">
            {{ n.sub }}
          </span>
          <span
            v-if="!available.includes(n.code)"
            class="mt-0.5 text-[10px] text-ps-hint"
          >
            Kein Kurs auf diesem Niveau
          </span>
        </button>
      </div>

      <button
        type="button"
        class="mt-4 flex cursor-pointer items-center gap-1.5 text-[13px] text-ps-hint transition-colors duration-150 hover:text-ps-blue"
        @click="goBack(1)"
      >
        <Icon name="back" />
        Zurück
      </button>
    </div>
  </div>
</template>
