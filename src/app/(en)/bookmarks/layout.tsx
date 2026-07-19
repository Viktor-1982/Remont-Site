import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"

export const metadata: Metadata = getPageMetadata("/en/bookmarks", {
    title: "Bookmarks | Renohacks",
    description: "Your bookmarked and saved articles on Renohacks: easily access and read your favorite home renovation guides, DIY tips, and checklists.",
    type: "website",
    robots: {
        index: false,
        follow: true,
        googleBot: {
            index: false,
            follow: true,
        },
    },
})

export default function BookmarksLayout({ children }: { children: React.ReactNode }) {
    return children
}
