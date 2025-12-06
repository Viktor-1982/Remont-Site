// src/app/page.tsx
import type { Metadata } from "next"
import { allPosts, type Post } from ".contentlayer/generated"
import { ArticleGrid } from "@/components/article-grid"
import { HeroBanner } from "@/components/hero-banner"
import { HomeBackgroundAnimation } from "@/components/home-background-animation"
import { PopularPosts } from "@/components/popular-posts"

// 🔄 Автоматическое обновление страницы каждые 60 сек
export const revalidate = 60

export const metadata: Metadata = {
    title: "Renohacks.com — блог о ремонте, дизайне и DIY | Идеи для дома 2025",
    description:
        "Фото-гайды по ремонту своими руками, DIY лайфхаки, бесплатные калькуляторы для краски и плитки, обзоры материалов. Всё для качественного ремонта дома и квартиры.",
    keywords: [
        "ремонт своими руками",
        "DIY ремонт",
        "дизайн интерьера",
        "ремонт квартиры",
        "фото гайды по ремонту",
        "калькуляторы для ремонта",
        "лайфхаки ремонта",
        "обзоры материалов",
        "покраска стен",
        "ремонт ванной",
        "ремонт кухни",
        "идеи для интерьера 2025",
        "тренды дизайна",
        "ремонт без ошибок"
    ],
    openGraph: {
        title: "Renohacks.com — блог о ремонте, дизайне и DIY | Идеи для дома 2025",
        description:
            "Фото-гайды по ремонту своими руками, DIY лайфхаки, бесплатные калькуляторы для краски и плитки, обзоры материалов. Всё для качественного ремонта дома и квартиры.",
        url: "https://renohacks.com/",
        siteName: "Renohacks.com",
        locale: "ru_RU",
        type: "website",
        images: ["/images/og-default.png"],
    },
    alternates: {
        canonical: "https://renohacks.com/",
        languages: {
            ru: "https://renohacks.com/",
            en: "https://renohacks.com/en",
            "x-default": "https://renohacks.com/",
        },
    },
}

export default function HomePage() {
    const posts: Post[] = allPosts
        .filter((p) => p.locale === "ru")
        .filter((p) => !p.draft)
        .sort((a, b) => {
            const ta = a.date ? new Date(a.date).getTime() : 0
            const tb = b.date ? new Date(b.date).getTime() : 0
            return tb - ta
        })

    return (
        <main>
            {/* 🎨 Строительные анимации на фоне */}
            <HomeBackgroundAnimation />
            
            {/* 🏠 Баннер во всю ширину */}
            <HeroBanner />

            {/* 📑 Контент внутри контейнера */}
            <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16 max-w-7xl">
                {/* ✅ Якорь для стрелки */}
                <section id="articles">
                    <div className="mb-10">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance tracking-tight text-center sm:text-left">
                            <span className="text-gradient">Статьи с пошаговыми инструкциями</span>
                        </h1>
                        <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto sm:mx-0 text-center sm:text-left">
                            Практические советы, фото-гайды и лайфхаки для качественного ремонта своими руками
                        </p>
                    </div>
                    <ArticleGrid posts={posts} isEnglish={false} />
                    
                    {/* Популярные статьи */}
                    <PopularPosts posts={posts} locale="ru" limit={6} />
                </section>
            </div>
        </main>
    )
}
