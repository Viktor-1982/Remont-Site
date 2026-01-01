"use client"

import React, { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { TOCToggle } from "@/components/toc-toggle"
import navDataJson from "@/components/messages/nav.json"
import GitHubSlugger from "github-slugger"

export type Heading = {
    level: number
    text: string
    slug?: string
}

type Locale = "ru" | "en"

interface TOCDict {
    open: string
    close: string
    ariaOpen: string
    ariaClose: string
    mobile: string
}

type NavData = Record<Locale, { toc: TOCDict }>

const navData: NavData = navDataJson as NavData

export function TableOfContents({
                                    items,
                                    onLinkClick,
                                }: {
    items: Heading[]
    onLinkClick?: () => void
}) {
    const [open, setOpen] = useState(false)
    const [activeId, setActiveId] = useState<string | null>(null)

    const pathname = usePathname()
    const locale: Locale = pathname.startsWith("/en") ? "en" : "ru"
    const t = navData[locale].toc

    // 🧠 Функция для генерации якоря - используем GitHubSlugger для совместимости с mdx-components
    // Важно: сбрасываем slugger перед каждым вызовом, чтобы не добавлялись суффиксы -2, -3 и т.д.
    // В mdx-components каждый заголовок создает новый экземпляр, поэтому дубликаты не отслеживаются
    const makeSlug = React.useCallback((text: string) => {
        const slugger = new GitHubSlugger()
        return slugger.slug(text)
    }, [])

    useEffect(() => {
        if (!items?.length) return
        
        let observer: IntersectionObserver | null = null
        
        // Небольшая задержка, чтобы убедиться, что DOM полностью отрендерен
        const timeoutId = setTimeout(() => {
            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) setActiveId(entry.target.id)
                    })
                },
                { rootMargin: "-20% 0px -60% 0px" }
            )
            items.forEach((h) => {
                const slug = makeSlug(h.text)
                const el = document.getElementById(slug)
                if (el) {
                    observer?.observe(el)
                }
            })
        }, 100)
        
        return () => {
            clearTimeout(timeoutId)
            if (observer) {
                observer.disconnect()
            }
        }
    }, [items, makeSlug])

    const handleClick = (id: string) => {
        const target = document.getElementById(id)
        if (target) {
            // На мобильных используем instant scroll для лучшей производительности
            const isMobile = window.innerWidth < 768
            target.scrollIntoView({ 
                behavior: isMobile ? "auto" : "smooth", 
                block: "start" 
            })
            // Используем requestAnimationFrame для обновления hash после скролла
            if (isMobile) {
                requestAnimationFrame(() => {
                    window.location.hash = id
                })
            } else {
                window.location.hash = id
            }
            setOpen(false)
            if (onLinkClick) onLinkClick()
        }
    }

    if (!items?.length) return null

    return (
        <>
            {/* 📱 Toggle */}
            <TOCToggle
                open={open}
                onToggle={() => setOpen(!open)}
                label={open ? t.close : t.open}
                ariaLabel={open ? t.ariaClose : t.ariaOpen}
            />

            {/* 📱 Mobile */}
            <nav
                aria-label={t.mobile}
                className={cn(
                    "fixed top-16 bottom-0 right-0 w-64 bg-card text-card-foreground border-l shadow-lg transform transition-transform duration-300 lg:hidden overflow-y-auto",
                    open ? "translate-x-0" : "translate-x-full"
                )}
                style={{ transform: 'translateZ(0)', willChange: 'transform' }}
            >
                <div className="p-4">
                    <h2 className="font-semibold mb-2 text-foreground">{t.mobile}</h2>
                    <ul className="space-y-1 text-sm">
                        {items.map((h, i) => {
                            const slug = makeSlug(h.text)
                            return (
                                <li key={`${slug}-${i}`} className={h.level === 3 ? "ml-4" : "ml-0"}>
                                    <a
                                        href={`#${slug}`}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleClick(slug)
                                        }}
                                        aria-current={activeId === slug ? "true" : undefined}
                                        className={cn(
                                            "block transition-colors py-1.5 px-2 rounded-md",
                                            activeId === slug
                                                ? "text-primary font-semibold bg-primary/10"
                                                : "text-foreground hover:text-primary hover:bg-muted/50"
                                        )}
                                    >
                                        {h.text}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </nav>

            {/* 💻 Desktop */}
            <nav
                aria-label={t.open}
                className="sticky top-24 hidden lg:block max-h-[45vh] w-64 shrink-0 overflow-auto rounded-xl border border-border/50 p-4 text-sm bg-card/80 backdrop-blur-sm shadow-soft"
            >
                <div className="mb-3 font-semibold text-foreground">{t.open}</div>
                <ul className="space-y-1.5">
                    {items.map((h, i) => {
                        const slug = makeSlug(h.text)
                        return (
                            <li key={`${slug}-${i}`} className={h.level === 3 ? "ml-4" : "ml-0"}>
                                <a
                                    href={`#${slug}`}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleClick(slug)
                                    }}
                                    aria-current={activeId === slug ? "true" : undefined}
                                    className={cn(
                                        "transition-colors block py-1 px-2 rounded-md",
                                        activeId === slug
                                            ? "text-primary font-semibold bg-primary/10 border-l-2 border-primary"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                    )}
                                >
                                    {h.text}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </>
    )
}
