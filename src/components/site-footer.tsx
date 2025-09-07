export function SiteFooter() {
    return (
        <footer className="border-t bg-background">
            <div className="container grid gap-6 px-4 py-10 md:grid-cols-3">
                <div>
                    <div className="font-semibold">PRO ремонт</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Гайды, лайфхаки и обзоры материалов.
                    </p>
                </div>

                <div>
                    <div className="font-medium">Разделы</div>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <li>Кухня</li>
                        <li>Ванная</li>
                        <li>Полы</li>
                        <li>Стены</li>
                    </ul>
                </div>

                <div>
                    <div className="font-medium">Подписка</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Скоро: email-рассылка и Telegram.
                    </p>
                </div>
            </div>

            <div className="border-t px-4 py-4 text-center text-xs text-muted-foreground">
                © {new Date().getFullYear()} PRO ремонт
            </div>
        </footer>
    )
}
