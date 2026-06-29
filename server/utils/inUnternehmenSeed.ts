import type { IPage } from "~/types/dto/IPage"

export const IN_UNTERNEHMEN_PAGE_ID = "private-sprachkurse-in-unternehmen"

const IMG = {
  heroCircle: "/images/in-unternehmen/hero-circle.svg",
  heroArrow: "/images/in-unternehmen/hero-arrow.svg",
  iconStrategy: "/images/in-unternehmen/icon-strategy.svg",
  iconIndividual: "/images/in-unternehmen/icon-individual.svg",
  iconGroups: "/images/in-unternehmen/icon-groups.svg",
  iconFlexible: "/images/in-unternehmen/icon-flexible.svg",
  offerSprachkurse: "/images/in-unternehmen/offer-sprachkurse-bg.png",
  offerPraesentation: "/images/in-unternehmen/PS-2.jpeg",
  offerWortschatz: "/images/in-unternehmen/offer-wortschatz-bg.png",
  contactCta: "/images/in-unternehmen/contact-cta-bg.png",
  statsArrow: "/images/in-unternehmen/stats-arrow.svg",
}

export function buildInUnternehmenSeed(): IPage {
  return {
    id: IN_UNTERNEHMEN_PAGE_ID,
    title: { de: "In Unternehmen", en: "For companies" },
    slug: "in-unternehmen",
    lead: {
      de: "Praxisnahe Sprachkurse und Trainings für internationale Teams und Unternehmen.",
      en: "Practical language courses and training for international teams and companies.",
    },
    img: IMG.offerSprachkurse,
    keywords: [
      "unternehmen",
      "firmenkunden",
      "business english",
      "sprachkurse firma",
      "liestal",
      "private sprachkurse",
    ],
    sections: [
      {
        _orbi: { component: "SectionInUnternehmenHero" },
        tagline: { de: "Im Unternehmen", en: "For companies" },
        title: {
          de: "Sicher und professionell international kommunizieren",
          en: "Communicate internationally with confidence and professionalism",
        },
        titleHighlight: { de: "kommunizieren", en: "professionally" },
        subtitle: {
          de: "Praxisnahe Sprachkurse für Meetings, Präsentationen und internationale Zusammenarbeit",
          en: "Practical language courses for meetings, presentations, and international collaboration",
        },
        ctaLabel: { de: "Kontakt aufnehmen", en: "Get in touch" },
        ctaUrl: "/#kontakt",
        circleImage: IMG.heroCircle,
        arrowImage: IMG.heroArrow,
      },
      {
        _orbi: { component: "SectionInUnternehmenStats" },
        tagline: { de: "Erfahrung", en: "Experience" },
        title: {
          de: "Bewährte Expertise für\nIhr Unternehmen",
          en: "Proven expertise for\nyour company",
        },
        body: {
          de: "Langjährige Erfahrung in der Zusammenarbeit mit internationalen Teams und Unternehmen verschiedenster Größen und Branchen.",
          en: "Many years of experience working with international teams and companies of all sizes and industries.",
        },
        arrowImage: IMG.statsArrow,
        stats: [
          {
            value: "17+",
            label: {
              de: "Jahre Unterrichtserfahrung",
              en: "Years of teaching experience",
            },
            borderAccent: "blue",
          },
          {
            value: "300+",
            label: {
              de: "Firmenkunden trainiert",
              en: "Corporate clients trained",
            },
            borderAccent: "blue",
          },
          {
            value: "5",
            label: { de: "Sprachen unterrichtet", en: "Languages taught" },
            borderAccent: "orange",
          },
          {
            value: "25+",
            label: {
              de: "Jahre internationale Erfahrung",
              en: "Years of international experience",
            },
            borderAccent: "orange",
          },
        ],
      },
      {
        _orbi: { component: "SectionInUnternehmenFeatures" },
        features: [
          {
            icon: IMG.iconStrategy,
            title: {
              de: "Praxisorientiert und wirksam",
              en: "Practical and effective",
            },
            body: {
              de: "Business Know-how trifft Sprachgefühl, effizient und mit Enthusiasmus.",
              en: "Business know-how meets language intuition — efficient and enthusiastic.",
            },
            accent: "blue",
          },
          {
            icon: IMG.iconIndividual,
            title: { de: "Individuell angepasst", en: "Individually tailored" },
            body: {
              de: "Individuelle Betreuung oder Training im kleinen Team, angepasst an Ihr Sprachniveau und Ihre Ziele.",
              en: "Individual coaching or small-team training tailored to your level and goals.",
            },
            accent: "orange",
          },
          {
            icon: IMG.iconGroups,
            title: {
              de: "Einzelunterricht oder Kleingruppentraining",
              en: "One-to-one or small group training",
            },
            body: {
              de: "Sie wählen selbst wie Sie am besten lernen.",
              en: "You choose the learning format that works best for you.",
            },
            accent: "blue",
          },
          {
            icon: IMG.iconFlexible,
            title: { de: "Flexibel im Format", en: "Flexible formats" },
            body: {
              de: "Alle Angebote können als Einzelstunden oder Kurse gebucht werden. In Ihrer Firma, online oder im Sprachlokal in Liestal.",
              en: "All offers are available as single sessions or courses — at your company, online, or at our Liestal classroom.",
            },
            accent: "green",
          },
        ],
      },
      {
        _orbi: { component: "SectionInUnternehmenOffer" },
        tagline: { de: "Sprachentwicklung", en: "Language development" },
        title: { de: "Sprachkurse", en: "Language courses" },
        body: {
          de: "Diese Sprachkurse helfen Ihnen oder Ihrem Team Sprachkenntnisse systematisch zu erweitern und im Arbeitsalltag sicherer zu kommunizieren. Der Unterricht orientiert sich am Sprachniveau der Teilnehmer sowie an den Anforderungen im beruflichen Umfeld.\n\nDie Kurse können als Einzelunterricht oder in kleinen Gruppen stattfinden. So ist es möglich, gezielt auf individuelle Bedürfnisse oder auf die Anforderungen eines Teams einzugehen.\n\nDer Unterricht findet direkt im Unternehmen, online oder in meinem Kurslokal in Liestal statt. Schritt für Schritt verbessern die Teilnehmer ihre Sprachkompetenz und gewinnen mehr Sicherheit im internationalen Arbeitsumfeld.",
          en: "These language courses help you or your team systematically expand language skills and communicate more confidently at work. Lessons are aligned with participants' levels and professional requirements.\n\nCourses can be one-to-one or in small groups, allowing a focus on individual needs or team goals.\n\nLessons take place at your company, online, or at my classroom in Liestal. Step by step, participants improve their competence and gain confidence in international work environments.",
        },
        ctaLabel: { de: "Zur Buchung", en: "Book now" },
        ctaUrl: "/#kontakt",
        backgroundImage: IMG.offerSprachkurse,
        align: "left",
      },
      {
        _orbi: { component: "SectionInUnternehmenOffer" },
        tagline: { de: "Kommunikation", en: "Communication" },
        title: {
          de: "Präsentations- und Sprechtraining",
          en: "Presentation and speaking training",
        },
        body: {
          de: "Ob Präsentationen, Meetings oder Gespräche mit internationalen Partnern, klare und sichere Kommunikation ist entscheidend. Im Training arbeiten wir gezielt an Ausdruck, Struktur und Selbstsicherheit, damit Sie Ihre Inhalte überzeugend vermitteln können.\n\nGleichzeitig bietet das Training Raum, das freie Sprechen zu üben und mehr Sicherheit im spontanen Ausdruck zu gewinnen. So verbessern die Teilnehmer Schritt für Schritt ihre mündliche Kommunikation, sowohl in beruflichen Situationen als auch im allgemeinen Gespräch.",
          en: "Whether presentations, meetings, or conversations with international partners — clear, confident communication is essential. We work on expression, structure, and confidence so you can deliver your message convincingly.\n\nThe training also provides space to practise spontaneous speaking. Participants gradually improve oral communication in professional and everyday situations.",
        },
        ctaLabel: { de: "Zur Buchung", en: "Book now" },
        ctaUrl: "/#kontakt",
        backgroundImage: IMG.offerPraesentation,
        align: "right",
      },
      {
        _orbi: { component: "SectionInUnternehmenOffer" },
        tagline: { de: "Fachsprache", en: "Professional vocabulary" },
        title: { de: "Wortschatztraining", en: "Vocabulary training" },
        body: {
          de: "Sicher kommunizieren bedeutet auch, den richtigen Wortschatz zu beherrschen. Im Training erweitern Sie gezielt Ihren beruflichen Wortschatz, abgestimmt auf Ihre Branche, Ihre Aufgaben und typische Kommunikationssituationen im Arbeitsalltag.\n\nNeue Begriffe werden dabei nicht nur gelernt, sondern in praxisnahen Übungen angewendet und gefestigt. Durch abwechslungsreiche und praxisorientierte Methoden bleibt das Training lebendig und der neue Wortschatz kann später sicher im beruflichen Alltag eingesetzt werden.",
          en: "Confident communication also means mastering the right vocabulary. Training expands professional vocabulary aligned with your industry, role, and typical workplace situations.\n\nNew terms are practised in realistic exercises and reinforced through varied, hands-on methods so they can be used confidently at work.",
        },
        ctaLabel: { de: "Zur Buchung", en: "Book now" },
        ctaUrl: "/#kontakt",
        backgroundImage: IMG.offerWortschatz,
        align: "left",
      },
      {
        _orbi: { component: "SectionInUnternehmenTailored" },
        tagline: { de: "Kurse", en: "Courses" },
        title: {
          de: "Massgeschneiderte Kurse für Ihr Unternehmen",
          en: "Tailored courses for your company",
        },
        titleHighlight: { de: "Unternehmen", en: "company" },
        body: {
          de: "Sie möchten sich oder Ihr Team sprachlich gezielt weiterentwickeln oder auf bestimmte Kommunikationssituationen vorbereiten? Gerne entwickle ich für Sie massgeschneiderte Kurse, die auf Ihre beruflichen Anforderungen und Ziele abgestimmt sind.",
          en: "Would you like to develop language skills for yourself or your team, or prepare for specific communication situations? I am happy to develop tailored courses aligned with your professional requirements and goals.",
        },
      },
      {
        _orbi: { component: "SectionInUnternehmenContactCta" },
        title: { de: "Haben Sie Fragen?", en: "Any questions?" },
        body: {
          de: "Beschreiben Sie mir Ihr Anliegen über das Kontaktformular oder rufen Sie direkt an.",
          en: "Describe your request via the contact form or call me directly.",
        },
        ctaLabel: { de: "Kontakt", en: "Contact" },
        ctaUrl: "/#kontakt",
        backgroundImage: IMG.contactCta,
      },
    ],
    head: {},
    created_at: new Date(0).toISOString(),
    updated_at: new Date(0).toISOString(),
  }
}
