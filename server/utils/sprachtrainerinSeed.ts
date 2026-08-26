import type { IPage } from "~/types/dto/IPage"

export const SPRACHTRAINERIN_ID = "private-sprachkurse-sprachtrainerin"

const IMG = {
  hero: "/images/sprachtrainerin/hero-bg.png",
  philosophy1: "/images/sprachtrainerin/philosophy-1-v2.png",
  philosophy2: "/images/sprachtrainerin/philosophy-2.png",
  philosophy3: "/images/sprachtrainerin/philosophy-3.png",
  philosophy4: "/images/sprachtrainerin/philosophy-4.png",
  certSveb1: "/images/sprachtrainerin/cert-sveb1-v2.png",
  certEurolta: "/images/sprachtrainerin/cert-eurolta-v2.png",
  // Sprache im Beruf — corporate training session
  certFce: "/images/sprachtrainerin/cert-fce.png",
  arrow: "/images/sprachtrainerin/arrow-1.svg",
  arrow2: "/images/sprachtrainerin/arrow-2.svg",
  ctaCircle: "/images/sprachtrainerin/cta-circle.svg",
}

export function buildSprachtrainerinSeed(): IPage {
  return {
    id: SPRACHTRAINERIN_ID,
    title: { de: "Sprachtrainerin", en: "Language trainer" },
    slug: "sprachtrainerin",
    lead: {
      de: "Lernen Sie Viviane Baier-Angi kennen – Ihre Sprachlehrerin mit Leidenschaft, Erfahrung und Herz.",
      en: "Meet Viviane Baier-Angi — your language teacher with passion, experience, and heart.",
    },
    img: IMG.hero,
    keywords: [
      "sprachtrainerin",
      "sprachlehrerin",
      "viviane baier-angi",
      "private sprachkurse",
      "liestal",
    ],
    sections: [
      {
        _orbi: { component: "SectionTrainerHero" },
        backgroundImage: IMG.hero,
        title: {
          de: "Ciao, Hola, Hello, Bonjour und Hallo!\nSchön Sie kennenzulernen.",
          en: "Ciao, Hola, Hello, Bonjour and Hallo!\nNice to meet you.",
        },
        body: {
          de: "Ich unterrichte Privat- und Firmenkunden, individuell zugeschnitten und mit viel Leidenschaft und Spass. Lernen Sie von jemandem, der Sprache nicht nur unterrichtet, sondern lebt.",
          en: "I teach private and corporate clients with tailored lessons, passion, and fun. Learn from someone who doesn't just teach language — she lives it.",
        },
        ctaLabel: { de: "Mehr Erfahren", en: "Learn more" },
        ctaUrl: "#stats",
      },
      {
        _orbi: { component: "SectionTrainerQuote" },
        quote: {
          de: "Wer eine neue Sprache lernen, die eigenen Kenntnisse aufbessern oder einfach nur ein bisschen reden möchte, ist bei mir genau am richtigen Ort.",
          en: "Whether you want to learn a new language, improve your skills, or simply have a conversation — you're in the right place with me.",
        },
        author: { de: "Viviane", en: "Viviane" },
      },
      {
        _orbi: { component: "SectionTrainerStats" },
        tagline: { de: "Viviane Baier-Angi", en: "Viviane Baier-Angi" },
        title: { de: "Ihre Sprachlehrerin", en: "Your language teacher" },
        arrowImage: IMG.arrow,
        stats: [
          {
            value: "16",
            label: { de: "Jahre im Ausland", en: "Years abroad" },
            accent: "green",
          },
          {
            value: "100%",
            label: {
              de: "Einsatz für meine Schüler",
              en: "Commitment to my students",
            },
            accent: "blue",
          },
          {
            value: "40",
            label: {
              de: "Jahre Faszination für Sprachen",
              en: "Years fascinated by languages",
            },
            accent: "green",
          },
          {
            value: "4000+",
            label: { de: "Unterrichtsstunden gegeben", en: "Lessons taught" },
            accent: "green",
          },
          {
            value: "5",
            label: {
              de: "Sprachen fliessend",
              en: "Languages spoken fluently",
            },
            accent: "blue",
          },
          {
            value: "999+",
            label: { de: "Schüler unterrichtet", en: "Students taught" },
            accent: "green",
          },
        ],
      },
      {
        _orbi: { component: "SectionTrainerPhilosophy" },
        slides: [
          {
            title: {
              de: "Sprachen muss man leben",
              en: "Languages must be lived",
            },
            body: {
              de: "Sprachen lernt man nicht nur im Lehrbuch. Man muss sie erfahren.\n\nEine Sprache ist nicht nur Grammatik und Vokabeln. Sie ist das Atmen einer Kultur, die Art, wie Menschen denken und miteinander sprechen. Ich bin zweisprachig aufgewachsen und habe mehr als sechzehn Jahre in Malta, der Dominikanischen Republik, auf den Malediven und auf Teneriffa gelebt.\n\nDort habe ich gelernt, dass man eine Sprache erst versteht, wenn man sie erlebt, wenn man sie im Alltag spricht, wenn man scheitert und wieder versucht, wenn man lacht und verstanden wird. Genau diese Erfahrung hat meine Sicht auf Sprachen geprägt.\n\nDenn Sprache bedeutet vor allem eines: Verbindung zwischen Menschen.",
              en: "You don't learn languages from textbooks alone. You have to experience them.\n\nA language is not just grammar and vocabulary. It is the breath of a culture, the way people think and speak together. I grew up bilingual and lived for more than sixteen years in Malta, the Dominican Republic, the Maldives, and Tenerife.\n\nThere I learned that you only truly understand a language when you live it — when you speak it in everyday life, when you fail and try again, when you laugh and are understood. That experience shaped my view of languages.\n\nBecause above all, language means one thing: connection between people.",
            },
            image: IMG.philosophy1,
          },
          {
            title: {
              de: "Sprachen öffnen Türen zu Chancen und Menschen",
              en: "Languages open doors to opportunities and people",
            },
            body: {
              de: "Wer die Sprache eines Landes spricht, erlebt Begegnungen anders. Gespräche werden persönlicher, Vertrauen entsteht schneller und man versteht nicht nur Worte, sondern auch Denkweisen und Perspektiven.\n\nWährend meiner Zeit im Ausland habe ich immer wieder erlebt, wie viele Türen sich durch Sprache öffnen können, zu neuen Freundschaften, zu beruflichen Möglichkeiten und zu internationaler Zusammenarbeit.\n\nDiese Erfahrung prägt auch meinen Unterricht. Sprache wird nicht nur als Lernstoff vermittelt, sondern als Werkzeug, um sich auszudrücken, zu verstehen und mit Menschen aus unterschiedlichen Kulturen in Kontakt zu treten.\n\nDoch gerade im internationalen Alltag merkt man schnell: Sprache muss nicht nur verstanden, sondern auch sicher angewendet werden.",
              en: "If you speak the language of a country, you experience encounters differently. Conversations become more personal, trust builds faster, and you understand not only words but also ways of thinking and perspectives.\n\nDuring my time abroad I repeatedly experienced how many doors language can open — to new friendships, career opportunities, and international collaboration.\n\nThis experience also shapes my teaching. Language is not just taught as subject matter, but as a tool to express yourself, understand others, and connect with people from different cultures.\n\nYet in international everyday life you quickly notice: language must not only be understood, but applied confidently.",
            },
            image: IMG.philosophy2,
          },
          {
            title: {
              de: "Sprachen im professionellen Alltag",
              en: "Languages in professional everyday life",
            },
            body: {
              de: "Im Laufe der Jahre habe ich in internationalen Arbeitsumgebungen täglich mit mehreren Sprachen gearbeitet. Ich übersetzte Gespräche simultan zwischen mehreren Sprachen, unterstützte bei Behördengängen, übernahm schriftliche Übersetzungen und arbeitete mit Menschen aus verschiedenen Ländern zusammen.\n\nIn solchen Situationen wird deutlich, wie wichtig klare und präzise Kommunikation ist. Sprache muss funktionieren, im Gespräch, im Beruf und in realen Situationen.\n\nDiese praktische Erfahrung fliesst direkt in meinen Unterricht ein. Die Sprache wird nicht nur gelernt, sondern aktiv angewendet und trainiert, sodass sie im Alltag sicher und selbstverständlich eingesetzt werden kann.\n\nDabei habe ich immer wieder festgestellt, dass es keinen einzigen richtigen Weg gibt, eine Sprache zu lernen.",
              en: "Over the years I worked daily with several languages in international work environments. I interpreted conversations simultaneously between languages, supported people with official appointments, handled written translations, and collaborated with people from many countries.\n\nIn such situations it becomes clear how important clear and precise communication is. Language has to work — in conversation, at work, and in real situations.\n\nThis practical experience flows directly into my teaching. Language is not only learned but actively applied and trained so it can be used confidently and naturally in everyday life.\n\nAgain and again I found that there is no single right way to learn a language.",
            },
            image: IMG.philosophy3,
          },
          {
            title: {
              de: "Jeder Mensch lernt anders",
              en: "Everyone learns differently",
            },
            body: {
              de: "Durch meine Arbeit mit Menschen aus verschiedenen Ländern und mit ganz unterschiedlichen Sprachniveaus wurde mir immer wieder bewusst, dass jeder Mensch auf seine eigene Weise lernt.\n\nManche lernen durch Gespräche, andere durch visuelle Materialien, wieder andere durch strukturierte Übungen. Deshalb ist mir ein Unterricht wichtig, der flexibel auf die Teilnehmer eingeht.\n\nInhalte, Tempo und Methoden werden an Sprachniveau, Ziele und Interessen angepasst. So entsteht ein Unterricht, der motiviert, Sicherheit gibt und nachhaltige Fortschritte ermöglicht.\n\nUnd genau daraus entwickelt sich auch mein Unterrichtsansatz.",
              en: "Through my work with people from different countries and at very different language levels, I kept realizing that everyone learns in their own way.\n\nSome learn through conversation, others through visual materials, others through structured exercises. That is why flexible teaching that responds to participants matters to me.\n\nContent, pace, and methods are adapted to language level, goals, and interests. This creates lessons that motivate, build confidence, and enable lasting progress.\n\nAnd that is exactly how my teaching approach developed.",
            },
            image: IMG.philosophy4,
          },
        ],
      },
      {
        _orbi: { component: "SectionTrainerMethods" },
        title: { de: "Methoden:", en: "Methods:" },
        subtitle: {
          de: "Praxisnah, motivierend und abwechslungsreich",
          en: "Practical, motivating, and varied",
        },
        intro: {
          de: "Sprachen lernt man am besten durch aktive Anwendung. Im Unterricht werden deshalb unterschiedliche Methoden kombiniert, Gespräche, visuelle Materialien und praxisnahe Übungen. Eine positive und entspannte Lernatmosphäre hilft dabei, Hemmungen abzubauen und die Sprache mit mehr Sicherheit anzuwenden.",
          en: "Languages are best learned through active use. In my lessons I therefore combine different methods — conversation, visual materials, and practical exercises. A positive and relaxed learning atmosphere helps reduce inhibitions and apply the language with greater confidence.",
        },
        methods: [
          {
            number: "1",
            title: {
              de: "Visuelle Lernmethoden",
              en: "Visual learning methods",
            },
            body: {
              de: "Visuelle Materialien wie Wortkarten, Illustrationen oder thematische Übungen helfen dabei, neue Wörter schneller zu verstehen und im Gedächtnis zu behalten. Durch die Verbindung von Bild und Sprache wird der Wortschatz auf natürliche Weise erweitert.",
              en: "Visual materials such as flashcards, illustrations, or themed exercises help you understand and remember new words faster. Connecting images with language expands vocabulary naturally.",
            },
          },
          {
            number: "2",
            title: {
              de: "Kommunikatives Lernen",
              en: "Communicative learning",
            },
            body: {
              de: "Sprache wird vor allem durch Anwendung gelernt. Gespräche, Dialogübungen und spontane Aufgaben fördern die mündliche Kommunikation und helfen dabei, Sicherheit im Ausdruck zu entwickeln. So wird das Gelernte direkt im Gespräch angewendet.",
              en: "Language is learned primarily through use. Conversations, dialogue exercises, and spontaneous tasks promote oral communication and help build confidence in expression. What you learn is applied directly in conversation.",
            },
          },
          {
            number: "3",
            title: {
              de: "Individuelle Anpassung",
              en: "Individual adaptation",
            },
            body: {
              de: "Durch eine große Auswahl an Unterrichtsmaterialien können Inhalte flexibel an Sprachniveau, Interessen und berufliche Anforderungen angepasst werden. Dadurch ist es möglich, jederzeit auf spezifische Themen oder Fragen der Teilnehmer einzugehen.",
              en: "With a wide range of teaching materials, content can be flexibly adapted to language level, interests, and professional requirements. This makes it possible to address specific topics or questions from participants at any time.",
            },
          },
          {
            number: "4",
            title: {
              de: "Motivation und angstfreies Lernen",
              en: "Motivation and anxiety-free learning",
            },
            body: {
              de: "Eine positive und freudvolle Lernatmosphäre hilft dabei, Hemmungen beim Sprechen abzubauen. Mit abwechslungsreichen Übungen, Humor und praxisnahen Aufgaben entsteht eine entspannte Umgebung, in der sich Teilnehmer trauen, die Sprache aktiv anzuwenden und Schritt für Schritt mehr Sicherheit zu gewinnen.",
              en: "A positive and joyful learning atmosphere helps reduce speaking anxiety. With varied exercises, humor, and practical tasks, a relaxed environment emerges where participants dare to use the language actively and gradually gain confidence.",
            },
          },
        ],
        arrowImage: IMG.arrow2,
      },
      {
        _orbi: { component: "SectionTrainerQualifications" },
        title: {
          de: "Fach-Qualifikationen",
          en: "Professional qualifications",
        },
        qualifications: [
          {
            number: "01",
            tabLabel: { de: "SVEB1 Zertifikat", en: "SVEB1 certificate" },
            title: {
              de: "Schweizerischen Fachausweis vom SVEB1",
              en: "Swiss professional diploma from SVEB1",
            },
            body: {
              de: "Der Schweizerische Verband für Erwachsenenbildung bestätigt meine Fachkompetenz im professionellen Unterricht mit Erwachsenen.",
              en: "The Swiss Federation for Adult Learning confirms my professional competence in teaching adults.",
            },
            image: IMG.certSveb1,
            theme: "orange",
          },
          {
            number: "02",
            tabLabel: { de: "Eurolta Zertifikat", en: "Eurolta certificate" },
            title: {
              de: "Internationale Sprachlehre (Eurolta Zertifikat)",
              en: "International language teaching (Eurolta certificate)",
            },
            body: {
              de: "Dieses Zertifikat bescheinigt meine Fähigkeit, Sprachen nach modernen, international anerkannten Methoden zu unterrichten.",
              en: "This certificate confirms my ability to teach languages using modern, internationally recognized methods.",
            },
            image: IMG.certEurolta,
            theme: "cream",
          },
          {
            number: "03",
            tabLabel: {
              de: "Sprache im Beruf",
              en: "Language at work",
            },
            title: { de: "Sprache im Beruf", en: "Language at work" },
            body: {
              de: "Ich habe mit über 500 Unternehmen zusammengearbeitet und weiß, wie Sprache in echten Arbeitssituationen funktioniert.",
              en: "I have worked with over 500 companies and know how language works in real work situations.",
            },
            image: IMG.certFce,
            theme: "green",
          },
        ],
      },
      {
        _orbi: { component: "SectionTrainerCta" },
        title: {
          de: "Ich freue mich darauf, Sie auf Ihrem Weg zu begleiten.",
          en: "I look forward to accompanying you on your journey.",
        },
        titleHighlight: {
          de: "zu begleiten.",
          en: "on your journey.",
        },
        circleImage: IMG.ctaCircle,
        subtitle: {
          de: "Bereit mit dem Unterricht zu beginnen?",
          en: "Ready to start lessons?",
        },
        primaryCtaLabel: {
          de: "Zu den Kursangeboten",
          en: "View course offers",
        },
        primaryCtaUrl: "/angebote",
        secondaryCtaLabel: { de: "Kontakt", en: "Contact" },
        secondaryCtaUrl: "/#kontakt",
      },
    ],
    head: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}
