"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, X, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { fetchPostIndex, type PostIndexItem } from "@/lib/post-index"

interface SearchBarProps {
    isEnglish?: boolean
}

export function SearchBar({ isEnglish = false }: SearchBarProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState("")
    const [debouncedQuery, setDebouncedQuery] = useState("")
    const [recentSearches, setRecentSearches] = useState<string[]>([])
    const [posts, setPosts] = useState<PostIndexItem[]>([])
    const router = useRouter()

    useEffect(() => {
        fetchPostIndex()
            .then((data) => {
                setPosts(data)
            })
            .catch(() => {
                // Ignore fetch errors for optional search suggestions.
            })
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query)
        }, 300)

        return () => clearTimeout(timer)
    }, [query])

    useEffect(() => {
        const saved = localStorage.getItem("renohacks-search-history")
        if (saved) {
            try {
                setRecentSearches(JSON.parse(saved))
            } catch {
                // Ignore broken localStorage state.
            }
        }
    }, [])

    const filteredPosts = useMemo(() => {
        if (!debouncedQuery.trim() || posts.length === 0) return []

        const lowerQuery = debouncedQuery.toLowerCase()
        const locale = isEnglish ? "en" : "ru"

        return posts
            .filter((post) => {
                if (post.locale !== locale) return false

                const searchText = `${post.title} ${post.description || ""} ${post.tags?.join(" ") || ""}`.toLowerCase()
                return searchText.includes(lowerQuery)
            })
            .slice(0, 8)
    }, [debouncedQuery, isEnglish, posts])

    const handleSearch = (searchQuery: string) => {
        if (!searchQuery.trim()) return

        const updated = [searchQuery, ...recentSearches.filter((item) => item !== searchQuery)].slice(0, 5)
        setRecentSearches(updated)
        localStorage.setItem("renohacks-search-history", JSON.stringify(updated))

        router.push(`/${isEnglish ? "en/" : ""}search?q=${encodeURIComponent(searchQuery)}`)
        setIsOpen(false)
        setQuery("")
    }

    const clearHistory = () => {
        setRecentSearches([])
        localStorage.removeItem("renohacks-search-history")
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "/" && !isOpen && document.activeElement?.tagName !== "INPUT") {
                event.preventDefault()
                setIsOpen(true)
            }

            if (event.key === "Escape" && isOpen) {
                setIsOpen(false)
                setQuery("")
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isOpen])

    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(true)}
                className="relative"
                aria-label={isEnglish ? "Search" : "Поиск"}
            >
                <Search className="h-5 w-5" />
            </Button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[20vh] px-4"
                    onClick={(event) => {
                        if (event.target === event.currentTarget) {
                            setIsOpen(false)
                            setQuery("")
                        }
                    }}
                >
                    <div
                        className="w-full max-w-2xl rounded-2xl border bg-card shadow-2xl backdrop-blur-sm animate-in fade-in slide-in-from-top-4 max-h-[85vh] overflow-hidden flex flex-col"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-center gap-2 border-b p-4">
                            <Search className="h-5 w-5 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder={isEnglish ? "Search articles..." : "Поиск статей..."}
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter" && query.trim()) {
                                        handleSearch(query)
                                    }
                                }}
                                className="border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                                autoFocus
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                    setIsOpen(false)
                                    setQuery("")
                                }}
                                aria-label={isEnglish ? "Close" : "Закрыть"}
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 min-h-0">
                            {debouncedQuery.trim() ? (
                                filteredPosts.length > 0 ? (
                                    <div className="space-y-2">
                                        <p className="text-sm font-semibold text-muted-foreground mb-3">
                                            {isEnglish ? "Results" : "Результаты"} ({filteredPosts.length})
                                        </p>
                                        {filteredPosts.map((post) => (
                                            <Link
                                                key={post.id}
                                                href={post.url}
                                                onClick={() => {
                                                    setIsOpen(false)
                                                    setQuery("")
                                                }}
                                                className="block rounded-lg border p-4 transition-all hover:border-primary hover:bg-accent/50"
                                            >
                                                <h3 className="font-semibold mb-1 line-clamp-1">{post.title}</h3>
                                                {post.description && (
                                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                                        {post.description}
                                                    </p>
                                                )}
                                                {post.tags && post.tags.length > 0 && (
                                                    <div className="mt-2 flex flex-wrap gap-1">
                                                        {post.tags.slice(0, 3).map((tag) => (
                                                            <span
                                                                key={tag}
                                                                className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        <p>{isEnglish ? "No results found" : "Ничего не найдено"}</p>
                                    </div>
                                )
                            ) : (
                                <div className="space-y-4">
                                    {recentSearches.length > 0 && (
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <p className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                                                    <Clock className="h-4 w-4" />
                                                    {isEnglish ? "Recent searches" : "Недавние поиски"}
                                                </p>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={clearHistory}
                                                    className="text-xs h-auto py-1"
                                                >
                                                    {isEnglish ? "Clear" : "Очистить"}
                                                </Button>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {recentSearches.map((search, index) => (
                                                    <Button
                                                        key={index}
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleSearch(search)}
                                                        className="text-xs"
                                                    >
                                                        {search}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <div className="text-center text-sm text-muted-foreground">
                                        <p className="mb-2">
                                            {isEnglish
                                                ? "Press / to search, Esc to close"
                                                : "Нажмите / для поиска, Esc для закрытия"}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
