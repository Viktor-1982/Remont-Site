"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Post } from ".contentlayer/generated"
import { getTagCloudData } from "@/lib/tags"

interface TagCloudProps {
    posts: Post[]
    locale: "ru" | "en"
    basePath?: string
}

export function TagCloud({ posts, locale }: TagCloudProps) {
    const tags = getTagCloudData(posts, locale)

    if (tags.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                {locale === "en" ? "No tags found" : "Теги не найдены"}
            </div>
        )
    }

    const getSizeClass = (size: number) => {
        switch (size) {
            case 5:
                return "text-2xl sm:text-3xl font-bold px-4 py-2"
            case 4:
                return "text-xl sm:text-2xl font-semibold px-3 py-1.5"
            case 3:
                return "text-lg sm:text-xl font-medium px-3 py-1"
            case 2:
                return "text-base sm:text-lg font-medium px-2.5 py-1"
            default:
                return "text-sm sm:text-base px-2 py-0.5"
        }
    }

    const getOpacityClass = (size: number) => {
        switch (size) {
            case 5:
                return "opacity-100 hover:opacity-90"
            case 4:
                return "opacity-95 hover:opacity-85"
            case 3:
                return "opacity-90 hover:opacity-80"
            case 2:
                return "opacity-85 hover:opacity-75"
            default:
                return "opacity-75 hover:opacity-65"
        }
    }

    const tagPath = locale === "en" ? "/en/tags" : "/tags"

    return (
        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center items-center py-8">
            {tags.map((tag) => (
                <Link
                    key={tag.slug}
                    href={`${tagPath}/${encodeURIComponent(tag.slug)}`}
                    className={cn(
                        "inline-block transition-all duration-300 hover:scale-110 hover:shadow-lg",
                        getOpacityClass(tag.size)
                    )}
                >
                    <Badge
                        variant="secondary"
                        className={cn(
                            "rounded-full border-2 border-primary/20 hover:border-primary/40",
                            "bg-primary/5 hover:bg-primary/10",
                            "dark:bg-primary/10 dark:hover:bg-primary/20",
                            "transition-all duration-300",
                            getSizeClass(tag.size)
                        )}
                        title={`${tag.count} ${locale === "en" ? "articles" : "статей"}`}
                    >
                        #{tag.name}
                        <span className="ml-2 text-xs opacity-70">{tag.count}</span>
                    </Badge>
                </Link>
            ))}
        </div>
    )
}
