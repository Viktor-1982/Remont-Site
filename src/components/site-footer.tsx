"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { DeepLink } from "@/components/deep-link"
import { FaInstagram, FaPinterest } from "react-icons/fa"
import { LanguageSwitcher } from "@/components/language-switcher"
import navData from "@/types/nav" // ✅ типизированный импорт
import type { NavData, Locale } from "@/types/nav"

export function SiteFooter() {
    const pathname = usePathname()
    const isEnglish = pathname.startsWith("/en")
    const locale: Locale = isEnglish ? "en" : "ru"
    const { footer, social } = (navData as NavData)[locale]

    // 🔹 Локализованный href
    const localizeHref = (href: string) =>
        isEnglish ? (href.startsWith("/en") ? href : `/en${href}`) : href.replace(/^\/en/, "")

    return (
        <footer
            role="contentinfo"
            className="relative mt-20 border-t border-border/50 bg-gradient-to-b from-background via-background to-muted/20 text-sm text-muted-foreground"
        >
            <div className="pointer-events-none absolute inset-0 opacity-30 dark:opacity-20" aria-hidden>
                <div className="h-40 w-40 rounded-full bg-primary/20 blur-3xl absolute -top-10 left-10" />
                <div className="h-48 w-48 rounded-full bg-accent/15 blur-3xl absolute bottom-0 right-10" />
            </div>

            <div className="relative w-full">
                <div className="w-full grid gap-8 px-4 py-12 sm:px-6 md:px-8 lg:px-12 sm:grid-cols-2 md:grid-cols-3 border-b border-border/40 bg-card/80 dark:bg-card/70 backdrop-blur-sm shadow-soft">
                {/* 📝 О проекте */}
                <section aria-labelledby="footer-about">
                    <h2 id="footer-about" className="font-bold text-lg text-foreground">
                        renohacks.com
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground/90">{footer.about}</p>
                </section>

                {/* 📂 Разделы */}
                <nav aria-labelledby="footer-sections">
                    <h2
                        id="footer-sections"
                        className="text-sm font-semibold uppercase tracking-wide text-foreground/90"
                    >
                        {footer.sectionsTitle}
                    </h2>
                    <ul className="mt-3 space-y-1 text-sm text-muted-foreground/90">
                        {Object.values(footer.sections).map((section) => (
                            <li key={section.href}>
                                <Link
                                    href={localizeHref(section.href)}
                                    title={section.title}
                                    className="hover:text-foreground hover:underline transition"
                                >
                                    {section.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* 📞 Контакты */}
                <section aria-labelledby="footer-contacts">
                    <h2
                        id="footer-contacts"
                        className="text-sm font-semibold uppercase tracking-wide text-foreground/90"
                    >
                        {footer.contactsTitle}
                    </h2>
                    <p className="mt-3 text-sm text-muted-foreground/90">{footer.contactsText}</p>
                    <p className="mt-2 text-sm">
                        <a
                            href="mailto:info@renohacks.com"
                            aria-label="Email info@renohacks.com"
                            title="info@renohacks.com"
                            className="hover:underline"
                        >
                            info@renohacks.com
                        </a>
                    </p>

                    {/* 🔗 Соцсети (та же логика, что в Header) */}
                    <div className="mt-3 flex gap-6" aria-label={footer.socialLabel}>
                        <DeepLink
                            href={social.instagram}
                            ariaLabel="Instagram"
                            analyticsEvent="click_instagram_footer"
                            location="footer"
                            className="flex items-center gap-2 text-muted-foreground/90 hover:text-[#E1306C] transition"
                        >
                            <FaInstagram size={18} aria-hidden="true" />
                            <span className="sr-only">Instagram</span>
                        </DeepLink>

                        <DeepLink
                            href={social.pinterest}
                            ariaLabel="Pinterest"
                            analyticsEvent="click_pinterest_footer"
                            location="footer"
                            className="flex items-center gap-2 text-muted-foreground/90 hover:text-[#BD081C] transition"
                        >
                            <FaPinterest size={18} aria-hidden="true" />
                            <span className="sr-only">Pinterest</span>
                        </DeepLink>
                    </div>
                </section>
                </div>
            </div>

            {/* 🔻 Нижняя часть */}
            <div className="relative w-full border-t border-border/40 bg-card/60 dark:bg-card/50 backdrop-blur-sm">
                <div className="flex w-full flex-wrap items-center justify-center gap-4 px-4 py-6 text-center text-xs text-foreground/70">
                <span>{footer.rights}</span>
                    <Link 
                        href={isEnglish ? "/en/privacy" : "/privacy"}
                        className="hover:underline hover:text-foreground transition"
                    >
                        {isEnglish ? "Privacy Policy" : "Конфиденциальность"}
                    </Link>
                <Link 
                    href={isEnglish ? "/en/terms" : "/terms"}
                    className="hover:underline hover:text-foreground transition"
                >
                    {isEnglish ? "Terms of Use" : "Правила пользования"}
                </Link>
                <LanguageSwitcher />
                <span className="text-muted-foreground">
                    {isEnglish ? "Designed by " : "Разработано "}
                    <Link
                        href={isEnglish ? "/en/developer" : "/developer"}
                        className="hover:underline hover:text-foreground transition"
                    >
                        ViktorWebStudio
                    </Link>
                </span>
                </div>
            </div>
        </footer>
    )
}
