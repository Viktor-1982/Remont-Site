import type { Metadata } from "next"
import { budgetPageNextSteps } from "@/dictionaries/budget-page-next-steps"
import { getPageMetadata } from "@/lib/seo"

export type BudgetLocale = "ru" | "en"

type BudgetIconName = "paintbrush" | "grid" | "scrollText" | "layers"

type BudgetStructuredData = {
    id: string
    data: Record<string, unknown>
}

type BudgetFeatureItem = {
    strong: string
    text: string
}

type BudgetFaqItem = {
    question: string
    answer: string
}

type BudgetResourceCard = {
    href: string
    title: string
    description: string
    icon: BudgetIconName
    accent: string
}

type BudgetMetadataConfig = {
    path: string
    title: string
    description: string
    cover: string
    type: "website"
    alternates?: Metadata["alternates"]
    openGraph?: Metadata["openGraph"]
    twitter?: Metadata["twitter"]
    keywords?: Metadata["keywords"]
    robots?: Metadata["robots"]
}

export type BudgetPageDictionary = {
    metadata: BudgetMetadataConfig
    structuredData: BudgetStructuredData[]
    widgetAriaLabel: string
    hero: {
        title: string
        description: string
    }
    benefits: {
        title: string
        items: BudgetFeatureItem[]
    }
    guide: {
        title: string
        steps: string[]
        tip: string
    }
    nextSteps?: {
        title: string
        description?: string
        ctaLabel: string
        cards: BudgetResourceCard[]
    }
    prose: {
        title: string
        paragraphs: string[]
    }
    faq: {
        title: string
        items: BudgetFaqItem[]
    }
    resources: {
        title: string
        ctaLabel: string
        cards: BudgetResourceCard[]
    }
    share: {
        title: string
        url: string
        buttonTitle: string
        description: string
    }
}

const ruFaqItems: BudgetFaqItem[] = [
    {
        question: "Насколько точен этот калькулятор стоимости ремонта?",
        answer:
            "Он даёт рабочую ориентировочную оценку на основе ваших данных и добавленного резерва. Для окончательной сметы всё равно нужны замеры, состав работ и коммерческие предложения подрядчиков.",
    },
    {
        question: "Можно ли использовать планировщик для разных валют?",
        answer:
            "Да. Калькулятор поддерживает переключение валют и подходит как для частных заказчиков, так и для специалистов, работающих с разными рынками.",
    },
    {
        question: "Какие расходы обязательно учитывать?",
        answer:
            "Минимальный набор: демонтаж, материалы, работа мастеров, чистовая отделка, сантехника, электрика, доставка и резерв на непредвиденные траты.",
    },
]

const enFaqItems: BudgetFaqItem[] = [
    {
        question: "How accurate is this renovation cost calculator?",
        answer:
            "The calculator provides an approximate cost estimate based on your inputs and includes a reserve for unexpected expenses. It is ideal for planning, not for exact contractor quotes.",
    },
    {
        question: "Can I use the planner for different currencies?",
        answer:
            "Yes. You can switch currencies instantly and the layout adapts well for both desktop and mobile use.",
    },
    {
        question: "Is this renovation planner free to use?",
        answer:
            "Yes. The renovation budget calculator is completely free and was created by Renohacks to help homeowners and professionals plan renovation budgets with more confidence.",
    },
    {
        question: "What costs should I include in my renovation budget?",
        answer:
            "Include demolition, materials, labor, finishing work, fixtures, delivery, and a contingency reserve. The planner lets you break down each category so fewer expenses get missed.",
    },
]

export const budgetPageDictionaries: Record<BudgetLocale, BudgetPageDictionary> = {
    ru: {
        metadata: {
            path: "/ru/calculators/budget",
            title: "Калькулятор бюджета ремонта | Renohacks",
            description:
                "Бесплатный калькулятор бюджета ремонта: рассчитайте полную стоимость работ с резервом на непредвиденные расходы. Спланируйте смету без ошибок!",
            cover: "/images/og-default.png",
            type: "website",
            keywords: [
                "калькулятор ремонта",
                "планировщик бюджета ремонта",
                "смета ремонта квартиры",
                "расчёт стоимости ремонта",
                "калькулятор сметы ремонта",
            ],
        },
        structuredData: [
            {
                id: "budget-planner-schema-ru",
                data: {
                    "@context": "https://schema.org",
                    "@type": ["SoftwareApplication", "WebApplication"],
                    name: "Планировщик бюджета ремонта",
                    alternateName: "Калькулятор стоимости ремонта",
                    operatingSystem: "All",
                    applicationCategory: ["FinanceApplication", "BusinessApplication"],
                    offers: {
                        "@type": "Offer",
                        price: "0",
                        priceCurrency: "RUB",
                        availability: "https://schema.org/InStock",
                    },
                    description:
                        "Бесплатный онлайн-калькулятор для расчёта бюджета ремонта квартиры или дома. Помогает планировать расходы и учитывать резерв на непредвиденные траты.",
                    url: "https://renohacks.com/ru/calculators/budget",
                    image: "https://renohacks.com/images/og-default.png",
                    screenshot: "https://renohacks.com/images/og-default.png",
                    creator: {
                        "@type": "Organization",
                        name: "Renohacks",
                        url: "https://renohacks.com",
                        logo: "https://renohacks.com/icon.svg",
                    },
                    potentialAction: {
                        "@type": "UseAction",
                        target: "https://renohacks.com/ru/calculators/budget",
                        name: "Рассчитать бюджет ремонта",
                    },
                    featureList: [
                        "Расчёт стоимости по категориям работ",
                        "Учёт резерва на непредвиденные расходы",
                        "Поддержка разных валют",
                        "Гибкая структура категорий",
                        "Адаптация для мобильных устройств",
                    ],
                    keywords:
                        "калькулятор ремонта, планировщик бюджета, смета ремонта, расчёт стоимости ремонта",
                    inLanguage: "ru",
                    isAccessibleForFree: true,
                    browserRequirements: "Requires JavaScript. Requires HTML5.",
                },
            },
            {
                id: "budget-faq-schema-ru",
                data: {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: ruFaqItems.map((item) => ({
                        "@type": "Question",
                        name: item.question,
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: item.answer,
                        },
                    })),
                },
            },
            {
                id: "budget-breadcrumb-schema-ru",
                data: {
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    itemListElement: [
                        {
                            "@type": "ListItem",
                            position: 1,
                            name: "Главная",
                            item: "https://renohacks.com/",
                        },
                        {
                            "@type": "ListItem",
                            position: 2,
                            name: "Инструменты",
                            item: "https://renohacks.com/ru/tools",
                        },
                        {
                            "@type": "ListItem",
                            position: 3,
                            name: "Планировщик бюджета ремонта",
                            item: "https://renohacks.com/ru/calculators/budget",
                        },
                    ],
                },
            },
        ],
        widgetAriaLabel: "Интерактивный калькулятор бюджета ремонта",
        hero: {
            title: "Планировщик бюджета ремонта",
            description:
                "Бесплатный онлайн-калькулятор для расчёта бюджета ремонта квартиры или дома. Помогает структурировать расходы по категориям работ, добавить резерв и быстро получить итоговую сумму для переговоров с подрядчиками или внутреннего плана.",
        },
        benefits: {
            title: "Зачем использовать планировщик бюджета",
            items: [
                {
                    strong: "Прозрачная структура.",
                    text: "Разбивайте расходы на демонтаж, материалы, работы, отделку и прочие статьи бюджета.",
                },
                {
                    strong: "Резерв на риски.",
                    text: "Добавляйте запас на скрытые работы и изменение цен. Практичный диапазон для большинства проектов — 20–25%.",
                },
                {
                    strong: "Гибкость.",
                    text: "Меняйте категории, суммы и валюту прямо во время обсуждения проекта.",
                },
                {
                    strong: "Мобильный формат.",
                    text: "Планировщик одинаково удобно работает на телефоне и на десктопе.",
                },
            ],
        },
        guide: {
            title: "Как пользоваться калькулятором",
            steps: [
                "Добавьте категории расходов: демонтаж, черновые работы, материалы, отделка, мебель или техника.",
                "Введите ориентировочную стоимость по каждому пункту на основе смет, прайсов или прошлых проектов.",
                "Настройте резерв на непредвиденные расходы. Для ремонта без полного ТЗ обычно закладывают 20–25%.",
                "Сравните промежуточную сумму, резерв и итог. При необходимости скорректируйте сценарий и поделитесь результатом.",
            ],
            tip: "Совет: обновляйте бюджет после каждого нового коммерческого предложения, чтобы итоговая сумма оставалась реалистичной.",
        },
        prose: {
            title: "Планируйте ремонт как проект, а не как список трат",
            paragraphs: [
                "Хороший бюджет помогает заранее увидеть не только основные работы, но и скрытые статьи расходов: вывоз мусора, расходники, доставку, подъём материалов, монтаж сантехники и финальные доработки.",
                "Используйте калькулятор для сравнения нескольких сценариев: базовый ремонт, улучшенная комплектация или более консервативный вариант с увеличенным резервом. Это особенно полезно до подписания договоров и закупки материалов.",
                "Инструмент не заменяет детальную смету подрядчика, но даёт надёжную отправную точку для планирования и помогает не потерять контроль над стоимостью ремонта.",
            ],
        },
        faq: {
            title: "Частые вопросы",
            items: ruFaqItems,
        },
        resources: {
            title: "Дополнительные инструменты",
            ctaLabel: "Перейти",
            cards: [
                {
                    href: "/ru/calculators/paint",
                    title: "Калькулятор краски",
                    description:
                        "Рассчитайте расход краски для стен и потолков по площади и количеству слоёв.",
                    icon: "paintbrush",
                    accent: "from-rose-500/15 to-rose-500/5 text-rose-500",
                },
                {
                    href: "/ru/calculators/tile",
                    title: "Калькулятор плитки",
                    description:
                        "Планируйте раскладку плитки, учитывайте отходы и расход клея для каждой зоны.",
                    icon: "grid",
                    accent: "from-emerald-500/15 to-emerald-500/5 text-emerald-500",
                },
                {
                    href: "/ru/calculators/wallpaper",
                    title: "Калькулятор обоев",
                    description:
                        "Определите количество рулонов обоев с учётом высоты стен и рисунка.",
                    icon: "scrollText",
                    accent: "from-indigo-500/15 to-indigo-500/5 text-indigo-500",
                },
                {
                    href: "/ru/tools",
                    title: "Все инструменты для ремонта",
                    description:
                        "Откройте весь набор инструментов Renohacks для планирования материалов и бюджета.",
                    icon: "layers",
                    accent: "from-amber-500/15 to-amber-500/5 text-amber-500",
                },
            ],
        },
        share: {
            title: "Поделиться калькулятором",
            url: "/ru/calculators/budget",
            buttonTitle: "Бесплатный планировщик бюджета ремонта от Renohacks",
            description: "Планируйте стоимость ремонта с помощью бесплатного калькулятора бюджета от Renohacks.",
        },
    },
    en: {
        metadata: {
            path: "/en/calculators/budget",
            title: "Renovation Budget Planner | Renohacks",
            description:
                "Free renovation budget planner: calculate the total cost of your home renovation with a reserve for unexpected expenses. Plan your costs without mistakes!",
            cover: "/images/og-default.png",
            type: "website",
            alternates: {
                canonical: "https://renohacks.com/en/calculators/budget",
                languages: {
                    ru: "https://renohacks.com/ru/calculators/budget",
                    "x-default": "https://renohacks.com/en/calculators/budget",
                },
            },
            openGraph: {
                title: "Renovation Budget Planner | Renohacks",
                description: "Free renovation budget planner: calculate the total cost of your home renovation with a reserve for unexpected expenses. Plan your costs without mistakes!",
                url: "https://renohacks.com/en/calculators/budget",
                images: ["https://renohacks.com/images/og-default.png"],
                locale: "en_US",
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title: "Renovation Budget Planner | Renohacks",
                description: "Free renovation budget planner: calculate the total cost of your home renovation with a reserve for unexpected expenses. Plan your costs without mistakes!",
                images: ["https://renohacks.com/images/og-default.png"],
            },
            keywords: [
                "renovation budget planner",
                "home renovation cost calculator",
                "remodeling budget estimator",
                "calculate renovation costs online",
                "budget calculator for renovation",
                "Renohacks renovation tools",
            ],
            robots: {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    "max-snippet": -1,
                    "max-image-preview": "large",
                    "max-video-preview": -1,
                },
            },
        },
        structuredData: [
            {
                id: "budget-planner-schema-en",
                data: {
                    "@context": "https://schema.org",
                    "@type": ["SoftwareApplication", "WebApplication"],
                    name: "Renovation Budget Planner",
                    alternateName: "Renovation Cost Calculator",
                    operatingSystem: "All",
                    applicationCategory: ["FinanceApplication", "BusinessApplication"],
                    applicationSubCategory: "ConstructionBudgetCalculator",
                    offers: {
                        "@type": "Offer",
                        price: "0",
                        priceCurrency: "USD",
                        availability: "https://schema.org/InStock",
                    },
                    description:
                        "Free online calculator for estimating renovation budget of apartment or house. Helps plan expenses and include a reserve for unexpected costs.",
                    url: "https://renohacks.com/calculators/budget",
                    image: "https://renohacks.com/images/og-default.png",
                    screenshot: "https://renohacks.com/images/og-default.png",
                    creator: {
                        "@type": "Organization",
                        name: "Renohacks",
                        url: "https://renohacks.com",
                        logo: "https://renohacks.com/icon.svg",
                    },
                    publisher: {
                        "@type": "Organization",
                        name: "Renohacks",
                        url: "https://renohacks.com",
                        logo: {
                            "@type": "ImageObject",
                            url: "https://renohacks.com/images/logo.svg",
                        },
                    },
                    potentialAction: {
                        "@type": "UseAction",
                        target: "https://renohacks.com/calculators/budget",
                        name: "Calculate renovation budget",
                    },
                    featureList: [
                        "Calculate costs by work categories",
                        "Account for unexpected expenses reserve",
                        "Support for different currencies",
                        "Auto-complete work categories",
                        "Mobile responsive design",
                        "Export-ready summary of renovation totals",
                    ],
                    keywords:
                        "renovation calculator, renovation cost calculator, home renovation budget, remodeling estimator, renovation planner tool",
                    inLanguage: "en",
                    isAccessibleForFree: true,
                    availableLanguage: ["en", "ru"],
                    mainEntityOfPage: {
                        "@type": "WebPage",
                        "@id": "https://renohacks.com/calculators/budget",
                    },
                    audience: {
                        "@type": "Audience",
                        audienceType: ["Homeowners", "Contractors", "DIY Renovators"],
                    },
                },
            },
            {
                id: "budget-faq-schema-en",
                data: {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: enFaqItems.map((item) => ({
                        "@type": "Question",
                        name: item.question,
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: item.answer,
                        },
                    })),
                },
            },
            {
                id: "budget-breadcrumb-schema-en",
                data: {
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    itemListElement: [
                        {
                            "@type": "ListItem",
                            position: 1,
                            name: "Renohacks",
                            item: "https://renohacks.com/en",
                        },
                        {
                            "@type": "ListItem",
                            position: 2,
                            name: "Calculators",
                            item: "https://renohacks.com/tools",
                        },
                        {
                            "@type": "ListItem",
                            position: 3,
                            name: "Renovation Budget Planner",
                            item: "https://renohacks.com/calculators/budget",
                        },
                    ],
                },
            },
            {
                id: "budget-howto-schema-en",
                data: {
                    "@context": "https://schema.org",
                    "@type": "HowTo",
                    name: "How to calculate a renovation budget with Renohacks",
                    description:
                        "Step-by-step instructions for using the Renohacks Renovation Budget Planner to estimate remodeling costs with a contingency reserve.",
                    supply: [
                        {
                            "@type": "HowToSupply",
                            name: "Room or project measurements",
                        },
                        {
                            "@type": "HowToSupply",
                            name: "Estimated costs per work category",
                        },
                    ],
                    step: [
                        {
                            "@type": "HowToStep",
                            name: "List renovation categories",
                            text: "Select a renovation category from the suggestions or enter your own to cover every part of the project.",
                        },
                        {
                            "@type": "HowToStep",
                            name: "Enter estimated costs",
                            text: "Type the expected expense for each category. The calculator supports commas and decimal points.",
                        },
                        {
                            "@type": "HowToStep",
                            name: "Set a reserve percentage",
                            text: "Adjust the reserve slider or input to include a contingency fund for unexpected costs.",
                        },
                        {
                            "@type": "HowToStep",
                            name: "Review totals",
                            text: "Click calculate to see subtotal, reserve amount, and final renovation budget.",
                        },
                    ],
                    totalTime: "PT3M",
                },
            },
        ],
        widgetAriaLabel: "Interactive renovation budget planner calculator",
        hero: {
            title: "Renovation Budget Planner — Accurate Cost Calculator in Minutes",
            description:
                "Build a reliable home renovation budget: categorize every expense, add a contingency reserve, and export a clear total for clients or contractors. Useful for DIY renovators and professionals planning apartments, houses, and remodeling projects of any size.",
        },
        benefits: {
            title: "Why professionals choose this renovation budget calculator",
            items: [
                {
                    strong: "Fast cost structure.",
                    text: "Start with pre-filled renovation categories or add your own to build a detailed cost structure in minutes.",
                },
                {
                    strong: "Smart contingency planning.",
                    text: "Automatically calculate a reserve percentage so you always include funds for unexpected work or price changes.",
                },
                {
                    strong: "Currency flexibility.",
                    text: "Switch between USD, EUR, GBP, and other supported currencies to match your region and keep calculations consistent for international projects.",
                },
                {
                    strong: "Share-ready summary.",
                    text: "Review a clear total with subtotals, making it easier to discuss the budget with clients, contractors, or partners.",
                },
            ],
        },
        guide: {
            title: "Step-by-step renovation budgeting guide",
            steps: [
                "List every renovation category: demolition, wiring, plumbing, finishes, fixtures, and cleanup.",
                "Enter projected costs for each item using supplier quotes or previous project data.",
                "Adjust the contingency reserve (20–25% is a practical default) to cover unforeseen tasks and price changes.",
                "Review subtotal, reserve amount, and final total; then revisit the plan during negotiations or procurement.",
            ],
            tip: "Tip: revisit the budget after each contractor update to keep your remodeling cost plan realistic.",
        },
        prose: {
            title: "Plan your renovation budget like a pro",
            paragraphs: [
                "The Renohacks renovation budget planner gives you a structured view of every cost driver — labor, materials, permits, delivery, and finishing touches. It mirrors how professional estimators prepare bids, helping you spot expenses that are easy to miss in a rough spreadsheet.",
                "Use the calculator to compare multiple project scenarios: test different reserve levels, material choices, or room-by-room budgets. Instant totals make it easier to evaluate trade-offs before contracts are signed.",
                "This home renovation cost calculator stays free and mobile friendly, so you can bookmark it, share it, and pair it with the rest of the Renohacks toolset before the first wall comes down.",
            ],
        },
        faq: {
            title: "Renovation budgeting FAQs",
            items: enFaqItems,
        },
        resources: {
            title: "More renovation planning resources",
            ctaLabel: "Explore",
            cards: [
                {
                    href: "/en/calculators/paint",
                    title: "Paint calculator",
                    description: "Estimate interior and exterior paint coverage by wall or ceiling area.",
                    icon: "paintbrush",
                    accent: "from-rose-500/15 to-rose-500/5 text-rose-500",
                },
                {
                    href: "/en/calculators/tile",
                    title: "Tile calculator",
                    description: "Plan tile layout, waste percentage, and adhesive volume for every surface.",
                    icon: "grid",
                    accent: "from-emerald-500/15 to-emerald-500/5 text-emerald-500",
                },
                {
                    href: "/en/calculators/wallpaper",
                    title: "Wallpaper calculator",
                    description: "Figure out how many wallpaper rolls you need for any room or accent wall.",
                    icon: "scrollText",
                    accent: "from-indigo-500/15 to-indigo-500/5 text-indigo-500",
                },
                {
                    href: "/en/tools",
                    title: "All renovation tools",
                    description: "Explore the full Renohacks toolkit for planning materials and renovation costs.",
                    icon: "layers",
                    accent: "from-amber-500/15 to-amber-500/5 text-amber-500",
                },
            ],
        },
        share: {
            title: "Share the calculator",
            url: "/en/calculators/budget",
            buttonTitle: "Free Renovation Budget Planner by Renohacks",
            description: "Plan your renovation costs with this free calculator by Renohacks.",
        },
    },
}

export function getBudgetPageDictionary(locale: BudgetLocale): BudgetPageDictionary {
    return {
        ...budgetPageDictionaries[locale],
        ...budgetPageNextSteps[locale],
    }
}

export function getBudgetPageMetadata(locale: BudgetLocale): Metadata {
    const dictionary = getBudgetPageDictionary(locale)
    const { path, ...metadata } = dictionary.metadata
    return getPageMetadata(path, metadata)
}
