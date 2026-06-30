import type { Post } from "contentlayer/generated"
import { getTopicHubPosts, type TopicHubDictionary, type TopicHubLocale } from "@/lib/topic-hub"

export const smallApartmentHubSlugs: Record<TopicHubLocale, string[]> = {
    ru: [
        "malenkaya-kvartira-2026-trendy",
        "malenkaya-studiya-dizayn-interera",
        "malenkaya-kuhnya",
        "osveshchenie-2026-trendy-dlya-kvartiry-i-doma",
    ],
    en: [
        "small-apartment-trends-2026",
        "small-studio-interior-design",
        "kitchen-makeover",
        "lighting-trends-2026-for-home-and-apartment",
    ],
}

const smallApartmentHubDictionaries: Record<TopicHubLocale, TopicHubDictionary> = {
    ru: {
        key: "small-apartment",
        path: "/ru/small-apartment",
        title: "Маленькая квартира: зонирование, свет и ремонт без перегруза",
        description:
            "Главные материалы Renohacks про маленькую квартиру: студии, малые кухни, свет, хранение и бюджетные решения, которые делают небольшое пространство удобнее.",
        keywords: [
            "маленькая квартира идеи",
            "ремонт маленькой квартиры",
            "дизайн студии",
            "маленькая кухня",
            "зонирование маленькой квартиры",
            "свет для маленькой квартиры",
            "хранение в маленькой квартире",
        ],
        eyebrow: "Тематический хаб",
        breadcrumbLabel: "Маленькая квартира",
        featureCards: [
            {
                icon: "home",
                title: "Зонирование и хранение",
                description: "Собрать пространство так, чтобы каждая зона работала, а квартира не выглядела перегруженной.",
            },
            {
                icon: "lightbulb",
                title: "Свет и ощущение объема",
                description: "Свет, палитра и визуальные акценты, которые действительно меняют восприятие маленькой площади.",
            },
            {
                icon: "calculator",
                title: "Бюджетные улучшения",
                description: "Сфокусироваться на решениях, которые дают заметный эффект без полной переделки квартиры.",
            },
        ],
        calculator: {
            icon: "lightbulb",
            eyebrow: "Практический инструмент",
            title: "Калькулятор освещенности",
            description:
                "Проверьте свет для студии или маленькой квартиры, чтобы пространство не казалось темным и тесным.",
            href: "/ru/calculators/lighting",
            buttonLabel: "Открыть калькулятор",
        },
        relatedTitle: "Что еще полезно для маленькой квартиры",
        relatedLinks: [
            {
                icon: "calculator",
                title: "Планировщик бюджета",
                description: "Сведите обновление квартиры в одну смету и поймите, где вложения дадут лучший эффект.",
                href: "/ru/calculators/budget",
            },
            {
                icon: "calculator",
                title: "Генератор цветовых палитр",
                description: "Проверьте палитру для стен, мебели и текстиля до покупки отделки и декора.",
                href: "/ru/calculators/color-palette",
            },
            {
                icon: "home",
                title: "Хаб по кухне",
                description: "Откройте комнатный хаб, если хотите отдельно разобрать маленькую кухню и рабочие зоны.",
                href: "/ru/kitchen",
            },
        ],
        featuredLabel: "С чего начать",
        featuredIntro:
            "Сначала определить зонирование и свет, затем перейти к хранению, цвету и точечным обновлениям, которые не перегружают маленькую площадь.",
        articlesTitle: "Статьи про маленькую квартиру",
        articlesDescription:
            "Подборка материалов про студии, малые кухни, свет и приемы, которые помогают небольшой квартире работать лучше каждый день.",
        faqTitle: "Частые вопросы о маленькой квартире",
        faqs: [
            {
                question: "Что сильнее всего делает маленькую квартиру удобнее?",
                answer:
                    "Чаще всего сильнее всего помогают четкое зонирование, спокойная палитра, продуманное хранение и свет без темных провалов.",
            },
            {
                question: "Нужно ли все делать белым, если квартира маленькая?",
                answer:
                    "Нет. Важнее держать палитру собранной и не дробить пространство слишком большим количеством контрастных материалов.",
            },
            {
                question: "Что планировать раньше: декор или зонирование?",
                answer:
                    "Сначала лучше решить логику зон, проходов и хранения, а уже после этого переходить к декору и акцентам.",
            },
            {
                question: "На что тратить бюджет в маленькой квартире в первую очередь?",
                answer:
                    "Обычно лучший эффект дают свет, хранение, обновление самых заметных поверхностей и решения, которые убирают визуальный шум.",
            },
            {
                question: "Как сделать маленькую квартиру визуально легче?",
                answer:
                    "Помогают мягкий свет, вертикальное хранение, меньше дробных отделок и более чистые линии мебели и стен.",
            },
        ],
    },
    en: {
        key: "small-apartment",
        path: "/small-apartment",
        title: "Small Apartment Ideas: Zoning, Lighting, and Renovation Without Overload",
        description:
            "Best Renohacks content on small apartments: studios, small kitchens, lighting, storage, and budget-aware decisions that make compact spaces work better.",
        keywords: [
            "small apartment ideas",
            "small apartment renovation",
            "studio apartment design",
            "small kitchen ideas",
            "small apartment storage",
            "lighting for small apartment",
            "small space zoning",
        ],
        eyebrow: "Topic hub",
        breadcrumbLabel: "Small Apartment",
        featureCards: [
            {
                icon: "home",
                title: "Zoning and storage",
                description: "Set up the space so each zone works clearly without making the apartment feel overloaded.",
            },
            {
                icon: "lightbulb",
                title: "Lighting and sense of space",
                description: "Lighting, palette, and visual emphasis that genuinely change how a compact apartment feels.",
            },
            {
                icon: "calculator",
                title: "Budget-aware upgrades",
                description: "Focus on the decisions that create visible change without turning the whole apartment upside down.",
            },
        ],
        calculator: {
            icon: "lightbulb",
            eyebrow: "Practical tool",
            title: "Lighting calculator",
            description:
                "Check lighting for a studio or compact apartment so the space does not feel dark, flat, or tighter than it is.",
            href: "/calculators/lighting",
            buttonLabel: "Open calculator",
        },
        relatedTitle: "Also useful for small-space planning",
        relatedLinks: [
            {
                icon: "calculator",
                title: "Budget planner",
                description: "Roll the apartment update into one estimate and see where spending will change daily life the most.",
                href: "/calculators/budget",
            },
            {
                icon: "calculator",
                title: "Color palette generator",
                description: "Build the wall, furniture, and textile palette before buying finishes or decor.",
                href: "/calculators/color-palette",
            },
            {
                icon: "home",
                title: "Kitchen hub",
                description: "Open the room hub if you want to break down a small kitchen and its work zones separately.",
                href: "/kitchen",
            },
        ],
        featuredLabel: "Start here",
        featuredIntro:
            "Start with zoning and lighting, then move into storage, color direction, and the smaller upgrades that have the biggest effect in a compact apartment.",
        articlesTitle: "Small apartment articles",
        articlesDescription:
            "A focused set of articles on studios, small kitchens, lighting, and the decisions that make compact apartments function better every day.",
        faqTitle: "Common small apartment questions",
        faqs: [
            {
                question: "What improves a small apartment the most?",
                answer:
                    "Clear zoning, calmer color direction, better storage, and lighting without dark corners usually make the biggest difference.",
            },
            {
                question: "Does a small apartment have to be all white?",
                answer:
                    "No. What matters more is a controlled palette and fewer competing finishes so the space does not feel visually fragmented.",
            },
            {
                question: "What should come first: decor or zoning?",
                answer:
                    "Zoning should come first. Once circulation, storage, and room functions are clear, decor decisions become much easier.",
            },
            {
                question: "Where should a small-apartment budget go first?",
                answer:
                    "Lighting, storage, the most visible surfaces, and anything that reduces visual clutter usually give the strongest return.",
            },
            {
                question: "How can a small apartment feel visually lighter?",
                answer:
                    "Softer lighting, vertical storage, fewer fragmented finishes, and cleaner furniture lines usually help the most.",
            },
        ],
    },
}

export function getSmallApartmentHubDictionary(locale: TopicHubLocale) {
    return smallApartmentHubDictionaries[locale]
}

export function getSmallApartmentHubPosts(posts: Post[], locale: TopicHubLocale): Post[] {
    return getTopicHubPosts(posts, locale, smallApartmentHubSlugs[locale])
}
