"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { DeepLink } from "@/components/deep-link"
import { FaInstagram, FaPinterest } from "react-icons/fa"
import navData from "@/types/nav"
import type { NavData, Locale, NavLink } from "@/types/nav"
import { useState } from "react"

export function SiteHeader() {
    const pathname = usePathname()
    const isEnglish = pathname.startsWith("/en")
    const locale: Locale = isEnglish ? "en" : "ru"
    const { links, social, header } = (navData as NavData)[locale]
    const [open, setOpen] = useState(false)

    const isActive = (href: string): boolean => {
        if (href === "/" && !isEnglish) return pathname === "/"
        if (href === "/en" && isEnglish) return pathname === "/en"
        return pathname === href || pathname.startsWith(`${href}/`)
    }

    return (
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b transition-all">
            <div className="container flex items-center justify-between h-14 px-4 sm:px-6">
                {/* 🏠 Логотип */}
                <Link
                    href={isEnglish ? "/en" : "/"}
                    className="font-bold text-lg hover:text-primary transition-colors"
                >
                    renohacks.com
                </Link>

                {/* 🌐 Языковой переключатель — всегда видим */}
                <div className="flex items-center gap-2 md:hidden">
                    <LanguageSwitcher />
                </div>

                {/* 🧭 Навигация — десктоп */}
                <nav className="hidden md:flex items-center gap-6">
                    {links.map((link: NavLink) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "transition-colors hover:text-primary",
                                isActive(link.href)
                                    ? "text-primary font-semibold underline underline-offset-4"
                                    : "text-muted-foreground"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* 🔘 Переключатели и соцсети — десктоп */}
                <div className="hidden md:flex items-center gap-3">
                    <LanguageSwitcher />
                    <ThemeSwitcher />
                    <div className="flex items-center gap-4 pl-3 border-l border-border/50 ml-3">
                        <DeepLink
                            href={social.instagram}
                            ariaLabel="Instagram"
                            analyticsEvent="click_instagram_header"
                            location="header"
                            className="text-muted-foreground hover:text-[#E1306C] transition-all hover:scale-110"
                        >
                            <FaInstagram size={18} aria-hidden="true" />
                        </DeepLink>
                        <DeepLink
                            href={social.pinterest}
                            ariaLabel="Pinterest"
                            analyticsEvent="click_pinterest_header"
                            location="header"
                            className="text-muted-foreground hover:text-[#BD081C] transition-all hover:scale-110"
                        >
                            <FaPinterest size={18} aria-hidden="true" />
                        </DeepLink>
                    </div>
                </div>

                {/* 📱 Мобильное меню */}
                <div className="flex items-center md:hidden gap-2">
                    {/* 🎨 Переключатель темы — рядом с меню */}
                    <ThemeSwitcher />

                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                                aria-label={open ? header.ariaMenuClose : header.ariaMenuOpen}
                            >
                                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="right" className="p-6 pr-16">
                            <SheetTitle className="sr-only">
                                {isEnglish ? "Navigation menu" : "Меню навигации"}
                            </SheetTitle>
                            <nav className="flex flex-col gap-4">
                                {links.map((link: NavLink) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                        className={cn(
                                            "text-lg font-medium transition-colors hover:text-primary",
                                            isActive(link.href)
                                                ? "text-primary underline underline-offset-4"
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                ))}

                                <div className="flex items-center gap-4 mt-6">
                                    <DeepLink
                                        href={social.instagram}
                                        ariaLabel="Instagram"
                                        title="Instagram"
                                        className="text-muted-foreground hover:text-[#E1306C] transition-colors"
                                    >
                                        Instagram
                                    </DeepLink>
                                    <DeepLink
                                        href={social.pinterest}
                                        ariaLabel="Pinterest"
                                        title="Pinterest"
                                        className="text-muted-foreground hover:text-[#BD081C] transition-colors"
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
