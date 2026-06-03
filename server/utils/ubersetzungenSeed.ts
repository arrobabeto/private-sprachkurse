import type { IPage } from "~/types/dto/IPage"

export const UBERSETZUNGEN_PAGE_ID = "private-sprachkurse-ubersetzungen"

const IMG = {
  hero: "/images/ubersetzungen/hero-bg.png",
  business: "/images/ubersetzungen/business.png",
  private: "/images/ubersetzungen/private.png",
  advisory: "/images/ubersetzungen/advisory.png",
  cta: "/images/ubersetzungen/cta-bg.png",
  iconNews: "/images/ubersetzungen/icon-news.svg",
  iconOutgoingMail: "/images/ubersetzungen/icon-outgoing-mail.svg",
  iconBusinessCenter: "/images/ubersetzungen/icon-business-center.svg",
  iconSell: "/images/ubersetzungen/icon-sell.svg",
  iconCommunication: "/images/ubersetzungen/icon-communication.svg",
  iconWysiwyg: "/images/ubersetzungen/icon-wysiwyg.svg",
  iconSchool: "/images/ubersetzungen/icon-school.svg",
  iconPersonalPlaces: "/images/ubersetzungen/icon-personal-places.svg",
  iconTask: "/images/ubersetzungen/icon-task.svg",
  iconFiles: "/images/ubersetzungen/icon-files.svg",
  iconMail: "/images/ubersetzungen/icon-mail.svg",
  iconTextCompare: "/images/ubersetzungen/icon-text-compare.svg",
  iconEdit: "/images/ubersetzungen/icon-edit.svg",
  iconInboxTextPerson: "/images/ubersetzungen/icon-inbox-text-person.svg",
  iconAccountCircle: "/images/ubersetzungen/icon-account-circle.svg",
  iconClockLoader: "/images/ubersetzungen/icon-clock-loader.svg",
  iconBusinessCenterTab: "/images/ubersetzungen/icon-business-center-tab.svg",
}

export function buildUbersetzungenSeed(): IPage {
  return {
    id: UBERSETZUNGEN_PAGE_ID,
    title: { de: "Übersetzungen", en: "Translations" },
    slug: "ubersetzungen",
    lead: {
      de: "Sorgfältige Übersetzungen und sprachliche Überarbeitung in fünf Sprachen.",
      en: "Careful translations and language editing in five languages.",
    },
    img: IMG.hero,
    keywords: [
      "übersetzungen",
      "übersetzerin",
      "liestal",
      "deutsch",
      "englisch",
      "französisch",
      "spanisch",
      "italienisch",
    ],
    sections: [
      {
        _orbi: { component: "SectionUbersetzungenHero" },
        backgroundImage: IMG.hero,
        titlePrefix: { de: "Übersetzungen in", en: "Translations in" },
        titleHighlight: { de: "5", en: "5" },
        titleSuffix: { de: "Sprachen", en: "languages" },
        body: {
          de: "Sorgfältige Übersetzungen und sprachliche Überarbeitung für Privatpersonen, Selbstständige und Unternehmen in Spanisch, Deutsch, Englisch, Französisch und Italienisch.",
          en: "Careful translations and language editing for private clients, freelancers, and businesses in Spanish, German, English, French, and Italian.",
        },
      },
      {
        _orbi: { component: "SectionUbersetzungenBusiness" },
        image: IMG.business,
        tagline: {
          de: "Übersetzungen für Unternehmen",
          en: "Translations for businesses",
        },
        title: { de: "Professionelle Texte", en: "Professional texts" },
        body: {
          de: "Internationale Kommunikation erfordert präzise und verständliche Formulierungen. Professionelle Übersetzungen helfen dabei, Inhalte nicht nur fachlich präzise sondern auch kulturell passend zu vermitteln. So können Missverständnisse vermieden werden.",
          en: "International communication requires precise and clear wording. Professional translations help convey content not only accurately but also in a culturally appropriate way, avoiding misunderstandings.",
        },
        items: [
          {
            icon: IMG.iconNews,
            label: {
              de: "Angebote, Berichte oder Dokumentationen",
              en: "Proposals, reports, or documentation",
            },
          },
          {
            icon: IMG.iconOutgoingMail,
            label: {
              de: "Geschäftliche E-Mails und Korrespondenz",
              en: "Business emails and correspondence",
            },
          },
          {
            icon: IMG.iconBusinessCenter,
            label: {
              de: "Präsentationen und Unternehmensunterlagen",
              en: "Presentations and company documents",
            },
          },
          {
            icon: IMG.iconSell,
            label: {
              de: "Marketing- und Informationstexte",
              en: "Marketing and information copy",
            },
          },
          {
            icon: IMG.iconCommunication,
            label: {
              de: "Interne Kommunikation",
              en: "Internal communication",
            },
          },
        ],
      },
      {
        _orbi: { component: "SectionUbersetzungenPrivate" },
        image: IMG.private,
        tagline: {
          de: "Übersetzungen für Privat",
          en: "Translations for individuals",
        },
        title: { de: "Persönliche Dokumente", en: "Personal documents" },
        body: {
          de: "Ob geschäftliche Korrespondenz, Dokumente oder Präsentationen, ich unterstütze Sie dabei, Inhalte klar und passend in der benötigten Sprache zu kommunizieren. Als Übersetzerin oder in beratender Funktion.",
          en: "Whether business correspondence, documents, or presentations, I help you communicate clearly in the language you need — as a translator or in an advisory role.",
        },
        items: [
          {
            icon: IMG.iconWysiwyg,
            label: {
              de: "Bewerbungen und Lebensläufe",
              en: "Applications and CVs",
            },
          },
          {
            icon: IMG.iconSchool,
            label: {
              de: "Akademische Arbeiten oder Facharbeiten",
              en: "Academic or specialist papers",
            },
          },
          {
            icon: IMG.iconPersonalPlaces,
            label: { de: "Persönliche Dokumente", en: "Personal documents" },
          },
          {
            icon: IMG.iconTask,
            label: {
              de: "Unterlagen für Studium oder Ausbildung",
              en: "Documents for study or training",
            },
          },
          {
            icon: IMG.iconFiles,
            label: {
              de: "Allgemeine Schriftstücke",
              en: "General written materials",
            },
          },
        ],
        primaryCta: { label: { de: "Buchen", en: "Book" }, url: "/#kontakt" },
        secondaryCta: {
          label: { de: "Mehr erfahren", en: "Learn more" },
          url: "/#kontakt",
        },
      },
      {
        _orbi: { component: "SectionUbersetzungenAdvisory" },
        image: IMG.advisory,
        title: {
          de: "Sprachliche Unterstützung und Beratung",
          en: "Language support and consulting",
        },
        body: {
          de: "Manchmal geht es nicht nur darum, einen Text zu übersetzen, sondern ihn in einer anderen Sprache klar und passend zu formulieren. Neben Inhalt und Struktur spielen auch Ton, Wirkung und die Intention hinter einem Text eine wichtige Rolle. Gerne schaue ich mir Ihre fremdsprachigen Texte gemeinsam mit Ihnen an und berate Sie bei Formulierung, Stil und Verständlichkeit, sowohl für berufliche als auch für persönliche Anliegen.",
          en: "Sometimes it is not only about translating a text, but expressing it clearly in another language. Tone, impact, and intention matter. I am happy to review your foreign-language texts with you and advise on wording, style, and clarity for professional and personal needs.",
        },
        items: [
          {
            icon: IMG.iconMail,
            label: {
              de: "Unterstützung bei E-Mails oder schriftlicher Kommunikation",
              en: "Support with emails or written communication",
            },
          },
          {
            icon: IMG.iconBusinessCenter,
            label: {
              de: "Hilfe bei Bewerbungen, Lebensläufen oder Motivationsschreiben",
              en: "Help with applications, CVs, or cover letters",
            },
          },
          {
            icon: IMG.iconTextCompare,
            label: {
              de: "Sprachliche Überarbeitung bestehender Texte",
              en: "Language editing of existing texts",
            },
          },
          {
            icon: IMG.iconEdit,
            label: {
              de: "Unterstützung bei Präsentationen oder Textentwürfen",
              en: "Support with presentations or drafts",
            },
          },
          {
            icon: IMG.iconInboxTextPerson,
            label: {
              de: "Anpassung von Texten an unterschiedliche Zielgruppen",
              en: "Adapting texts to different audiences",
            },
          },
        ],
        primaryCta: {
          label: { de: "Jetzt Beratung anfragen", en: "Request consultation" },
          url: "/#kontakt",
        },
      },
      {
        _orbi: { component: "SectionUbersetzungenQuality" },
        tagline: { de: "Qualität", en: "Quality" },
        titleBefore: { de: "Was eine gute ", en: "What makes a good " },
        titleHighlight: { de: "Übersetzung ausmacht", en: "translation" },
        titleAfter: { de: "", en: "" },
        body: {
          de: "Eine gelungene Übersetzung ist verständlich, stilistisch passend und nah an der Aussage des Originals. Sie hilft dabei, Inhalte überzeugend zu vermitteln.",
          en: "A successful translation is clear, stylistically appropriate, and faithful to the original. It helps convey your message convincingly.",
        },
        pillars: [
          {
            tabIcon: IMG.iconAccountCircle,
            tabTheme: "green",
            title: { de: "Sprachgefühl", en: "Language intuition" },
            body: {
              de: "Texte werden nicht nur wörtlich übertragen, sondern so formuliert, dass sie im jeweiligen Kontext natürlich und passend wirken.",
              en: "Texts are not translated word for word, but phrased to sound natural and appropriate in context.",
            },
          },
          {
            tabIcon: IMG.iconClockLoader,
            tabTheme: "cream",
            title: { de: "Schnelle Abwicklung", en: "Fast turnaround" },
            body: {
              de: "Dringende Projekte warten nicht, und ich liefere auch unter Zeitdruck verlässliche Ergebnisse.",
              en: "Urgent projects cannot wait — I deliver reliable results even under time pressure.",
            },
          },
          {
            tabIcon: IMG.iconBusinessCenterTab,
            tabTheme: "blue",
            title: {
              de: "Für Alltag und Beruf",
              en: "For everyday life and work",
            },
            body: {
              de: "Von E-Mails und Bewerbungsunterlagen bis zu Webseitentexten und geschäftlicher Kommunikation. Von Verträgen über Webseiten bis zu Marketingmaterialien.",
              en: "From emails and application documents to website copy and business communication — from contracts to marketing materials.",
            },
          },
        ],
      },
      {
        _orbi: { component: "SectionUbersetzungenCta" },
        backgroundImage: IMG.cta,
        title: { de: "Angebot anfordern", en: "Request a quote" },
        body: {
          de: "Rufen Sie mich an oder senden Sie mir Ihre Unterlagen und Textbeispiele per E-Mail zu. Ich melde mich zeitnah mit einem unverbindlichen Angebot zu Umfang und Kosten.",
          en: "Call me or send your documents and sample texts by email. I will get back to you promptly with a non-binding quote for scope and cost.",
        },
        primaryCtaLabel: { de: "Anfragen", en: "Inquire" },
        primaryCtaUrl: "/#kontakt",
        secondaryCtaLabel: { de: "Anrufen", en: "Call" },
        secondaryCtaUrl: "tel:+41789433963",
      },
    ],
    head: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}
