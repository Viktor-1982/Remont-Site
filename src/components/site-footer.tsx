import Link from "next/link"

export function SiteFooter() {
    const openPinterest = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        window.location.href = "pinterest://www.pinterest.com/RenoHacks/"
        setTimeout(() => {
            window.open("https://www.pinterest.com/RenoHacks/", "_blank")
        }, 500)
    }

    const openInstagram = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        window.location.href = "instagram://user?username=reno.hacks"
        setTimeout(() => {
            window.open("https://www.instagram.com/reno.hacks", "_blank")
        }, 500)
    }

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
                        Вопросы и предложения: пишите нам на почту.
                    </p>
                    <p className="mt-2 text-sm">
                        <a
                            href="mailto:info@renohacks.com"
                            aria-label="Написать на info@renohacks.com"
                            title="Связаться с renohacks.com"
                            className="hover:underline"
                        >
                            info@renohacks.com
                        </a>
                    </p>
                    <div className="mt-3 flex gap-4">
                        <a
                            href="instagram://user?username=reno.hacks"
                            onClick={openInstagram}
                            aria-label="Instagram"
                            title="Наш Instagram"
                            className="text-muted-foreground hover:text-[#E1306C] transition"
                        >
                            Instagram
                        </a>
                        <a
                            href="pinterest://www.pinterest.com/RenoHacks/"
                            onClick={openPinterest}
                            aria-label="Pinterest"
                            title="Наш Pinterest"
                            className="text-muted-foreground hover:text-[#BD081C] transition"
                        >
                            Pinterest
                        </a>
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
