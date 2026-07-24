<script setup lang="ts">
  import { computed } from "vue"
  import Icon from "~/components/sections/calculator/Icon.vue"
  import {
    CONFIRM,
    LANGS,
    NIVEAUS,
    TAGS_MAP,
    useConfigurator,
  } from "~/composables/useConfigurator"
  import type { LangCode, NiveauCode, TagCode } from "~/data/types"

  const { state, avTags, matchC, pickTag, goBack } = useConfigurator()

  const lang = computed(() => LANGS.find((l) => l.code === state.lang)!)
  const niveau = computed(() => NIVEAUS.find((n) => n.code === state.niveau)!)
  const tags = computed(() =>
    avTags(state.lang as LangCode, state.niveau as NiveauCode),
  )

  function courseFor(t: TagCode) {
    return matchC(
      state.lang as LangCode,
      state.niveau as NiveauCode,
      null,
    ).find((c) => c.tag === t)
  }

  function scheduleLabel(t: TagCode) {
    const c = courseFor(t)
    if (!c) return ""
    const parts = [`${c.uhrzeit} Uhr`, c.turnus]
    if (c.note) parts.push(c.note)
    return parts.join(" · ")
  }
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
        <span>{{ CONFIRM.niveau }}</span>
      </div>

      <div class="mb-3 flex flex-wrap gap-1.5">
        <span
          class="inline-flex items-center gap-1.5 rounded-pill border border-ps-blue-mid bg-ps-blue-light px-3 py-1 text-xs font-semibold text-ps-blue-text"
        >
          {{ lang.flag }} {{ lang.name }}
        </span>
        <span
          class="inline-flex items-center gap-1.5 rounded-pill border border-ps-blue-mid bg-ps-blue-light px-3 py-1 text-xs font-semibold text-ps-blue-text"
        >
          {{ niveau.hint }}
        </span>
      </div>

      <div
        class="mb-1.5 text-[11px] font-semibold uppercase tracking-[1px] text-ps-hint"
      >
        Frage 3 von 3
      </div>
      <div class="mb-1.5 text-lg font-bold leading-[1.3] text-ps-green">
        Wann passt es dir?
      </div>
      <div class="mb-5 text-[13px] text-ps-muted">
        Für deine Auswahl gibt es mehrere Gruppen — wähle den passenden
        Wochentag.
      </div>

      <div class="grid grid-cols-1 gap-2.5">
        <button
          v-for="t of tags"
          :key="t"
          type="button"
          class="flex cursor-pointer flex-col gap-[3px] rounded-sm border-[1.5px] border-ps-line bg-white p-3 text-left transition-all duration-150 hover:-translate-y-px hover:border-ps-blue hover:bg-ps-blue-light hover:shadow-[0_3px_10px_rgba(42,166,176,.12)]"
          @click="pickTag(t)"
        >
          <span class="text-sm font-semibold text-ps-green">
            {{ TAGS_MAP[t] }}
          </span>
          <span class="text-[11px] leading-[1.4] text-ps-muted">
            {{ scheduleLabel(t) }}
          </span>
        </button>
      </div>

      <button
        type="button"
        class="mt-4 flex cursor-pointer items-center gap-1.5 text-[13px] text-ps-hint transition-colors duration-150 hover:text-ps-blue"
        @click="goBack(2)"
      >
        <Icon name="back" />
        Zurück
      </button>
    </div>
  </div>
</template>
