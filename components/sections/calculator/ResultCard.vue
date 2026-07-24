<script setup lang="ts">
  import { computed } from "vue"
  import Icon from "~/components/sections/calculator/Icon.vue"
  import {
    CONTACT,
    LANGS,
    LOCATION,
    NIVEAUS,
    TAGS_MAP,
    useConfigurator,
  } from "~/composables/useConfigurator"
  import type { ICourse } from "~/data/types"

  const props = defineProps<{
    course: ICourse
  }>()

  const { restart } = useConfigurator()

  const lang = computed(() => LANGS.find((l) => l.code === props.course.lang)!)
  const niveau = computed(
    () => NIVEAUS.find((n) => n.code === props.course.niveau)!,
  )
  const isWeekly = computed(() => props.course.turnus === "Wöchentlich")
  const hasCalendly = computed(() => props.course.calendly.trim().length > 0)

  function book() {
    if (hasCalendly.value) {
      window.open(props.course.calendly, "_blank", "noopener,noreferrer")
    }
  }
</script>

<template>
  <div
    class="animate-fade-in rounded-card border-[1.5px] border-ps-green bg-white p-6 shadow-[0_4px_20px_rgba(29,158,117,.12)]"
  >
    <div
      class="mb-3 inline-flex items-center gap-1.5 rounded-pill border border-ps-green bg-ps-success-bg px-3 py-1 text-[11px] font-bold text-ps-green"
    >
      <Icon name="ok" />
      Dein Kurs
    </div>
    <div class="mb-0.5 text-[22px] font-bold text-ps-green">
      {{ lang.flag }} {{ lang.name }}
    </div>
    <div class="mb-[18px] text-sm text-ps-muted">
      {{ niveau.hint }} — {{ niveau.sub }}
    </div>

    <div class="mb-3.5 grid grid-cols-2 gap-2">
      <div class="rounded-sm bg-ps-cream-alt px-3 py-2.5">
        <div
          class="mb-[3px] text-[10px] font-semibold uppercase tracking-[.8px] text-ps-hint"
        >
          Tag &amp; Zeit
        </div>
        <div
          class="flex flex-wrap items-center gap-1.5 text-[13px] font-semibold leading-[1.4] text-ps-green"
        >
          {{ TAGS_MAP[course.tag] }}, {{ course.uhrzeit }} Uhr
        </div>
      </div>
      <div class="rounded-sm bg-ps-cream-alt px-3 py-2.5">
        <div
          class="mb-[3px] text-[10px] font-semibold uppercase tracking-[.8px] text-ps-hint"
        >
          Frequenz
        </div>
        <div
          class="flex flex-wrap items-center gap-1.5 text-[13px] font-semibold leading-[1.4] text-ps-green"
        >
          <Icon :name="isWeekly ? 'clk' : 'cal'" />
          {{ course.turnus }}
        </div>
      </div>
      <div class="rounded-sm bg-ps-cream-alt px-3 py-2.5">
        <div
          class="mb-[3px] text-[10px] font-semibold uppercase tracking-[.8px] text-ps-hint"
        >
          Gruppengrösse
        </div>
        <div
          class="flex flex-wrap items-center gap-1.5 text-[13px] font-semibold leading-[1.4] text-ps-green"
        >
          <span
            class="inline-flex items-center gap-1 rounded-[10px] border border-ps-blue-line bg-ps-blue-light px-2 py-px text-[11px] font-semibold text-ps-blue-text"
          >
            <Icon name="grp" />
            Max. 8 Personen
          </span>
        </div>
      </div>
      <div class="rounded-sm bg-ps-cream-alt px-3 py-2.5">
        <div
          class="mb-[3px] text-[10px] font-semibold uppercase tracking-[.8px] text-ps-hint"
        >
          Preis / Dauer
        </div>
        <div
          class="flex flex-wrap items-center gap-1.5 text-[13px] font-semibold leading-[1.4] text-ps-green"
        >
          SFr. 88.— · 55 Min.
        </div>
      </div>
      <div class="col-span-2 rounded-sm bg-ps-cream-alt px-3 py-2.5">
        <div
          class="mb-[3px] text-[10px] font-semibold uppercase tracking-[.8px] text-ps-hint"
        >
          Startdatum
        </div>
        <div
          class="flex flex-wrap items-center gap-1.5 text-[13px] font-semibold leading-[1.4] text-ps-green"
        >
          <span
            v-if="course.startRaw === 'ongoing'"
            class="inline-block rounded-[10px] bg-ps-success-bg px-2 py-px text-[11px] font-semibold text-ps-green"
          >
            Laufender Kurs — Einstieg jederzeit
          </span>
          <template v-else>{{ course.start }}</template>
        </div>
      </div>
    </div>

    <div
      class="mb-3.5 flex items-center gap-2.5 rounded-sm border border-ps-line bg-ps-cream-alt px-3.5 py-3"
    >
      <div
        class="flex h-[30px] w-[30px] min-w-[30px] items-center justify-center rounded-md bg-ps-green"
      >
        <Icon name="pin" class="h-3.5 w-3.5 text-white" />
      </div>
      <div>
        <div class="text-xs font-bold text-ps-green">{{ LOCATION.name }}</div>
        <div class="text-[11px] text-ps-muted">{{ LOCATION.addr }}</div>
      </div>
      <a
        class="ml-auto flex flex-shrink-0 items-center gap-[3px] text-[11px] font-semibold text-ps-blue hover:underline"
        :href="LOCATION.maps"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="ext" />
        Google Maps
      </a>
    </div>

    <div
      class="mb-[18px] flex items-center gap-2 rounded-sm border border-ps-warn-line bg-ps-cream px-3.5 py-2.5 text-xs leading-[1.5] text-ps-warn-text"
    >
      <Icon name="ppl" />
      {{ course.social }}
    </div>

    <button
      type="button"
      :disabled="!hasCalendly"
      class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-ps-blue p-4 text-[15px] font-bold text-white transition-colors duration-150 hover:bg-ps-blue-dark disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-ps-blue"
      @click="book"
    >
      <template v-if="hasCalendly">
        Jetzt buchen &amp; bezahlen
        <Icon name="arr" />
      </template>
      <template v-else>Buchungslink folgt in Kürze</template>
    </button>
    <div class="mt-2 text-center text-[11px] leading-[1.6] text-ps-hint">
      Du buchst und bezahlst direkt via Calendly — sicher und unkompliziert.
      <br />
      Du erhältst sofort eine Bestätigung per E-Mail mit allen Details.
    </div>

    <div class="mt-4 text-center text-xs text-ps-hint">
      Fragen vor der Buchung?
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
      Andere Optionen ansehen
    </button>
  </div>
</template>
