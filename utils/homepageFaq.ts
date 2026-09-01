import type { I18nString } from "~/types/util/I18nString"

export type FaqItem = {
  question: I18nString
  answer: I18nString
}

/** Shared homepage FAQ copy — used by CMS seed and FAQPage JSON-LD. */
export const homepageFaqItems: FaqItem[] = [
  {
    question: {
      de: "Welche Sprachen unterrichten Sie?",
      en: "Which languages do you teach?",
    },
    answer: {
      de: "Ich unterrichte Deutsch, Englisch, Französisch, Italienisch und Spanisch — von Anfänger- bis Fortgeschrittenenniveau, individuell abgestimmt auf Ihre Ziele.",
      en: "I teach German, English, French, Italian, and Spanish — from beginner to advanced, tailored to your goals.",
    },
  },
  {
    question: {
      de: "Wo finden die Kurse statt?",
      en: "Where do the courses take place?",
    },
    answer: {
      de: "Sie wählen flexibel zwischen Online-Unterricht (Zoom oder Google Meet), Präsenzstunden in meinem Kurslokal in Liestal oder Kursen direkt in Ihrer Firma.",
      en: "Choose flexibly between online lessons (Zoom or Google Meet), in-person sessions at my course location in Liestal, or training at your company.",
    },
  },
  {
    question: {
      de: "Was kostet ein Privatkurs?",
      en: "How much does a private course cost?",
    },
    answer: {
      de: "Eine 55-minütige Privatlektion kostet CHF 88 online und CHF 98 vor Ort in Liestal. Günstigere Pakete gibt es mit 5er- und 20er-Abos.",
      en: "A 55-minute private lesson costs CHF 88 online and CHF 98 in person in Liestal. Discounted packages are available with 5- and 20-lesson bundles.",
    },
  },
  {
    question: {
      de: "Kann ich auch online lernen?",
      en: "Can I learn online?",
    },
    answer: {
      de: "Ja. Alle Kurse sind flexibel online buchbar — per Zoom oder Google Meet, mit dem gleichen persönlichen Unterricht wie vor Ort.",
      en: "Yes. All courses can be booked flexibly online — via Zoom or Google Meet, with the same personal teaching as in person.",
    },
  },
  {
    question: {
      de: "Wie läuft der erste Kurs ab?",
      en: "How does the first lesson work?",
    },
    answer: {
      de: "Nach Ihrer Kontaktaufnahme besprechen wir Ihre Ziele, Ihr Niveau und Ihren Wunschtermin. In der ersten Lektion lernen wir uns kennen und legen gemeinsam den Lernweg fest.",
      en: "After you get in touch, we discuss your goals, level, and preferred schedule. In the first lesson we get to know each other and define your learning path together.",
    },
  },
]

export const homepageFaqTitle: I18nString = {
  de: "Häufig gestellte Fragen",
  en: "Frequently asked questions",
}

export const homepageFaqSection = {
  _orbi: { component: "SectionFaq" },
  title: homepageFaqTitle,
  items: homepageFaqItems,
}
