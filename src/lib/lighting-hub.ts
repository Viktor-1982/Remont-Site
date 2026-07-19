import type { Post } from "contentlayer/generated"
import { getTopicHubPosts, type TopicHubDictionary, type TopicHubLocale } from "@/lib/topic-hub"

export const lightingHubSlugs: Record<TopicHubLocale, string[]> = {
    ru: [
        "osveshchenie-2026-trendy-dlya-kvartiry-i-doma",
        "trendy-vannoy-2026",
        "trendy-spalni-2026",
        "malenkaya-kvartira-2026-trendy",
        "malenkaya-studiya-dizayn-interera",
        "5-oshibok-remonta-vannoy-komnaty",
    ],
    en: [
        "lighting-trends-2026-for-home-and-apartment",
        "bathroom-trends-2026",
        "bedroom-trends-2026",
        "small-apartment-trends-2026",
        "small-studio-interior-design",
        "5-bathroom-mistakes",
    ],
}

const lightingHubDictionaries: Record<TopicHubLocale, TopicHubDictionary> = {
    ru: {
        key: "lighting",
        path: "/ru/lighting",
        title: "Ремонт и расчет освещения | Renohacks",
        description:
            "Изучите лучшие материалы Renohacks про расчет и сценарии освещения: нормы для спальни, ванной и маленьких квартир. Спланируйте комфортный свет!",
        keywords: [
            "освещение квартиры",
            "освещение дома",
            "сценарии света",
            "калькулятор освещенности",
            "люксы и люмены",
            "свет в спальне",
            "свет в ванной",
        ],
        eyebrow: "Тематический хаб",
        breadcrumbLabel: "Освещение",
        featureCards: [
            {
                icon: "lightbulb",
                title: "Сценарии света",
                description: "Общий, рабочий и вечерний свет без пересвета, случайных точек и визуального шума.",
            },
            {
                icon: "home",
                title: "Комнаты и задачи",
                description: "Кухня, спальня, ванная, студия и маленькая квартира с разными требованиями к свету.",
            },
            {
                icon: "calculator",
                title: "Нормы и расчет",
                description: "Сначала понять нужные люксы и люмены, потом выбирать лампы и светильники.",
            },
        ],
        calculator: {
            icon: "lightbulb",
            eyebrow: "Практический инструмент",
            title: "Калькулятор освещенности",
            description:
                "Посчитайте, сколько люменов и светильников нужно комнате по площади, типу помещения и запасу на высоту потолка.",
            href: "/ru/calculators/lighting",
            buttonLabel: "Открыть калькулятор",
        },
        featuredLabel: "С чего начать",
        featuredIntro:
            "Главный материал по теме: сначала система света и актуальные решения, потом расчет и подбор по комнатам.",
        articlesTitle: "Статьи по освещению",
        articlesDescription:
            "Подборка материалов про спальню, ванную, маленькие пространства и ошибки ремонта, где свет напрямую влияет на комфорт.",
        faqTitle: "Частые вопросы об освещении",
        faqs: [
            {
                question: "Сколько света нужно комнате?",
                answer:
                    "Для спальни и гостиной обычно начинают примерно со 150 люксов, для кухни около 250, для рабочего места около 300. Точная цифра зависит от сценария и локального света.",
            },
            {
                question: "Что важнее: люксы или люмены?",
                answer:
                    "Люксы показывают, какой уровень света нужен на поверхности, а люмены показывают световой поток лампы или светильника. Для планирования нужны обе величины.",
            },
            {
                question: "Можно ли обойтись одной люстрой?",
                answer:
                    "Обычно нет. Один верхний источник почти всегда дает плоский и неудобный свет. Лучше сочетать общий, локальный и вечерний сценарии.",
            },
            {
                question: "Нужен ли отдельный свет в ванной и у кровати?",
                answer:
                    "Да. Свет у зеркала в ванной и локальный свет у кровати решают реальные бытовые задачи и сильно повышают комфорт вечером.",
            },
            {
                question: "Когда закладывать освещение в ремонте?",
                answer:
                    "На этапе планирования электрики и потолков. Если думать о свете в конце, обычно не хватает выводов, выключателей и нужных сценариев.",
            },
        ],
    },
    en: {
        key: "lighting",
        path: "/en/lighting",
        title: "Home Lighting & Standards | Renohacks",
        description:
            "Explore top Renohacks guides on home lighting: design scenarios, room standards, and lumen calculations. Plan comfort-first lighting for your space!",
        keywords: [
            "home lighting ideas",
            "lighting for renovation",
            "lighting calculator",
            "room lighting standards",
            "lumens for a room",
            "bedroom lighting ideas",
            "bathroom lighting ideas",
        ],
        eyebrow: "Topic hub",
        breadcrumbLabel: "Lighting",
        featureCards: [
            {
                icon: "lightbulb",
                title: "Layered lighting",
                description: "General, task, and evening light planned as a system instead of a single ceiling fixture.",
            },
            {
                icon: "home",
                title: "Room-by-room decisions",
                description: "Bathrooms, bedrooms, studios, and small apartments all need different lighting logic.",
            },
            {
                icon: "calculator",
                title: "Standards and sizing",
                description: "Use lux targets and lumen output before you choose lamps, fixtures, and wiring loads.",
            },
        ],
        calculator: {
            icon: "lightbulb",
            eyebrow: "Practical tool",
            title: "Lighting calculator",
            description:
                "Calculate lumens and fixture count by room size, room type, and a ceiling-height reserve before you buy anything.",
            href: "/calculators/lighting",
            buttonLabel: "Open calculator",
        },
        featuredLabel: "Start here",
        featuredIntro:
            "This is the anchor piece for the topic: first the lighting system, then the numbers, and only after that the fixtures.",
        articlesTitle: "Lighting articles",
        articlesDescription:
            "A focused selection of articles on bedrooms, bathrooms, small spaces, and renovation mistakes where lighting changes daily comfort the most.",
        faqTitle: "Common lighting questions",
        faqs: [
            {
                question: "How much light does a room need?",
                answer:
                    "A bedroom or living room often starts around 150 lux, a kitchen around 250, and a work zone around 300. The exact target depends on how the room is used.",
            },
            {
                question: "What is more important, lux or lumens?",
                answer:
                    "Lux is the target lighting level on a surface, while lumens describe how much light a bulb or fixture produces. You need both to size a room correctly.",
            },
            {
                question: "Can one ceiling light be enough?",
                answer:
                    "Usually no. One ceiling fixture tends to create flat, uncomfortable light. A better plan combines ambient, task, and softer evening lighting.",
            },
            {
                question: "Do bathrooms and bedrooms need separate local lighting?",
                answer:
                    "Yes. Mirror lighting in a bathroom and bedside lighting in a bedroom make the space more functional and much more comfortable at night.",
            },
            {
                question: "When should lighting be planned during a remodel?",
                answer:
                    "Before electrical rough-in and ceiling work. If lighting is left until the end, you usually miss outlets, switch zones, and the right fixture positions.",
            },
        ],
    },
}

export function getLightingHubDictionary(locale: TopicHubLocale) {
    return lightingHubDictionaries[locale]
}

export function getLightingHubPosts(posts: Post[], locale: TopicHubLocale): Post[] {
    return getTopicHubPosts(posts, locale, lightingHubSlugs[locale])
}
