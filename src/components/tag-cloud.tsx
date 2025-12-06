"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Post } from ".contentlayer/generated"

interface TagCloudProps {
    posts: Post[]
    locale: "ru" | "en"
    basePath?: string
}

interface TagData {
    name: string
    count: number
    size: number // 1-5 для разных размеров
}

export function TagCloud({ posts, locale, basePath = "" }: TagCloudProps) {
    // Подсчитываем количество статей для каждого тега
    const tagCounts = new Map<string, number>()
    
    posts.forEach((post) => {
        if (post.locale === locale && !post.draft && post.tags) {
            post.tags.forEach((tag) => {
                tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
            })
        }
    })

    // Преобразуем в массив и вычисляем размеры
    const tags: TagData[] = Array.from(tagCounts.entries())
        .map(([name, count]) => {
            // Вычисляем размер на основе количества (1-5)
            const maxCount = Math.max(...Array.from(tagCounts.values()))
            const minCount = Math.min(...Array.from(tagCounts.values()))
            const range = maxCount - minCount || 1
            const normalized = (count - minCount) / range
            const size = Math.max(1, Math.min(5, Math.ceil(normalized * 4) + 1))
            
            return { name, count, size }
        })
        .sort((a, b) => b.count - a.count) // Сортируем по количеству

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
                    key={tag.name}
                    href={`${tagPath}/${encodeURIComponent(tag.name)}`}
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
                        <span className="ml-2 text-xs opacity-70">
                            {tag.count}
                        </span>
                    </Badge>
                </Link>
            ))}
        </div>
    )
}

