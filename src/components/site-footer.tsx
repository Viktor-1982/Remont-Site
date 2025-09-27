import Link from "next/link"

export function SiteFooter() {
    return (
        <footer role="contentinfo" className="border-t bg-background">
            <div className="container grid gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-3">
                {/* О проекте */}
                <div>
                    <div className="font-bold text-lg">renohacks.com</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Renohacks — блог о ремонте и строительстве. Фото-гайды, сметы, лайфхаки и обзоры материалов для дома.
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

                {/* Подписка / Контакты */}
                <div>
                    <div className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Контакты
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">
                        Вопросы и предложения: пишите нам на почту.
                    </p>
                    <p className="mt-2 text-sm">
                        <Link
                            href="mailto:info@renohacks.com"
                            aria-label="Написать на info@renohacks.com"
                            title="Связаться с renohacks.com"
                            className="hover:underline"
                        >
                            info@renohacks.com
                        </Link>
                    </p>
                    <div className="mt-3 flex gap-4">
                        <Link
                            href="https://www.instagram.com/reno.hacks"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            title="Наш Instagram"
                            className="text-muted-foreground hover:text-[#E1306C] transition"
                        >
                            Instagram
                        </Link>
                        <Link
                            href="https://pinterest.com/RenoHacks"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Pinterest"
                            title="Наш Pinterest"
                            className="text-muted-foreground hover:text-[#BD081C] transition"
                        >
                            Pinterest
                        </Link>
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
