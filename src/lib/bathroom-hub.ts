import type { Post } from "contentlayer/generated"
import { getTopicHubPosts, type TopicHubDictionary, type TopicHubLocale } from "@/lib/topic-hub"

export const bathroomHubSlugs: Record<TopicHubLocale, string[]> = {
    ru: [
        "trendy-vannoy-2026",
        "vannaya-v-stile-domashnego-spa-bez-pereplaty",
        "kak-vybrat-plitku",
        "5-oshibok-remonta-vannoy-komnaty",
        "remont-vannoy",
    ],
    en: [
        "bathroom-trends-2026",
        "spa-like-bathroom-on-a-budget",
        "how-to-choose-bathroom-tiles",
        "5-bathroom-mistakes",
        "diy-bathroom-makeover",
    ],
}

const bathroomHubDictionaries: Record<TopicHubLocale, TopicHubDictionary> = {
    ru: {
        key: "bathroom",
        path: "/bathroom",
        title: "Ванная комната: идеи и планирование ремонта",
        description:
            "Лучшие материалы Renohacks про ванную: тренды, плитка, типовые ошибки, вентиляция, теплый пол и практичные инструменты для планирования ремонта.",
        keywords: [
            "ремонт ванной",
            "ванная комната идеи",
            "плитка для ванной",
            "ошибки ремонта ванной",
            "вентиляция в ванной",
            "теплый пол в ванной",
            "дизайн ванной комнаты",
        ],
        eyebrow: "Тематический хаб",
        breadcrumbLabel: "Ванная",
        featureCards: [
            {
                icon: "home",
                title: "Планировка мокрой зоны",
                description: "Душ, проходы, тумба и хранение, которые делают ванную удобной каждый день.",
            },
            {
                icon: "grid",
                title: "Плитка и поверхности",
                description: "Как выбрать плитку, посчитать запас и подобрать спокойные фактуры без визуального шума.",
            },
            {
                icon: "wrench",
                title: "Свет, вентиляция и тепло",
                description: "Инженерная часть ванной: воздухообмен, свет у зеркала и теплый пол без лишних ошибок.",
            },
        ],
        calculator: {
            icon: "grid",
            eyebrow: "Практический инструмент",
            title: "Калькулятор плитки для ванной",
            description:
                "Посчитайте плитку, запас, упаковки и клей для пола и стен ванной до закупки материалов.",
            href: "/calculators/tile",
            buttonLabel: "Открыть калькулятор",
        },
        relatedTitle: "Что еще посмотреть по ванной",
        relatedLinks: [
            {
                icon: "wrench",
                title: "Калькулятор вентиляции",
                description: "Проверьте воздухообмен для мокрой зоны и душа.",
                href: "/calculators/ventilation",
            },
            {
                icon: "calculator",
                title: "Калькулятор теплого пола",
                description: "Оцените мощность и площадь обогрева под плитку.",
                href: "/calculators/underfloor-heating",
            },
            {
                icon: "lightbulb",
                title: "Хаб по освещению",
                description: "Подборка материалов про свет у зеркала, цветовую температуру и сценарии света.",
                href: "/lighting",
            },
        ],
        featuredLabel: "С чего начать",
        featuredIntro:
            "Сначала посмотреть сильные решения для ванной, потом проверить типовые ошибки, выбор плитки и инженерные узлы.",
        articlesTitle: "Статьи про ванную",
        articlesDescription:
            "Подборка материалов про тренды ванной, выбор плитки, частые ошибки и практичный ремонт без лишней переделки.",
        faqTitle: "Частые вопросы о ремонте ванной",
        faqs: [
            {
                question: "Что планировать раньше: сантехнику, раскладку или отделку?",
                answer:
                    "Начинать лучше с планировки ванной и мокрых зон, затем расставить сантехнику, вентиляцию и электрику, и только потом переходить к раскладке плитки и отделке.",
            },
            {
                question: "Сколько плитки брать с запасом для ванной?",
                answer:
                    "Для прямой раскладки обычно хватает около 10 процентов, для диагонали и сложной подрезки лучше закладывать около 15 процентов.",
            },
            {
                question: "Нужна ли усиленная вентиляция в ванной с душем без бортика?",
                answer:
                    "Да. Чем больше открытая мокрая зона, тем важнее стабильный воздухообмен, чтобы влага быстрее уходила и отделка служила дольше.",
            },
            {
                question: "Когда теплый пол в ванной действительно полезен?",
                answer:
                    "Теплый пол особенно оправдан при плитке на полу, ежедневном использовании ванной и холодном основании. Он заметно повышает бытовой комфорт утром и вечером.",
            },
            {
                question: "Как удешевить ванную без ощущения дешевого ремонта?",
                answer:
                    "Лучше упростить геометрию, отказаться от лишнего декора, держать спокойную палитру и вложиться в хорошую плитку, свет и сантехнику в самых заметных точках.",
            },
        ],
    },
    en: {
        key: "bathroom",
        path: "/en/bathroom",
        title: "Bathroom Renovation Ideas and Planning",
        description:
            "Best Renohacks bathroom content: bathroom trends, tile selection, common remodeling mistakes, ventilation, heated floors, and practical planning tools.",
        keywords: [
            "bathroom renovation ideas",
            "bathroom remodel planning",
            "bathroom tile ideas",
            "bathroom remodeling mistakes",
            "bathroom ventilation",
            "heated bathroom floor",
            "bathroom design ideas",
        ],
        eyebrow: "Topic hub",
        breadcrumbLabel: "Bathroom",
        featureCards: [
            {
                icon: "home",
                title: "Wet-zone layout",
                description: "Showers, clearances, vanity size, and storage choices that make a bathroom easier to use.",
            },
            {
                icon: "grid",
                title: "Tile and finish choices",
                description: "How to choose bathroom tile, plan waste, and use durable finishes that still feel calm.",
            },
            {
                icon: "wrench",
                title: "Ventilation, lighting, and heat",
                description: "The systems side of a bathroom remodel: airflow, mirror lighting, and heated floors.",
            },
        ],
        calculator: {
            icon: "grid",
            eyebrow: "Practical tool",
            title: "Bathroom tile calculator",
            description:
                "Estimate tile, waste, packs, and adhesive for bathroom floors and walls before you order materials.",
            href: "/en/calculators/tile",
            buttonLabel: "Open calculator",
        },
        relatedTitle: "Also useful for bathroom planning",
        relatedLinks: [
            {
                icon: "wrench",
                title: "Ventilation calculator",
                description: "Check the airflow you need for a bathroom and shower area.",
                href: "/en/calculators/ventilation",
            },
            {
                icon: "calculator",
                title: "Underfloor heating calculator",
                description: "Estimate heating coverage and output under tile before layout is final.",
                href: "/en/calculators/underfloor-heating",
            },
            {
                icon: "lightbulb",
                title: "Lighting hub",
                description: "Open the lighting cluster for mirror lighting, warmer evening light, and better bathroom comfort.",
                href: "/en/lighting",
            },
        ],
        featuredLabel: "Start here",
        featuredIntro:
            "Start with the strongest bathroom ideas first, then move into tile decisions, common mistakes, and the technical side of the remodel.",
        articlesTitle: "Bathroom articles",
        articlesDescription:
            "A focused set of articles on bathroom trends, tile selection, common mistakes, and practical remodel planning.",
        faqTitle: "Common bathroom remodeling questions",
        faqs: [
            {
                question: "What should be planned first: plumbing, tile layout, or finishes?",
                answer:
                    "Start with the bathroom layout and wet zones, then place plumbing, ventilation, and electrical points, and only after that finalize tile layout and finishes.",
            },
            {
                question: "How much extra tile should I buy for a bathroom?",
                answer:
                    "About 10 percent is a common reserve for straight layouts. If the layout is diagonal or involves more cutting, about 15 percent is safer.",
            },
            {
                question: "Does a curbless shower need stronger ventilation?",
                answer:
                    "Yes. The more open the wet zone is, the more important steady airflow becomes for drying the room and protecting finishes.",
            },
            {
                question: "When does heated flooring make the most sense in a bathroom?",
                answer:
                    "It is most useful with tile floors, daily bathroom use, and colder floor assemblies where comfort matters first thing in the morning and late at night.",
            },
            {
                question: "How can I reduce cost without making the bathroom feel cheap?",
                answer:
                    "Keep the layout simple, cut back on decorative extras, use a calm palette, and spend on the materials and fixtures people notice every day.",
            },
        ],
    },
}

export function getBathroomHubDictionary(locale: TopicHubLocale) {
    return bathroomHubDictionaries[locale]
}

export function getBathroomHubPosts(posts: Post[], locale: TopicHubLocale): Post[] {
    return getTopicHubPosts(posts, locale, bathroomHubSlugs[locale])
}
