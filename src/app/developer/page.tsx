import Link from "next/link"
import Script from "next/script"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/developer", {
    title: "Разработчик сайта Renohacks | ViktorWebStudio",
    description:
        "Веб-разработка и дизайн. Создание современных, красивых и функциональных веб-сайтов с использованием передовых технологий.",
    cover: "/images/og-default.png",
    type: "website",
    alternates: {
        canonical: "https://renohacks.com/developer",
        languages: {
            en: "https://renohacks.com/en/developer",
        },
    },
})

export default function DeveloperPage() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "ViktorWebStudio",
        jobTitle: "Web Developer",
        description: "Веб-разработка и дизайн. Создание современных, красивых и функциональных веб-сайтов.",
        url: "https://renohacks.com/developer",
        knowsAbout: [
            "Web Development",
            "Web Design",
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Node.js",
        ],
    }

    const baseUrl = "https://renohacks.com"
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Главная",
                item: `${baseUrl}/`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Разработчик",
                item: `${baseUrl}/developer`,
            },
        ],
    }

    return (
        <>
            <Script
                id="developer-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <Link
                    href="/"
                    className="text-primary hover:text-primary/80 mb-6 inline-flex items-center gap-2 font-medium transition-colors"
                >
                    <span>←</span> Вернуться на сайт
                </Link>

                <div className="bg-card rounded-2xl shadow-xl p-8 md:p-12 border">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">ViktorWebStudio</h1>
                        <p className="text-xl text-primary mb-4">Веб-разработка и дизайн</p>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Создаем современные, красивые и функциональные веб-сайты с использованием передовых
                            технологий.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-muted rounded-xl p-6">
                            <h2 className="text-2xl font-bold mb-4">Услуги</h2>
                            <ul className="space-y-3 text-foreground">
                                <li className="flex items-center gap-2">
                                    <svg
                                        className="w-5 h-5 text-primary"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    Веб-разработка
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg
                                        className="w-5 h-5 text-primary"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    Веб-дизайн
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg
                                        className="w-5 h-5 text-primary"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    SEO оптимизация
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg
                                        className="w-5 h-5 text-primary"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    Поддержка и обслуживание
                                </li>
                            </ul>
                        </div>

                        <div className="bg-muted rounded-xl p-6">
                            <h2 className="text-2xl font-bold mb-4">Технологии</h2>
                            <p className="text-foreground leading-relaxed">
                                Next.js, React, TypeScript, Tailwind CSS, Node.js и многое другое
                            </p>
                        </div>
                    </div>

                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold mb-6 text-center">Связаться</h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="mailto:vless8878@gmail.com"
                                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all transform hover:scale-105"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                Email
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

