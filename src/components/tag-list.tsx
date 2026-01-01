"use client"

import { Badge } from "@/components/ui/badge"
import navDataJson from "@/components/messages/nav.json"

type Locale = "ru" | "en"

interface ArticlesDict {
    minRead: string
    words: string
    tagLabel: string
    related?: string
}

type NavData = { [key in Locale]: { articles: ArticlesDict } }

const navData = navDataJson as NavData

interface TagListProps {
    tags: string[]
    isEnglish: boolean
}

export function TagList({ tags, isEnglish }: TagListProps) {
    if (!tags || tags.length === 0) return null

    const locale: Locale = isEnglish ? "en" : "ru"
    const t = navData[locale].articles

    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
                const ariaLabel = `${t.tagLabel}: ${tag}`
                return (
                    <Badge
                        key={tag}
                        variant="secondary"
                        aria-label={ariaLabel}
                        title={ariaLabel}
                        className="text-sm px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/30 transition-colors font-medium"
                    >
                        #{tag}
                    </Badge>
                )
            })}
        </div>
    )
}
