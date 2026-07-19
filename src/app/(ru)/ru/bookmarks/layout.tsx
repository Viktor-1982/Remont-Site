import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"

export const metadata: Metadata = getPageMetadata("/ru/bookmarks", {
    title: "Закладки | Renohacks",
    description: "Ваши сохраненные закладки и статьи на Renohacks: быстрый доступ к вашим любимым руководствам по ремонту квартир, DIY-советам и чеклистам.",
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
