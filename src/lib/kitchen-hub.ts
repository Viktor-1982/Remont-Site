import type { Post } from "contentlayer/generated"
import { getTopicHubPosts, type TopicHubDictionary, type TopicHubLocale } from "@/lib/topic-hub"

export const kitchenHubSlugs: Record<TopicHubLocale, string[]> = {
    ru: [
        "dizayn-kuhni-2026",
        "malenkaya-kuhnya",
        "materialy-i-poverkhnosti-2026",
        "osveshchenie-2026-trendy-dlya-kvartiry-i-doma",
    ],
    en: [
        "kitchen-trends-2026",
        "kitchen-makeover",
        "material-surface-trends-2026",
        "lighting-trends-2026-for-home-and-apartment",
    ],
}

const kitchenHubDictionaries: Record<TopicHubLocale, TopicHubDictionary> = {
    ru: {
        key: "kitchen",
        path: "/kitchen",
        title: "Кухня: планировка, материалы и ремонт без лишних ошибок",
        description:
            "Главные материалы Renohacks по кухне: планировка, маленькая кухня, материалы и поверхности, свет, фартук, плитка и бюджет ремонта.",
        keywords: [
            "ремонт кухни",
            "дизайн кухни",
            "маленькая кухня",
            "планировка кухни",
            "материалы для кухни",
            "освещение кухни",
            "бюджет ремонта кухни",
        ],
        eyebrow: "Тематический хаб",
        breadcrumbLabel: "Кухня",
        featureCards: [
            {
                icon: "home",
                title: "Планировка и хранение",
                description: "Остров, рабочий треугольник, проходы и хранение, которые делают кухню удобной каждый день.",
            },
            {
                icon: "grid",
                title: "Фасады, фартук и поверхности",
                description: "Материалы, плитка, фартук и спокойные фактуры, которые выдерживают ежедневную нагрузку.",
            },
            {
                icon: "lightbulb",
                title: "Свет и сценарии работы",
                description: "Подсветка рабочей зоны, свет над островом и вечерние сценарии без пересвета.",
            },
        ],
        calculator: {
            icon: "calculator",
            eyebrow: "Практический инструмент",
            title: "Планировщик бюджета кухни",
            description:
                "Сведите мебель, фартук, технику, свет и отделку в одну понятную смету перед закупкой материалов.",
            href: "/calculators/budget",
            buttonLabel: "Открыть планировщик",
        },
        relatedTitle: "Что еще полезно по кухне",
        relatedLinks: [
            {
                icon: "grid",
                title: "Калькулятор плитки",
                description: "Подсчитайте плитку и запас для фартука, пола или акцентной стены кухни.",
                href: "/calculators/tile",
            },
            {
                icon: "lightbulb",
                title: "Калькулятор освещенности",
                description: "Проверьте рабочий и общий свет для кухни, острова и обеденной зоны.",
                href: "/calculators/lighting",
            },
            {
                icon: "wrench",
                title: "Калькулятор вентиляции",
                description: "Оцените воздухообмен для кухни, особенно если зона готовки объединена с гостиной.",
                href: "/calculators/ventilation",
            },
        ],
        featuredLabel: "С чего начать",
        featuredIntro:
            "Сначала разберитесь с планировкой и образом кухни, потом переходите к материалам, свету и рабочему бюджету.",
        articlesTitle: "Статьи про кухню",
        articlesDescription:
            "Подборка материалов про тренды кухни, бюджетное обновление, поверхности и свет, которые сильнее всего влияют на ежедневный комфорт.",
        faqTitle: "Частые вопросы о ремонте кухни",
        faqs: [
            {
                question: "Что планировать раньше: планировку кухни или материалы?",
                answer:
                    "Сначала лучше решить планировку, хранение и расположение техники, а уже после этого выбирать фасады, фартук, столешницу и свет.",
            },
            {
                question: "Что сильнее всего влияет на бюджет кухни?",
                answer:
                    "Обычно больше всего влияют мебель, столешница, техника и свет. Именно их стоит считать отдельно и закладывать с резервом.",
            },
            {
                question: "Нужна ли плитка на фартук или можно обойтись без нее?",
                answer:
                    "Можно и без плитки, но фартук все равно должен быть из практичного, легко моющегося материала. Плитка просто остается самым надежным и понятным решением.",
            },
            {
                question: "Какой свет обязателен на кухне?",
                answer:
                    "Минимум нужен общий свет и отдельный рабочий свет над столешницей. Если есть остров или обеденная зона, для них лучше делать отдельные сценарии.",
            },
            {
                question: "Как улучшить маленькую кухню без полного ремонта?",
                answer:
                    "Сильнее всего помогают свет, обновление фасадов, аккуратный фартук, упрощение цвета и более чистая рабочая поверхность без визуального шума.",
            },
        ],
    },
    en: {
        key: "kitchen",
        path: "/en/kitchen",
        title: "Kitchen Remodeling Ideas, Layout, and Practical Planning",
        description:
            "Best Renohacks kitchen content: kitchen layout, small-kitchen upgrades, finishes and surfaces, lighting, backsplash decisions, and renovation budgeting.",
        keywords: [
            "kitchen remodel ideas",
            "kitchen layout planning",
            "small kitchen ideas",
            "kitchen finishes",
            "kitchen lighting ideas",
            "kitchen backsplash ideas",
            "kitchen remodel budget",
        ],
        eyebrow: "Topic hub",
        breadcrumbLabel: "Kitchen",
        featureCards: [
            {
                icon: "home",
                title: "Layout and storage",
                description: "Work triangle, island, circulation, and storage choices that make a kitchen easier to use every day.",
            },
            {
                icon: "grid",
                title: "Backsplash, finishes, and surfaces",
                description: "Cabinet fronts, backsplash materials, countertops, and finishes that hold up to daily use.",
            },
            {
                icon: "lightbulb",
                title: "Lighting and work zones",
                description: "Task lighting, island lighting, and calmer evening scenes without harsh glare.",
            },
        ],
        calculator: {
            icon: "calculator",
            eyebrow: "Practical tool",
            title: "Kitchen budget planner",
            description:
                "Roll cabinetry, backsplash, lighting, appliances, and finish choices into one cleaner working budget.",
            href: "/en/calculators/budget",
            buttonLabel: "Open planner",
        },
        relatedTitle: "Also useful for kitchen planning",
        relatedLinks: [
            {
                icon: "grid",
                title: "Tile calculator",
                description: "Estimate tile and waste for a backsplash, kitchen floor, or accent wall.",
                href: "/en/calculators/tile",
            },
            {
                icon: "lightbulb",
                title: "Lighting calculator",
                description: "Check task and ambient lighting for the kitchen, island, and dining zone.",
                href: "/en/calculators/lighting",
            },
            {
                icon: "wrench",
                title: "Ventilation calculator",
                description: "Review airflow for a kitchen, especially if it opens into the living area.",
                href: "/en/calculators/ventilation",
            },
        ],
        featuredLabel: "Start here",
        featuredIntro:
            "Start with the kitchen layout and direction first, then move into finishes, lighting, and the working budget.",
        articlesTitle: "Kitchen articles",
        articlesDescription:
            "A focused set of kitchen articles on trends, budget-friendly upgrades, materials, and lighting decisions that matter in daily use.",
        faqTitle: "Common kitchen remodel questions",
        faqs: [
            {
                question: "What should be planned first: kitchen layout or finishes?",
                answer:
                    "Layout should come first. Once circulation, storage, and appliance positions are clear, finish choices become easier and more consistent.",
            },
            {
                question: "What usually drives a kitchen remodel budget the most?",
                answer:
                    "Cabinetry, countertops, appliances, and lighting usually have the biggest impact, so those items should be priced early and with reserve.",
            },
            {
                question: "Does a kitchen always need tile for the backsplash?",
                answer:
                    "Not always, but the backsplash still needs to be durable and easy to clean. Tile remains one of the safest and most practical options.",
            },
            {
                question: "What lighting is essential in a kitchen?",
                answer:
                    "At minimum, a kitchen needs general lighting plus dedicated task lighting over the work surface. Islands and dining zones usually deserve their own lighting layer too.",
            },
            {
                question: "How can a small kitchen improve without a full renovation?",
                answer:
                    "The biggest wins usually come from better lighting, cleaner cabinet fronts, a simpler color direction, and less visual clutter on work surfaces.",
            },
        ],
    },
}

export function getKitchenHubDictionary(locale: TopicHubLocale) {
    return kitchenHubDictionaries[locale]
}

export function getKitchenHubPosts(posts: Post[], locale: TopicHubLocale): Post[] {
    return getTopicHubPosts(posts, locale, kitchenHubSlugs[locale])
}
