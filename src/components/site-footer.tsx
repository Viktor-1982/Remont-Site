import Link from "next/link"

export function SiteFooter() {
    return (
        <footer className="border-t bg-background">
            <div className="container grid gap-6 px-4 py-10 sm:grid-cols-2 md:grid-cols-3">
                {/* О проекте */}
                <div>
                    <div className="font-semibold">renohacks.com</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Гайды, сметы, лайфхаки и обзоры материалов.
                    </p>
                </div>

                {/* Разделы */}
                <nav aria-label="Footer navigation">
                    <div className="font-medium">Разделы</div>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <li>
                            <Link href="/tags/kitchen" className="hover:text-foreground transition">
                                Кухня
                            </Link>
                        </li>
                        <li>
                            <Link href="/tags/bathroom" className="hover:text-foreground transition">
                                Ванная
                            </Link>
                        </li>
                        <li>
                            <Link href="/tags/floor" className="hover:text-foreground transition">
                                Полы
                            </Link>
                        </li>
                        <li>
                            <Link href="/tags/walls" className="hover:text-foreground transition">
                                Стены
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Подписка */}
                <div>
                    <div className="font-medium">Подписка</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Скоро: email-рассылка и Telegram.
                    </p>
                </div>
            </div>

            {/* Нижняя часть */}
            <div className="border-t px-4 py-4 text-center text-xs text-muted-foreground">
                © {new Date().getFullYear()} <address className="inline not-italic">PRO ремонт</address>
            </div>
        </footer>
    )
}
