import Link from "next/link"

export function SiteFooter() {
    return (
        <footer role="contentinfo" className="border-t bg-background">
            <div className="container grid gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-3">
                {/* О проекте */}
                <div>
                    <div className="font-bold text-lg">renohacks.com</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Гайды, сметы, лайфхаки и обзоры материалов для дома и ремонта.
                    </p>
                </div>

                {/* Разделы */}
                <nav aria-label="Footer navigation">
                    <div className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Разделы
                    </div>
                    <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                        <li>
                            <Link href="/tags/kitchen" className="hover:text-foreground hover:underline transition">
                                Кухня
                            </Link>
                        </li>
                        <li>
                            <Link href="/tags/bathroom" className="hover:text-foreground hover:underline transition">
                                Ванная
                            </Link>
                        </li>
                        <li>
                            <Link href="/tags/floor" className="hover:text-foreground hover:underline transition">
                                Полы
                            </Link>
                        </li>
                        <li>
                            <Link href="/tags/walls" className="hover:text-foreground hover:underline transition">
                                Стены
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Подписка */}
                <div>
                    <div className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Подписка
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">
                        Скоро: email-рассылка и Telegram.
                    </p>
                    <p className="mt-2 text-sm">
                        <Link href="mailto:info@renohacks.com" className="hover:underline">
                            info@renohacks.com
                        </Link>
                    </p>
                </div>
            </div>

            {/* Нижняя часть */}
            <div className="border-t px-4 py-4 text-center text-xs text-muted-foreground">
                © {new Date().getFullYear()} renohacks.com. Все права защищены.
            </div>
        </footer>
    )
}
