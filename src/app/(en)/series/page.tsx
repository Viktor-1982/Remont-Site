import type { Metadata } from "next"
import { allPosts } from "contentlayer/generated"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { EmailSubscription } from "@/components/email-subscription"
import { SeriesShowcase } from "@/components/series-showcase"
import { getPageMetadata } from "@/lib/seo"
import { sortPosts } from "@/lib/utils"

export const revalidate = 86400
export const dynamic = "force-static"

export const metadata: Metadata = getPageMetadata("/en/series", {
    title: "Renohacks Series: kitchen, bathroom, renovation planning, and no-rework advice",
    description:
        "Editorial series from Renohacks: kitchen breakdowns, bathroom breakdowns, renovation budget and planning, and decisions that help avoid rework.",
    type: "website",
    keywords: [
        "renovation series",
        "kitchen breakdown",
        "bathroom breakdown",
        "renovation planning",
        "renovation budget",
        "avoid rework",
    ],
    openGraph: {
        locale: "en_US",
    },
})

export default function SeriesPageEn() {
    const posts = sortPosts(allPosts).filter((post) => post.locale === "en" && !post.draft)

    return (
        <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 md:py-16">
            <Breadcrumbs
                items={[
                    { label: "Home", href: "/" },
                    { label: "Series", href: "/series" },
                ]}
                isEnglish
            />

            <section className="rounded-[28px] border border-border/60 bg-card/95 px-5 py-8 shadow-soft sm:px-7 sm:py-10 lg:px-10">
                <div className="max-w-4xl">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
                        Series
                    </div>
                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                        Renohacks editorial series
                    </h1>
                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                        A cleaner way to follow repeatable formats across kitchen planning, bathroom decisions,
                        renovation budgeting, and smarter ways to avoid rework.
                    </p>
                </div>
            </section>

            <SeriesShowcase posts={posts} isEnglish title="All series" className="mt-12" />

            <section className="mx-auto mt-14 max-w-4xl">
                <EmailSubscription locale="en" variant="compact" />
            </section>
        </main>
    )
}
