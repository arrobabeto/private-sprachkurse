export type LangCode = "fr" | "en" | "de" | "it" | "es"
export type NiveauCode = "A1" | "A1+" | "A2" | "B1" | "B2+"
export type TagCode = "mo" | "di" | "mi" | "do" | "fr"
export type StartRaw = "fixed" | "ongoing"

export interface ICourse {
  id: number
  isActive: boolean
  lang: LangCode
  niveau: NiveauCode
  tag: TagCode
  uhrzeit: string
  turnus: string
  startRaw: StartRaw
  start: string
  social: string
  calendly: string
  /** Optional extra label shown in the weekday picker, e.g. "leicht fortgeschritten" */
  note?: string
}

export interface ILang {
  code: LangCode
  flag: string
  name: string
  desc: string
}

export interface INiveau {
  code: NiveauCode
  label: string
  sub: string
  hint: string
}

export interface ILocation {
  name: string
  addr: string
  maps: string
}

export interface ICoursesData {
  courses: ICourse[]
  location: ILocation
  contact: string
}

export interface IConfigData {
  langs: ILang[]
  niveaus: INiveau[]
  tagsMap: Record<TagCode, string>
  confirm: {
    lang: Record<LangCode, string>
    niveau: string
  }
}
