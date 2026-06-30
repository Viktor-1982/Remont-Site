import type { Post } from "contentlayer/generated"
import { getTopicHubPosts, type TopicHubDictionary, type TopicHubLocale } from "@/lib/topic-hub"

export const budgetPlanningHubSlugs: Record<TopicHubLocale, string[]> = {
    ru: [
        "remont-kvartiry-plan-2026",
        "kak-sekonomit-na-remonte",
        "remont-bez-peredelok-2026",
        "5-oshibok-novichkov-remonta-kvartiry",
        "sovremennye-podkhody-k-remontu-kvartir-2026",
    ],
    en: [
        "apartment-renovation-plan-2026",
        "how-to-save-money-on-renovation",
        "renovation-without-rework-2026",
        "5-apartment-renovation-mistakes",
        "modern-apartment-renovation-2026",
    ],
}

const budgetPlanningHubDictionaries: Record<TopicHubLocale, TopicHubDictionary> = {
    ru: {
        key: "budget-planning",
        path: "/ru/budget-planning",
        title: "Смета и планирование ремонта",
        description:
            "Главные материалы Renohacks про бюджет ремонта: смета, этапы, резерв, экономия без потери качества и контроль расходов по ходу проекта.",
        keywords: [
            "бюджет ремонта",
            "смета ремонта",
            "план ремонта квартиры",
            "как сэкономить на ремонте",
            "контроль расходов на ремонт",
            "ошибки бюджета ремонта",
            "этапы ремонта квартиры",
        ],
        eyebrow: "Тематический хаб",
        breadcrumbLabel: "Смета и планирование",
        featureCards: [
            {
                icon: "calculator",
                title: "Рабочая смета",
                description: "Разделите ремонт по категориям, чтобы видеть реальные дорогие зоны, а не одну общую цифру.",
            },
            {
                icon: "grid",
                title: "Этапы и приоритеты",
                description: "Сначала закрыть основу и инженерку, потом переходить к отделке, мебели и декору.",
            },
            {
                icon: "wrench",
                title: "Резерв и контроль",
                description: "Заложите запас и обновляйте смету после каждого финального решения, чтобы не терять контроль.",
            },
        ],
        calculator: {
            icon: "calculator",
            eyebrow: "Практический инструмент",
            title: "Планировщик бюджета ремонта",
            description:
                "Соберите смету по работам, материалам, валюте и резерву, чтобы видеть проект целиком еще до закупок.",
            href: "/ru/calculators/budget",
            buttonLabel: "Открыть планировщик",
        },
        relatedTitle: "Что еще полезно для планирования",
        relatedLinks: [
            {
                icon: "grid",
                title: "Калькулятор напольного покрытия",
                description: "Проверьте одну из самых дорогих отделочных категорий по упаковкам, запасу и площади.",
                href: "/ru/calculators/flooring",
            },
            {
                icon: "calculator",
                title: "Серия «План и смета»",
                description: "Откройте материалы про бюджет, этапы ремонта и решения, которые не дают смете расползаться.",
                href: "/ru/series/budget-planning",
            },
            {
                icon: "home",
                title: "Хаб по кухне",
                description: "Перейдите в комнатный хаб, если хотите разобрать одну из самых дорогих зон ремонта отдельно.",
                href: "/ru/kitchen",
            },
        ],
        featuredLabel: "С чего начать",
        featuredIntro:
            "Сначала собрать план и смету по этапам, затем проверить, где проект реально дорожает и какие решения лучше считать отдельно.",
        articlesTitle: "Статьи про смету и планирование",
        articlesDescription:
            "Подборка материалов про смету, экономию, порядок работ и ошибки, которые чаще всего раздувают бюджет ремонта.",
        faqTitle: "Частые вопросы о смете ремонта",
        faqs: [
            {
                question: "Какой резерв закладывать в бюджет ремонта?",
                answer:
                    "Обычно безопасно закладывать не меньше 10 процентов, а для старой квартиры или сложного проекта ближе к 15 процентам.",
            },
            {
                question: "Что считать раньше всего в смете?",
                answer:
                    "Сначала лучше считать черновые и инженерные работы, затем самые дорогие чистовые категории: кухню, санузел, полы и освещение.",
            },
            {
                question: "Почему бюджет ремонта чаще всего выходит из-под контроля?",
                answer:
                    "Чаще всего смету ломают незакрытые решения по материалам, изменение объема работ по ходу проекта и отсутствие резерва на скрытые расходы.",
            },
            {
                question: "Что важнее: сначала материалы или сначала работы?",
                answer:
                    "В смете нужно закладывать оба блока сразу, но отдельно. Так легче видеть, какая часть бюджета уходит на материалы, а какая на монтаж.",
            },
            {
                question: "Как часто обновлять смету во время ремонта?",
                answer:
                    "Лучше обновлять ее после каждого подтвержденного пакета решений: кухня, санузел, полы, краска, свет и техника.",
            },
        ],
    },
    en: {
        key: "budget-planning",
        path: "/budget-planning",
        title: "Planning and Budget for Renovation",
        description:
            "Best Renohacks content on renovation budgeting: working estimates, phasing, contingency, cost control, and ways to save without gutting the result.",
        keywords: [
            "renovation budget planning",
            "remodel cost planning",
            "renovation budget calculator",
            "how to save money on renovation",
            "remodel contingency",
            "renovation planning steps",
            "common renovation budget mistakes",
        ],
        eyebrow: "Topic hub",
        breadcrumbLabel: "Planning and Budget",
        featureCards: [
            {
                icon: "calculator",
                title: "Working budget",
                description: "Split the remodel into categories so you can see the expensive zones instead of hiding everything in one total.",
            },
            {
                icon: "grid",
                title: "Phasing and priorities",
                description: "Lock the base work and systems first, then move into finishes, furniture, and the softer decisions.",
            },
            {
                icon: "wrench",
                title: "Contingency and control",
                description: "Set a reserve early and update the budget after every confirmed package of decisions.",
            },
        ],
        calculator: {
            icon: "calculator",
            eyebrow: "Practical tool",
            title: "Renovation budget planner",
            description:
                "Build a room-by-room estimate with work, materials, currency, and contingency before you start ordering.",
            href: "/calculators/budget",
            buttonLabel: "Open planner",
        },
        relatedTitle: "Also useful for renovation planning",
        relatedLinks: [
            {
                icon: "grid",
                title: "Flooring calculator",
                description: "Validate one of the most expensive finish categories by packs, waste, and real floor coverage.",
                href: "/calculators/flooring",
            },
            {
                icon: "calculator",
                title: "Budget and Planning series",
                description: "Open the series built around budgeting, phasing, and decisions that keep costs from drifting.",
                href: "/series/budget-planning",
            },
            {
                icon: "home",
                title: "Kitchen hub",
                description: "Jump into a room hub if you want to price one of the most expensive remodel zones separately.",
                href: "/kitchen",
            },
        ],
        featuredLabel: "Start here",
        featuredIntro:
            "Start with the plan and the budget structure, then review where a remodel really gets expensive and which decisions need separate calculations.",
        articlesTitle: "Budget and planning articles",
        articlesDescription:
            "A focused set of articles on renovation budgeting, savings, phasing, and the mistakes that most often push costs upward.",
        faqTitle: "Common renovation budget questions",
        faqs: [
            {
                question: "How much contingency should I add to a renovation budget?",
                answer:
                    "Around 10 percent is a common minimum. Older apartments and more complex remodels often need something closer to 15 percent.",
            },
            {
                question: "What should I price first in a renovation budget?",
                answer:
                    "Start with rough work and engineering, then price the expensive finish categories such as kitchens, bathrooms, flooring, and lighting.",
            },
            {
                question: "Why do renovation budgets drift so easily?",
                answer:
                    "The most common reasons are unfinished material decisions, scope changes during the job, and no reserve for hidden costs.",
            },
            {
                question: "What matters more first: labor or materials?",
                answer:
                    "You should budget both from the start, but keep them separate so it stays clear what is driving the total.",
            },
            {
                question: "How often should I update the budget during a remodel?",
                answer:
                    "Update it after every confirmed package of decisions: kitchen, bathroom, flooring, paint, lighting, and appliances.",
            },
        ],
    },
}

export function getBudgetPlanningHubDictionary(locale: TopicHubLocale) {
    return budgetPlanningHubDictionaries[locale]
}

export function getBudgetPlanningHubPosts(posts: Post[], locale: TopicHubLocale): Post[] {
    return getTopicHubPosts(posts, locale, budgetPlanningHubSlugs[locale])
}
