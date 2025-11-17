import { getPageMetadata } from "@/lib/seo"
import { TileCalculator } from "@/components/widgets/tile-calculator"
import Script from "next/script"

export const metadata = getPageMetadata("/calculators/tile", {
    title: "Калькулятор плитки онлайн — рассчитать количество для пола и стен | Renohacks",
    description:
        "Бесплатный калькулятор плитки: рассчитайте точное количество плитки для пола и стен. Учитывает площадь, размеры плитки, окна, двери и запас на подрезку. Онлайн-расчет за 30 секунд.",
    cover: "/images/og-default.png",
    type: "website",
    keywords: [
        "калькулятор плитки",
        "расчет плитки",
        "сколько нужно плитки",
        "калькулятор плитки для ванной",
        "калькулятор плитки для кухни",
        "расчет количества плитки",
        "как рассчитать плитку",
        "онлайн калькулятор плитки",
    ],
})

export default function TileCalculatorPage() {
    const baseUrl = "https://renohacks.com"
    
    const tileCalculatorSchema = {
        "@context": "https://schema.org",
        "@type": ["SoftwareApplication", "WebApplication"],
        "name": "Калькулятор плитки онлайн",
        "alternateName": "Расчет количества плитки",
        "operatingSystem": "All",
        "applicationCategory": ["UtilityApplication", "BusinessApplication"],
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "RUB",
            "availability": "https://schema.org/InStock",
        },
        "description": "Бесплатный онлайн-калькулятор для расчета количества плитки для пола и стен. Учитывает площадь, размеры плитки, отходы и запас.",
        "url": `${baseUrl}/calculators/tile`,
        "image": `${baseUrl}/images/og-default.png`,
        "creator": {
            "@type": "Organization",
            "name": "Renohacks",
            "url": baseUrl,
        },
        "potentialAction": {
            "@type": "UseAction",
            "target": `${baseUrl}/calculators/tile`,
            "name": "Рассчитать количество плитки",
        },
        "featureList": [
            "Расчет плитки для пола",
            "Расчет плитки для стен",
            "Учет окон и дверей",
            "Процент запаса на подрезку",
            "Мобильная адаптивность"
        ],
        "keywords": "калькулятор плитки, расчет плитки, сколько нужно плитки, укладка плитки",
        "inLanguage": "ru",
        "isAccessibleForFree": true,
    }
    
    return (
        <main className="max-w-2xl mx-auto py-10 px-4">
            <Script
                id="tile-calculator-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(tileCalculatorSchema) }}
            />
            
            <h1 className="text-3xl font-bold mb-4">Калькулятор плитки</h1>
            <p className="text-muted-foreground mb-8">
                Рассчитайте количество плитки для пола или стен. 
                Учитываются площадь, размеры плитки, отходы на подрезку и запас.
            </p>
            <TileCalculator />
            <div className="mt-8 p-4 bg-muted rounded-lg">
                <h2 className="font-semibold mb-2">💡 Как пользоваться калькулятором</h2>
                <ol className="list-decimal ml-5 space-y-1 text-sm">
                    <li>Введите площадь укладки и размеры плитки</li>
                    <li>Укажите размеры окон/дверей (если это стены)</li>
                    <li>Выберите процент запаса (обычно 5–10%)</li>
                    <li>Получите точное количество плитки</li>
                </ol>
            </div>
        </main>
    )
}
