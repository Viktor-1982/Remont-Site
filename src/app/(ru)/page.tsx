import type { Metadata } from "next"
import { allPosts, type Post } from ".contentlayer/generated"
import { ArticleGrid } from "@/components/article-grid"
import { HeroBanner } from "@/components/hero-banner"
import { HomeBackgroundAnimation } from "@/components/home-background-animation"
import { PopularPosts } from "@/components/popular-posts"
import { EmailSubscription } from "@/components/email-subscription"
import { CalculatorsShowcase } from "@/components/calculators-showcase"

// Статическая страница с обновлением раз в сутки
export const revalidate = 86400
export const dynamic = "force-static"

export const metadata: Metadata = {
    title: "Renohacks.com - блог о ремонте, дизайне и DIY для дома и квартиры",
    description:
        "Фото-гайды по ремонту своими руками, DIY-лайфхаки, бесплатные калькуляторы для краски и плитки, обзоры материалов. Все для качественного ремонта дома и квартиры.",
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
        "идеи для интерьера",
        "тренды дизайна",
        "ремонт без ошибок",
    ],
    openGraph: {
        title: "Renohacks.com - блог о ремонте, дизайне и DIY для дома и квартиры",
        description:
            "Фото-гайды по ремонту своими руками, DIY-лайфхаки, бесплатные калькуляторы для краски и плитки, обзоры материалов. Все для качественного ремонта дома и квартиры.",
        url: "https://renohacks.com/",
        siteName: "Renohacks.com",
        locale: "ru_RU",
        type: "website",
        images: ["/images/og-default.png"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Renohacks.com - блог о ремонте, дизайне и DIY для дома и квартиры",
        description:
            "Фото-гайды по ремонту своими руками, DIY-лайфхаки, бесплатные калькуляторы для краски и плитки, обзоры материалов. Все для качественного ремонта дома и квартиры.",
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
            {/* Строительные анимации на фоне */}
            <HomeBackgroundAnimation />

            {/* Баннер во всю ширину */}
            <HeroBanner />

            {/* Контент внутри контейнера */}
            <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16 max-w-7xl">
                {/* Калькуляторы и инструменты */}
                <CalculatorsShowcase isEnglish={false} />

                {/* Якорь для стрелки */}
                <section id="articles">
                    <div className="mb-10">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance tracking-tight text-center sm:text-left">
                            <span className="text-gradient">Статьи с пошаговыми инструкциями</span>
                        </h2>
                        <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto sm:mx-0 text-center sm:text-left">
                            Практические советы, фото-гайды и лайфхаки для качественного ремонта своими руками
                        </p>
                    </div>
                    <ArticleGrid posts={posts} isEnglish={false} />

                    {/* Популярные статьи */}
                    <PopularPosts posts={posts} locale="ru" limit={6} />
                </section>

                {/* Email-подписка */}
                <section className="mt-16 sm:mt-20">
                    <EmailSubscription locale="ru" variant="default" />
                </section>
            </div>
        </main>
    )
}
