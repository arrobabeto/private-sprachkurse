import { reactive } from "vue"
import { useConfigurator } from "~/composables/useConfigurator"
import type { LangCode } from "~/data/types"

const state = reactive({ isOpen: false })

export function useCalculatorModal() {
  const { restart, pickLang } = useConfigurator()

  function open(lang?: LangCode) {
    // Each entry starts a fresh search instead of resuming a stale one.
    restart()
    if (lang) pickLang(lang)
    state.isOpen = true
  }

  function close() {
    state.isOpen = false
  }

  return { state, open, close }
}
