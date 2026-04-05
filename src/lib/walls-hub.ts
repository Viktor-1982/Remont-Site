import type { Post } from "contentlayer/generated"
import { getTopicHubPosts, type TopicHubDictionary, type TopicHubLocale } from "@/lib/topic-hub"

export const wallsHubSlugs: Record<TopicHubLocale, string[]> = {
    ru: ["pokraska-sten", "pokraska-sten-podgotovka", "vidy-oboyev", "podborka-tsvetov"],
    en: ["painting-walls-yourself", "preparing-walls-for-painting", "wallpaper-types", "living-room-color-tips"],
}

const wallsHubDictionaries: Record<TopicHubLocale, TopicHubDictionary> = {
    ru: {
        key: "walls",
        path: "/walls",
        title: "Стены и отделка: покраска, обои и подготовка без переделок",
        description:
            "Главные материалы Renohacks про стены и отделку: подготовка под покраску, выбор обоев, цветовые решения и практичный порядок работ без лишних переделок.",
        keywords: [
            "покраска стен",
            "подготовка стен под покраску",
            "обои для квартиры",
            "цвет стен",
            "стены и отделка",
            "ошибки покраски стен",
            "как выбрать обои",
        ],
        eyebrow: "Тематический хаб",
        breadcrumbLabel: "Стены и отделка",
        featureCards: [
            {
                icon: "wrench",
                title: "Подготовка основания",
                description: "Шпатлевка, грунт и ровная база, без которой даже дорогая отделка будет выглядеть слабо.",
            },
            {
                icon: "grid",
                title: "Покраска или обои",
                description: "Понять, что лучше работает именно в вашей комнате, по бюджету, уходу и визуальному эффекту.",
            },
            {
                icon: "lightbulb",
                title: "Цвет и восприятие",
                description: "Собрать палитру под свет комнаты и не получить уставший интерьер после первой же недели.",
            },
        ],
        calculator: {
            icon: "calculator",
            eyebrow: "Практический инструмент",
            title: "Калькулятор краски",
            description:
                "Проверьте расход краски по комнате, проемам и слоям, чтобы не брать материал вслепую.",
            href: "/calculators/paint",
            buttonLabel: "Открыть калькулятор",
        },
        relatedTitle: "Что еще полезно для отделки стен",
        relatedLinks: [
            {
                icon: "grid",
                title: "Калькулятор обоев",
                description: "Сравните покраску с обоями и посчитайте количество рулонов с учетом рисунка и проемов.",
                href: "/calculators/wallpaper",
            },
            {
                icon: "calculator",
                title: "Генератор цветовых палитр",
                description: "Сведите цвет стен, мебели и акцентов в одну рабочую схему до начала отделки.",
                href: "/calculators/color-palette",
            },
            {
                icon: "wrench",
                title: "Серия «Без переделок»",
                description: "Откройте материалы про ошибки и решения, которые особенно важны на этапе подготовки стен.",
                href: "/series/avoid-rework",
            },
        ],
        featuredLabel: "С чего начать",
        featuredIntro:
            "Сначала разобраться с основанием и типом отделки, затем перейти к цвету, расходу материалов и финальному выбору покрытия.",
        articlesTitle: "Статьи про стены и отделку",
        articlesDescription:
            "Подборка материалов про покраску, обои, подготовку стен и цветовые решения, которые лучше принимать до чистовой отделки.",
        faqTitle: "Частые вопросы об отделке стен",
        faqs: [
            {
                question: "Что важнее всего перед покраской стен?",
                answer:
                    "Самое важное — ровная подготовка основания и грунт. Именно они определяют, как краска будет выглядеть после высыхания.",
            },
            {
                question: "Когда обои лучше покраски?",
                answer:
                    "Обои часто удобнее там, где стены неидеальны, нужен выраженный рисунок или хочется скрыть мелкие дефекты основания.",
            },
            {
                question: "Нужна ли грунтовка перед покраской?",
                answer:
                    "Да. Грунтовка улучшает сцепление, выравнивает впитываемость и помогает избежать пятен и перерасхода краски.",
            },
            {
                question: "Как избежать заметных дефектов на стенах после ремонта?",
                answer:
                    "Не экономить на подготовке, проверять стены при боковом свете и не переходить к чистовой отделке, пока база не выглядит ровной.",
            },
            {
                question: "Как понять, какой цвет стен не надоест быстро?",
                answer:
                    "Лучше отталкиваться от света комнаты, мебели и общей палитры квартиры, а не выбирать цвет изолированно по одному образцу.",
            },
        ],
    },
    en: {
        key: "walls",
        path: "/en/walls",
        title: "Walls and Finishes: Paint, Wallpaper, and Prep Without Rework",
        description:
            "Best Renohacks content on walls and finishes: wall prep, painting, wallpaper choices, color planning, and a cleaner sequence of finish work.",
        keywords: [
            "paint walls",
            "wall preparation for paint",
            "wallpaper ideas",
            "wall finish ideas",
            "wall color ideas",
            "painting mistakes",
            "how to choose wallpaper",
        ],
        eyebrow: "Topic hub",
        breadcrumbLabel: "Walls and Finishes",
        featureCards: [
            {
                icon: "wrench",
                title: "Base preparation",
                description: "Filler, primer, and a straighter wall surface, which matter more than expensive finish materials.",
            },
            {
                icon: "grid",
                title: "Paint or wallpaper",
                description: "Choose the finish that fits your room better on budget, durability, upkeep, and overall look.",
            },
            {
                icon: "lightbulb",
                title: "Color and perception",
                description: "Build a palette that works with the room light so the space does not feel tired after a week.",
            },
        ],
        calculator: {
            icon: "calculator",
            eyebrow: "Practical tool",
            title: "Paint calculator",
            description:
                "Estimate paint by room size, openings, and coats so you are not buying finish materials blindly.",
            href: "/en/calculators/paint",
            buttonLabel: "Open calculator",
        },
        relatedTitle: "Also useful for wall finishes",
        relatedLinks: [
            {
                icon: "grid",
                title: "Wallpaper calculator",
                description: "Compare paint against wallpaper and estimate roll count with openings and pattern repeat.",
                href: "/en/calculators/wallpaper",
            },
            {
                icon: "calculator",
                title: "Color palette generator",
                description: "Pull wall color, furnishings, and accents into one working palette before the finish stage.",
                href: "/en/calculators/color-palette",
            },
            {
                icon: "wrench",
                title: "Avoid Rework series",
                description: "Open the series focused on mistakes and decisions that matter most during wall prep.",
                href: "/en/series/avoid-rework",
            },
        ],
        featuredLabel: "Start here",
        featuredIntro:
            "Start with the wall base and the finish type, then move into color, material quantity, and the final finish decision.",
        articlesTitle: "Wall and finish articles",
        articlesDescription:
            "A focused set of articles on paint, wallpaper, wall prep, and color decisions that are better made before final finishing work begins.",
        faqTitle: "Common wall finish questions",
        faqs: [
            {
                question: "What matters most before painting walls?",
                answer:
                    "A straight, well-prepped wall base and primer matter the most because they determine how the paint will look after it dries.",
            },
            {
                question: "When is wallpaper a better choice than paint?",
                answer:
                    "Wallpaper often makes more sense when the walls are less than perfect, you want pattern, or you need to hide minor surface flaws.",
            },
            {
                question: "Do I need primer before painting?",
                answer:
                    "Yes. Primer improves adhesion, evens out absorption, and helps prevent patchy color and excess paint use.",
            },
            {
                question: "How do I avoid visible defects after wall finishing?",
                answer:
                    "Do not rush the prep, check the walls under side light, and do not move to the finish stage until the base already looks consistent.",
            },
            {
                question: "How do I choose a wall color that will still work later?",
                answer:
                    "It is better to choose from the room light, furniture, and the wider apartment palette instead of judging one paint sample in isolation.",
            },
        ],
    },
}

export function getWallsHubDictionary(locale: TopicHubLocale) {
    return wallsHubDictionaries[locale]
}

export function getWallsHubPosts(posts: Post[], locale: TopicHubLocale): Post[] {
    return getTopicHubPosts(posts, locale, wallsHubSlugs[locale])
}
