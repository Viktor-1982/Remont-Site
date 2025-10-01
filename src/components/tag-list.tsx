"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import navData from "@/messages/nav.json"

interface TagListProps {
    tags: string[]
    isEnglish: boolean
    clickable?: boolean
}

export function TagList({ tags, isEnglish, clickable = true }: TagListProps) {
    if (!tags || tags.length === 0) return null

    const locale = isEnglish ? "en" : "ru"
    const t = (navData as any)[locale].articles

    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
                const ariaLabel = `${t.tagLabel}: ${tag}`

                return clickable ? (
                    <Link
                        key={tag}
                        href={`${isEnglish ? "/en" : ""}/tags/${tag}`}
                        aria-label={ariaLabel}
                        title={ariaLabel}
                    >
                        <Badge
                            variant="secondary"
                            className="text-sm px-3 py-1 rounded-full cursor-pointer hover:bg-primary hover:text-white transition"
                        >
                            #{tag}
                        </Badge>
                    </Link>
                ) : (
                    <Badge
                        key={tag}
                        variant="secondary"
                        aria-label={ariaLabel}
                        title={ariaLabel}
                        className="text-sm px-3 py-1 rounded-full"
                    >
                        #{tag}
                    </Badge>
                )
            })}
        </div>
    )
}
