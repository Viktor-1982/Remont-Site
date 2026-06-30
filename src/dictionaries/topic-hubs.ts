export type TopicHubsLocale = "ru" | "en"

export type TopicHubShortcut = {
    href: string
    label: string
    desc: string
    icon:
        | "bath"
        | "lightbulb"
        | "chefHat"
        | "wallet"
        | "bed"
        | "paintbrush"
        | "layers3"
        | "house"
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
                href: "/ru/bathroom",
                label: "Ванная",
                desc: "Тренды, плитка, вентиляция, теплый пол и частые ошибки ремонта ванной.",
                icon: "bath",
                cover: "/images/posts/bathroom-trends-2026/cover.png",
                highlights: ["Плитка", "Вентиляция", "Теплый пол"],
                accentClass: "from-sky-500/20 via-cyan-500/10 to-transparent",
                iconClass: "text-sky-500",
            },
            {
                href: "/ru/kitchen",
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
            {
                href: "/ru/budget-planning",
                label: "Смета и планирование",
                desc: "План ремонта, экономия, резерв бюджета и контроль расходов без хаоса.",
                icon: "wallet",
                cover: "/images/remont-kvartiry-plan-2026/cover.jpg",
                highlights: ["Смета", "Этапы", "Резерв бюджета"],
                accentClass: "from-emerald-500/20 via-green-500/10 to-transparent",
                iconClass: "text-emerald-500",
            },
            {
                href: "/ru/bedroom",
                label: "Спальня",
                desc: "Спокойная спальня, свет, цвета и решения, которые реально улучшают отдых.",
                icon: "bed",
                cover: "/images/posts/bedroom-trends-2026/cover.png",
                highlights: ["Свет", "Цвет", "Комфорт"],
                accentClass: "from-rose-500/20 via-pink-500/10 to-transparent",
                iconClass: "text-rose-500",
            },
            {
                href: "/ru/walls",
                label: "Стены и отделка",
                desc: "Покраска, подготовка стен, обои и цветовые решения без лишних переделок.",
                icon: "paintbrush",
                cover: "/images/pokraska/paint_cover.png",
                highlights: ["Покраска", "Обои", "Подготовка"],
                accentClass: "from-fuchsia-500/20 via-violet-500/10 to-transparent",
                iconClass: "text-fuchsia-500",
            },
            {
                href: "/ru/flooring",
                label: "Полы и покрытия",
                desc: "Стяжка, ламинат, кварцвинил, плинтус и логика расчета пола по шагам.",
                icon: "layers3",
                cover: "/images/posts/flooring-calculation-guide/cover.png",
                highlights: ["Стяжка", "Покрытия", "Плинтус"],
                accentClass: "from-lime-500/20 via-emerald-500/10 to-transparent",
                iconClass: "text-lime-600",
            },
            {
                href: "/ru/small-apartment",
                label: "Маленькая квартира",
                desc: "Зонирование, хранение, свет и бюджетные решения для небольшой площади.",
                icon: "house",
                cover: "/images/posts/small-apartment-trends-2026/cover.png",
                highlights: ["Зонирование", "Хранение", "Малый метраж"],
                accentClass: "from-indigo-500/20 via-blue-500/10 to-transparent",
                iconClass: "text-indigo-500",
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
                href: "/bathroom",
                label: "Bathroom",
                desc: "Bathroom trends, tile, ventilation, heated floors, and the most common remodel mistakes.",
                icon: "bath",
                cover: "/images/posts/bathroom-trends-2026/cover.png",
                highlights: ["Tile", "Ventilation", "Heated floors"],
                accentClass: "from-sky-500/20 via-cyan-500/10 to-transparent",
                iconClass: "text-sky-500",
            },
            {
                href: "/kitchen",
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
            {
                href: "/budget-planning",
                label: "Planning and Budget",
                desc: "Renovation planning, savings, contingency, and cleaner budget control from day one.",
                icon: "wallet",
                cover: "/images/remont-kvartiry-plan-2026/cover.jpg",
                highlights: ["Budget", "Phasing", "Contingency"],
                accentClass: "from-emerald-500/20 via-green-500/10 to-transparent",
                iconClass: "text-emerald-500",
            },
            {
                href: "/bedroom",
                label: "Bedroom",
                desc: "Calmer bedroom design, lighting, color, and comfort-first renovation choices.",
                icon: "bed",
                cover: "/images/posts/bedroom-trends-2026/cover.png",
                highlights: ["Lighting", "Color", "Comfort"],
                accentClass: "from-rose-500/20 via-pink-500/10 to-transparent",
                iconClass: "text-rose-500",
            },
            {
                href: "/walls",
                label: "Walls and Finishes",
                desc: "Painting, wall prep, wallpaper, and color choices without avoidable rework.",
                icon: "paintbrush",
                cover: "/images/pokraska/paint_cover.png",
                highlights: ["Painting", "Wallpaper", "Wall prep"],
                accentClass: "from-fuchsia-500/20 via-violet-500/10 to-transparent",
                iconClass: "text-fuchsia-500",
            },
            {
                href: "/flooring",
                label: "Flooring",
                desc: "Screed, laminate, LVT, baseboards, and the full logic of floor calculations.",
                icon: "layers3",
                cover: "/images/posts/flooring-calculation-guide/cover.png",
                highlights: ["Screed", "Floor finishes", "Baseboards"],
                accentClass: "from-lime-500/20 via-emerald-500/10 to-transparent",
                iconClass: "text-lime-600",
            },
            {
                href: "/small-apartment",
                label: "Small Apartment",
                desc: "Zoning, storage, lighting, and budget-aware ideas for tighter spaces.",
                icon: "house",
                cover: "/images/posts/small-apartment-trends-2026/cover.png",
                highlights: ["Zoning", "Storage", "Small-space ideas"],
                accentClass: "from-indigo-500/20 via-blue-500/10 to-transparent",
                iconClass: "text-indigo-500",
            },
        ],
    },
}

export function getTopicHubsDictionary(locale: TopicHubsLocale): TopicHubsDictionary {
    return topicHubsDictionaries[locale]
}
