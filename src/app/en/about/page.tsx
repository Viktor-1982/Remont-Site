import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/en/about", {
    title: "About",
    description:
        "About renohacks.com — renovation & construction blog. Photo guides, DIY tips, calculators and material reviews.",
    cover: "/images/og-default.png",
    type: "article",
})

export default function AboutPage() {
    return (
        <main className="container py-12 md:py-16 prose dark:prose-invert">
            <h1>About</h1>
            <p>
                <strong>renohacks.com</strong> — renovation and construction blog with guides,
                hacks, and calculators.
            </p>
        </main>
    )
}
