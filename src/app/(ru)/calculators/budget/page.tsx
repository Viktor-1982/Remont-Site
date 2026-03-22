import Script from "next/script"
import Link from "next/link"
import { Paintbrush, Grid, ScrollText, Layers } from "lucide-react"
import { getPageMetadata } from "@/lib/seo"
import { RenovationBudgetPlanner } from "@/components/widgets/renovation-budget-planner"
import { ShareButton } from "@/components/share-button"

export const metadata = getPageMetadata("/calculators/budget", {
    title: "Планировщик бюджета ремонта | Калькулятор стоимости",
    description:
        "Удобный планировщик бюджета для ремонта: рассчитайте полную стоимость работ с резервом на непредвиденные расходы. Бесплатный инструмент Renohacks.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function BudgetPlannerPage() {
    const structuredData = {
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
            "Бесплатный онлайн-калькулятор для расчета бюджета ремонта квартиры или дома. Помогает планировать расходы и учитывать резерв на непредвиденные траты.",
        url: "https://renohacks.com/calculators/budget",
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
            target: "https://renohacks.com/calculators/budget",
            name: "Рассчитать бюджет ремонта",
        },
        featureList: [
            "Расчет стоимости по категориям работ",
            "Учет резерва на непредвиденные расходы",
            "Поддержка разных валют",
            "Гибкая структура категорий",
            "Адаптация для мобильных устройств",
        ],
        keywords:
            "калькулятор ремонта, планировщик бюджета, смета ремонта, расчет стоимости ремонта",
        inLanguage: "ru",
        isAccessibleForFree: true,
        browserRequirements: "Requires JavaScript. Requires HTML5.",
    }

    const resources = [
        {
            href: "/calculators/paint",
            title: "Калькулятор краски",
            description:
                "Рассчитайте расход краски для стен и потолков по площади и количеству слоев.",
            icon: Paintbrush,
            accent: "from-rose-500/15 to-rose-500/5 text-rose-500",
        },
        {
            href: "/calculators/tile",
            title: "Калькулятор плитки",
            description:
                "Планируйте раскладку плитки, учитывайте отходы и расход клея для каждой зоны.",
            icon: Grid,
            accent: "from-emerald-500/15 to-emerald-500/5 text-emerald-500",
        },
        {
            href: "/calculators/wallpaper",
            title: "Калькулятор обоев",
            description:
                "Определите количество рулонов обоев с учетом высоты стен и рисунка.",
            icon: ScrollText,
            accent: "from-indigo-500/15 to-indigo-500/5 text-indigo-500",
        },
        {
            href: "/tools",
            title: "Все инструменты для ремонта",
            description:
                "Откройте весь набор инструментов Renohacks для планирования материалов и бюджета.",
            icon: Layers,
            accent: "from-amber-500/15 to-amber-500/5 text-amber-500",
        },
    ]

    return (
        <main className="max-w-2xl mx-auto py-10 px-4">
            <Script
                id="budget-planner-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <h1 className="text-3xl font-bold mb-4">Планировщик бюджета ремонта</h1>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Бесплатный онлайн-калькулятор для расчета бюджета ремонта квартиры или дома.
                Помогает структурировать расходы по категориям работ, добавить резерв и быстро
                получить итоговую сумму для переговоров с подрядчиками или внутреннего плана.
            </p>

            <section aria-label="Интерактивный калькулятор бюджета ремонта">
                <RenovationBudgetPlanner />
            </section>

            <section className="mt-10 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 px-6 py-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-xl font-semibold mb-4 text-foreground">
                        Зачем использовать планировщик бюджета
                    </h2>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li>
                            <span className="font-medium text-foreground">Прозрачная структура.</span>{" "}
                            Разбивайте расходы на демонтаж, материалы, работы, отделку и прочие
                            статьи бюджета.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Резерв на риски.</span>{" "}
                            Добавляйте запас на скрытые работы и изменение цен. Практичный диапазон
                            для большинства проектов — 20-25%.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Гибкость.</span>{" "}
                            Меняйте категории, суммы и валюту прямо во время обсуждения проекта.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Мобильный формат.</span>{" "}
                            Планировщик одинаково удобно работает на телефоне и на десктопе.
                        </li>
                    </ul>
                </div>
            </section>

            <section className="mt-10 bg-muted/60 rounded-lg px-4 py-6" aria-label="Как пользоваться планировщиком бюджета">
                <h2 className="text-xl font-semibold mb-3">Как пользоваться калькулятором</h2>
                <ol className="list-decimal ml-5 space-y-2 text-sm text-muted-foreground">
                    <li>Добавьте категории расходов: демонтаж, черновые работы, материалы, отделка, мебель или техника.</li>
                    <li>Введите ориентировочную стоимость по каждому пункту на основе смет, прайсов или прошлых проектов.</li>
                    <li>Настройте резерв на непредвиденные расходы. Для ремонта без полного ТЗ обычно закладывают 20-25%.</li>
                    <li>Сравните промежуточную сумму, резерв и итог. При необходимости скорректируйте сценарий и поделитесь итогом.</li>
                </ol>
                <p className="mt-3 text-sm text-muted-foreground">
                    Совет: обновляйте бюджет после каждого нового коммерческого предложения, чтобы итоговая сумма оставалась реалистичной.
                </p>
            </section>

            <section className="mt-10 text-sm leading-relaxed text-muted-foreground space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                    Планируйте ремонт как проект, а не как список трат
                </h2>
                <p>
                    Хороший бюджет помогает заранее увидеть не только основные работы, но и скрытые
                    статьи расходов: вывоз мусора, расходники, доставку, подъем материалов,
                    монтаж сантехники и финальные доработки.
                </p>
                <p>
                    Используйте калькулятор для сравнения нескольких сценариев: базовый ремонт,
                    улучшенная комплектация или более консервативный вариант с увеличенным резервом.
                    Это особенно полезно до подписания договоров и закупки материалов.
                </p>
                <p>
                    Инструмент не заменяет детальную смету подрядчика, но дает надежную отправную
                    точку для планирования и помогает не потерять контроль над стоимостью ремонта.
                </p>
            </section>

            <section className="mt-12">
                <h2 className="text-xl font-semibold mb-4">Частые вопросы</h2>
                <div className="space-y-4 text-sm text-muted-foreground">
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Насколько точен этот калькулятор стоимости ремонта?
                        </summary>
                        <p className="mt-2">
                            Он дает рабочую ориентировочную оценку на основе ваших данных и
                            добавленного резерва. Для окончательной сметы все равно нужны
                            замеры, состав работ и коммерческие предложения подрядчиков.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Можно ли использовать планировщик для разных валют?
                        </summary>
                        <p className="mt-2">
                            Да. Калькулятор поддерживает переключение валют и подходит как для
                            частных заказчиков, так и для специалистов, работающих с разными рынками.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Какие расходы обязательно учитывать?
                        </summary>
                        <p className="mt-2">
                            Минимальный набор: демонтаж, материалы, работа мастеров, чистовая отделка,
                            сантехника, электрика, доставка и резерв на непредвиденные траты.
                        </p>
                    </details>
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-xl font-semibold mb-4">Дополнительные инструменты</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    {resources.map((resource) => {
                        const Icon = resource.icon
                        return (
                            <Link
                                key={resource.title}
                                href={resource.href}
                                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
                            >
                                <div
                                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${resource.accent} opacity-0 transition group-hover:opacity-100`}
                                />
                                <div className="relative z-10 flex items-start gap-4">
                                    <span
                                        className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-lg font-semibold shadow-inner ${resource.accent.split(" ")[2]}`}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="text-base font-semibold text-foreground">{resource.title}</p>
                                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                            {resource.description}
                                        </p>
                                    </div>
                                </div>
                                <span className="relative z-10 mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                                    Перейти
                                    <span className="transition group-hover:translate-x-1">→</span>
                                </span>
                            </Link>
                        )
                    })}
                </div>
            </section>

            <section className="mt-12 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 p-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Поделиться калькулятором</h2>
                    <ShareButton
                        url="/calculators/budget"
                        title="Бесплатный планировщик бюджета ремонта от Renohacks"
                        description="Планируйте стоимость ремонта с помощью бесплатного калькулятора бюджета от Renohacks."
                    />
                </div>
            </section>
        </main>
    )
}
