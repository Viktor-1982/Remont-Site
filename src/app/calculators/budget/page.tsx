import Script from "next/script"
import Link from "next/link"
import { Paintbrush, Grid, ScrollText, Layers } from "lucide-react"
import { getPageMetadata } from "@/lib/seo"
import { RenovationBudgetPlanner } from "@/components/widgets/renovation-budget-planner"
import { ShareButton } from "@/components/share-button"

export const metadata = getPageMetadata("/calculators/budget", {
    title: "РџР»Р°РЅРёСЂРѕРІС‰РёРє Р±СЋРґР¶РµС‚Р° СЂРµРјРѕРЅС‚Р° | РљР°Р»СЊРєСѓР»СЏС‚РѕСЂ СЃС‚РѕРёРјРѕСЃС‚Рё",
    description:
        "РЈРґРѕР±РЅС‹Р№ РїР»Р°РЅРёСЂРѕРІС‰РёРє Р±СЋРґР¶РµС‚Р° РґР»СЏ СЂРµРјРѕРЅС‚Р°: СЂР°СЃСЃС‡РёС‚Р°Р№С‚Рµ РїРѕР»РЅСѓСЋ СЃС‚РѕРёРјРѕСЃС‚СЊ СЂР°Р±РѕС‚ СЃ СЂРµР·РµСЂРІРѕРј РЅР° РЅРµРїСЂРµРґРІРёРґРµРЅРЅС‹Рµ СЂР°СЃС…РѕРґС‹. Р‘РµСЃРїР»Р°С‚РЅС‹Р№ РёРЅСЃС‚СЂСѓРјРµРЅС‚ Renohacks.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function BudgetPlannerPage() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": ["SoftwareApplication", "WebApplication"],
        name: "РџР»Р°РЅРёСЂРѕРІС‰РёРє Р±СЋРґР¶РµС‚Р° СЂРµРјРѕРЅС‚Р°",
        alternateName: "РљР°Р»СЊРєСѓР»СЏС‚РѕСЂ СЃС‚РѕРёРјРѕСЃС‚Рё СЂРµРјРѕРЅС‚Р°",
        operatingSystem: "All",
        applicationCategory: ["FinanceApplication", "BusinessApplication"],
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "RUB",
            availability: "https://schema.org/InStock",
        },
        description:
            "Р‘РµСЃРїР»Р°С‚РЅС‹Р№ РѕРЅР»Р°Р№РЅ-РєР°Р»СЊРєСѓР»СЏС‚РѕСЂ РґР»СЏ СЂР°СЃС‡С‘С‚Р° Р±СЋРґР¶РµС‚Р° СЂРµРјРѕРЅС‚Р° РєРІР°СЂС‚РёСЂС‹ РёР»Рё РґРѕРјР°. РџРѕРјРѕРіР°РµС‚ РїР»Р°РЅРёСЂРѕРІР°С‚СЊ СЂР°СЃС…РѕРґС‹ Рё СѓС‡РёС‚С‹РІР°С‚СЊ СЂРµР·РµСЂРІ РЅР° РЅРµРїСЂРµРґРІРёРґРµРЅРЅС‹Рµ С‚СЂР°С‚С‹.",
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
            name: "Р Р°СЃСЃС‡РёС‚Р°С‚СЊ Р±СЋРґР¶РµС‚ СЂРµРјРѕРЅС‚Р°",
        },
        featureList: [
            "Р Р°СЃС‡РµС‚ СЃС‚РѕРёРјРѕСЃС‚Рё РїРѕ РєР°С‚РµРіРѕСЂРёСЏРј СЂР°Р±РѕС‚",
            "РЈС‡РµС‚ СЂРµР·РµСЂРІР° РЅР° РЅРµРїСЂРµРґРІРёРґРµРЅРЅС‹Рµ СЂР°СЃС…РѕРґС‹",
            "РџРѕРґРґРµСЂР¶РєР° СЂР°Р·РЅС‹С… РІР°Р»СЋС‚",
            "РђРІС‚РѕРґРѕРїРѕР»РЅРµРЅРёРµ РєР°С‚РµРіРѕСЂРёР№ СЂР°Р±РѕС‚",
            "РњРѕР±РёР»СЊРЅР°СЏ Р°РґР°РїС‚РёРІРЅРѕСЃС‚СЊ"
        ],
        keywords: "РєР°Р»СЊРєСѓР»СЏС‚РѕСЂ СЂРµРјРѕРЅС‚Р°, РїР»Р°РЅРёСЂРѕРІС‰РёРє Р±СЋРґР¶РµС‚Р°, СЃРјРµС‚Р° СЂРµРјРѕРЅС‚Р°, СЂР°СЃС‡РµС‚ СЃС‚РѕРёРјРѕСЃС‚Рё СЂРµРјРѕРЅС‚Р°",
        inLanguage: "ru",
        isAccessibleForFree: true,
        browserRequirements: "Requires JavaScript. Requires HTML5.",
    }

    const resources = [
        {
            href: "/calculators/paint",
            title: "РљР°Р»СЊРєСѓР»СЏС‚РѕСЂ РєСЂР°СЃРєРё",
            description: "Р Р°СЃСЃС‡РёС‚Р°Р№С‚Рµ СЂР°СЃС…РѕРґ РєСЂР°СЃРєРё РґР»СЏ РІРЅСѓС‚СЂРµРЅРЅРёС… Рё РЅР°СЂСѓР¶РЅС‹С… СЂР°Р±РѕС‚ РїРѕ РїР»РѕС‰Р°РґРё СЃС‚РµРЅ Рё РїРѕС‚РѕР»РєРѕРІ.",
            icon: Paintbrush,
            accent: "from-rose-500/15 to-rose-500/5 text-rose-500",
        },
        {
            href: "/calculators/tile",
            title: "РљР°Р»СЊРєСѓР»СЏС‚РѕСЂ РїР»РёС‚РєРё",
            description: "РЎРїР»Р°РЅРёСЂСѓР№С‚Рµ СЂР°СЃРєР»Р°РґРєСѓ РїР»РёС‚РєРё, СѓС‡С‚РёС‚Рµ РїСЂРѕС†РµРЅС‚ РѕС‚С…РѕРґРѕРІ Рё РѕР±СЉРµРј РєР»РµСЏ РґР»СЏ РєР°Р¶РґРѕР№ Р·РѕРЅС‹.",
            icon: Grid,
            accent: "from-emerald-500/15 to-emerald-500/5 text-emerald-500",
        },
        {
            href: "/calculators/wallpaper",
            title: "РљР°Р»СЊРєСѓР»СЏС‚РѕСЂ РѕР±РѕРµРІ",
            description: "РћРїСЂРµРґРµР»РёС‚Рµ РєРѕР»РёС‡РµСЃС‚РІРѕ СЂСѓР»РѕРЅРѕРІ РѕР±РѕРµРІ СЃ СѓС‡РµС‚РѕРј РІС‹СЃРѕС‚С‹ СЃС‚РµРЅ Рё СЂРёСЃСѓРЅРєР°.",
            icon: ScrollText,
            accent: "from-indigo-500/15 to-indigo-500/5 text-indigo-500",
        },
        {
            href: "/calculators",
            title: "Р’СЃРµ РєР°Р»СЊРєСѓР»СЏС‚РѕСЂС‹ РґР»СЏ СЂРµРјРѕРЅС‚Р°",
            description: "РР·СѓС‡РёС‚Рµ РїРѕР»РЅС‹Р№ РЅР°Р±РѕСЂ РёРЅСЃС‚СЂСѓРјРµРЅС‚РѕРІ Renohacks РґР»СЏ РїР»Р°РЅРёСЂРѕРІР°РЅРёСЏ РјР°С‚РµСЂРёР°Р»РѕРІ Рё Р±СЋРґР¶РµС‚Р°.",
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

            <h1 className="text-3xl font-bold mb-4">РџР»Р°РЅРёСЂРѕРІС‰РёРє Р±СЋРґР¶РµС‚Р° СЂРµРјРѕРЅС‚Р°</h1>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Р‘РµСЃРїР»Р°С‚РЅС‹Р№ РѕРЅР»Р°Р№РЅ-РєР°Р»СЊРєСѓР»СЏС‚РѕСЂ РґР»СЏ СЂР°СЃС‡С‘С‚Р° Р±СЋРґР¶РµС‚Р° СЂРµРјРѕРЅС‚Р° РєРІР°СЂС‚РёСЂС‹ РёР»Рё РґРѕРјР°. 
                РџРѕРјРѕРіР°РµС‚ РїР»Р°РЅРёСЂРѕРІР°С‚СЊ СЂР°СЃС…РѕРґС‹ РїРѕ РєР°С‚РµРіРѕСЂРёСЏРј СЂР°Р±РѕС‚ Рё СѓС‡РёС‚С‹РІР°С‚СЊ СЂРµР·РµСЂРІ РЅР° РЅРµРїСЂРµРґРІРёРґРµРЅРЅС‹Рµ С‚СЂР°С‚С‹. 
                РџРѕР»СѓС‡РёС‚Рµ РёС‚РѕРіРѕРІСѓСЋ СЃСѓРјРјСѓ СЃ СѓС‡С‘С‚РѕРј РІСЃРµС… СЂР°СЃС…РѕРґРѕРІ Рё СЂРµР·РµСЂРІР° РґР»СЏ СЃРїРѕРєРѕР№РЅРѕРіРѕ РїР»Р°РЅРёСЂРѕРІР°РЅРёСЏ СЂРµРјРѕРЅС‚Р°.
            </p>
            
            <section aria-label="РРЅС‚РµСЂР°РєС‚РёРІРЅС‹Р№ РєР°Р»СЊРєСѓР»СЏС‚РѕСЂ РїР»Р°РЅРёСЂРѕРІС‰РёРєР° Р±СЋРґР¶РµС‚Р°">
                <RenovationBudgetPlanner />
            </section>
            
            <section className="mt-10 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 px-6 py-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-xl font-semibold mb-4 text-foreground">РџРѕС‡РµРјСѓ РїСЂРѕС„РµСЃСЃРёРѕРЅР°Р»С‹ РІС‹Р±РёСЂР°СЋС‚ СЌС‚РѕС‚ РєР°Р»СЊРєСѓР»СЏС‚РѕСЂ Р±СЋРґР¶РµС‚Р°</h2>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li>
                            <span className="font-medium text-foreground">РўРѕС‡РЅС‹Р№ СЂР°СЃС‡РµС‚ РїРѕ РєР°С‚РµРіРѕСЂРёСЏРј.</span> Р Р°Р·Р±РёРІР°Р№С‚Рµ СЂР°СЃС…РѕРґС‹ РЅР° РґРµРјРѕРЅС‚Р°Р¶, РјР°С‚РµСЂРёР°Р»С‹, СЂР°Р±РѕС‚Сѓ, РѕС‚РґРµР»РєСѓ Рё РїРѕР»СѓС‡Р°Р№С‚Рµ РґРµС‚Р°Р»СЊРЅСѓСЋ СЃРјРµС‚Сѓ.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Р РµР·РµСЂРІ РЅР° РЅРµРїСЂРµРґРІРёРґРµРЅРЅС‹Рµ СЂР°СЃС…РѕРґС‹.</span> РђРІС‚РѕРјР°С‚РёС‡РµСЃРєРёР№ СЂР°СЃС‡РµС‚ СЂРµР·РµСЂРІР° (СЂРµРєРѕРјРµРЅРґСѓРµС‚СЃСЏ 20вЂ“25%) Р·Р°С‰РёС‰Р°РµС‚ РѕС‚ РїРµСЂРµСЂР°СЃС…РѕРґР° Р±СЋРґР¶РµС‚Р°.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Р“РёР±РєРёРµ РЅР°СЃС‚СЂРѕР№РєРё.</span> Р”РѕР±Р°РІР»СЏР№С‚Рµ СЃРІРѕРё РєР°С‚РµРіРѕСЂРёРё СЂР°Р±РѕС‚, РјРµРЅСЏР№С‚Рµ РІР°Р»СЋС‚Сѓ Рё РєРѕСЂСЂРµРєС‚РёСЂСѓР№С‚Рµ СЂР°СЃС‡РµС‚С‹ РІ СЂРµР°Р»СЊРЅРѕРј РІСЂРµРјРµРЅРё.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">РњРѕР±РёР»СЊРЅР°СЏ РІРµСЂСЃРёСЏ.</span> Р Р°Р±РѕС‚Р°РµС‚ РЅР° РІСЃРµС… СѓСЃС‚СЂРѕР№СЃС‚РІР°С… вЂ” РїР»Р°РЅРёСЂСѓР№С‚Рµ Р±СЋРґР¶РµС‚ СЂРµРјРѕРЅС‚Р° РіРґРµ СѓРіРѕРґРЅРѕ.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Р‘РµСЃРїР»Р°С‚РЅРѕ Рё Р±РµР· СЂРµРіРёСЃС‚СЂР°С†РёРё.</span> РСЃРїРѕР»СЊР·СѓР№С‚Рµ РєР°Р»СЊРєСѓР»СЏС‚РѕСЂ Р±РµР· РѕРіСЂР°РЅРёС‡РµРЅРёР№ Рё СЃРѕС…СЂР°РЅСЏР№С‚Рµ СЂРµР·СѓР»СЊС‚Р°С‚С‹ РґР»СЏ РґР°Р»СЊРЅРµР№С€РµР№ СЂР°Р±РѕС‚С‹.
                        </li>
                    </ul>
                </div>
            </section>

            <section className="mt-10 bg-muted/60 rounded-lg px-4 py-6" aria-label="РџРѕС€Р°РіРѕРІРѕРµ СЂСѓРєРѕРІРѕРґСЃС‚РІРѕ РїРѕ РїР»Р°РЅРёСЂРѕРІР°РЅРёСЋ Р±СЋРґР¶РµС‚Р°">
                <h2 className="text-xl font-semibold mb-3">РџРѕС€Р°РіРѕРІРѕРµ СЂСѓРєРѕРІРѕРґСЃС‚РІРѕ РїРѕ РїР»Р°РЅРёСЂРѕРІР°РЅРёСЋ Р±СЋРґР¶РµС‚Р° СЂРµРјРѕРЅС‚Р°</h2>
                <ol className="list-decimal ml-5 space-y-2 text-sm text-muted-foreground">
                    <li>РџРµСЂРµС‡РёСЃР»РёС‚Рµ РІСЃРµ РєР°С‚РµРіРѕСЂРёРё СЂР°Р±РѕС‚: РґРµРјРѕРЅС‚Р°Р¶, СЌР»РµРєС‚СЂРёРєР°, СЃР°РЅС‚РµС…РЅРёРєР°, РѕС‚РґРµР»РєР°, СЃР°РЅС‚РµС…РЅРёРєР°, СѓР±РѕСЂРєР°.</li>
                    <li>Р’РІРµРґРёС‚Рµ РїСЂРµРґРїРѕР»Р°РіР°РµРјСѓСЋ СЃС‚РѕРёРјРѕСЃС‚СЊ РєР°Р¶РґРѕРіРѕ РїСѓРЅРєС‚Р°, РёСЃРїРѕР»СЊР·СѓСЏ РїСЂР°Р№СЃС‹ РїРѕСЃС‚Р°РІС‰РёРєРѕРІ РёР»Рё РґР°РЅРЅС‹Рµ РїСЂРµРґС‹РґСѓС‰РёС… РїСЂРѕРµРєС‚РѕРІ.</li>
                    <li>РќР°СЃС‚СЂРѕР№С‚Рµ СЂРµР·РµСЂРІ РЅР° РЅРµРїСЂРµРґРІРёРґРµРЅРЅС‹Рµ СЂР°СЃС…РѕРґС‹ (СЂРµРєРѕРјРµРЅРґСѓРµС‚СЃСЏ 20вЂ“25%) РґР»СЏ РїРѕРєСЂС‹С‚РёСЏ РЅРµР·Р°РїР»Р°РЅРёСЂРѕРІР°РЅРЅС‹С… СЂР°Р±РѕС‚ Рё РёР·РјРµРЅРµРЅРёР№ С†РµРЅ.</li>
                    <li>РџСЂРѕРІРµСЂСЊС‚Рµ РїСЂРѕРјРµР¶СѓС‚РѕС‡РЅСѓСЋ СЃСѓРјРјСѓ, СЂР°Р·РјРµСЂ СЂРµР·РµСЂРІР° Рё РёС‚РѕРіРѕРІСѓСЋ СЃСѓРјРјСѓ; РїРѕРґРµР»РёС‚РµСЃСЊ СЂРµР·СѓР»СЊС‚Р°С‚РѕРј РёР»Рё РІРµСЂРЅРёС‚РµСЃСЊ Рє РЅРµРјСѓ РІРѕ РІСЂРµРјСЏ РїРµСЂРµРіРѕРІРѕСЂРѕРІ.</li>
                </ol>
                <p className="mt-3 text-sm text-muted-foreground">
                    рџ’Ў РЎРѕРІРµС‚: РџРµСЂРµСЃРјР°С‚СЂРёРІР°Р№С‚Рµ Р±СЋРґР¶РµС‚ РїРѕСЃР»Рµ РєР°Р¶РґРѕРіРѕ РѕР±РЅРѕРІР»РµРЅРёСЏ РѕС‚ РїРѕРґСЂСЏРґС‡РёРєРѕРІ, С‡С‚РѕР±С‹ РІР°С€ <strong>РїР»Р°РЅ СЃС‚РѕРёРјРѕСЃС‚Рё СЂРµРјРѕРЅС‚Р°</strong> РѕСЃС‚Р°РІР°Р»СЃСЏ Р°РєС‚СѓР°Р»СЊРЅС‹Рј.
                </p>
            </section>

            <section className="mt-10 text-sm leading-relaxed text-muted-foreground space-y-3">
                <h2 className="text-xl font-semibold text-foreground">РџР»Р°РЅРёСЂСѓР№С‚Рµ Р±СЋРґР¶РµС‚ СЂРµРјРѕРЅС‚Р° РєР°Рє РїСЂРѕС„РµСЃСЃРёРѕРЅР°Р»</h2>
                <p>
                    РџР»Р°РЅРёСЂРѕРІС‰РёРє Р±СЋРґР¶РµС‚Р° Renohacks РґР°РµС‚ РІР°Рј СЃС‚СЂСѓРєС‚СѓСЂРёСЂРѕРІР°РЅРЅС‹Р№ РІР·РіР»СЏРґ РЅР° РєР°Р¶РґС‹Р№ С„Р°РєС‚РѕСЂ СЃС‚РѕРёРјРѕСЃС‚Рё вЂ” СЂР°Р±РѕС‚Сѓ,
                    РјР°С‚РµСЂРёР°Р»С‹, СЂР°Р·СЂРµС€РµРЅРёСЏ Рё С„РёРЅР°Р»СЊРЅС‹Рµ С€С‚СЂРёС…Рё. РћРЅ РѕС‚СЂР°Р¶Р°РµС‚ С‚Рѕ, РєР°Рє РїСЂРѕС„РµСЃСЃРёРѕРЅР°Р»СЊРЅС‹Рµ РѕС†РµРЅС‰РёРєРё РіРѕС‚РѕРІСЏС‚ СЃРјРµС‚С‹, 
                    РіР°СЂР°РЅС‚РёСЂСѓСЏ, С‡С‚Рѕ РІС‹ РЅРµ СѓРїСѓСЃС‚РёС‚Рµ СЃРєСЂС‹С‚С‹Рµ СЂР°СЃС…РѕРґС‹, С‚Р°РєРёРµ РєР°Рє РІС‹РІРѕР· РјСѓСЃРѕСЂР° РёР»Рё СѓСЃС‚Р°РЅРѕРІРєР° СЃР°РЅС‚РµС…РЅРёРєРё.
                </p>
                <p>
                    РСЃРїРѕР»СЊР·СѓР№С‚Рµ РєР°Р»СЊРєСѓР»СЏС‚РѕСЂ РґР»СЏ СЃСЂР°РІРЅРµРЅРёСЏ РЅРµСЃРєРѕР»СЊРєРёС… СЃС†РµРЅР°СЂРёРµРІ РїСЂРѕРµРєС‚Р°: СѓСЃС‚Р°РЅРѕРІРёС‚Рµ СЂР°Р·РЅС‹Рµ СЂРµР·РµСЂРІС‹, 
                    Р·Р°РјРµРЅРёС‚Рµ РјР°С‚РµСЂРёР°Р»С‹ РёР»Рё РїСЂРѕС‚РµСЃС‚РёСЂСѓР№С‚Рµ Р±СЋРґР¶РµС‚С‹ РїРѕ РєРѕРјРЅР°С‚Р°Рј. Р”РёРЅР°РјРёС‡РµСЃРєРёРµ РёС‚РѕРіРё РѕР±РЅРѕРІР»СЏСЋС‚СЃСЏ РјРіРЅРѕРІРµРЅРЅРѕ, 
                    РїРѕРјРѕРіР°СЏ РІР°Рј СѓРІРµСЂРµРЅРЅРѕ РІРµСЃС‚Рё РїРµСЂРµРіРѕРІРѕСЂС‹ СЃ РїРѕРґСЂСЏРґС‡РёРєР°РјРё Рё РїРѕСЃС‚Р°РІС‰РёРєР°РјРё.
                </p>
                <p>
                    Р”РѕРІРµСЂРµРЅРЅС‹Р№ СЃРѕРѕР±С‰РµСЃС‚РІРѕРј Renohacks, СЌС‚РѕС‚ <strong>РєР°Р»СЊРєСѓР»СЏС‚РѕСЂ СЃС‚РѕРёРјРѕСЃС‚Рё СЂРµРјРѕРЅС‚Р°</strong> РѕСЃС‚Р°РµС‚СЃСЏ Р±РµСЃРїР»Р°С‚РЅС‹Рј 
                    Рё СѓРґРѕР±РЅС‹Рј РґР»СЏ РјРѕР±РёР»СЊРЅС‹С… СѓСЃС‚СЂРѕР№СЃС‚РІ. Р”РѕР±Р°РІСЊС‚Рµ СЃС‚СЂР°РЅРёС†Сѓ РІ Р·Р°РєР»Р°РґРєРё Рё РёСЃРїРѕР»СЊР·СѓР№С‚Рµ РІРјРµСЃС‚Рµ СЃ РЅР°С€РёРјРё РґСЂСѓРіРёРјРё 
                    РёРЅСЃС‚СЂСѓРјРµРЅС‚Р°РјРё РґР»СЏ СЂРµРјРѕРЅС‚Р°, С‡С‚РѕР±С‹ РїРѕСЃС‚СЂРѕРёС‚СЊ РїРѕР»РЅСѓСЋ С„РёРЅР°РЅСЃРѕРІСѓСЋ СЃС‚СЂР°С‚РµРіРёСЋ РґРѕ С‚РѕРіРѕ, РєР°Рє СѓРїР°РґРµС‚ РїРµСЂРІР°СЏ СЃС‚РµРЅР°.
                </p>
            </section>

            <section className="mt-12">
                <h2 className="text-xl font-semibold mb-4">Р§Р°СЃС‚Рѕ Р·Р°РґР°РІР°РµРјС‹Рµ РІРѕРїСЂРѕСЃС‹ Рѕ РїР»Р°РЅРёСЂРѕРІР°РЅРёРё Р±СЋРґР¶РµС‚Р°</h2>
                <div className="space-y-4 text-sm text-muted-foreground">
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            РќР°СЃРєРѕР»СЊРєРѕ С‚РѕС‡РµРЅ СЌС‚РѕС‚ РєР°Р»СЊРєСѓР»СЏС‚РѕСЂ СЃС‚РѕРёРјРѕСЃС‚Рё СЂРµРјРѕРЅС‚Р°?
                        </summary>
                        <p className="mt-2">
                            РљР°Р»СЊРєСѓР»СЏС‚РѕСЂ РїСЂРµРґРѕСЃС‚Р°РІР»СЏРµС‚ РїСЂРёР±Р»РёР·РёС‚РµР»СЊРЅСѓСЋ РѕС†РµРЅРєСѓ СЃС‚РѕРёРјРѕСЃС‚Рё РЅР° РѕСЃРЅРѕРІРµ РІР°С€РёС… РґР°РЅРЅС‹С… Рё РІРєР»СЋС‡Р°РµС‚ СЂРµР·РµСЂРІ 
                            РЅР° РЅРµРїСЂРµРґРІРёРґРµРЅРЅС‹Рµ СЂР°СЃС…РѕРґС‹. РћРЅ РёРґРµР°Р»РµРЅ РґР»СЏ РїР»Р°РЅРёСЂРѕРІР°РЅРёСЏ, Р° РЅРµ РґР»СЏ С‚РѕС‡РЅС‹С… СЃРјРµС‚ РїРѕРґСЂСЏРґС‡РёРєРѕРІ.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            РњРѕР¶РЅРѕ Р»Рё РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ РїР»Р°РЅРёСЂРѕРІС‰РёРє РґР»СЏ СЂР°Р·РЅС‹С… РІР°Р»СЋС‚?
                        </summary>
                        <p className="mt-2">
                            Р”Р°. Р’С‹ РјРѕР¶РµС‚Рµ РјРіРЅРѕРІРµРЅРЅРѕ РїРµСЂРµРєР»СЋС‡Р°С‚СЊ РІР°Р»СЋС‚С‹, Рё РјР°РєРµС‚ РёРґРµР°Р»СЊРЅРѕ Р°РґР°РїС‚РёСЂСѓРµС‚СЃСЏ РєР°Рє РґР»СЏ РЅР°СЃС‚РѕР»СЊРЅС‹С…, 
                            С‚Р°Рє Рё РґР»СЏ РјРѕР±РёР»СЊРЅС‹С… СѓСЃС‚СЂРѕР№СЃС‚РІ.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Р‘РµСЃРїР»Р°С‚РµРЅ Р»Рё СЌС‚РѕС‚ РїР»Р°РЅРёСЂРѕРІС‰РёРє СЂРµРјРѕРЅС‚Р°?
                        </summary>
                        <p className="mt-2">
                            Р”Р°, РєР°Р»СЊРєСѓР»СЏС‚РѕСЂ Р±СЋРґР¶РµС‚Р° СЂРµРјРѕРЅС‚Р° РїРѕР»РЅРѕСЃС‚СЊСЋ Р±РµСЃРїР»Р°С‚РµРЅ. РћРЅ Р±С‹Р» СЃРѕР·РґР°РЅ Renohacks, С‡С‚РѕР±С‹ РїРѕРјРѕС‡СЊ 
                            РґРѕРјРѕРІР»Р°РґРµР»СЊС†Р°Рј Рё РїСЂРѕС„РµСЃСЃРёРѕРЅР°Р»Р°Рј СѓРІРµСЂРµРЅРЅРѕ РїР»Р°РЅРёСЂРѕРІР°С‚СЊ Р±СЋРґР¶РµС‚С‹ СЂРµРјРѕРЅС‚Р°.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            РљР°РєРёРµ СЂР°СЃС…РѕРґС‹ СЃР»РµРґСѓРµС‚ РІРєР»СЋС‡РёС‚СЊ РІ Р±СЋРґР¶РµС‚ СЂРµРјРѕРЅС‚Р°?
                        </summary>
                        <p className="mt-2">
                            Р’РєР»СЋС‡РёС‚Рµ РґРµРјРѕРЅС‚Р°Р¶, РјР°С‚РµСЂРёР°Р»С‹, СЂР°Р±РѕС‚Сѓ, РѕС‚РґРµР»РѕС‡РЅС‹Рµ СЂР°Р±РѕС‚С‹, СЃР°РЅС‚РµС…РЅРёРєСѓ Рё СЂРµР·РµСЂРІ РЅР° РЅРµРїСЂРµРґРІРёРґРµРЅРЅС‹Рµ СЂР°СЃС…РѕРґС‹. 
                            РџР»Р°РЅРёСЂРѕРІС‰РёРє РїРѕР·РІРѕР»СЏРµС‚ СЂР°Р·Р±РёС‚СЊ РєР°Р¶РґСѓСЋ РєР°С‚РµРіРѕСЂРёСЋ, С‡С‚РѕР±С‹ РёР·Р±РµР¶Р°С‚СЊ РїСЂРѕРїСѓС‰РµРЅРЅС‹С… СЂР°СЃС…РѕРґРѕРІ.
                        </p>
                    </details>
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-xl font-semibold mb-4">Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹Рµ СЂРµСЃСѓСЂСЃС‹ РґР»СЏ РїР»Р°РЅРёСЂРѕРІР°РЅРёСЏ СЂРµРјРѕРЅС‚Р°</h2>
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
                                    РџРµСЂРµР№С‚Рё
                                    <span className="transition group-hover:translate-x-1">в†’</span>
                                </span>
                            </Link>
                        )
                    })}
                </div>
            </section>

            <section className="mt-12 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 p-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-foreground mb-6">РџРѕРґРµР»РёС‚РµСЃСЊ РєР°Р»СЊРєСѓР»СЏС‚РѕСЂРѕРј</h2>
                    <ShareButton
                        url="/calculators/budget"
                        title="Р‘РµСЃРїР»Р°С‚РЅС‹Р№ РїР»Р°РЅРёСЂРѕРІС‰РёРє Р±СЋРґР¶РµС‚Р° СЂРµРјРѕРЅС‚Р° РѕС‚ Renohacks"
                        description="РџР»Р°РЅРёСЂСѓР№С‚Рµ СЃС‚РѕРёРјРѕСЃС‚СЊ СЂРµРјРѕРЅС‚Р° СЃ РїРѕРјРѕС‰СЊСЋ СЌС‚РѕРіРѕ Р±РµСЃРїР»Р°С‚РЅРѕРіРѕ РєР°Р»СЊРєСѓР»СЏС‚РѕСЂР° РѕС‚ Renohacks"
                    />
                </div>
            </section>
        </main>
    )
}





