"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Hammer, Menu, X, Instagram } from "lucide-react"
import { FaPinterest } from "react-icons/fa"
import { cn } from "@/lib/utils"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { DeepLink } from "@/components/deep-link"
import { LanguageSwitcher } from "@/components/language-switcher"
import navData, { Locale } from "@/types/nav"

export function SiteHeader() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname() || "/"

    // ✅ блокировка скролла при открытом меню
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden")
        } else {
            document.body.classList.remove("overflow-hidden")
        }
        return () => {
            document.body.classList.remove("overflow-hidden")
        }
    }, [isOpen])

    // ✅ определяем язык
    const isEnglish = pathname.startsWith("/en") || pathname.endsWith("-en")
    const locale: Locale = isEnglish ? "en" : "ru"
    const { navLabels, links, social, header: h } = navData[locale]

    // 🔹 Проверка активной ссылки
    const isActive = (href: string) => {
        const cleanPath = pathname.replace(/\/$/, "")
        const cleanHref = href.replace(/\/$/, "")
        return cleanPath === cleanHref || cleanPath.startsWith(cleanHref + "/")
    }

    // 🔹 Функция для корректного href
    const localizeHref = (href: string) => {
        if (isEnglish) {
            return href.startsWith("/en") ? href : "/en" + href
        } else {
            return href.replace(/^\/en/, "")
        }
    }

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full border-b shadow-sm transition-all duration-300",
                "bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
                "will-change-transform"
            )}
        >
            <div className="mx-auto flex min-h-[64px] items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* 🏠 Логотип */}
                <Link
                    href={isEnglish ? "/en" : "/"}
                    className="flex items-center gap-2 font-bold text-lg hover:scale-105 transition-transform"
                    aria-label={isEnglish ? "Go to homepage" : "Перейти на главную"}
                >
                    <Hammer className="h-6 w-6 text-primary" aria-hidden="true" />
                    <span>
            renohacks.com
            <span className="sr-only">
              {isEnglish
                  ? " — renovation and construction blog"
                  : " — блог о ремонте и строительстве"}
            </span>
          </span>
                </Link>

                {/* 📂 Навигация (desktop) */}
                <nav aria-label={navLabels.desktop} className="hidden md:flex gap-6">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={localizeHref(link.href)}
                            title={link.title}
                            aria-current={isActive(localizeHref(link.href)) ? "page" : undefined}
                            className={cn(
                                "text-sm hover:text-foreground hover:underline underline-offset-4 transition",
                                isActive(localizeHref(link.href))
                                    ? "text-primary font-semibold"
                                    : "text-muted-foreground"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* 🔧 Правая часть */}
                <div className="flex items-center gap-2 flex-nowrap">
                    {/* 🌍 Переключатель языка */}
                    <LanguageSwitcher />

                    {/* 🌍 Соцсети (desktop) */}
                    <div className="hidden sm:flex items-center gap-3" aria-label={h.socialLabel}>
                        <DeepLink
                            appUrl="instagram://user?username=reno.hacks"
                            webUrl="https://www.instagram.com/reno.hacks"
                            ariaLabel="Instagram"
                            title={social.instagram}
                            analyticsEvent="instagram_click"
                            location="header"
                            className="text-muted-foreground hover:text-[#E1306C] transition"
                        >
                            <Instagram className="h-5 w-5" aria-hidden="true" />
                            <span className="sr-only">Instagram</span>
                        </DeepLink>
                        <DeepLink
                            appUrl="pinterest://www.pinterest.com/RenoHacks/"
                            webUrl="https://www.pinterest.com/RenoHacks/"
                            ariaLabel="Pinterest"
                            title={social.pinterest}
                            analyticsEvent="pinterest_click"
                            location="header"
                            className="text-muted-foreground hover:text-[#BD081C] transition"
                        >
                            <FaPinterest className="h-5 w-5" aria-hidden="true" />
                            <span className="sr-only">Pinterest</span>
                        </DeepLink>
                    </div>

                    {/* 🌗 Переключатель темы */}
                    <ThemeSwitcher />

                    {/* 🍔 Бургер (mob) */}
                    <button
                        className="md:hidden p-2 rounded hover:bg-muted transition"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? h.ariaMenuClose : h.ariaMenuOpen}
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                    >
                        {isOpen ? (
                            <X className="h-6 w-6" aria-hidden="true" />
                        ) : (
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>

            {/* 📱 Мобильное меню */}
            <div
                id="mobile-menu"
                className={cn(
                    "absolute top-[64px] left-0 right-0 border-t bg-background/95 backdrop-blur md:hidden shadow-lg overflow-hidden transform transition-all duration-300",
                    isOpen ? "max-h-[90vh] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"
                )}
            >
                <nav aria-label={navLabels.mobile} className="flex flex-col divide-y">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={localizeHref(link.href)}
                            title={link.title}
                            aria-current={isActive(localizeHref(link.href)) ? "page" : undefined}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "px-4 py-3 text-base transition hover:bg-muted",
                                isActive(localizeHref(link.href))
                                    ? "text-primary font-semibold"
                                    : "text-foreground"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* 🌍 Переключатель языка (mob) */}
                    <div className="px-4 py-3">
                        <LanguageSwitcher />
                    </div>

                    {/* 🌗 Переключатель темы (mob) */}
                    <div className="px-4 py-3">
                        <ThemeSwitcher />
                    </div>

                    {/* 📱 Соцсети (mob) */}
                    <div className="flex justify-center gap-6 py-4">
                        <DeepLink
                            appUrl="instagram://user?username=reno.hacks"
                            webUrl="https://www.instagram.com/reno.hacks"
                            ariaLabel="Instagram"
                            title={social.instagram}
                            analyticsEvent="instagram_click"
                            location="header_mobile"
                            className="text-muted-foreground hover:text-[#E1306C] transition"
                        >
                            <Instagram className="h-6 w-6" aria-hidden="true" />
                            <span className="sr-only">Instagram</span>
                        </DeepLink>
                        <DeepLink
                            appUrl="pinterest://www.pinterest.com/RenoHacks/"
                            webUrl="https://www.pinterest.com/RenoHacks/"
                            ariaLabel="Pinterest"
                            title={social.pinterest}
                            analyticsEvent="pinterest_click"
                            location="header_mobile"
                            className="text-muted-foreground hover:text-[#BD081C] transition"
                        >
                            <FaPinterest className="h-6 w-6" aria-hidden="true" />
                            <span className="sr-only">Pinterest</span>
                        </DeepLink>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default SiteHeader
