<script setup lang="ts">
  import { computed, onMounted, onUnmounted, watch } from "vue"
  import IntroHeader from "~/components/calculator/IntroHeader.vue"
  import LocationCard from "~/components/calculator/LocationCard.vue"
  import ProgressBar from "~/components/calculator/ProgressBar.vue"
  import StepLanguage from "~/components/calculator/StepLanguage.vue"
  import StepLevel from "~/components/calculator/StepLevel.vue"
  import StepWeekday from "~/components/calculator/StepWeekday.vue"
  import ResultCard from "~/components/calculator/ResultCard.vue"
  import NoMatch from "~/components/calculator/NoMatch.vue"
  import { useCalculatorModal } from "~/composables/useCalculatorModal"
  import { useConfigurator } from "~/composables/useConfigurator"

  const { state: modal, close } = useCalculatorModal()
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

  function onKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") close()
  }

  function lockScroll(locked: boolean) {
    document.body.style.overflow = locked ? "hidden" : ""
  }

  watch(() => modal.isOpen, lockScroll)

  onMounted(() => document.addEventListener("keydown", onKeydown))

  onUnmounted(() => {
    document.removeEventListener("keydown", onKeydown)
    lockScroll(false)
  })
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-150"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modal.isOpen"
        class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 md:items-center"
        role="dialog"
        aria-modal="true"
        aria-label="Kurs-Konfigurator"
        @click.self="close"
      >
        <div
          class="relative my-auto w-full max-w-widget rounded-[28px] bg-ps-cream-alt shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
        >
          <button
            type="button"
            class="border-line text-ink-sec hover:text-teal absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border bg-white transition-colors"
            aria-label="Schliessen"
            @click="close"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <div class="max-h-[90dvh] overflow-y-auto px-4 pb-8">
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
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
