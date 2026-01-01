"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
    label: string
    href: string
}

interface BreadcrumbsProps {
    items?: BreadcrumbItem[]
    isEnglish?: boolean
}

export function Breadcrumbs({ items, isEnglish = false }: BreadcrumbsProps) {
    const pathname = usePathname()
    
    // Автоматическая генерация breadcrumbs из pathname
    const autoItems = usePathnameBreadcrumbs(pathname, isEnglish)
    const breadcrumbs = items || autoItems

    if (breadcrumbs.length <= 1) return null

    return (
        <nav aria-label={isEnglish ? "Breadcrumb" : "Хлебные крошки"} className="mb-4 sm:mb-6">
            <ol className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground/80 flex-wrap">
                {breadcrumbs.map((item, index) => {
                    const isLast = index === breadcrumbs.length - 1
                    return (
                        <li key={item.href} className="flex items-center gap-2">
                            {index === 0 ? (
                                <Home className="h-4 w-4 text-primary/70" aria-hidden="true" />
                            ) : (
                                <ChevronRight className="h-4 w-4 text-muted-foreground/40" aria-hidden="true" />
                            )}
                            {isLast ? (
                                <span
                                    className={cn(
                                        "font-semibold text-foreground",
                                        "truncate max-w-[200px] sm:max-w-none"
                                    )}
                                    aria-current="page"
                                >
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "hover:text-primary transition-colors",
                                        "truncate max-w-[200px] sm:max-w-none"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}

function usePathnameBreadcrumbs(pathname: string, isEnglish: boolean): BreadcrumbItem[] {
    const items: BreadcrumbItem[] = []
    const basePath = isEnglish ? "/en" : ""
    
    // Главная
    items.push({
        label: isEnglish ? "Home" : "Главная",
        href: basePath || "/",
    })

    // Разбираем pathname
    const segments = pathname
        .replace(/^\/en/, "")
        .split("/")
        .filter(Boolean)

    let currentPath = basePath || ""

    segments.forEach((segment, index) => {
        currentPath += `/${segment}`
        
        // Для страниц статей используем "Статьи" вместо slug
        if (segment === "posts" && index === segments.length - 2) {
            const localizedLabel = getLocalizedLabel("posts", isEnglish)
            items.push({
                label: localizedLabel || "Posts",
                href: currentPath,
            })
        } else if (index === segments.length - 1) {
            // Последний сегмент - это slug статьи или другой страницы
            // Для статей показываем "Статья" или используем заголовок из метаданных
            if (segments[0] === "posts") {
                // Это статья, но мы не знаем заголовок здесь
                // Используем общий label
                items.push({
                    label: isEnglish ? "Article" : "Статья",
                    href: currentPath,
                })
            } else {
                const localizedLabel = getLocalizedLabel(segment, isEnglish)
                const label = decodeURIComponent(segment)
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")
                items.push({
                    label: localizedLabel || label,
                    href: currentPath,
                })
            }
        } else {
            // Обычный сегмент
            const localizedLabel = getLocalizedLabel(segment, isEnglish)
            const label = decodeURIComponent(segment)
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
            items.push({
                label: localizedLabel || label,
                href: currentPath,
            })
        }
    })

    return items
}

function getLocalizedLabel(segment: string, isEnglish: boolean): string | null {
    const labels: Record<string, { ru: string; en: string }> = {
        posts: { ru: "Статьи", en: "Articles" },
        calculators: { ru: "Калькуляторы", en: "Calculators" },
        tags: { ru: "Теги", en: "Tags" },
        about: { ru: "О проекте", en: "About" },
        privacy: { ru: "Конфиденциальность", en: "Privacy" },
        terms: { ru: "Правила", en: "Terms" },
        search: { ru: "Поиск", en: "Search" },
    }

    const label = labels[segment]
    return label ? (isEnglish ? label.en : label.ru) : null
}

