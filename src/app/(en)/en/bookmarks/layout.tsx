import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"

export const metadata: Metadata = getPageMetadata("/en/bookmarks", {
    title: "Bookmarks | Renohacks",
    description: "Saved user articles on Renohacks.",
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
