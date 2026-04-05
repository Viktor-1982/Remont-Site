import type { Metadata } from "next"
import { allPosts } from "contentlayer/generated"
import { EmailSubscription } from "@/components/email-subscription"
import { SeriesShowcase } from "@/components/series-showcase"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { getPageMetadata } from "@/lib/seo"
import { sortPosts } from "@/lib/utils"

export const revalidate = 86400
export const dynamic = "force-static"

export const metadata: Metadata = getPageMetadata("/series", {
    title: "Серии Renohacks: кухня, ванная, план ремонта и решения без переделок",
    description:
        "Редакционные серии Renohacks: разборы кухни и ванной, бюджет и планирование ремонта, решения без дорогих переделок.",
    type: "website",
    keywords: [
        "серии о ремонте",
        "разбор кухни",
        "разбор ванной",
        "план ремонта",
        "бюджет ремонта",
        "ремонт без переделок",
    ],
    openGraph: {
        locale: "ru_RU",
    },
})

export default function SeriesPageRu() {
    const posts = sortPosts(allPosts).filter((post) => post.locale === "ru" && !post.draft)

    return (
        <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 md:py-16">
            <Breadcrumbs
                items={[
                    { label: "Главная", href: "/" },
                    { label: "Серии", href: "/series" },
                ]}
                isEnglish={false}
            />

            <section className="rounded-[28px] border border-border/60 bg-card/95 px-5 py-8 shadow-soft sm:px-7 sm:py-10 lg:px-10">
                <div className="max-w-4xl">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
                        Серии
                    </div>
                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                        Серийные разборы Renohacks
                    </h1>
                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                        Здесь собраны повторяемые редакционные форматы: кухня, ванная, бюджет и решения без переделок.
                    </p>
                </div>
            </section>

            <SeriesShowcase posts={posts} title="Все серии" className="mt-12" />

            <section className="mx-auto mt-14 max-w-4xl">
                <EmailSubscription locale="ru" variant="compact" />
            </section>
        </main>
    )
}
