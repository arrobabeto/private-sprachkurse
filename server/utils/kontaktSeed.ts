import type { IPage } from "~/types/dto/IPage"

export const KONTAKT_PAGE_ID = "private-sprachkurse-kontakt"

const IMG = {
  hero: "/images/kontakt/hero-v2.png",
  portrait: "/images/kontakt/form-portrait-v2.png",
  locationLiestal: "/images/kontakt/location-liestal.png",
  locationOnline: "/images/home/kurslokal-v2.png",
  dottedArc: "/images/kontakt/dotted-arc.svg",
  arrow: "/images/kontakt/arrow.svg",
}

const contactFormLabels = {
  firstName: { de: "Vorname", en: "First name" },
  lastName: { de: "Nachname", en: "Last name" },
  email: { de: "E-Mail", en: "Email" },
  phone: { de: "Telefon", en: "Phone" },
  interest: {
    de: "Ich bin interessiert an:",
    en: "I am interested in:",
  },
  learnerType: { de: "Ich bin eher:", en: "I am rather:" },
  message: { de: "Mitteilung", en: "Message" },
  submit: { de: "Senden", en: "Send" },
}

const contactFormOptions = {
  interestOptions: [
    {
      value: "sprachkurs",
      label: { de: "Sprachkurs", en: "Language course" },
    },
    {
      value: "uebersetzung",
      label: { de: "Übersetzung", en: "Translation" },
    },
    {
      value: "firmentraining",
      label: { de: "Firmentraining", en: "Corporate training" },
    },
  ],
  learnerTypeOptions: [
    {
      value: "anfaenger",
      label: { de: "Anfänger", en: "Beginner" },
    },
    {
      value: "fortgeschritten",
      label: { de: "Fortgeschritten", en: "Advanced" },
    },
    {
      value: "pruefung",
      label: {
        de: "Prüfungsvorbereitung",
        en: "Exam preparation",
      },
    },
  ],
  successMessage: {
    de: "Vielen Dank! Wir melden uns zeitnah bei Ihnen.",
    en: "Thank you! We will get back to you soon.",
  },
  errorMessage: {
    de: "Leider ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
    en: "Something went wrong. Please try again.",
  },
}

export function buildKontaktSeed(): IPage {
  return {
    id: KONTAKT_PAGE_ID,
    title: { de: "Kontakt", en: "Contact" },
    slug: "kontakt",
    lead: {
      de: "Kontaktieren Sie mich für Sprachkurse, Übersetzungen und Trainings.",
      en: "Contact me for language courses, translations, and training.",
    },
    img: IMG.hero,
    keywords: [
      "kontakt",
      "sprachkurse",
      "liestal",
      "telefon",
      "email",
      "anfrage",
    ],
    sections: [
      {
        _orbi: { component: "SectionKontaktHero" },
        tagline: { de: "Kontakt", en: "Contact" },
        title: {
          de: "Haben Sie Fragen?",
          en: "Do you have questions?",
        },
        bodyLead: {
          de: "Haben Sie Fragen zu meinen Sprachkursen, ",
          en: "Do you have questions about my language courses, ",
        },
        bodyLeadHighlight: {
          de: "Übersetzungen oder Trainingsangeboten?",
          en: "translations or training offers?",
        },
        bodyMiddle: {
          de: "Gerne berate ich Sie persönlich. Sie können mich telefonisch kontaktieren oder mir über das Formular eine Nachricht senden.",
          en: "I am happy to advise you personally. You can call me or send a message via the form.",
        },
        bodyEnd: {
          de: "Ich melde mich zeitnah mit einer unverbindlichen Rückmeldung.",
          en: "I will get back to you soon with a non-binding response.",
        },
        heroImage: IMG.hero,
      },
      {
        _orbi: { component: "SectionKontaktContactBar" },
        tagline: { de: "Kontakt", en: "Contact" },
        email: "info@privatesprachkurse.ch",
        phone: "+41 78 943 39 63",
        phoneLabel: { de: "Telefon ", en: "Phone " },
        connector: { de: "oder", en: "or" },
        dottedArcImage: IMG.dottedArc,
      },
      {
        _orbi: { component: "SectionKontaktForm" },
        portraitImage: IMG.portrait,
        title: { de: "Jetzt starten", en: "Get started" },
        labels: contactFormLabels,
        interestOptions: contactFormOptions.interestOptions,
        learnerTypeOptions: contactFormOptions.learnerTypeOptions,
        successMessage: contactFormOptions.successMessage,
        errorMessage: contactFormOptions.errorMessage,
      },
      {
        _orbi: { component: "SectionKontaktLocations" },
        title: { de: "Örtlichkeiten", en: "Locations" },
        arrowImage: IMG.arrow,
        tabs: [
          {
            title: { de: "Kurslokal Liestal", en: "Course location Liestal" },
            description: {
              de: "Amtshausgasse 12,\n4410 Liestal",
              en: "Amtshausgasse 12,\n4410 Liestal",
            },
            image: IMG.locationLiestal,
          },
          {
            title: { de: "Online", en: "Online" },
            description: {
              de: "Lernen Sie von überall aus mit unseren virtuellen Unterrichtsstunden.",
              en: "Learn from anywhere with our virtual lessons.",
            },
            image: IMG.locationOnline,
          },
        ],
      },
    ],
    head: {},
    created_at: new Date(0).toISOString(),
    updated_at: new Date(0).toISOString(),
  }
}
