import { getPageMetadata } from "@/lib/seo"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Cookie, BarChart3, Megaphone, Lock, Mail } from "lucide-react"

export const metadata = getPageMetadata("/privacy", {
    title: "Политика конфиденциальности | Renohacks",
    description:
        "Политика конфиденциальности Renohacks.com. Информация о сборе и использовании данных, куки и защите персональной информации.",
    cover: "/images/og-default.png",
    type: "article",
})

export default function PrivacyPage() {
    return (
        <main className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
            <div className="mb-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 dark:bg-primary/20 mb-6">
                    <Shield className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Политика конфиденциальности</h1>
                <p className="text-muted-foreground">Последнее обновление: {new Date().toLocaleDateString("ru-RU", { year: "numeric", month: "long", day: "numeric" })}</p>
            </div>

            <div className="space-y-8">
                {/* Введение */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">1. Введение</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                            Настоящая Политика конфиденциальности описывает, как <strong>renohacks.com</strong> (далее — «Сайт», «мы», «нас») 
                            собирает, использует и защищает информацию посетителей сайта.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Используя наш сайт, вы соглашаетесь с условиями настоящей Политики конфиденциальности.
                        </p>
                    </CardContent>
                </Card>

                {/* Сбор данных */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Lock className="w-6 h-6 text-primary" />
                            <CardTitle className="text-2xl">2. Сбор персональных данных</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                            <strong>Важно:</strong> Наш сайт <strong>не собирает персональные данные</strong> пользователей.
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li>На сайте <strong>нет регистрации</strong> и системы аккаунтов</li>
                            <li>Мы <strong>не запрашиваем</strong> имя, email, телефон или другие персональные данные</li>
                            <li>Мы <strong>не храним</strong> персональную информацию пользователей</li>
                            <li>На сайте <strong>нет админ-панели</strong> для пользователей</li>
                        </ul>
                        <p className="text-muted-foreground leading-relaxed">
                            Единственный способ связаться с нами — отправить email на <a href="mailto:info@renohacks.com" className="text-primary hover:underline">info@renohacks.com</a>, 
                            но мы не храним эти сообщения на сервере сайта.
                        </p>
                    </CardContent>
                </Card>

                {/* Куки */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Cookie className="w-6 h-6 text-primary" />
                            <CardTitle className="text-2xl">3. Использование куки (Cookies)</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                            Наш сайт использует куки для следующих целей:
                        </p>

                        <div className="space-y-4 mt-4">
                            <div className="p-4 rounded-lg bg-muted/50 border">
                                <div className="flex items-center gap-2 mb-2">
                                    <BarChart3 className="w-5 h-5 text-primary" />
                                    <h3 className="font-semibold">Аналитика и метрика</h3>
                                </div>
                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-7">
                                    <li><strong>Yandex.Metrika</strong> — для сбора статистики посещений, поведения пользователей и технических метрик</li>
                                    <li><strong>Google Analytics</strong> (через Google Tag Manager) — для анализа трафика и эффективности контента</li>
                                </ul>
                                <p className="text-sm text-muted-foreground mt-2 ml-7">
                                    Эти сервисы собирают анонимные данные: IP-адрес (частично), тип устройства, браузер, страницы посещения, время на сайте.
                                </p>
                            </div>

                            <div className="p-4 rounded-lg bg-muted/50 border">
                                <div className="flex items-center gap-2 mb-2">
                                    <Megaphone className="w-5 h-5 text-primary" />
                                    <h3 className="font-semibold">Реклама</h3>
                                </div>
                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-7">
                                    <li><strong>Google AdSense</strong> — для показа релевантной рекламы</li>
                                </ul>
                                <p className="text-sm text-muted-foreground mt-2 ml-7">
                                    AdSense использует куки для персонализации рекламы и измерения эффективности объявлений. 
                                    Мы используем <strong>Google Consent Mode</strong> для соблюдения требований GDPR/EEA.
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 p-4 rounded-lg bg-primary/5 dark:bg-primary/10 border border-primary/20">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                <strong>Управление куки:</strong> Вы можете управлять настройками куки через баннер согласия, 
                                который появляется при первом посещении сайта. Вы можете принять все куки, отклонить их или настроить индивидуально.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Третьи стороны */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">4. Сервисы третьих сторон</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                            Наш сайт использует следующие сервисы третьих сторон:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><strong>Yandex.Metrika</strong> — <a href="https://yandex.ru/legal/confidential/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Политика конфиденциальности Yandex</a></li>
                            <li><strong>Google Analytics / Google Tag Manager</strong> — <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Политика конфиденциальности Google</a></li>
                            <li><strong>Google AdSense</strong> — <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Политика конфиденциальности Google</a></li>
                        </ul>
                        <p className="text-muted-foreground leading-relaxed">
                            Эти сервисы имеют собственные политики конфиденциальности и условия использования. 
                            Мы рекомендуем ознакомиться с ними.
                        </p>
                    </CardContent>
                </Card>

                {/* Безопасность */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">5. Безопасность данных</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                            Поскольку мы не собираем и не храним персональные данные пользователей, 
                            риски утечки персональной информации минимальны.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Мы используем стандартные меры безопасности для защиты сайта от несанкционированного доступа.
                        </p>
                    </CardContent>
                </Card>

                {/* Права пользователей */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">6. Ваши права (GDPR/CCPA)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                            В соответствии с GDPR (для пользователей из EEA) и CCPA (для пользователей из Калифорнии), вы имеете право:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li>Управлять настройками куки через баннер согласия</li>
                            <li>Отозвать согласие на использование куки в любое время</li>
                            <li>Очистить куки через настройки браузера</li>
                        </ul>
                        <p className="text-muted-foreground leading-relaxed">
                            Поскольку мы не храним персональные данные, запросы на удаление данных не применимы.
                        </p>
                    </CardContent>
                </Card>

                {/* Изменения */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">7. Изменения в Политике конфиденциальности</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                            Мы оставляем за собой право обновлять настоящую Политику конфиденциальности. 
                            Дата последнего обновления указана в начале документа.
                        </p>
                    </CardContent>
                </Card>

                {/* Контакты */}
                <Card className="bg-primary/5 dark:bg-primary/10 border-primary/20">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Mail className="w-6 h-6 text-primary" />
                            <CardTitle className="text-2xl">8. Контакты</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Если у вас есть вопросы о настоящей Политике конфиденциальности, свяжитесь с нами:
                        </p>
                        <a
                            href="mailto:info@renohacks.com"
                            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                        >
                            <Mail className="w-4 h-4" />
                            info@renohacks.com
                        </a>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}

