"use client"

import { Fragment, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    Bath,
    Calculator,
    ChevronDown,
    ChevronRight,
    Grid3X3,
    Layers,
    Lightbulb,
    Menu,
    Paintbrush,
    Palette,
    Ruler,
    ShoppingCart,
    Sparkles,
    Thermometer,
    Wallet,
    Wallpaper,
    Wind,
    X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { DeepLink } from "@/components/deep-link"
import { SearchBar } from "@/components/search-bar"
import { SearchPageForm } from "@/components/search-page-form"
import { CalculatorsDropdown } from "@/components/calculators-dropdown"
import { TopicHubsDropdown } from "@/components/topic-hubs-dropdown"
import { FaInstagram, FaPinterest } from "react-icons/fa"
import navData from "@/types/nav"
import type { Locale, NavData, NavLink } from "@/types/nav"
import { getToolShortcuts } from "@/dictionaries/tool-shortcuts"
import { getTopicHubsDictionary } from "@/dictionaries/topic-hubs"

const toolIcons = {
    paintbrush: Paintbrush,
    wallpaper: Wallpaper,
    grid3x3: Grid3X3,
    layers: Layers,
    ruler: Ruler,
    thermometer: Thermometer,
    wind: Wind,
    lightbulb: Lightbulb,
    wallet: Wallet,
    palette: Palette,
    sparkles: Sparkles,
    shoppingCart: ShoppingCart,
} as const

const topicHubIcons = {
    bath: Bath,
    lightbulb: Lightbulb,
} as const

export function SiteHeader() {
    const pathname = usePathname()
    const isEnglish = pathname.startsWith("/en")
    const locale: Locale = isEnglish ? "en" : "ru"
    const { links, social, header } = (navData as NavData)[locale]
    const [open, setOpen] = useState(false)
    const [topicsOpen, setTopicsOpen] = useState(false)
    const [toolsOpen, setToolsOpen] = useState(false)
    const calculators = getToolShortcuts(locale)
    const topicHubs = getTopicHubsDictionary(locale)
    const allCalculatorsHref = isEnglish ? "/en/tools" : "/tools"

    const handleSheetOpenChange = (nextOpen: boolean) => {
        setOpen(nextOpen)

        if (!nextOpen) {
            setTopicsOpen(false)
            setToolsOpen(false)
        }
    }

    const isActive = (href: string): boolean => {
        const normalizedPathname =
            pathname.endsWith("/") && pathname !== "/" && pathname !== "/en" ? pathname.slice(0, -1) : pathname

        if (href === "/" && !isEnglish) {
            return normalizedPathname === "/" || normalizedPathname === ""
        }
        if (href === "/en" && isEnglish) {
            return normalizedPathname === "/en" || normalizedPathname === "/en/"
        }
        if (normalizedPathname === href) return true

        const exactMatchPages = [
            "/tags",
            "/bookmarks",
            "/calculators",
            "/tools",
            "/about",
            "/en/tags",
            "/en/bookmarks",
            "/en/calculators",
            "/en/tools",
            "/en/about",
        ]

        if (exactMatchPages.includes(href)) {
            if (normalizedPathname.startsWith(`${href}/`)) {
                return false
            }
            return normalizedPathname === href
        }

        if (normalizedPathname.startsWith(`${href}/`)) {
            const afterHref = normalizedPathname.slice(href.length + 1)
            return !afterHref.includes("/")
        }

        return false
    }

    return (
        <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 shadow-soft backdrop-blur-md transition-all dark:bg-background/90">
            <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
                <Link
                    href={isEnglish ? "/en" : "/"}
                    className="inline-flex items-baseline rounded-xl bg-gradient-to-r from-primary/10 via-accent/8 to-primary/10 px-3 py-1.5 text-lg font-bold tracking-tight text-foreground shadow-soft transition-smooth hover:scale-105 hover:from-primary/15 hover:via-accent/12 hover:to-primary/15 dark:from-primary/15 dark:via-accent/12 dark:to-primary/15 dark:hover:from-primary/20 dark:hover:via-accent/18 dark:hover:to-primary/20 sm:px-4 sm:py-2 sm:text-xl"
                >
                    renohacks.com
                </Link>

                <nav className="hidden items-center gap-8 md:flex">
                    {links.map((link: NavLink) => {
                        if (
                            link.href === "/tools" ||
                            link.href === "/en/tools" ||
                            link.href === "/calculators" ||
                            link.href === "/en/calculators"
                        ) {
                            return (
                                <Fragment key={link.href}>
                                    <TopicHubsDropdown isEnglish={isEnglish} />
                                    <CalculatorsDropdown isEnglish={isEnglish} />
                                </Fragment>
                            )
                        }

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium tracking-wide transition-smooth",
                                    isActive(link.href)
                                        ? "relative font-semibold text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-primary"
                                        : "text-foreground/70 hover:text-foreground hover:text-primary/80"
                                )}
                            >
                                {link.label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="hidden items-center gap-3 md:flex">
                    <SearchBar isEnglish={isEnglish} />
                    <LanguageSwitcher />
                    <ThemeSwitcher />
                    <div className="ml-3 flex items-center gap-4 border-l border-border/50 pl-3">
                        <DeepLink
                            href={social.instagram}
                            ariaLabel="Instagram"
                            analyticsEvent="click_instagram_header"
                            location="header"
                            className="text-muted-foreground transition-all hover:scale-110 hover:text-[#E1306C]"
                        >
                            <FaInstagram size={18} aria-hidden="true" />
                        </DeepLink>
                        <DeepLink
                            href={social.pinterest}
                            ariaLabel="Pinterest"
                            analyticsEvent="click_pinterest_header"
                            location="header"
                            className="text-muted-foreground transition-all hover:scale-110 hover:text-[#BD081C]"
                        >
                            <FaPinterest size={18} aria-hidden="true" />
                        </DeepLink>
                    </div>
                </div>

                <div className="ml-auto flex shrink-0 items-center gap-1 md:hidden">
                    <div className="shrink-0">
                        <LanguageSwitcher />
                    </div>
                    <div className="shrink-0">
                        <ThemeSwitcher />
                    </div>
                    <Sheet open={open} onOpenChange={handleSheetOpenChange}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative z-10 h-10 min-w-[40px] w-10 shrink-0 md:hidden"
                                aria-label={open ? header.ariaMenuClose : header.ariaMenuOpen}
                            >
                                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="right" className="flex h-full flex-col p-0">
                            <div className="shrink-0 p-6 pr-16">
                                <SheetTitle className="sr-only">
                                    {isEnglish ? "Navigation menu" : "Меню навигации"}
                                </SheetTitle>
                            </div>
                            <nav className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 pb-6 pr-16">
                                <div className="border-b pb-4">
                                    <SearchPageForm
                                        isEnglish={isEnglish}
                                        onSubmitted={() => handleSheetOpenChange(false)}
                                    />
                                </div>

                                {links.map((link: NavLink) => {
                                    if (
                                        link.href === "/tools" ||
                                        link.href === "/en/tools" ||
                                        link.href === "/calculators" ||
                                        link.href === "/en/calculators"
                                    ) {
                                        return (
                                            <Fragment key={link.href}>
                                                <div className="flex flex-col gap-2">
                                                    <button
                                                        onClick={() => setTopicsOpen(!topicsOpen)}
                                                        className={cn(
                                                            "flex items-center justify-between text-lg font-semibold transition-colors hover:text-primary",
                                                            topicHubs.items.some((item) => isActive(item.href))
                                                                ? "text-primary"
                                                                : "text-foreground/90 hover:text-foreground"
                                                        )}
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            <Sparkles className="h-5 w-5" />
                                                            {topicHubs.mobileLabel}
                                                        </span>
                                                        {topicsOpen ? (
                                                            <ChevronDown className="h-4 w-4 transition-transform" />
                                                        ) : (
                                                            <ChevronRight className="h-4 w-4 transition-transform" />
                                                        )}
                                                    </button>
                                                    {topicsOpen ? (
                                                        <div className="ml-7 flex flex-col gap-2 border-l border-border/50 pl-4">
                                                            {topicHubs.items.map((item) => {
                                                                const Icon = topicHubIcons[item.icon]

                                                                return (
                                                                    <Link
                                                                        key={item.href}
                                                                        href={item.href}
                                                                        onClick={() => handleSheetOpenChange(false)}
                                                                        className="flex items-start gap-3 py-1 text-foreground/80 transition-colors hover:text-primary"
                                                                    >
                                                                        <Icon className={cn("mt-0.5 h-4 w-4", item.iconClass)} />
                                                                        <div className="min-w-0 flex-1">
                                                                            <div className="text-base font-medium">{item.label}</div>
                                                                            <div className="text-sm text-muted-foreground">
                                                                                {item.desc}
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                )
                                                            })}
                                                        </div>
                                                    ) : null}
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <button
                                                        onClick={() => setToolsOpen(!toolsOpen)}
                                                        className={cn(
                                                            "flex items-center justify-between text-lg font-semibold transition-colors hover:text-primary",
                                                            isActive(link.href)
                                                                ? "text-primary"
                                                                : "text-foreground/90 hover:text-foreground"
                                                        )}
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            <Calculator className="h-5 w-5" />
                                                            {link.label}
                                                        </span>
                                                        {toolsOpen ? (
                                                            <ChevronDown className="h-4 w-4 transition-transform" />
                                                        ) : (
                                                            <ChevronRight className="h-4 w-4 transition-transform" />
                                                        )}
                                                    </button>
                                                    {toolsOpen ? (
                                                        <div className="ml-7 flex flex-col gap-2 border-l border-border/50 pl-4">
                                                            <div className="-mr-2 flex max-h-[45vh] flex-col gap-2 overflow-y-auto pr-2">
                                                                {calculators.map((calc) => {
                                                                    const Icon = toolIcons[calc.icon]
                                                                    return (
                                                                        <Link
                                                                            key={calc.href}
                                                                            href={calc.href}
                                                                            onClick={() => handleSheetOpenChange(false)}
                                                                            className="flex items-start gap-3 py-1 text-foreground/80 transition-colors hover:text-primary"
                                                                        >
                                                                            <Icon className="mt-0.5 h-4 w-4 text-primary" />
                                                                            <div className="min-w-0 flex-1">
                                                                                <div className="text-base font-medium">{calc.label}</div>
                                                                            </div>
                                                                        </Link>
                                                                    )
                                                                })}
                                                            </div>
                                                            <Link
                                                                href={allCalculatorsHref}
                                                                onClick={() => handleSheetOpenChange(false)}
                                                                className="mt-1 flex items-center gap-2 text-base font-semibold text-primary"
                                                            >
                                                                <Calculator className="h-4 w-4" />
                                                                {isEnglish ? "View all tools" : "Все инструменты"}
                                                            </Link>
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </Fragment>
                                        )
                                    }

                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => handleSheetOpenChange(false)}
                                            className={cn(
                                                "text-lg font-semibold transition-colors hover:text-primary",
                                                isActive(link.href)
                                                    ? "text-primary underline underline-offset-4"
                                                    : "text-foreground/90 hover:text-foreground"
                                            )}
                                        >
                                            {link.label}
                                        </Link>
                                    )
                                })}

                                <div className="mt-6 flex items-center gap-4">
                                    <DeepLink
                                        href={social.instagram}
                                        ariaLabel="Instagram"
                                        title="Instagram"
                                        className="text-muted-foreground transition-colors hover:text-[#E1306C]"
                                    >
                                        Instagram
                                    </DeepLink>
                                    <DeepLink
                                        href={social.pinterest}
                                        ariaLabel="Pinterest"
                                        title="Pinterest"
                                        className="text-muted-foreground transition-colors hover:text-[#BD081C]"
                                    >
                                        Pinterest
                                    </DeepLink>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
