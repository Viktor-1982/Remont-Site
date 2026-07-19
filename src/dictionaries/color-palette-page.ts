import type { Metadata } from "next"
import { colorPalettePageNextSteps } from "@/dictionaries/color-palette-page-next-steps"
import { getPageMetadata } from "@/lib/seo"

export type ColorPaletteLocale = "ru" | "en"

type ResourceIconName = "paintbrush" | "layers"

type StructuredDataItem = {
    id: string
    data: Record<string, unknown>
}

type SchemeItem = {
    title: string
    description: string
}

type ResourceItem = {
    href: string
    title: string
    description: string
    icon: ResourceIconName
    accent: string
}

type MetadataConfig = {
    path: string
    title: string
    description: string
    cover: string
    type: "website"
    alternates?: Metadata["alternates"]
    openGraph?: Metadata["openGraph"]
    twitter?: Metadata["twitter"]
    keywords?: Metadata["keywords"]
}

export type ColorPalettePageDictionary = {
    metadata: MetadataConfig
    structuredData: StructuredDataItem[]
    hero: {
        title: string
        description: string
    }
    guide: {
        title: string
        steps: string[]
    }
    schemes: {
        title: string
        items: SchemeItem[]
    }
    nextSteps?: {
        title: string
        description?: string
        ctaLabel: string
        cards: ResourceItem[]
    }
    resources: {
        title: string
        ctaLabel: string
        cards: ResourceItem[]
    }
    share: {
        title: string
        url: string
        buttonTitle: string
        description: string
    }
}

export const colorPalettePageDictionaries: Record<ColorPaletteLocale, ColorPalettePageDictionary> = {
    ru: {
        metadata: {
            path: "/ru/calculators/color-palette",
            title: "Генератор цветовых палитр | Renohacks",
            description:
                "Создайте гармоничную цветовую палитру для вашего ремонта. Генератор цветовых схем с рекомендациями по применению. Бесплатный инструмент Renohacks.",
            cover: "/images/og-default.png",
            type: "website",
            keywords: [
                "генератор цветовой палитры",
                "палитра цветов для интерьера",
                "подбор цветов для ремонта",
                "сочетание цветов в интерьере",
                "цветовая схема комнаты",
            ],
        },
        structuredData: [
            {
                id: "color-palette-schema-ru",
                data: {
                    "@context": "https://schema.org",
                    "@type": ["SoftwareApplication", "WebApplication"],
                    name: "Генератор цветовых палитр",
                    alternateName: "Подбор цветовой схемы для интерьера",
                    operatingSystem: "All",
                    applicationCategory: ["DesignApplication", "MultimediaApplication"],
                    offers: {
                        "@type": "Offer",
                        price: "0",
                        priceCurrency: "RUB",
                        availability: "https://schema.org/InStock",
                    },
                    description:
                        "Бесплатный генератор цветовых палитр для ремонта и интерьера. Помогает подобрать гармоничные сочетания цветов и получить рекомендации по применению.",
                    url: "https://renohacks.com/ru/calculators/color-palette",
                    image: "https://renohacks.com/images/og-default.png",
                    creator: {
                        "@type": "Organization",
                        name: "Renohacks",
                        url: "https://renohacks.com",
                    },
                    inLanguage: "ru",
                },
            },
            {
                id: "color-palette-breadcrumb-ru",
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
                            name: "Генератор цветовых палитр",
                            item: "https://renohacks.com/ru/calculators/color-palette",
                        },
                    ],
                },
            },
        ],
        hero: {
            title: "Генератор цветовых палитр",
            description:
                "Создайте гармоничную цветовую схему для интерьера. Выберите базовый цвет и тип палитры, получите готовую палитру из 5–6 цветов с рекомендациями по применению.",
        },
        guide: {
            title: "Как использовать генератор палитр",
            steps: [
                "Выберите базовый цвет — тот, который вам нравится или уже есть в интерьере.",
                "Выберите тип цветовой схемы: аналогичная, дополнительная, триада, монохромная или раздельно-дополнительная.",
                "Нажмите «Сгенерировать палитру» и получите гармоничную палитру из 5–6 цветов.",
                "Скопируйте коды цветов или экспортируйте палитру как изображение.",
                "Используйте рекомендации по применению для создания более цельного и спокойного интерьера.",
            ],
        },
        schemes: {
            title: "Типы цветовых схем",
            items: [
                {
                    title: "Аналогичная схема",
                    description:
                        "Соседние цвета на цветовом круге. Создаёт спокойную и гармоничную атмосферу. Подходит для спален и гостиных.",
                },
                {
                    title: "Дополнительная схема",
                    description:
                        "Противоположные цвета на цветовом круге. Создаёт более динамичный интерьер. Хорошо работает в современных пространствах.",
                },
                {
                    title: "Триада",
                    description:
                        "Три равноудалённых цвета. Даёт яркую, но сбалансированную палитру. Подходит для детских и творческих зон.",
                },
                {
                    title: "Монохромная схема",
                    description:
                        "Оттенки одного цвета. Даёт более цельную, спокойную и элегантную палитру. Хороший выбор для минималистичных интерьеров.",
                },
                {
                    title: "Раздельно-дополнительная",
                    description:
                        "Баланс между контрастом и гармонией. Даёт интересный, но не перегруженный интерьер. Часто подходит для гостиных.",
                },
            ],
        },
        resources: {
            title: "Дополнительные инструменты",
            ctaLabel: "Открыть",
            cards: [
                {
                    href: "/ru/calculators/paint",
                    title: "Калькулятор краски",
                    description: "Рассчитайте расход краски для выбранной цветовой палитры.",
                    icon: "paintbrush",
                    accent: "from-rose-500/15 to-rose-500/5 text-rose-500",
                },
                {
                    href: "/ru/calculators/budget",
                    title: "Планировщик бюджета",
                    description: "Оцените стоимость ремонта с учётом выбранной цветовой концепции.",
                    icon: "layers",
                    accent: "from-amber-500/15 to-amber-500/5 text-amber-500",
                },
            ],
        },
        share: {
            title: "Поделиться генератором",
            url: "/ru/calculators/color-palette",
            buttonTitle: "Генератор цветовых палитр для ремонта | Renohacks",
            description: "Создайте гармоничную цветовую палитру для вашего интерьера.",
        },
    },
    en: {
        metadata: {
            path: "/en/calculators/color-palette",
            title: "Color Palette Generator | Renohacks",
            description:
                "Free color palette generator: create harmonious color schemes for your home renovation. Get practical application tips. Start design planning now!",
            cover: "/images/og-default.png",
            type: "website",
            keywords: [
                "color palette generator",
                "interior color scheme tool",
                "renovation color palette",
                "home color combinations",
                "interior palette generator",
            ],
        },
        structuredData: [
            {
                id: "color-palette-schema-en",
                data: {
                    "@context": "https://schema.org",
                    "@type": ["SoftwareApplication", "WebApplication"],
                    name: "Color Palette Generator",
                    alternateName: "Interior Color Scheme Generator",
                    operatingSystem: "All",
                    applicationCategory: ["DesignApplication", "MultimediaApplication"],
                    offers: {
                        "@type": "Offer",
                        price: "0",
                        priceCurrency: "USD",
                        availability: "https://schema.org/InStock",
                    },
                    description:
                        "Free color palette generator for renovation and interior design. Helps create harmonious schemes and practical application ideas.",
                    url: "https://renohacks.com/en/calculators/color-palette",
                    image: "https://renohacks.com/images/og-default.png",
                    creator: {
                        "@type": "Organization",
                        name: "Renohacks",
                        url: "https://renohacks.com",
                    },
                    inLanguage: "en",
                },
            },
            {
                id: "color-palette-breadcrumb-en",
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
                            name: "Tools",
                            item: "https://renohacks.com/en/tools",
                        },
                        {
                            "@type": "ListItem",
                            position: 3,
                            name: "Color Palette Generator",
                            item: "https://renohacks.com/en/calculators/color-palette",
                        },
                    ],
                },
            },
        ],
        hero: {
            title: "Color Palette Generator",
            description:
                "Create a harmonious color scheme for your interior. Choose a base color and palette type, then get a ready-made palette of 5–6 colors with practical application notes.",
        },
        guide: {
            title: "How to use the palette generator",
            steps: [
                "Choose a base color — one you already love or plan to keep in the room.",
                "Select a color scheme type: analogous, complementary, triadic, monochromatic, or split-complementary.",
                "Click “Generate Palette” to create a balanced palette of 5–6 colors.",
                "Copy the color codes or export the palette as an image.",
                "Use the recommendations to build a more coherent and believable interior palette.",
            ],
        },
        schemes: {
            title: "Color scheme types",
            items: [
                {
                    title: "Analogous scheme",
                    description:
                        "Adjacent colors on the color wheel. Creates a calm and harmonious atmosphere. Works well in bedrooms and living rooms.",
                },
                {
                    title: "Complementary scheme",
                    description:
                        "Opposite colors on the color wheel. Creates a more dynamic interior. Good for modern spaces and stronger accents.",
                },
                {
                    title: "Triadic scheme",
                    description:
                        "Three evenly spaced colors. Produces a bright but balanced palette. Useful for creative rooms and playful interiors.",
                },
                {
                    title: "Monochromatic scheme",
                    description:
                        "Shades of one color. Produces a more cohesive and elegant palette. A strong fit for minimalist interiors.",
                },
                {
                    title: "Split-complementary scheme",
                    description:
                        "Balances contrast and harmony. Creates an interesting interior without feeling overloaded. Often works well in living rooms.",
                },
            ],
        },
        resources: {
            title: "Additional tools",
            ctaLabel: "Open",
            cards: [
                {
                    href: "/en/calculators/paint",
                    title: "Paint calculator",
                    description: "Estimate paint needed for the palette you want to apply.",
                    icon: "paintbrush",
                    accent: "from-rose-500/15 to-rose-500/5 text-rose-500",
                },
                {
                    href: "/en/calculators/budget",
                    title: "Budget planner",
                    description: "Estimate renovation costs while factoring in your chosen color direction.",
                    icon: "layers",
                    accent: "from-amber-500/15 to-amber-500/5 text-amber-500",
                },
            ],
        },
        share: {
            title: "Share the generator",
            url: "/en/calculators/color-palette",
            buttonTitle: "Color Palette Generator for Renovation | Renohacks",
            description: "Create a harmonious color palette for your interior.",
        },
    },
}

export function getColorPalettePageDictionary(locale: ColorPaletteLocale): ColorPalettePageDictionary {
    return {
        ...colorPalettePageDictionaries[locale],
        ...colorPalettePageNextSteps[locale],
    }
}

export function getColorPalettePageMetadata(locale: ColorPaletteLocale): Metadata {
    const dictionary = getColorPalettePageDictionary(locale)
    const { path, ...metadata } = dictionary.metadata
    return getPageMetadata(path, metadata)
}
