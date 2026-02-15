import { getPageMetadata } from "@/lib/seo"
import { allPosts } from ".contentlayer/generated"
import { TagCloud } from "@/components/tag-cloud"

export const metadata = getPageMetadata("/en/tags", {
    title: "Tag Cloud — All Article Tags | Renohacks.com",
    description: "Visual display of all article tags on Renohacks.com. Tag size shows the number of articles. Navigation by renovation, design, and DIY topics.",
    cover: "/images/og-default.png",
    type: "website",
})

export const revalidate = 86400
export const dynamic = "force-static"

export default function TagsPageEn() {
    return (
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-6xl">
            <header className="text-center mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground">
                    Tag Cloud
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    All article tags on the site. Tag size shows the number of articles with this tag.
                </p>
            </header>

            <TagCloud posts={allPosts} locale="en" />
        </div>
    )
}

