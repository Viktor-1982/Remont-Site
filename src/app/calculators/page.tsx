import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Hammer, PaintBucket, Ruler } from "lucide-react"

export const metadata: Metadata = {
    title: "Онлайн калькуляторы для ремонта — краска, плитка, обои | Renohacks.com",
    description:
        "Бесплатные онлайн калькуляторы для ремонта: рассчитайте количество краски, плитки и обоев для вашей комнаты. Удобные инструменты для планирования материалов.",
    openGraph: {
        title: "Онлайн калькуляторы для ремонта — Renohacks.com",
        description:
            "Онлайн калькуляторы: краска, плитка и обои. Удобные инструменты для расчёта материалов при ремонте.",
        url: "https://renohacks.com/calculators",
        siteName: "Renohacks.com",
        locale: "ru_RU",
        type: "website",
    },
    other: {
        "application/ld+json": JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Онлайн калькуляторы для ремонта",
            description:
                "Бесплатные онлайн калькуляторы: краска, плитка и обои. Удобные инструменты для ремонта и планирования материалов.",
            url: "https://renohacks.com/calculators",
            itemListElement: [
                {
                    "@type": "SoftwareApplication",
                    name: "Калькулятор краски",
                    applicationCategory: "HomeImprovement",
                    operatingSystem: "Web",
                    url: "https://renohacks.com/calculators/paint",
                },
                {
                    "@type": "SoftwareApplication",
                    name: "Калькулятор плитки",
                    applicationCategory: "HomeImprovement",
                    operatingSystem: "Web",
                    url: "https://renohacks.com/calculators/tile",
                },
                {
                    "@type": "SoftwareApplication",
                    name: "Калькулятор обоев",
                    applicationCategory: "HomeImprovement",
                    operatingSystem: "Web",
                    url: "https://renohacks.com/calculators/wallpaper",
                },
            ],
        }),
    },
}
