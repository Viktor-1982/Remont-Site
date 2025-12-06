"use client"

import { useState, useMemo, useEffect } from "react"
import { Filter, X, ArrowUpDown, Calendar, Clock, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Post } from ".contentlayer/generated"

type SortOption = "date-desc" | "date-asc" | "reading-time" | "title"
type FilterOption = string // tag name

interface ArticleFiltersProps {
    posts: Post[]
    onFilteredPostsChange: (posts: Post[]) => void
    isEnglish?: boolean
}

export function ArticleFilters({ posts, onFilteredPostsChange, isEnglish = false }: ArticleFiltersProps) {
    const [sortBy, setSortBy] = useState<SortOption>("date-desc")
    const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set())
    const [showFilters, setShowFilters] = useState(false)

    // Получаем все уникальные теги
    const allTags = useMemo(() => {
        const tags = new Set<string>()
        posts.forEach((post) => {
            post.tags?.forEach((tag) => tags.add(tag))
        })
        return Array.from(tags).sort()
    }, [posts])

    // Фильтруем и сортируем посты
    const filteredAndSortedPosts = useMemo(() => {
        let result = [...posts]

        // Фильтр по тегам
        if (selectedTags.size > 0) {
            result = result.filter((post) =>
                post.tags?.some((tag) => selectedTags.has(tag))
            )
        }

        // Сортировка
        result.sort((a, b) => {
            switch (sortBy) {
                case "date-desc":
                    const ta = a.date ? new Date(a.date).getTime() : 0
                    const tb = b.date ? new Date(b.date).getTime() : 0
                    return tb - ta
                case "date-asc":
                    const ta2 = a.date ? new Date(a.date).getTime() : 0
                    const tb2 = b.date ? new Date(b.date).getTime() : 0
                    return ta2 - tb2
                case "reading-time":
                    const timeA = parseInt(a.readingTime?.replace(/\D/g, "") || "0")
                    const timeB = parseInt(b.readingTime?.replace(/\D/g, "") || "0")
                    return timeB - timeA
                case "title":
                    return a.title.localeCompare(b.title, isEnglish ? "en" : "ru")
                default:
                    return 0
            }
        })

        return result
    }, [posts, selectedTags, sortBy, isEnglish])

    // Обновляем родительский компонент через useEffect (не useMemo!)
    useEffect(() => {
        onFilteredPostsChange(filteredAndSortedPosts)
    }, [filteredAndSortedPosts, onFilteredPostsChange])

    const toggleTag = (tag: string) => {
        const newTags = new Set(selectedTags)
        if (newTags.has(tag)) {
            newTags.delete(tag)
        } else {
            newTags.add(tag)
        }
        setSelectedTags(newTags)
    }

    const clearFilters = () => {
        setSelectedTags(new Set())
        setSortBy("date-desc")
    }

    const hasActiveFilters = selectedTags.size > 0 || sortBy !== "date-desc"

    return (
        <div className="mb-8 space-y-4">
            {/* Кнопка показать/скрыть фильтры */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2"
                >
                    <Filter className="h-4 w-4" />
                    <span>{isEnglish ? "Filters & Sort" : "Фильтры и сортировка"}</span>
                    {hasActiveFilters && (
                        <Badge variant="default" className="ml-1 bg-primary text-primary-foreground">
                            {selectedTags.size + (sortBy !== "date-desc" ? 1 : 0)}
                        </Badge>
                    )}
                </Button>

                {hasActiveFilters && (
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearFilters} 
                        className="text-xs hover:bg-destructive/10 hover:text-destructive"
                    >
                        <X className="h-3 w-3 mr-1" />
                        {isEnglish ? "Clear all" : "Сбросить всё"}
                    </Button>
                )}
            </div>

            {/* Панель фильтров */}
            {showFilters && (
                <div className="rounded-xl border-2 border-border/50 bg-card p-4 sm:p-6 shadow-lg space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-top-2">
                    {/* Сортировка */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <ArrowUpDown className="h-5 w-5 text-primary" />
                            <label className="text-base font-bold">
                                {isEnglish ? "Sort by" : "Сортировать по"}
                            </label>
                        </div>
                        <p className="text-xs text-muted-foreground -mt-2">
                            {isEnglish 
                                ? "Choose how articles should be ordered" 
                                : "Выберите, как упорядочить статьи"}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                            {[
                                { 
                                    value: "date-desc", 
                                    label: isEnglish ? "Newest first" : "Сначала новые", 
                                    icon: Calendar,
                                    desc: isEnglish ? "Latest articles" : "Последние статьи"
                                },
                                { 
                                    value: "date-asc", 
                                    label: isEnglish ? "Oldest first" : "Сначала старые", 
                                    icon: Calendar,
                                    desc: isEnglish ? "Oldest articles" : "Старые статьи"
                                },
                                { 
                                    value: "reading-time", 
                                    label: isEnglish ? "Reading time" : "Время чтения", 
                                    icon: Clock,
                                    desc: isEnglish ? "Longest first" : "Сначала длинные"
                                },
                                { 
                                    value: "title", 
                                    label: isEnglish ? "Alphabetically" : "По алфавиту", 
                                    icon: TrendingUp,
                                    desc: isEnglish ? "A to Z" : "А до Я"
                                },
                            ].map((option) => {
                                const Icon = option.icon
                                const isActive = sortBy === option.value
                                return (
                                    <button
                                        key={option.value}
                                        onClick={() => setSortBy(option.value as SortOption)}
                                        className={`
                                            flex flex-col items-start gap-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 transition-all text-left
                                            ${isActive 
                                                ? "border-primary bg-primary/10 text-primary shadow-md" 
                                                : "border-border hover:border-primary/50 hover:bg-accent/50"
                                            }
                                        `}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Icon className={`h-3 w-3 sm:h-4 sm:w-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                                            <span className={`font-semibold text-xs sm:text-sm ${isActive ? "text-primary" : ""}`}>
                                                {option.label}
                                            </span>
                                        </div>
                                        <span className="text-xs text-muted-foreground">
                                            {option.desc}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Разделитель */}
                    <div className="border-t border-border/50" />

                    {/* Фильтр по тегам */}
                    {allTags.length > 0 && (
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Filter className="h-5 w-5 text-primary" />
                                <label className="text-base font-bold">
                                    {isEnglish ? "Filter by topics" : "Фильтр по темам"}
                                </label>
                            </div>
                            <p className="text-xs text-muted-foreground -mt-2">
                                {isEnglish 
                                    ? "Select one or more topics to show only relevant articles" 
                                    : "Выберите одну или несколько тем, чтобы показывать только релевантные статьи"}
                            </p>
                            {selectedTags.size > 0 && (
                                <div className="flex items-center gap-2 text-sm text-primary font-medium">
                                    <span>
                                        {isEnglish ? "Selected" : "Выбрано"}: {selectedTags.size}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setSelectedTags(new Set())}
                                        className="h-6 px-2 text-xs"
                                    >
                                        {isEnglish ? "Clear" : "Очистить"}
                                    </Button>
                                </div>
                            )}
                            <div className="flex flex-wrap gap-2">
                                {allTags.map((tag) => {
                                    const isSelected = selectedTags.has(tag)
                                    return (
                                        <button
                                            key={tag}
                                            onClick={() => toggleTag(tag)}
                                            className={`
                                                px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all
                                                ${isSelected
                                                    ? "bg-primary text-primary-foreground shadow-md scale-105"
                                                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-105"
                                                }
                                            `}
                                        >
                                            #{tag}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Результаты */}
                    <div className="pt-3 sm:pt-4 border-t border-border/50 bg-muted/30 rounded-lg p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-foreground">
                                    {isEnglish ? "Results" : "Результаты"}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {isEnglish 
                                        ? `${filteredAndSortedPosts.length} of ${posts.length} articles match your filters`
                                        : `${filteredAndSortedPosts.length} из ${posts.length} статей соответствуют фильтрам`
                                    }
                                </p>
                            </div>
                            {filteredAndSortedPosts.length !== posts.length && (
                                <div className="text-right">
                                    <div className="text-xl sm:text-2xl font-bold text-primary">
                                        {Math.round((filteredAndSortedPosts.length / posts.length) * 100)}%
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {isEnglish ? "shown" : "показано"}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

