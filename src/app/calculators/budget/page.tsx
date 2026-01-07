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
            "Бесплатный онлайн-калькулятор для расчёта бюджета ремонта квартиры или дома. Помогает планировать расходы и учитывать резерв на непредвиденные траты.",
        url: "https://renohacks.com/calculators/budget",
        image: "https://renohacks.com/images/og-default.png",
        screenshot: "https://renohacks.com/images/og-default.png",
        creator: {
            "@type": "Organization",
            name: "Renohacks",
            url: "https://renohacks.com",
            logo: "https://renohacks.com/favicon.ico",
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
            "Автодополнение категорий работ",
            "Мобильная адаптивность"
        ],
        keywords: "калькулятор ремонта, планировщик бюджета, смета ремонта, расчет стоимости ремонта",
        inLanguage: "ru",
        isAccessibleForFree: true,
        browserRequirements: "Requires JavaScript. Requires HTML5.",
    }

    const resources = [
        {
            href: "/calculators/paint",
            title: "Калькулятор краски",
            description: "Рассчитайте расход краски для внутренних и наружных работ по площади стен и потолков.",
            icon: Paintbrush,
            accent: "from-rose-500/15 to-rose-500/5 text-rose-500",
        },
        {
            href: "/calculators/tile",
            title: "Калькулятор плитки",
            description: "Спланируйте раскладку плитки, учтите процент отходов и объем клея для каждой зоны.",
            icon: Grid,
            accent: "from-emerald-500/15 to-emerald-500/5 text-emerald-500",
        },
        {
            href: "/calculators/wallpaper",
            title: "Калькулятор обоев",
            description: "Определите количество рулонов обоев с учетом высоты стен и рисунка.",
            icon: ScrollText,
            accent: "from-indigo-500/15 to-indigo-500/5 text-indigo-500",
        },
        {
            href: "/calculators",
            title: "Все калькуляторы для ремонта",
            description: "Изучите полный набор инструментов Renohacks для планирования материалов и бюджета.",
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
                Бесплатный онлайн-калькулятор для расчёта бюджета ремонта квартиры или дома. 
                Помогает планировать расходы по категориям работ и учитывать резерв на непредвиденные траты. 
                Получите итоговую сумму с учётом всех расходов и резерва для спокойного планирования ремонта.
            </p>
            
            <section aria-label="Интерактивный калькулятор планировщика бюджета">
                <RenovationBudgetPlanner />
            </section>
            
            <section className="mt-10 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 px-6 py-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-xl font-semibold mb-4 text-foreground">Почему профессионалы выбирают этот калькулятор бюджета</h2>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li>
                            <span className="font-medium text-foreground">Точный расчет по категориям.</span> Разбивайте расходы на демонтаж, материалы, работу, отделку и получайте детальную смету.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Резерв на непредвиденные расходы.</span> Автоматический расчет резерва (рекомендуется 20–25%) защищает от перерасхода бюджета.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Гибкие настройки.</span> Добавляйте свои категории работ, меняйте валюту и корректируйте расчеты в реальном времени.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Мобильная версия.</span> Работает на всех устройствах — планируйте бюджет ремонта где угодно.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Бесплатно и без регистрации.</span> Используйте калькулятор без ограничений и сохраняйте результаты для дальнейшей работы.
                        </li>
                    </ul>
                </div>
            </section>

            <section className="mt-10 bg-muted/60 rounded-lg px-4 py-6" aria-label="Пошаговое руководство по планированию бюджета">
                <h2 className="text-xl font-semibold mb-3">Пошаговое руководство по планированию бюджета ремонта</h2>
                <ol className="list-decimal ml-5 space-y-2 text-sm text-muted-foreground">
                    <li>Перечислите все категории работ: демонтаж, электрика, сантехника, отделка, сантехника, уборка.</li>
                    <li>Введите предполагаемую стоимость каждого пункта, используя прайсы поставщиков или данные предыдущих проектов.</li>
                    <li>Настройте резерв на непредвиденные расходы (рекомендуется 20–25%) для покрытия незапланированных работ и изменений цен.</li>
                    <li>Проверьте промежуточную сумму, размер резерва и итоговую сумму; поделитесь результатом или вернитесь к нему во время переговоров.</li>
                </ol>
                <p className="mt-3 text-sm text-muted-foreground">
                    💡 Совет: Пересматривайте бюджет после каждого обновления от подрядчиков, чтобы ваш <strong>план стоимости ремонта</strong> оставался актуальным.
                </p>
            </section>

            <section className="mt-10 text-sm leading-relaxed text-muted-foreground space-y-3">
                <h2 className="text-xl font-semibold text-foreground">Планируйте бюджет ремонта как профессионал</h2>
                <p>
                    Планировщик бюджета Renohacks дает вам структурированный взгляд на каждый фактор стоимости — работу,
                    материалы, разрешения и финальные штрихи. Он отражает то, как профессиональные оценщики готовят сметы, 
                    гарантируя, что вы не упустите скрытые расходы, такие как вывоз мусора или установка сантехники.
                </p>
                <p>
                    Используйте калькулятор для сравнения нескольких сценариев проекта: установите разные резервы, 
                    замените материалы или протестируйте бюджеты по комнатам. Динамические итоги обновляются мгновенно, 
                    помогая вам уверенно вести переговоры с подрядчиками и поставщиками.
                </p>
                <p>
                    Доверенный сообществом Renohacks, этот <strong>калькулятор стоимости ремонта</strong> остается бесплатным 
                    и удобным для мобильных устройств. Добавьте страницу в закладки и используйте вместе с нашими другими 
                    инструментами для ремонта, чтобы построить полную финансовую стратегию до того, как упадет первая стена.
                </p>
            </section>

            <section className="mt-12">
                <h2 className="text-xl font-semibold mb-4">Часто задаваемые вопросы о планировании бюджета</h2>
                <div className="space-y-4 text-sm text-muted-foreground">
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Насколько точен этот калькулятор стоимости ремонта?
                        </summary>
                        <p className="mt-2">
                            Калькулятор предоставляет приблизительную оценку стоимости на основе ваших данных и включает резерв 
                            на непредвиденные расходы. Он идеален для планирования, а не для точных смет подрядчиков.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Можно ли использовать планировщик для разных валют?
                        </summary>
                        <p className="mt-2">
                            Да. Вы можете мгновенно переключать валюты, и макет идеально адаптируется как для настольных, 
                            так и для мобильных устройств.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Бесплатен ли этот планировщик ремонта?
                        </summary>
                        <p className="mt-2">
                            Да, калькулятор бюджета ремонта полностью бесплатен. Он был создан Renohacks, чтобы помочь 
                            домовладельцам и профессионалам уверенно планировать бюджеты ремонта.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Какие расходы следует включить в бюджет ремонта?
                        </summary>
                        <p className="mt-2">
                            Включите демонтаж, материалы, работу, отделочные работы, сантехнику и резерв на непредвиденные расходы. 
                            Планировщик позволяет разбить каждую категорию, чтобы избежать пропущенных расходов.
                        </p>
                    </details>
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-xl font-semibold mb-4">Дополнительные ресурсы для планирования ремонта</h2>
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
                    <h2 className="text-2xl font-bold text-foreground mb-6">Поделитесь калькулятором</h2>
                    <ShareButton
                        url="/calculators/budget"
                        title="Бесплатный планировщик бюджета ремонта от Renohacks"
                        description="Планируйте стоимость ремонта с помощью этого бесплатного калькулятора от Renohacks"
                    />
                </div>
            </section>
        </main>
    )
}




