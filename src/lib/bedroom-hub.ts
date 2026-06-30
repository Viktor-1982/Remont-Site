import type { Post } from "contentlayer/generated"
import { getTopicHubPosts, type TopicHubDictionary, type TopicHubLocale } from "@/lib/topic-hub"

export const bedroomHubSlugs: Record<TopicHubLocale, string[]> = {
    ru: ["trendy-spalni-2026", "dizain-spalni", "wellness-dom-2026"],
    en: ["bedroom-trends-2026", "bedroom-design", "wellness-home-2026"],
}

const bedroomHubDictionaries: Record<TopicHubLocale, TopicHubDictionary> = {
    ru: {
        key: "bedroom",
        path: "/ru/bedroom",
        title: "Спальня: свет, цвет и спокойный сценарий ремонта",
        description:
            "Главные материалы Renohacks про спальню: спокойный интерьер, теплый свет, цвет, комфорт и решения, которые реально улучшают отдых.",
        keywords: [
            "дизайн спальни",
            "ремонт спальни",
            "свет в спальне",
            "цвета для спальни",
            "уютная спальня",
            "тренды спальни",
            "спокойный интерьер спальни",
        ],
        eyebrow: "Тематический хаб",
        breadcrumbLabel: "Спальня",
        featureCards: [
            {
                icon: "lightbulb",
                title: "Теплый многослойный свет",
                description: "Общий, локальный и прикроватный свет, который помогает отдыхать, а не только освещать комнату.",
            },
            {
                icon: "home",
                title: "Комфорт и тишина",
                description: "Меньше визуального шума, продуманное хранение и спокойная расстановка мебели.",
            },
            {
                icon: "grid",
                title: "Цвет и материалы",
                description: "Мягкие палитры, тактильные поверхности и решения, которые не утомляют каждый день.",
            },
        ],
        calculator: {
            icon: "lightbulb",
            eyebrow: "Практический инструмент",
            title: "Калькулятор освещенности для спальни",
            description:
                "Проверьте, сколько света нужно спальне, и соберите спокойный световой сценарий до выбора светильников.",
            href: "/ru/calculators/lighting",
            buttonLabel: "Открыть калькулятор",
        },
        relatedTitle: "Что еще полезно для спальни",
        relatedLinks: [
            {
                icon: "calculator",
                title: "Генератор цветовых палитр",
                description: "Подберите спокойную палитру для стен, текстиля и акцентов до начала отделки.",
                href: "/ru/calculators/color-palette",
            },
            {
                icon: "calculator",
                title: "Планировщик бюджета",
                description: "Сведите спальню в рабочую смету, если хотите заранее понять цену света, текстиля и отделки.",
                href: "/ru/calculators/budget",
            },
            {
                icon: "lightbulb",
                title: "Хаб по освещению",
                description: "Откройте подборку про сценарии света, люксы и комфортный вечерний свет по комнатам.",
                href: "/lighting",
            },
        ],
        featuredLabel: "С чего начать",
        featuredIntro:
            "Сначала определить ощущение спальни и сценарии света, затем перейти к цвету, материалам и более точному бюджетному плану.",
        articlesTitle: "Статьи про спальню",
        articlesDescription:
            "Подборка материалов про дизайн спальни, свет, спокойные цвета и практичные решения для более комфортного отдыха.",
        faqTitle: "Частые вопросы о ремонте спальни",
        faqs: [
            {
                question: "Какой свет лучше всего работает в спальне?",
                answer:
                    "Обычно лучше всего работает теплый многослойный свет: общий потолочный, локальный для чтения и мягкий прикроватный свет на вечер.",
            },
            {
                question: "Какие цвета для спальни обычно комфортнее?",
                answer:
                    "Чаще всего лучше работают приглушенные, не слишком контрастные оттенки, которые не утомляют зрение и не спорят со светом.",
            },
            {
                question: "Нужен ли в спальне большой шкаф любой ценой?",
                answer:
                    "Не всегда. Важнее сохранить удобные проходы, спокойную композицию и только затем добирать хранение там, где оно действительно нужно.",
            },
            {
                question: "Что сильнее всего делает спальню спокойнее?",
                answer:
                    "Лучше всего работают мягкий свет, меньше открытого визуального шума, тактильные материалы и более чистые поверхности без лишних предметов.",
            },
            {
                question: "Что важно заложить на этапе ремонта спальни?",
                answer:
                    "Розетки, прикроватные выключатели, выводы под бра, шторы и сценарии света стоит продумать заранее, а не после отделки.",
            },
        ],
    },
    en: {
        key: "bedroom",
        path: "/bedroom",
        title: "Bedroom Ideas, Lighting, Color, and Comfort-First Renovation",
        description:
            "Best Renohacks bedroom content: calmer interiors, warmer lighting, color direction, comfort, and the design choices that actually improve rest.",
        keywords: [
            "bedroom design ideas",
            "bedroom renovation ideas",
            "bedroom lighting ideas",
            "bedroom color ideas",
            "cozy bedroom design",
            "bedroom trends",
            "restful bedroom ideas",
        ],
        eyebrow: "Topic hub",
        breadcrumbLabel: "Bedroom",
        featureCards: [
            {
                icon: "lightbulb",
                title: "Warm layered lighting",
                description: "Ambient, task, and bedside light that supports rest instead of flattening the room.",
            },
            {
                icon: "home",
                title: "Comfort and calm",
                description: "Less visual clutter, better storage choices, and a quieter furniture layout.",
            },
            {
                icon: "grid",
                title: "Color and material direction",
                description: "Softer palettes, tactile finishes, and choices that stay comfortable every day.",
            },
        ],
        calculator: {
            icon: "lightbulb",
            eyebrow: "Practical tool",
            title: "Bedroom lighting calculator",
            description:
                "Check how much light a bedroom really needs and set a calmer lighting plan before choosing fixtures.",
            href: "/calculators/lighting",
            buttonLabel: "Open calculator",
        },
        relatedTitle: "Also useful for bedroom planning",
        relatedLinks: [
            {
                icon: "calculator",
                title: "Color palette generator",
                description: "Build a calmer palette for walls, bedding, and accents before you commit to finishes.",
                href: "/calculators/color-palette",
            },
            {
                icon: "calculator",
                title: "Budget planner",
                description: "Price lighting, textiles, and finish choices together if you want a cleaner bedroom budget.",
                href: "/calculators/budget",
            },
            {
                icon: "lightbulb",
                title: "Lighting hub",
                description: "Open the lighting cluster for layered lighting, lux targets, and room-by-room guidance.",
                href: "/lighting",
            },
        ],
        featuredLabel: "Start here",
        featuredIntro:
            "Start with the mood of the bedroom and the lighting logic, then move into color, finishes, and the working budget.",
        articlesTitle: "Bedroom articles",
        articlesDescription:
            "A focused set of bedroom articles on design direction, lighting, calmer color choices, and practical ways to improve comfort.",
        faqTitle: "Common bedroom renovation questions",
        faqs: [
            {
                question: "What kind of lighting works best in a bedroom?",
                answer:
                    "Warm layered lighting usually works best: a general ceiling light, local reading light, and softer bedside light for evening use.",
            },
            {
                question: "What colors feel most comfortable in a bedroom?",
                answer:
                    "Muted, lower-contrast colors usually feel calmer because they do not fight the lighting and are easier to live with long term.",
            },
            {
                question: "Does every bedroom need a large wardrobe?",
                answer:
                    "Not always. Clear circulation, a calmer layout, and the right amount of storage usually matter more than forcing the biggest possible wardrobe.",
            },
            {
                question: "What makes a bedroom feel more restful?",
                answer:
                    "The strongest combination is softer lighting, less visual clutter, tactile materials, and cleaner surfaces with fewer competing objects.",
            },
            {
                question: "What should be planned early in a bedroom remodel?",
                answer:
                    "Outlets, bedside switches, sconce wiring, curtain lines, and lighting scenes are much better planned before the finishes go in.",
            },
        ],
    },
}

export function getBedroomHubDictionary(locale: TopicHubLocale) {
    return bedroomHubDictionaries[locale]
}

export function getBedroomHubPosts(posts: Post[], locale: TopicHubLocale): Post[] {
    return getTopicHubPosts(posts, locale, bedroomHubSlugs[locale])
}
