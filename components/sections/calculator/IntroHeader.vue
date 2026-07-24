<script setup lang="ts">
  import Icon from "~/components/sections/calculator/Icon.vue"
</script>

<template>
  <div class="px-0 pb-5 pt-7 text-center">
    <div
      class="mb-2.5 text-[11px] font-semibold uppercase tracking-[1.5px] text-ps-blue"
    >
      Kurslokal Liestal
    </div>
    <h1 class="mb-2.5 text-2xl font-bold leading-[1.25] text-ps-green">
      Welcher Kurs
      <br />
      ist
      <span class="text-ps-blue">deiner?</span>
    </h1>
    <p class="mx-auto mb-4 max-w-[400px] text-sm leading-[1.6] text-ps-muted">
      Du weisst nicht wo anfangen? In 3 Fragen finden wir den Kurs, der genau zu
      dir passt — und du kannst direkt buchen.
    </p>
    <div
      class="inline-flex items-center gap-1.5 rounded-pill border-[1.5px] border-ps-line bg-white px-3.5 py-1.5 text-xs text-ps-muted"
    >
      <Icon name="clk" class="text-ps-muted" />
      <strong class="text-[13px] text-ps-green">SFr.&nbsp;88.—</strong>
      pro Person, jeweils 55 Minuten
    </div>
  </div>
</template>
