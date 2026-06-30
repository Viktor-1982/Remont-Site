export type AboutLocale = "ru" | "en"

type AboutFeatureIcon = "camera" | "wrench" | "calculator" | "palette" | "dollarSign"

export type AboutFeature = {
    icon: AboutFeatureIcon
    title: string
    description: string
}

export type AboutDictionary = {
    metadata: {
        title: string
        description: string
    }
    breadcrumb: {
        homeLabel: string
        pageLabel: string
        pagePath: string
    }
    hero: {
        title: string
        lead: string
    }
    mission: {
        title: string
        description: string
        body: string
    }
    features: {
        title: string
        items: AboutFeature[]
    }
    audience: {
        title: string
        description: string
        badges: string[]
    }
    standardsCta: {
        title: string
        description: string
        buttonLabel: string
        href: string
    }
}

export const aboutDictionaries: Record<AboutLocale, AboutDictionary> = {
    ru: {
        metadata: {
            title: "О проекте Renohacks | Блог о ремонте и дизайне",
            description:
                "Renohacks - ваш гид по ремонту: фото-гайды, DIY советы и бесплатные инструменты для расчета материалов. Всё для качественного ремонта дома своими руками.",
        },
        breadcrumb: {
            homeLabel: "Главная",
            pageLabel: "О проекте",
            pagePath: "/ru/about",
        },
        hero: {
            title: "О проекте Renohacks",
            lead: "renohacks.com - блог о ремонте, дизайне интерьера и новинках в строительстве, где мы делимся практическими советами, актуальными трендами, пошаговыми фото-гайдами и бесплатными инструментами для планирования ремонта.",
        },
        mission: {
            title: "Наша цель",
            description:
                "Помочь вам создать уютный и стильный дом: от качественного ремонта до актуального дизайна",
            body: "Мы делимся не только практическими советами по ремонту, но и актуальными трендами дизайна интерьера, новинками материалов и технологий. Наша цель - помочь вам создать дом, который будет одновременно функциональным, красивым и недорогим. Главное - правильный подход, практические советы и понимание того, на чем можно сэкономить, а на чем лучше не экономить.",
        },
        features: {
            title: "Что мы делаем",
            items: [
                {
                    icon: "camera",
                    title: "Фото-гайды",
                    description: "Пошаговые инструкции с фотографиями по покраске стен, ремонту ванной и кухни",
                },
                {
                    icon: "wrench",
                    title: "DIY проекты",
                    description: "Практические лайфхаки и проекты для экономии бюджета при ремонте",
                },
                {
                    icon: "calculator",
                    title: "Инструменты",
                    description: "Бесплатные инструменты для расчета краски, обоев, плитки, бюджета и других материалов",
                },
                {
                    icon: "palette",
                    title: "Идеи дизайна",
                    description: "Актуальные тренды интерьера 2025-2026 и вдохновляющие идеи для вашего дома",
                },
                {
                    icon: "dollarSign",
                    title: "Сметы и бюджеты",
                    description: "Реальные примеры смет и бюджетов на разные виды ремонта",
                },
            ],
        },
        audience: {
            title: "Для кого этот блог",
            description:
                "Наш контент будет полезен всем, кто планирует ремонт, интересуется дизайном интерьера или следит за новинками в строительстве и отделке: от косметического обновления до капитального ремонта квартиры.",
            badges: [
                "Косметический ремонт",
                "Капитальный ремонт",
                "Дизайн интерьера",
                "DIY энтузиасты",
                "Владельцы квартир",
                "Дизайнеры",
            ],
        },
        standardsCta: {
            title: "Как мы проверяем материалы и инструменты",
            description:
                "Объясняем, как готовятся статьи, на чем основаны выводы, как мы проверяем инструменты и где в этом процессе помогает собственный практический опыт ремонта.",
            buttonLabel: "Открыть страницу",
            href: "/ru/editorial-standards",
        },
    },
    en: {
        metadata: {
            title: "About Renohacks | DIY Renovation Blog",
            description:
                "Renohacks - your renovation guide: photo guides, DIY tips, and free planning tools. Everything you need for a better home renovation.",
        },
        breadcrumb: {
            homeLabel: "Home",
            pageLabel: "About",
            pagePath: "/about",
        },
        hero: {
            title: "About Renohacks",
            lead: "renohacks.com is a renovation and interior design blog where we share practical advice, current trends, step-by-step photo guides, and free renovation tools.",
        },
        mission: {
            title: "Our Goal",
            description:
                "Help you create a cozy and stylish home: from quality renovation to current interior design",
            body: "We share not only practical renovation tips, but also current interior design trends, new materials and technologies. Our goal is to help you create a home that is functional, beautiful, and affordable at the same time. What matters is the right approach, practical advice, and understanding where you can save money and where it is better not to cut corners.",
        },
        features: {
            title: "What We Do",
            items: [
                {
                    icon: "camera",
                    title: "Photo Guides",
                    description: "Step-by-step instructions with photos for painting walls, renovating bathrooms and kitchens",
                },
                {
                    icon: "wrench",
                    title: "DIY Projects",
                    description: "Practical hacks and projects to save money during renovation",
                },
                {
                    icon: "calculator",
                    title: "Tools",
                    description: "Free tools for paint, wallpaper, tile, budgeting, and other renovation planning tasks",
                },
                {
                    icon: "palette",
                    title: "Design Ideas",
                    description: "Current interior trends 2025-2026 and inspiring ideas for your home",
                },
                {
                    icon: "dollarSign",
                    title: "Budgets & Estimates",
                    description: "Real examples of budgets and cost estimates for different types of renovation",
                },
            ],
        },
        audience: {
            title: "Who This Blog Is For",
            description:
                "Our content is helpful for anyone planning a home renovation, interested in interior design, or following construction and finishing innovations - from quick cosmetic updates to full apartment remodels.",
            badges: [
                "Cosmetic Updates",
                "Full Remodel",
                "Interior Design",
                "DIY Enthusiasts",
                "Homeowners",
                "Designers",
            ],
        },
        standardsCta: {
            title: "How We Review Materials and Tools",
            description:
                "See how we prepare articles, what our recommendations are based on, how tools are checked, and how our own renovation experience fits into that process.",
            buttonLabel: "Open the page",
            href: "/editorial-standards",
        },
    },
}

export function getAboutDictionary(locale: AboutLocale): AboutDictionary {
    return aboutDictionaries[locale]
}
