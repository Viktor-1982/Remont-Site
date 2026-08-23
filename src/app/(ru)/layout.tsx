import type { Metadata } from "next"
import "../globals.css"
import { AppShell } from "@/app/app-shell"

export const metadata: Metadata = {
    title: "Renohacks.com - блог о ремонте, дизайне и DIY",
    description:
        "Фото-гайды по ремонту своими руками, DIY-лайфхаки, бесплатные инструменты для расчетов и обзоры материалов для качественного ремонта.",
    metadataBase: new URL("https://renohacks.com"),
    keywords: [
        "ремонт квартиры своими руками",
        "калькулятор ремонта квартиры",
        "звукоизоляция квартиры от соседей",
        "шумоизоляция стен и потолка",
        "звукоизоляция пола под стяжку",
        "расчет материалов для звукоизоляции",
        "расчет стяжки пола в мешках",
        "полусухая стяжка пола расход",
        "расчет плитки для ванной с подрезкой",
        "калькулятор ламината и кварцвинила",
        "укладка spc ламината",
        "расчет плинтуса и микроплинтуса",
        "расчет краски для стен на 2 слоя",
        "подготовка стен под покраску",
        "расчет обоев по площади комнаты",
        "планировщик сметы ремонта квартиры",
        "этапы ремонта в новостройке с нуля",
        "дизайн маленькой квартиры студии",
        "ремонт ванной комнаты под ключ",
        "калькулятор теплого пола мощность",
        "расчет вентиляции в квартире и ванной",
        "расчет освещения люмены на комнату",
        "ошибки ремонта квартиры как избежать",
        "черновой ремонт пошагово",
        "тренды интерьера 2026",
    ],
    icons: {
        icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    },
    manifest: "/manifest.json",
    openGraph: {
        title: "Renohacks.com - блог о ремонте, дизайне и DIY",
        description:
            "Фото-гайды по ремонту своими руками, DIY-лайфхаки, бесплатные инструменты для расчетов и обзоры материалов для качественного ремонта.",
        url: "https://renohacks.com/",
        siteName: "Renohacks.com",
        images: ["/images/og-default.png"],
        locale: "ru_RU",
        type: "website",
    },
    alternates: {
        canonical: "https://renohacks.com/ru",
        languages: {
            ru: "https://renohacks.com/ru",
            en: "https://renohacks.com/",
            "x-default": "https://renohacks.com/",
        },
        types: {
            "application/rss+xml": "https://renohacks.com/rss.xml",
        },
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        yandex: "6d69da4ae32e6bf3",
    },
}

export default function RuRootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <AppShell lang="ru">{children}</AppShell>
}
