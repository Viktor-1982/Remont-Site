import type { Post } from "contentlayer/generated"
import { getTopicHubPosts, type TopicHubDictionary, type TopicHubLocale } from "@/lib/topic-hub"

export const flooringHubSlugs: Record<TopicHubLocale, string[]> = {
    ru: [
        "kak-rasschitat-laminat-i-kvarcvinil",
        "kak-rasschitat-styazhku-pola",
        "skolko-nuzhno-plintusa",
        "remont-chernovoy-kvartiry",
    ],
    en: [
        "how-to-calculate-laminate-and-lvt",
        "how-to-calculate-floor-screed",
        "how-much-baseboard-do-you-need",
        "rough-renovation-guide",
    ],
}

const flooringHubDictionaries: Record<TopicHubLocale, TopicHubDictionary> = {
    ru: {
        key: "flooring",
        path: "/flooring",
        title: "Полы и покрытия: стяжка, расчет и выбор без лишних ошибок",
        description:
            "Главные материалы Renohacks про полы: стяжка, ламинат, кварцвинил, плинтус, расход материалов и порядок работ по основанию и финишному покрытию.",
        keywords: [
            "полы и покрытия",
            "стяжка пола",
            "ламинат расчет",
            "кварцвинил расчет",
            "сколько нужно плинтуса",
            "черновой ремонт пола",
            "расчет напольного покрытия",
        ],
        eyebrow: "Тематический хаб",
        breadcrumbLabel: "Полы и покрытия",
        featureCards: [
            {
                icon: "wrench",
                title: "Основание и стяжка",
                description: "Подготовить ровную и понятную базу, чтобы чистовое покрытие не создавало проблем позже.",
            },
            {
                icon: "grid",
                title: "Финишное покрытие",
                description: "Сравнить ламинат, кварцвинил и другие варианты по запасу, укладке и бытовой нагрузке.",
            },
            {
                icon: "calculator",
                title: "Периметр и расход",
                description: "Сразу считать не только покрытие, но и подложку, плинтус, отходы и доборные элементы.",
            },
        ],
        calculator: {
            icon: "calculator",
            eyebrow: "Практический инструмент",
            title: "Калькулятор напольного покрытия",
            description:
                "Посчитайте покрытие по упаковкам, запасу и подложке, а затем быстро доберите смету по полу.",
            href: "/calculators/flooring",
            buttonLabel: "Открыть калькулятор",
        },
        relatedTitle: "Что еще полезно по полу",
        relatedLinks: [
            {
                icon: "wrench",
                title: "Калькулятор стяжки пола",
                description: "Оцените объем смеси и базовые расходы, если работа начинается с чернового основания.",
                href: "/calculators/screed",
            },
            {
                icon: "calculator",
                title: "Калькулятор плинтуса",
                description: "Закройте периметр комнаты и доборные элементы, пока размеры помещения уже под рукой.",
                href: "/calculators/baseboard",
            },
            {
                icon: "calculator",
                title: "Планировщик бюджета",
                description: "Сведите покрытие, подложку, стяжку и плинтус в одну понятную смету по полу.",
                href: "/calculators/budget",
            },
        ],
        featuredLabel: "С чего начать",
        featuredIntro:
            "Сначала проверить основание и будущий финишный слой, потом посчитать материал, отходы и весь комплект по полу целиком.",
        articlesTitle: "Статьи про полы и покрытия",
        articlesDescription:
            "Подборка материалов про стяжку, расчет ламината и кварцвинила, плинтус и порядок работ по полу от базы до финиша.",
        faqTitle: "Частые вопросы о ремонте пола",
        faqs: [
            {
                question: "Что делать раньше: стяжку или выбор покрытия?",
                answer:
                    "Базу пола все равно нужно понимать заранее, но окончательный выбор покрытия лучше сверять с реальным состоянием основания и уровнем пола.",
            },
            {
                question: "Какой запас брать на ламинат и кварцвинил?",
                answer:
                    "Для прямой укладки часто хватает 7–10 процентов, а для более сложной геометрии помещения и подрезки лучше брать ближе к 10–15 процентам.",
            },
            {
                question: "Нужна ли подложка всегда?",
                answer:
                    "Не всегда. Это зависит от выбранного покрытия и требований производителя. Некоторые системы уже идут со встроенной подложкой.",
            },
            {
                question: "Когда ставить плинтус?",
                answer:
                    "Обычно плинтус ставят после укладки чистового пола и завершения большей части отделки стен и дверных откосов.",
            },
            {
                question: "Что сильнее всего влияет на бюджет пола?",
                answer:
                    "Чаще всего дорожает не только само покрытие, но и подготовка основания, подложка, доборные элементы и скрытые перепады уровня.",
            },
        ],
    },
    en: {
        key: "flooring",
        path: "/en/flooring",
        title: "Flooring: Screed, Finish Planning, and Smarter Floor Calculations",
        description:
            "Best Renohacks content on flooring: screed, laminate and LVT calculations, baseboards, floor prep, and the order of work from base to finish.",
        keywords: [
            "flooring planning",
            "screed calculator",
            "laminate calculator",
            "lvt calculator",
            "baseboard calculator",
            "rough floor preparation",
            "flooring estimate",
        ],
        eyebrow: "Topic hub",
        breadcrumbLabel: "Flooring",
        featureCards: [
            {
                icon: "wrench",
                title: "Base prep and screed",
                description: "Understand the floor base first so the finish layer does not create avoidable problems later.",
            },
            {
                icon: "grid",
                title: "Finish flooring choices",
                description: "Compare laminate, LVT, and other finish layers by waste, installation logic, and daily wear.",
            },
            {
                icon: "calculator",
                title: "Perimeter and quantity",
                description: "Price more than the floor finish itself: underlay, baseboards, waste, and transition pieces matter too.",
            },
        ],
        calculator: {
            icon: "calculator",
            eyebrow: "Practical tool",
            title: "Flooring calculator",
            description:
                "Estimate finish flooring by packs, waste, and underlay, then build out the full floor package.",
            href: "/en/calculators/flooring",
            buttonLabel: "Open calculator",
        },
        relatedTitle: "Also useful for floor planning",
        relatedLinks: [
            {
                icon: "wrench",
                title: "Screed calculator",
                description: "Estimate mix volume and basic cost if your project starts with the rough floor base.",
                href: "/en/calculators/screed",
            },
            {
                icon: "calculator",
                title: "Baseboard calculator",
                description: "Finish the room perimeter while the floor dimensions are already in front of you.",
                href: "/en/calculators/baseboard",
            },
            {
                icon: "calculator",
                title: "Budget planner",
                description: "Roll flooring, underlay, screed, and trim into one clearer room-level estimate.",
                href: "/en/calculators/budget",
            },
        ],
        featuredLabel: "Start here",
        featuredIntro:
            "Start with the floor base and the finish layer, then calculate quantity, waste, and the full set of materials around the room perimeter.",
        articlesTitle: "Flooring articles",
        articlesDescription:
            "A focused set of articles on screed, laminate and LVT calculations, baseboards, and the order of work from rough base to finished floor.",
        faqTitle: "Common flooring questions",
        faqs: [
            {
                question: "Should I plan the screed before choosing the finish floor?",
                answer:
                    "You still need to understand the floor base first, but the final finish choice should be checked against the real base condition and floor level.",
            },
            {
                question: "How much waste should I add for laminate or LVT?",
                answer:
                    "Around 7–10 percent is common for straight layouts, while more complex room shapes and heavier cutting often need something closer to 10–15 percent.",
            },
            {
                question: "Do I always need underlay?",
                answer:
                    "Not always. It depends on the finish product and the manufacturer requirements. Some systems already include an attached backing layer.",
            },
            {
                question: "When should baseboards be installed?",
                answer:
                    "Baseboards usually go in after the finish floor is down and most wall and door-jamb finishing is already complete.",
            },
            {
                question: "What usually drives floor cost the most?",
                answer:
                    "It is often not just the finish product. Base prep, underlay, transitions, trims, and hidden level corrections can move the budget significantly.",
            },
        ],
    },
}

export function getFlooringHubDictionary(locale: TopicHubLocale) {
    return flooringHubDictionaries[locale]
}

export function getFlooringHubPosts(posts: Post[], locale: TopicHubLocale): Post[] {
    return getTopicHubPosts(posts, locale, flooringHubSlugs[locale])
}
