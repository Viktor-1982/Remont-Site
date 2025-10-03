"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { TOCToggle } from "@/components/toc-toggle"
import navDataJson from "@/messages/nav.json"

export type Heading = {
    level: number
    text: string
    slug: string
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

// ✅ Жёсткая типизация JSON
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

    useEffect(() => {
        if (!items?.length) return
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id)
                })
            },
            { rootMargin: "-20% 0px -60% 0px" }
        )
        items.forEach((h) => {
            const el = document.getElementById(h.slug)
            if (el) observer.observe(el)
        })
        return () => observer.disconnect()
    }, [items])

    const handleClick = (id: string) => {
        const target = document.getElementById(id)
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" })
            window.location.hash = id
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
                    "fixed top-16 bottom-0 right-0 w-64 bg-background border-l shadow-lg transform transition-transform duration-300 lg:hidden overflow-y-auto",
                    open ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="p-4">
                    <h2 className="font-semibold mb-2">{t.mobile}</h2>
                    <ul className="space-y-1 text-sm">
                        {items.map((h) => (
                            <li key={h.slug} className={h.level === 3 ? "ml-4" : "ml-0"}>
                                <a
                                    href={`#${h.slug}`}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleClick(h.slug)
                                    }}
                                    aria-current={activeId === h.slug ? "true" : undefined}
                                    className={cn(
                                        "block transition-colors hover:text-primary",
                                        activeId === h.slug
                                            ? "text-primary font-semibold"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    {h.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* 💻 Desktop */}
            <nav
                aria-label={t.open}
                className="sticky top-24 hidden lg:block max-h-[70vh] w-64 shrink-0 overflow-auto rounded-xl border p-4 text-sm bg-card"
            >
                <div className="mb-2 font-semibold">{t.open}</div>
                <ul className="space-y-1">
                    {items.map((h) => (
                        <li key={h.slug} className={h.level === 3 ? "ml-4" : "ml-0"}>
                            <a
                                href={`#${h.slug}`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleClick(h.slug)
                                }}
                                aria-current={activeId === h.slug ? "true" : undefined}
                                className={cn(
                                    "transition-colors hover:text-foreground",
                                    activeId === h.slug
                                        ? "text-primary font-semibold"
                                        : "text-muted-foreground"
                                )}
                            >
                                {h.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}
