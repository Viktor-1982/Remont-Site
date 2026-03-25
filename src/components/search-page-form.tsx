"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchPageFormProps {
    isEnglish?: boolean
    initialQuery?: string
}

export function SearchPageForm({ isEnglish = false, initialQuery = "" }: SearchPageFormProps) {
    const [query, setQuery] = useState(initialQuery)
    const router = useRouter()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const trimmed = query.trim()
        const prefix = isEnglish ? "/en/search" : "/search"
        router.push(trimmed ? `${prefix}?q=${encodeURIComponent(trimmed)}` : prefix)
    }

    return (
        <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={isEnglish ? "Search articles, tags, topics..." : "Искать статьи, теги, темы..."}
                    className="pl-9 text-foreground caret-primary placeholder:text-muted-foreground"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    aria-label={isEnglish ? "Search articles" : "Поиск статей"}
                />
            </div>
            <Button type="submit" className="sm:min-w-[140px]">
                {isEnglish ? "Search" : "Найти"}
            </Button>
        </form>
    )
}
