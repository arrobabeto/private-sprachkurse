import { reactive } from "vue"
import { useConfigurator } from "~/composables/useConfigurator"

const state = reactive({ isOpen: false })

export function useCalculatorModal() {
  const { restart } = useConfigurator()

  function open() {
    // Each entry starts a fresh search instead of resuming a stale one.
    restart()
    state.isOpen = true
  }

  function close() {
    state.isOpen = false
  }

  return { state, open, close }
}
