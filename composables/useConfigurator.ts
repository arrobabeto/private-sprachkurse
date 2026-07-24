import { computed, reactive } from "vue"
import { coursesData } from "~/data/courses"
import { configData } from "~/data/config"
import type { ICourse, LangCode, NiveauCode, TagCode } from "~/data/types"

export type Step = 1 | 2 | 3 | "result" | "nomatch"

interface IConfiguratorState {
  step: Step
  lang: LangCode | null
  niveau: NiveauCode | null
  tag: TagCode | null
}

const COURSES = coursesData.courses.filter((c) => c.isActive)

export const LANGS = configData.langs
export const NIVEAUS = configData.niveaus
export const TAGS_MAP = configData.tagsMap
export const CONFIRM = configData.confirm
export const LOCATION = coursesData.location
export const CONTACT = coursesData.contact

function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)]
}

function createInitialState(): IConfiguratorState {
  return {
    step: 1,
    lang: null,
    niveau: null,
    tag: null,
  }
}

const state = reactive<IConfiguratorState>(createInitialState())

export function useConfigurator() {
  function avLangs(): LangCode[] {
    return unique(COURSES.map((c) => c.lang))
  }

  function avNiv(l: LangCode): NiveauCode[] {
    return unique(COURSES.filter((c) => c.lang === l).map((c) => c.niveau))
  }

  function avTags(l: LangCode, n: NiveauCode): TagCode[] {
    return unique(
      COURSES.filter((c) => c.lang === l && c.niveau === n).map((c) => c.tag),
    )
  }

  function matchC(l: LangCode, n: NiveauCode, t: TagCode | null): ICourse[] {
    return COURSES.filter(
      (c) => c.lang === l && c.niveau === n && (!t || c.tag === t),
    )
  }

  function pickLang(code: LangCode) {
    state.step = 2
    state.lang = code
    state.niveau = null
    state.tag = null
  }

  function pickNiveau(code: NiveauCode) {
    const lang = state.lang as LangCode
    const tags = avTags(lang, code)
    state.niveau = code
    if (!tags.length) {
      state.tag = null
      state.step = "nomatch"
    } else if (tags.length === 1) {
      state.tag = tags[0]
      state.step = "result"
    } else {
      state.tag = null
      state.step = 3
    }
  }

  function pickTag(code: TagCode) {
    state.tag = code
    state.step = "result"
  }

  function goBack(to: 1 | 2) {
    if (to === 1) {
      Object.assign(state, createInitialState())
      return
    }
    state.step = 2
    state.niveau = null
    state.tag = null
  }

  function restart() {
    Object.assign(state, createInitialState())
  }

  const result = computed<ICourse | null>(() => {
    if (state.step !== "result" || !state.lang || !state.niveau) {
      return null
    }
    const courses = matchC(state.lang, state.niveau, state.tag)
    return courses[0] ?? null
  })

  return {
    state,
    result,
    avLangs,
    avNiv,
    avTags,
    matchC,
    pickLang,
    pickNiveau,
    pickTag,
    goBack,
    restart,
  }
}
