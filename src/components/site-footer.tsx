import Link from "next/link"
import { DeepLink } from "@/components/deep-link"
import { FaInstagram, FaPinterest } from "react-icons/fa"

export function SiteFooter() {
    return (
        <footer role="contentinfo" className="border-t bg-background">
            <div className="container grid gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-3">
                {/* О проекте */}
                <div>
                    <div className="font-bold text-lg">renohacks.com</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Renohacks — блог о ремонте и строительстве. Фото-гайды, сметы,
                        лайфхаки и обзоры материалов для дома.
                    </p>
                </div>

                {/* Разделы */}
                <nav aria-label="Footer navigation">
                    <div className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Разделы
                    </div>
                    <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                        <li>
                            <Link
                                href="/tags/kitchen"
                                title="Ремонт кухни"
                                className="hover:text-foreground hover:underline transition"
                            >
                                Кухня
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/tags/bathroom"
                                title="Ремонт ванной комнаты"
                                className="hover:text-foreground hover:underline transition"
                            >
                                Ванная
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/tags/floor"
                                title="Отделка полов"
                                className="hover:text-foreground hover:underline transition"
                            >
                                Полы
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/tags/walls"
                                title="Дизайн и отделка стен"
                                className="hover:text-foreground hover:underline transition"
                            >
                                Стены
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Контакты */}
                <div>
                    <div className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Контакты
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">
                        Есть идеи или вопросы? Напишите нам:
                    </p>
                    <p className="mt-2 text-sm">
                        <a
                            href="mailto:info@renohacks.com"
                            aria-label="Написать на info@renohacks.com"
                            title="Связаться с renohacks.com"
                            className="hover:underline"
                            rel="noopener noreferrer"
                        >
                            info@renohacks.com
                        </a>
                    </p>
                    <div className="mt-3 flex gap-6">
                        <DeepLink
                            appUrl="instagram://user?username=reno.hacks"
                            webUrl="https://www.instagram.com/reno.hacks"
                            ariaLabel="Instagram"
                            title="Instagram"
                            analyticsEvent="instagram_click_footer"
                            location="footer"
                            className="flex items-center gap-2 text-muted-foreground hover:text-[#E1306C] transition"
                        >
                            <FaInstagram size={18} /> Instagram
                        </DeepLink>
                        <DeepLink
                            appUrl="pinterest://www.pinterest.com/RenoHacks/"
                            webUrl="https://www.pinterest.com/RenoHacks/"
                            ariaLabel="Pinterest"
                            title="Pinterest"
                            analyticsEvent="pinterest_click_footer"
                            location="footer"
                            className="flex items-center gap-2 text-muted-foreground hover:text-[#BD081C] transition"
                        >
                            <FaPinterest size={18} /> Pinterest
                        </DeepLink>
                    </div>
                </div>
            </div>

            {/* Нижняя часть */}
            <div className="border-t px-4 py-4 text-center text-xs text-muted-foreground">
                © {new Date().getFullYear()} renohacks.com. Все права защищены.
            </div>
        </footer>
    )
}
