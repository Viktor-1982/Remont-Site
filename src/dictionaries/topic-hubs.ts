export type TopicHubsLocale = "ru" | "en"

export type TopicHubShortcut = {
    href: string
    label: string
    desc: string
    icon: "bath" | "lightbulb" | "chefHat"
    cover: string
    highlights: string[]
    accentClass: string
    iconClass: string
}

export type TopicHubsDictionary = {
    navLabel: string
    mobileLabel: string
    menuLabel: string
    ariaOpenMenu: string
    sectionEyebrow: string
    sectionTitle: string
    sectionSubtitle: string
    hubBadge: string
    ctaLabel: string
    items: TopicHubShortcut[]
}

const topicHubsDictionaries: Record<TopicHubsLocale, TopicHubsDictionary> = {
    ru: {
        navLabel: "Темы",
        mobileLabel: "Темы",
        menuLabel: "Тематические хабы",
        ariaOpenMenu: "Открыть темы ремонта",
        sectionEyebrow: "Тематические хабы",
        sectionTitle: "Ключевые темы ремонта",
        sectionSubtitle:
            "Собранные подборки статей и инструментов, с которых проще начинать планирование по комнате и задаче.",
        hubBadge: "Хаб",
        ctaLabel: "Открыть хаб",
        items: [
            {
                href: "/bathroom",
                label: "Ванная",
                desc: "Тренды, плитка, вентиляция, теплый пол и частые ошибки ремонта ванной.",
                icon: "bath",
                cover: "/images/posts/bathroom-trends-2026/cover.png",
                highlights: ["Плитка", "Вентиляция", "Теплый пол"],
                accentClass: "from-sky-500/20 via-cyan-500/10 to-transparent",
                iconClass: "text-sky-500",
            },
            {
                href: "/kitchen",
                label: "Кухня",
                desc: "Планировка, материалы, маленькая кухня, освещение и бюджет ремонта кухни.",
                icon: "chefHat",
                cover: "/images/kitchen-2026/cover-2026.jpg",
                highlights: ["Планировка", "Материалы", "Свет и бюджет"],
                accentClass: "from-orange-500/20 via-amber-500/10 to-transparent",
                iconClass: "text-orange-500",
            },
            {
                href: "/lighting",
                label: "Освещение",
                desc: "Сценарии света, спальня, ванная, маленькие квартиры и расчет освещенности.",
                icon: "lightbulb",
                cover: "/images/posts/lighting-trends-2026/photos/01-cover.jpg",
                highlights: ["Сценарии света", "Люксы и люмены", "По комнатам"],
                accentClass: "from-amber-500/20 via-yellow-500/10 to-transparent",
                iconClass: "text-amber-500",
            },
        ],
    },
    en: {
        navLabel: "Topics",
        mobileLabel: "Topics",
        menuLabel: "Topic Hubs",
        ariaOpenMenu: "Open renovation topics",
        sectionEyebrow: "Topic Hubs",
        sectionTitle: "Core Renovation Topics",
        sectionSubtitle:
            "Curated clusters of articles and tools that make it easier to start planning by room and by task.",
        hubBadge: "Hub",
        ctaLabel: "Open hub",
        items: [
            {
                href: "/en/bathroom",
                label: "Bathroom",
                desc: "Bathroom trends, tile, ventilation, heated floors, and the most common remodel mistakes.",
                icon: "bath",
                cover: "/images/posts/bathroom-trends-2026/cover.png",
                highlights: ["Tile", "Ventilation", "Heated floors"],
                accentClass: "from-sky-500/20 via-cyan-500/10 to-transparent",
                iconClass: "text-sky-500",
            },
            {
                href: "/en/kitchen",
                label: "Kitchen",
                desc: "Kitchen layout, finishes, small-space ideas, lighting, and budget planning.",
                icon: "chefHat",
                cover: "/images/kitchen-2026/cover-2026.jpg",
                highlights: ["Layout", "Finishes", "Lighting and budget"],
                accentClass: "from-orange-500/20 via-amber-500/10 to-transparent",
                iconClass: "text-orange-500",
            },
            {
                href: "/en/lighting",
                label: "Lighting",
                desc: "Layered lighting, room-by-room guidance, small spaces, and practical lighting calculations.",
                icon: "lightbulb",
                cover: "/images/posts/lighting-trends-2026/photos/01-cover.jpg",
                highlights: ["Layered lighting", "Lux and lumens", "By room"],
                accentClass: "from-amber-500/20 via-yellow-500/10 to-transparent",
                iconClass: "text-amber-500",
            },
        ],
    },
}

export function getTopicHubsDictionary(locale: TopicHubsLocale): TopicHubsDictionary {
    return topicHubsDictionaries[locale]
}
