import Script from "next/script"
import { getPageMetadata } from "@/lib/seo"
import { RenovationBudgetPlanner } from "@/components/widgets/renovation-budget-planner"

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
        "@type": "SoftwareApplication",
        name: "Планировщик бюджета ремонта",
        operatingSystem: "All",
        applicationCategory: "FinanceApplication",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "RUB",
        },
        description:
            "Бесплатный онлайн-калькулятор для расчёта бюджета ремонта квартиры или дома. Помогает планировать расходы и учитывать резерв на непредвиденные траты.",
        url: "https://renohacks.com/calculators/budget",
        image: "https://renohacks.com/images/og-default.png",
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
    }

    return (
        <main className="max-w-2xl mx-auto py-10 px-4">
            <Script
                id="budget-planner-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <h1 className="text-3xl font-bold mb-4">Планировщик бюджета ремонта</h1>
            <p className="text-muted-foreground mb-8">
                Посчитайте полную стоимость ремонта: добавьте расходы по категориям и получите итоговую сумму с резервом на непредвиденные расходы.
            </p>
            <RenovationBudgetPlanner />
            <div className="mt-8 p-4 bg-muted rounded-lg">
                <h2 className="font-semibold mb-2">💡 Как пользоваться</h2>
                <ol className="list-decimal ml-5 space-y-1 text-sm">
                    <li>Введите стоимость каждой категории работ</li>
                    <li>Укажите процент резерва (рекомендуется 20%)</li>
                    <li>Получите полную стоимость с учётом непредвиденных расходов</li>
                </ol>
                <p className="mt-3 text-sm text-muted-foreground">
                    💰 Обычно на ремонт уходит на 20–30% больше запланированного. Лучше заложить резерв с самого начала!
                </p>
            </div>
        </main>
    )
}


