"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Search, X, ArrowDownWideNarrow, ArrowDownAZ, Tag as TagIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Post } from ".contentlayer/generated"
import { getTagCloudData } from "@/lib/tags"

interface TagCloudProps {
    posts: Post[]
    locale: "ru" | "en"
    basePath?: string
}

export function TagCloud({ posts, locale }: TagCloudProps) {
    const rawTags = useMemo(() => getTagCloudData(posts, locale), [posts, locale])
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState<"count" | "alpha">("count")

    const filteredTags = useMemo(() => {
        let result = rawTags

        if (searchQuery.trim()) {
            const query = searchQuery.trim().toLowerCase()
            result = result.filter(
                (tag) =>
                    tag.name.toLowerCase().includes(query) ||
                    tag.slug.toLowerCase().includes(query)
            )
        }

        if (sortBy === "alpha") {
            return [...result].sort((a, b) => a.name.localeCompare(b.name, locale))
        }

        return result
    }, [rawTags, searchQuery, sortBy, locale])

    if (rawTags.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                {locale === "en" ? "No tags found" : "Теги не найдены"}
            </div>
        )
    }

    const getSizeClass = (size: number) => {
        switch (size) {
            case 5:
                return "text-xl sm:text-2xl font-bold px-4 py-2"
            case 4:
                return "text-lg sm:text-xl font-semibold px-3 py-1.5"
            case 3:
                return "text-base sm:text-lg font-medium px-3 py-1"
            case 2:
                return "text-sm sm:text-base font-medium px-2.5 py-1"
            default:
                return "text-xs sm:text-sm px-2 py-0.5"
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

    const tagPath = locale === "en" ? "/tags" : "/ru/tags"

    return (
        <div className="space-y-6">
            {/* Search and Sort Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-2xl mx-auto p-2 rounded-2xl bg-card border shadow-soft">
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder={locale === "en" ? "Search tags..." : "Поиск по тегам..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 pr-8 h-9 text-xs sm:text-sm bg-muted/40 border-0 focus-visible:ring-1"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground hover:text-foreground"
                            aria-label={locale === "en" ? "Clear search" : "Очистить поиск"}
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <TagIcon className="h-3.5 w-3.5 text-primary" />
                        <span>
                            {filteredTags.length} {locale === "en" ? "tags" : "тегов"}
                        </span>
                    </div>

                    <div className="flex items-center gap-1 border-l pl-2">
                        <Button
                            type="button"
                            variant={sortBy === "count" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setSortBy("count")}
                            className="h-8 px-2 text-xs gap-1"
                            title={locale === "en" ? "Sort by popularity" : "По популярности"}
                        >
                            <ArrowDownWideNarrow className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">{locale === "en" ? "Popular" : "Популярные"}</span>
                        </Button>
                        <Button
                            type="button"
                            variant={sortBy === "alpha" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setSortBy("alpha")}
                            className="h-8 px-2 text-xs gap-1"
                            title={locale === "en" ? "Sort alphabetically" : "По алфавиту"}
                        >
                            <ArrowDownAZ className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">{locale === "en" ? "A-Z" : "А–Я"}</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Tags Cloud Body */}
            {filteredTags.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    <p>{locale === "en" ? `No tags found matching "${searchQuery}"` : `Теги по запросу «${searchQuery}» не найдены`}</p>
                    <Button
                        variant="link"
                        size="sm"
                        onClick={() => setSearchQuery("")}
                        className="mt-2 text-primary text-xs"
                    >
                        {locale === "en" ? "Reset filter" : "Сбросить поиск"}
                    </Button>
                </div>
            ) : (
                <div className="flex flex-wrap gap-2.5 sm:gap-3.5 justify-center items-center py-6">
                    {filteredTags.map((tag) => (
                        <Link
                            key={tag.slug}
                            href={`${tagPath}/${encodeURIComponent(tag.slug)}`}
                            className={cn(
                                "inline-block transition-all duration-300 hover:scale-105 hover:shadow-md",
                                getOpacityClass(tag.size)
                            )}
                        >
                            <Badge
                                variant="secondary"
                                className={cn(
                                    "rounded-full border border-primary/20 hover:border-primary/50",
                                    "bg-card hover:bg-primary/10 dark:bg-card/80 dark:hover:bg-primary/20",
                                    "text-foreground transition-all duration-200",
                                    getSizeClass(tag.size)
                                )}
                                title={`${tag.count} ${locale === "en" ? "articles" : "статей"}`}
                            >
                                <span className="text-primary font-semibold mr-0.5">#</span>
                                {tag.name}
                                <span className="ml-1.5 text-[11px] px-1.5 py-0.2 rounded-full bg-muted font-mono opacity-80">
                                    {tag.count}
                                </span>
                            </Badge>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
