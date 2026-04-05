export type EditorialStandardsLocale = "ru" | "en"

type StandardsStepIcon = "fileText" | "clipboardCheck" | "calculator" | "refreshCw"

export interface StandardsStep {
    title: string
    description: string
    points: string[]
    icon: StandardsStepIcon
}

export interface StandardsFaqItem {
    question: string
    answer: string
}

export interface EditorialStandardsDictionary {
    path: string
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
        eyebrow: string
        title: string
        lead: string
    }
    process: {
        title: string
        description: string
        steps: StandardsStep[]
    }
    principles: {
        title: string
        items: string[]
    }
    faq: {
        title: string
        items: StandardsFaqItem[]
    }
    articleLinkLabel: string
    footerLabel: string
    footerTitle: string
}

const dictionaries: Record<EditorialStandardsLocale, EditorialStandardsDictionary> = {
    ru: {
        path: "/editorial-standards",
        metadata: {
            title: "Как мы проверяем материалы и инструменты | Renohacks",
            description:
                "Объясняем, как в Renohacks готовятся статьи, на чем основаны выводы, как проверяются инструменты и когда мы обновляем материалы.",
        },
        breadcrumb: {
            homeLabel: "Главная",
            pageLabel: "Как мы проверяем",
            pagePath: "/editorial-standards",
        },
        hero: {
            eyebrow: "Редакционный процесс Renohacks",
            title: "Как мы проверяем материалы и инструменты",
            lead: "Мы опираемся не только на открытые источники, но и на собственный практический опыт ремонта. Наша задача - делать материалы понятными, прикладными и полезными для реальных решений по ремонту.",
        },
        process: {
            title: "Как устроена проверка",
            description: "Для статей, подборок и инструментов мы держим один и тот же рабочий принцип: сначала практическая задача, потом проверка логики, цифр и формулировок.",
            steps: [
                {
                    icon: "fileText",
                    title: "Как готовится статья",
                    description: "Мы выбираем темы по реальным задачам ремонта: что чаще всего вызывает ошибки, лишние расходы или сомнения при выборе.",
                    points: [
                        "Сначала собираем тему вокруг конкретной задачи, а не вокруг абстрактной теории.",
                        "Опираемся на открытые источники, нормы, рыночную практику и собственный практический опыт ремонта.",
                        "Редактируем материал так, чтобы читателю было понятно, что делать, в каком порядке и где чаще всего ошибаются.",
                    ],
                },
                {
                    icon: "clipboardCheck",
                    title: "На чем основаны выводы",
                    description: "Если в материале есть сравнения, советы по выбору или спорные решения, мы стараемся показать, на чем именно они основаны.",
                    points: [
                        "Берем в расчет реальную применимость решения, а не только красивую подачу.",
                        "Проверяем, чтобы советы не противоречили логике ремонта, последовательности работ и здравому смыслу.",
                        "Избегаем формулировок, которые звучат уверенно, но не помогают принять практическое решение.",
                    ],
                },
                {
                    icon: "calculator",
                    title: "Как проверяются инструменты",
                    description: "Калькуляторы, планировщики и другие инструменты мы проверяем не только на формулу, но и на полезность результата.",
                    points: [
                        "Проверяем входные данные, сценарии расчета и пограничные случаи.",
                        "Смотрим, чтобы итог был понятен обычному пользователю, а не только человеку с технической подготовкой.",
                        "Если инструмент дает ориентир, мы прямо обозначаем это как ориентир, а не как точную смету или норму для любого объекта.",
                    ],
                },
                {
                    icon: "refreshCw",
                    title: "Когда мы обновляем материалы",
                    description: "Мы пересматриваем материалы, если меняются рекомендации, появляются более точные данные или становится ясно, что текст можно сделать полезнее.",
                    points: [
                        "Обновляем статьи, если меняется практика, рынок или важные вводные для расчета.",
                        "Исправляем неточные формулировки и слабые места в логике материала.",
                        "Если пользователь замечает ошибку, это тоже повод для проверки и обновления.",
                    ],
                },
            ],
        },
        principles: {
            title: "Наши рабочие принципы",
            items: [
                "Писать для реального ремонта, а не для красивой витрины.",
                "Не усложнять там, где решение можно объяснить простым языком.",
                "Отделять точный расчет от ориентировочного планирования.",
                "Не выдавать общий совет за универсальное правило для любого объекта.",
                "Использовать собственный опыт ремонта как практическую проверку, а не как замену фактам.",
            ],
        },
        faq: {
            title: "Частые вопросы",
            items: [
                {
                    question: "Можно ли считать ваши статьи профессиональной технической экспертизой?",
                    answer: "Нет. Мы делаем практические редакционные материалы для планирования и принятия решений, но они не заменяют проект, замер, технадзор или консультацию профильного специалиста на объекте.",
                },
                {
                    question: "Можно ли полностью опираться на инструменты Renohacks при закупке?",
                    answer: "Ими удобно пользоваться как рабочим ориентиром до закупки, но итоговые объемы и бюджет все равно стоит перепроверять по конкретному помещению, материалу и способу монтажа.",
                },
                {
                    question: "Что для вас значит собственный опыт ремонта?",
                    answer: "Это практическое понимание последовательности работ, типовых ошибок, слабых мест в смете и решений, которые действительно работают в обычной квартире или доме.",
                },
                {
                    question: "Исправляете ли вы ошибки после публикации?",
                    answer: "Да. Если мы видим неточность в тексте, расчете или формулировке, материал пересматривается и обновляется.",
                },
            ],
        },
        articleLinkLabel: "Как мы проверяем материалы и инструменты",
        footerLabel: "Как мы проверяем",
        footerTitle: "Как Renohacks проверяет материалы и инструменты",
    },
    en: {
        path: "/en/editorial-standards",
        metadata: {
            title: "How We Review Materials and Tools | Renohacks",
            description:
                "See how Renohacks prepares articles, what our recommendations are based on, how tools are checked, and when we update content.",
        },
        breadcrumb: {
            homeLabel: "Home",
            pageLabel: "How we review",
            pagePath: "/en/editorial-standards",
        },
        hero: {
            eyebrow: "The Renohacks editorial process",
            title: "How We Review Materials and Tools",
            lead: "We do not rely on external sources alone. We also use our own hands-on renovation experience to keep articles and tools practical, clear, and useful for real remodeling decisions.",
        },
        process: {
            title: "How the review process works",
            description: "We use the same working logic for articles, roundups, and tools: start with a real renovation task, then verify the reasoning, the numbers, and the wording.",
            steps: [
                {
                    icon: "fileText",
                    title: "How an article is prepared",
                    description: "We choose topics around real renovation decisions, especially where people tend to waste money, make avoidable mistakes, or get stuck between options.",
                    points: [
                        "We build the piece around a practical question, not around abstract theory.",
                        "We use open sources, standards, market practice, and our own renovation experience together.",
                        "We edit the material so a regular homeowner can understand what to do, in what order, and where mistakes usually happen.",
                    ],
                },
                {
                    icon: "clipboardCheck",
                    title: "What our recommendations are based on",
                    description: "When a piece includes comparisons, buying advice, or judgment calls, we try to make sure those recommendations are grounded in something useful and defensible.",
                    points: [
                        "We look for decisions that can actually be applied in a real project, not just ideas that look good in theory.",
                        "We check that the advice fits renovation logic, work sequencing, and practical tradeoffs.",
                        "We avoid confident wording when the recommendation is only a rough guideline.",
                    ],
                },
                {
                    icon: "calculator",
                    title: "How tools are checked",
                    description: "We test calculators, planners, and other tools for more than formula accuracy. We also check whether the result is understandable and usable.",
                    points: [
                        "We review inputs, calculation paths, and edge cases.",
                        "We make sure the output is readable for a normal user, not only for someone with technical experience.",
                        "If a tool gives an estimate, we label it as an estimate instead of presenting it as a universal exact answer.",
                    ],
                },
                {
                    icon: "refreshCw",
                    title: "When we update content",
                    description: "We revisit content when recommendations change, better data becomes available, or we see a clearer way to explain the same decision.",
                    points: [
                        "We update pieces when practice, pricing context, or planning assumptions shift.",
                        "We revise weak wording, gaps in logic, and unclear recommendations.",
                        "Reader feedback and reported issues are also triggers for review.",
                    ],
                },
            ],
        },
        principles: {
            title: "Our working principles",
            items: [
                "Write for real renovation work, not for a decorative content feed.",
                "Keep the language simple when the decision itself is already hard enough.",
                "Separate exact calculation from rough planning guidance.",
                "Do not present a broad recommendation as a universal rule for every home.",
                "Use our own renovation experience as a practical check, not as a substitute for facts.",
            ],
        },
        faq: {
            title: "Common questions",
            items: [
                {
                    question: "Do your articles replace technical or professional advice?",
                    answer: "No. Our content is meant to help with planning and decision-making, but it does not replace on-site measurements, a project plan, technical supervision, or advice from a qualified specialist.",
                },
                {
                    question: "Can I rely entirely on Renohacks tools before buying materials?",
                    answer: "They are useful working estimates, but final quantities and budgets should still be checked against the exact room, the product you choose, and the installation method.",
                },
                {
                    question: "What do you mean by your own renovation experience?",
                    answer: "We mean practical experience with work sequencing, common mistakes, budget weak spots, and the kinds of decisions that actually hold up in a normal apartment or house.",
                },
                {
                    question: "Do you correct mistakes after publishing?",
                    answer: "Yes. If we find a weak calculation, unclear recommendation, or factual issue, we review the piece and update it.",
                },
            ],
        },
        articleLinkLabel: "How we review materials and tools",
        footerLabel: "How we review",
        footerTitle: "How Renohacks reviews materials and tools",
    },
}

export function getEditorialStandardsDictionary(locale: EditorialStandardsLocale): EditorialStandardsDictionary {
    return dictionaries[locale]
}

export function getEditorialStandardsPath(locale: EditorialStandardsLocale): string {
    return dictionaries[locale].path
}
