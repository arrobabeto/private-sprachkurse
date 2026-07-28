import type { IPage } from "~/types/dto/IPage"

export const HOMEPAGE_ID = "private-sprachkurse-home"

const IMG = {
  hero: "/images/home/hero-v2.png",
  portrait: "/images/home/portrait-v4.png",
  kurslokal: "/images/in-unternehmen/offer-praesentation-bg-v2.png",
  flagDe: "/images/home/flagDe.png",
  flagEn: "/images/home/flagEn.png",
  flagFr: "/images/home/flagFr.png",
  flagIt: "/images/home/flagIt.png",
  flagEs: "/images/home/flagEs.png",
  iconGoals: "/images/home/hero/iconCard1.svg",
  iconIndividual: "/images/home/hero/iconCard2.svg",
  iconExperience: "/images/home/hero/iconCard3.svg",
  iconConfident: "/images/home/hero/iconCard4.svg",
  testimonialJanine: "/images/home/testimonialJanine.png",
  testimonialSarah: "/images/home/testimonialSarah.png",
  testimonialAnita: "/images/home/testimonialAnita.png",
  testimonialMonika: "/images/home/testimonialMonika.png",
  testimonialNadja: "/images/home/testimonialNadja.png",
}

const LANGUAGES = [
  {
    name: { de: "Deutsch", en: "German" },
    description: {
      de: "Von A1 bis C2 – lernen Sie Deutsch für den Alltag, den Beruf oder zur Prüfungsvorbereitung. Verbessern Sie Ihre Sprechsicherheit und Grammatikkenntnisse.",
      en: "From A1 to C2 — learn German for everyday life, work, or exam preparation.",
    },
    availability: {
      de: "In Liestal, online oder in Ihrer Firma verfügbar",
      en: "Available in Liestal, online, or at your company",
    },
    cta: { de: "Ich möchte Deutsch lernen", en: "I want to learn German" },
    icon: IMG.flagDe,
  },
  {
    name: { de: "Englisch", en: "English" },
    description: {
      de: "Englisch für Beruf, Reisen und Alltag — praxisnah und auf Ihr Niveau abgestimmt.",
      en: "English for work, travel, and daily life — practical and tailored to your level.",
    },
    availability: {
      de: "Praxisorientierter Unterricht, abgestimmt auf Ihre Ziele.",
      en: "Practical lessons tailored to your goals.",
    },
    cta: { de: "Jetzt Englisch lernen", en: "Learn English now" },
    icon: IMG.flagEn,
  },
  {
    name: { de: "Französisch", en: "French" },
    description: {
      de: "Französisch mit Freude lernen — von den ersten Worten bis zur flüssigen Konversation.",
      en: "Learn French with joy — from first words to fluent conversation.",
    },
    availability: {
      de: "Praxisorientierter Unterricht, abgestimmt auf Ihre Ziele.",
      en: "Practical lessons tailored to your goals.",
    },
    cta: { de: "Jetzt Französisch lernen", en: "Learn French now" },
    icon: IMG.flagFr,
  },
  {
    name: { de: "Italienisch", en: "Italian" },
    description: {
      de: "Entdecken Sie die italienische Sprache und Kultur — lebendig und ohne Druck.",
      en: "Discover the Italian language and culture — lively and without pressure.",
    },
    availability: {
      de: "Praxisorientierter Unterricht, abgestimmt auf Ihre Ziele.",
      en: "Practical lessons tailored to your goals.",
    },
    cta: { de: "Jetzt Italienisch lernen", en: "Learn Italian now" },
    icon: IMG.flagIt,
  },
  {
    name: { de: "Spanisch", en: "Spanish" },
    description: {
      de: "Sprechen Sie Spanisch – die Sprache von über 20 Ländern! Vom Anfänger- bis zum Fortgeschrittenenniveau.",
      en: "Speak Spanish — the language of over 20 countries!",
    },
    availability: {
      de: "Praxisorientierter Unterricht, abgestimmt auf Ihre Ziele.",
      en: "Practical lessons tailored to your goals.",
    },
    cta: { de: "Jetzt Spanisch lernen", en: "Learn Spanish now" },
    icon: IMG.flagEs,
  },
]

export function buildHomepageSeed(_hasSqlKeyConfigured = false): IPage {
  return {
    id: HOMEPAGE_ID,
    title: {
      de: "Private Sprachkurse",
      en: "Private Language Courses",
    },
    slug: "home",
    img: IMG.hero,
    keywords: [
      "sprachkurse",
      "private sprachkurse",
      "deutsch lernen",
      "liestal",
      "viviane baier",
    ],
    lead: {
      de: "Persönlicher Sprachunterricht für Alltag und Beruf – individuell, flexibel und mit Freude am Lernen.",
      en: "Personal language lessons for everyday life and work — individual, flexible, and enjoyable.",
    },
    sections: [
      {
        _orbi: { component: "SectionHero" },
        headlineHighlight: { de: "Sprachen", en: "Languages" },
        headlineLine1Tail: {
          de: " sind lebendig und",
          en: " are alive and",
        },
        headlineLine2: {
          de: "genau so lernt man sie",
          en: "that's exactly how you learn them",
        },
        subtext: {
          de: "Persönlicher Sprachunterricht für Alltag und Beruf – individuell, flexibel und mit Freude am Lernen",
          en: "Personal language lessons for everyday life and work — individual, flexible, and enjoyable",
        },
        ctaLabel: { de: "Zu den Kursen", en: "View courses" },
        ctaUrl: "/#sprachkurse",
        cards: [
          {
            text: {
              de: "Wir bestimmen gemeinsam Ihre Ziele",
              en: "We define your goals together",
            },
            variant: "blue",
            icon: IMG.iconGoals,
          },
          {
            text: {
              de: "Sprachkurse so individuell wie Sie",
              en: "Language courses as individual as you",
            },
            variant: "orange",
            icon: IMG.iconIndividual,
          },
          {
            text: {
              de: "Sprache erleben und verstehen",
              en: "Experience and understand language",
            },
            variant: "blue",
            icon: IMG.iconExperience,
          },
          {
            text: {
              de: "Sie sprechen sicher im Alltag, Urlaub & Beruf",
              en: "Speak confidently in daily life, travel & work",
            },
            variant: "orange",
            icon: IMG.iconConfident,
          },
        ],
      },
      {
        _orbi: { component: "SectionLanguages" },
        backgroundImage: IMG.hero,
        overlayTitle: {
          de: "Sprachen verbinden die Welt",
          en: "Languages connect the world",
        },
        languages: LANGUAGES,
      },
      {
        _orbi: { component: "SectionAbout" },
        image: IMG.portrait,
        name: { de: "Viviane Baier", en: "Viviane Baier" },
        role: {
          de: "Sprachen lernen soll Spass machen",
          en: "Learning languages should be fun",
        },
        eyebrow: { de: "Über mich", en: "About me" },
        title: {
          de: "Ihre Sprachtrainerin",
          en: "Your language trainer",
        },
        body: {
          de: "Sprachen begleiten mich schon mein ganzes Leben.\nIch habe viele Jahre im Ausland gelebt, in mehreren Sprachen gearbeitet und dabei gelernt, wie unterschiedlich Menschen Sprache erleben und anwenden.\nHeute gebe ich diese Erfahrung in meinen Kursen weiter, die individuell, lebendig und ohne Druck funktionieren.",
          en: "Languages have been part of my entire life.\nI lived abroad for many years, worked in several languages, and learned how differently people experience and use language.\nToday I share this experience in my courses — individual, lively, and without pressure.",
        },
        ctaLabel: {
          de: "Mich und meine Methoden kennenlernen",
          en: "Get to know me and my methods",
        },
        ctaUrl: "/sprachtrainerin",
      },
      {
        _orbi: { component: "SectionTestimonials" },
        title: {
          de: "Geschichten unserer Schüler",
          en: "Stories from our students",
        },
        subtitle: {
          de: "Was meine Kursteilnehmer sagen:\nEchte Stimmen über Lernerfolge, Vertrauen und Motivation.",
          en: "What my students say:\nReal voices about learning success, trust, and motivation",
        },
        items: [
          {
            name: { de: "Anita Werren-Gasser", en: "Anita Werren-Gasser" },
            quote: {
              de: "So macht Lernen richtig Spass. Mit abwechslungsreichen Stunden und viel Konversation bringe ich mein Schulitalienisch wieder auf Vordermann! Mille grazie Viviane!",
              en: "So macht Lernen richtig Spass. Mit abwechslungsreichen Stunden und viel Konversation bringe ich mein Schulitalienisch wieder auf Vordermann! Mille grazie Viviane!",
            },
            initial: "A",
            image: IMG.testimonialAnita,
          },
          {
            name: { de: "Sarah Howourth", en: "Sarah Howourth" },
            quote: {
              de: "Learning German with Viviane has given me the confidence to start to talk and integrate more with people in my city. Viviane is a great teacher, she teaches at the right pace for me and challenges me often. Every lesson flies by and I feel I am improving every week. I would recommend Viviane to anyone looking to improve their German.",
              en: "Learning German with Viviane has given me the confidence to start to talk and integrate more with people in my city. Viviane is a great teacher, she teaches at the right pace for me and challenges me often. Every lesson flies by and I feel I am improving every week. I would recommend Viviane to anyone looking to improve their German.",
            },
            initial: "S",
            image: IMG.testimonialSarah,
          },
          {
            name: { de: "Janine Helfrich", en: "Janine Helfrich" },
            quote: {
              de: "Mein Spanisch ist schon recht gut, Viviane hat mich jedoch super in den noch fehlenden Bausteinen unterstützt und kurzweilig und unterhaltsam unterrichtet…",
              en: "Mein Spanisch ist schon recht gut, Viviane hat mich jedoch super in den noch fehlenden Bausteinen unterstützt und kurzweilig und unterhaltsam unterrichtet…",
            },
            initial: "J",
            image: IMG.testimonialJanine,
          },
          {
            name: { de: "Monika Biermann", en: "Monika Biermann" },
            quote: {
              de: "Ich bin seit ein paar Monaten dabei & I like it! Kompetent, unkompliziert, flexibel meinen Bedürfnissen angepasst und immer mit einer Menge Spass!!!",
              en: "Ich bin seit ein paar Monaten dabei & I like it! Kompetent, unkompliziert, flexibel meinen Bedürfnissen angepasst und immer mit einer Menge Spass!!!",
            },
            initial: "M",
            image: IMG.testimonialMonika,
          },
          {
            name: {
              de: "Nadja Kirschner – Ernährungsberaterin für Hunde & Katzen",
              en: "Nadja Kirschner – Ernährungsberaterin für Hunde & Katzen",
            },
            quote: {
              de: "Mein Spanisch ist Dank Viviane schon so gut, dass ich mich hier in Spanien allem stellen kann. Sogar bei Problemen mit der Bank reichte das Spanisch aus um es zu lösen. Ich war ganz stolz, es ohne andere Fremdsprache lösen zu können. Mit Vivi macht lernen richtig Spass und ist absolut professionell! Sie geht komplett auf meine Bedürfnisse ein. Noch nie habe ich eine Sprache so rasch gelernt! Danke Vivi.",
              en: "Mein Spanisch ist Dank Viviane schon so gut, dass ich mich hier in Spanien allem stellen kann. Sogar bei Problemen mit der Bank reichte das Spanisch aus um es zu lösen. Ich war ganz stolz, es ohne andere Fremdsprache lösen zu können. Mit Vivi macht lernen richtig Spass und ist absolut professionell! Sie geht komplett auf meine Bedürfnisse ein. Noch nie habe ich eine Sprache so rasch gelernt! Danke Vivi.",
            },
            initial: "N",
            image: IMG.testimonialNadja,
          },
          {
            name: { de: "Ramzi M. - Novartis", en: "Ramzi M. - Novartis" },
            quote: {
              de: "It's been wonderful working with V. She is so professional, patient, and accommodating of my difficult schedule. The transition to teaching by video-conference during the pandemic was flawless. I have progressed rapidly, starting from speaking no German to passing the level B1 exam. I have also learned so much about the history and culture of Switzerland. I will continue learning from Viv and can highly recommend her to any prospective student.",
              en: "It's been wonderful working with V. She is so professional, patient, and accommodating of my difficult schedule. The transition to teaching by video-conference during the pandemic was flawless. I have progressed rapidly, starting from speaking no German to passing the level B1 exam. I have also learned so much about the history and culture of Switzerland. I will continue learning from Viv and can highly recommend her to any prospective student.",
            },
            initial: "R",
          },
        ],
      },
      {
        _orbi: { component: "SectionPricing" },
        title: {
          de: "Finden Sie das passende Paket für sich",
          en: "Find the right package for you",
        },
        titleHighlight: {
          de: "Paket für sich",
          en: "package for you",
        },
        introHeading: {
          de: "Welches Paket passt zu Ihnen?",
          en: "Which package suits you?",
        },
        introHeadingHighlight: {
          de: "passt zu Ihnen?",
          en: "suits you?",
        },
        intro: {
          de: "Entdecken Sie unser vielfältiges Angebot und finden Sie das Paket, das am besten zu Ihren Zielen, Ihrem Zeitplan und Ihrem Lernstil passt.\n\nOb flexibel online, persönlich vor Ort, kommunikativ im Gesprächstraining oder individuell im Coaching – wir begleiten Sie strukturiert und zielorientiert auf Ihrem Lernweg.\n\nWählen Sie das Format, das zu Ihnen passt – wir kümmern uns um Ihren Fortschritt.",
          en: "Discover our diverse range of offers and find the package that best fits your goals, schedule, and learning style.\n\nWhether flexible online, in person, communication training, or individual coaching — we guide you in a structured, goal-oriented way.\n\nChoose the format that suits you — we take care of your progress.",
        },
        categories: [
          {
            title: { de: "Online-Pakete", en: "Online packages" },
            plans: [
              {
                name: { de: "Privatkurs", en: "Private course" },
                price: "88",
                unit: { de: "Pro Lektion", en: "Per lesson" },
                duration: { de: "55 Min.", en: "55 min." },
                cta: { de: "Termin vereinbaren", en: "Book an appointment" },
                tilt: "left",
              },
              {
                name: { de: "5er-Abo", en: "5-lesson package" },
                price: "435",
                perLesson: "CHF 87 Pro Lektion",
                cta: { de: "Termin vereinbaren", en: "Book an appointment" },
                tilt: "right",
              },
              {
                name: { de: "20er-Abo", en: "20-lesson package" },
                price: "1'695",
                perLesson: "CHF 85 Pro Lektion",
                cta: { de: "Termin vereinbaren", en: "Book an appointment" },
                tilt: "left",
              },
              {
                name: { de: "Kleingruppe", en: "Small group" },
                note: { de: "Ab 2 Personen", en: "From 2 people" },
                price: "77",
                unit: { de: "Pro Person", en: "Per person" },
                duration: { de: "55 Min.", en: "55 min." },
                variant: "blue",
                cta: { de: "Jetzt buchen", en: "Book now" },
                ctaAction: "calculator",
                tilt: "right",
              },
            ],
          },
          {
            title: {
              de: "Präsenzkurse Liestal",
              en: "In-person courses Liestal",
            },
            plans: [
              {
                name: { de: "Privatkurs", en: "Private course" },
                price: "98",
                unit: { de: "Pro Lektion", en: "Per lesson" },
                duration: { de: "55 Min.", en: "55 min." },
                cta: { de: "Termin vereinbaren", en: "Book an appointment" },
                tilt: "left",
              },
              {
                name: { de: "5er-Abo", en: "5-lesson package" },
                price: "485",
                perLesson: "CHF 97 Pro Lektion",
                cta: { de: "Termin vereinbaren", en: "Book an appointment" },
                tilt: "right",
              },
              {
                name: { de: "20er-Abo", en: "20-lesson package" },
                price: "1'895",
                perLesson: "CHF 95 Pro Lektion",
                cta: { de: "Termin vereinbaren", en: "Book an appointment" },
                tilt: "left",
              },
              {
                subtitle: { de: "Ab 2 Personen", en: "From 2 people" },
                name: { de: "Kleingruppe", en: "Small group" },
                price: "88",
                unit: { de: "Pro Person", en: "Per person" },
                duration: { de: "55 Min.", en: "55 min." },
                variant: "orange",
                cta: { de: "Jetzt buchen", en: "Book now" },
                ctaAction: "calculator",
                tilt: "right",
              },
            ],
          },
        ],
      },
      {
        _orbi: { component: "SectionLocations" },
        title: {
          de: "Sie bestimmen wann und wo Sie lernen",
          en: "You decide when and where you learn",
        },
        titleHighlight: {
          de: "Sie lernen",
          en: "you learn",
        },
        locations: [
          {
            title: { de: "Online", en: "Online" },
            description: {
              de: "Flexibel per Zoom oder Google Meet",
              en: "Flexible via Zoom or Google Meet",
            },
            icon: "/images/home/icon-location-online.svg",
          },
          {
            title: { de: "In Liestal", en: "In Liestal" },
            description: {
              de: "In meinem Kurslokal in Liestal",
              en: "At my course location in Liestal",
            },
            icon: "/images/home/icon-location-liestal.svg",
          },
          {
            title: { de: "In der Firma", en: "At your company" },
            description: {
              de: "In Ihrer Firma oder Organisation",
              en: "At your company or organisation",
            },
            icon: "/images/home/icon-location-firma.svg",
          },
        ],
        kurslokal: {
          title: { de: "Kurslokal", en: "Course location" },
          body: {
            de: "Ich biete eine persönliche und entspannte Lernatmosphäre im kleinen Rahmen. So entsteht Raum, um ohne Druck zu lernen, Fragen zu stellen und sich wirklich weiterzuentwickeln.\n\nNicht jeder fühlt sich in grossen Gruppen wohl. Deshalb arbeite ich bewusst individuell oder in kleinen Einheiten und kann gezielt auf persönliche Ziele und Wünsche eingehen.",
            en: "I offer a personal and relaxed learning atmosphere in a small setting. This creates space to learn without pressure, ask questions, and truly develop.",
          },
          image: IMG.kurslokal,
          ctaLabel: {
            de: "Jetzt online buchen",
            en: "Book online now",
          },
          ctaUrl: "/#kontakt",
        },
      },
      {
        _orbi: { component: "SectionContactForm" },
        title: { de: "Jetzt starten", en: "Get started" },
        labels: {
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
        },
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
      },
    ],
    head: {},
    created_at: new Date(0).toISOString(),
    updated_at: new Date(0).toISOString(),
  }
}

export function homepageSeedBindings(page: IPage) {
  return {
    id: page.id,
    title: JSON.stringify(page.title),
    slug: page.slug,
    lead: JSON.stringify(page.lead),
    img: page.img,
    sections: JSON.stringify(page.sections),
    keywords: JSON.stringify(page.keywords),
    head: JSON.stringify(page.head),
  }
}
