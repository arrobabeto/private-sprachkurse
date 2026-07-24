<script setup lang="ts">
  import { computed } from "vue"
  import IntroHeader from "~/components/sections/calculator/IntroHeader.vue"
  import LocationCard from "~/components/sections/calculator/LocationCard.vue"
  import ProgressBar from "~/components/sections/calculator/ProgressBar.vue"
  import StepLanguage from "~/components/sections/calculator/StepLanguage.vue"
  import StepLevel from "~/components/sections/calculator/StepLevel.vue"
  import StepWeekday from "~/components/sections/calculator/StepWeekday.vue"
  import ResultCard from "~/components/sections/calculator/ResultCard.vue"
  import NoMatch from "~/components/sections/calculator/NoMatch.vue"
  import { useConfigurator } from "~/composables/useConfigurator"

  defineOptions({ name: "SectionCalculator" })

  const { state, result } = useConfigurator()

  const progress = computed(() => {
    switch (state.step) {
      case 1:
        return { label: "Schritt 1 von 2", pct: 50 }
      case 2:
        return { label: "Schritt 2 von 2", pct: 100 }
      case 3:
        return { label: "Schritt 3 von 3", pct: 100 }
      case "result":
        return { label: "Kurs gefunden!", pct: 100 }
      case "nomatch":
        return { label: "Fast da!", pct: 100 }
      default:
        return { label: "Schritt 1 von 2", pct: 50 }
    }
  })
</script>

<template>
  <section class="bg-ps-cream-alt py-12 md:py-16">
    <div class="mx-auto max-w-widget px-4">
      <IntroHeader />
      <LocationCard />
      <ProgressBar :label="progress.label" :pct="progress.pct" />

      <StepLanguage v-if="state.step === 1" />
      <StepLevel v-else-if="state.step === 2" />
      <StepWeekday v-else-if="state.step === 3" />
      <ResultCard
        v-else-if="state.step === 'result' && result"
        :course="result"
      />
      <NoMatch v-else-if="state.step === 'nomatch'" />
    </div>
  </section>
</template>
