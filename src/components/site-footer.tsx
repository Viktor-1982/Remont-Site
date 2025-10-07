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
        <footer role="contentinfo" className="border-t bg-background">
            <div className="container grid gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-3">
                {/* 📝 О проекте */}
                <section aria-labelledby="footer-about">
                    <h2 id="footer-about" className="font-bold text-lg">
                        renohacks.com
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">{footer.about}</p>
                </section>

                {/* 📂 Разделы */}
                <nav aria-labelledby="footer-sections">
                    <h2
                        id="footer-sections"
                        className="text-sm font-semibold uppercase tracking-wide text-muted-foreground"
                    >
                        {footer.sectionsTitle}
                    </h2>
                    <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
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
                        className="text-sm font-semibold uppercase tracking-wide text-muted-foreground"
                    >
                        {footer.contactsTitle}
                    </h2>
                    <p className="mt-3 text-sm text-muted-foreground">{footer.contactsText}</p>
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
                            className="flex items-center gap-2 text-muted-foreground hover:text-[#E1306C] transition"
                        >
                            <FaInstagram size={18} aria-hidden="true" />
                            <span className="sr-only">Instagram</span>
                        </DeepLink>

                        <DeepLink
                            href={social.pinterest}
                            ariaLabel="Pinterest"
                            analyticsEvent="click_pinterest_footer"
                            location="footer"
                            className="flex items-center gap-2 text-muted-foreground hover:text-[#BD081C] transition"
                        >
                            <FaPinterest size={18} aria-hidden="true" />
                            <span className="sr-only">Pinterest</span>
                        </DeepLink>
                    </div>
                </section>
            </div>

            {/* 🔻 Нижняя часть */}
            <div className="border-t px-4 py-4 text-center text-xs text-muted-foreground flex items-center justify-center gap-4 flex-wrap">
                <span>{footer.rights}</span>
                <LanguageSwitcher />
            </div>
        </footer>
    )
}
