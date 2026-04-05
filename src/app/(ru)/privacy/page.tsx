import { getPageMetadata } from "@/lib/seo"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Cookie, BarChart3, Megaphone, Lock, Mail } from "lucide-react"
import Script from "next/script"

export const metadata = getPageMetadata("/privacy", {
    title: "Политика конфиденциальности | Renohacks",
    description:
        "Политика конфиденциальности Renohacks.com: данные подписки, cookies, аналитика и управление согласием.",
    cover: "/images/og-default.png",
    type: "article",
})

const baseUrl = "https://renohacks.com"

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "Главная",
            item: `${baseUrl}/`,
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "Политика конфиденциальности",
            item: `${baseUrl}/privacy`,
        },
    ],
}

export default function PrivacyPage() {
    return (
        <main className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
            <div className="mb-12 text-center">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 dark:bg-primary/20">
                    <Shield className="h-8 w-8 text-primary" />
                </div>
                <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                    Политика конфиденциальности
                </h1>
                <p className="text-muted-foreground">
                    Последнее обновление:{" "}
                    {new Date().toLocaleDateString("ru-RU", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
            </div>

            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">1. Введение</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="leading-relaxed text-muted-foreground">
                            Эта Политика конфиденциальности описывает, как{" "}
                            <strong>renohacks.com</strong> собирает, использует и
                            защищает информацию посетителей сайта.
                        </p>
                        <p className="leading-relaxed text-muted-foreground">
                            Используя сайт, вы соглашаетесь с условиями этой Политики
                            конфиденциальности.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Lock className="h-6 w-6 text-primary" />
                            <CardTitle className="text-2xl">
                                2. Какие персональные данные мы собираем
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="leading-relaxed text-muted-foreground">
                            Мы собираем минимальный набор персональных данных только для
                            работы email-подписки:
                        </p>
                        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                            <li>
                                <strong>Email-адрес</strong> — собирается только при
                                добровольной подписке через форму
                            </li>
                            <li>
                                <strong>Направление рассылки</strong> — используется,
                                чтобы отправлять выбранный тип писем: планирование и
                                бюджет, идеи и тренды или ошибки и гайды
                            </li>
                            <li>
                                <strong>Язык интерфейса</strong> (ru/en) — используется
                                для отправки писем на нужном языке
                            </li>
                            <li>
                                <strong>Дата подписки</strong> — используется для
                                управления подпиской
                            </li>
                        </ul>
                        <p className="leading-relaxed text-muted-foreground">
                            Мы не собираем через сайт платежные данные, почтовые адреса
                            или пользовательские профили.
                        </p>
                        <p className="leading-relaxed text-muted-foreground">
                            Email-адреса подписчиков хранятся в Supabase и используются
                            только для писем, связанных с подпиской. Отписаться можно в
                            любой момент по ссылке в письме или написав нам на{" "}
                            <a
                                href="mailto:vles8878@gmail.com"
                                className="text-primary hover:underline"
                            >
                                vles8878@gmail.com
                            </a>
                            .
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Cookie className="h-6 w-6 text-primary" />
                            <CardTitle className="text-2xl">3. Cookies и local storage</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="leading-relaxed text-muted-foreground">
                            Сайт использует cookies и local storage для следующих задач:
                        </p>

                        <div className="mt-4 space-y-4">
                            <div className="rounded-lg border bg-muted/50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5 text-primary" />
                                    <h3 className="font-semibold">Аналитика и метрики</h3>
                                </div>
                                <ul className="ml-7 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                                    <li>
                                        <strong>Yandex.Metrika</strong> — статистика
                                        посещений, поведение пользователей и технические
                                        метрики
                                    </li>
                                    <li>
                                        <strong>Google Analytics</strong> (через Google Tag
                                        Manager) — анализ трафика и эффективности контента
                                    </li>
                                </ul>
                                <p className="ml-7 mt-2 text-sm text-muted-foreground">
                                    Эти сервисы собирают агрегированные или частично
                                    анонимизированные данные, например тип устройства,
                                    браузер, посещенные страницы и время на сайте.
                                </p>
                            </div>

                            <div className="rounded-lg border bg-muted/50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <Megaphone className="h-5 w-5 text-primary" />
                                    <h3 className="font-semibold">Реклама</h3>
                                </div>
                                <ul className="ml-7 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                                    <li>
                                        <strong>Google AdSense</strong> — показ релевантной
                                        рекламы
                                    </li>
                                </ul>
                                <p className="ml-7 mt-2 text-sm text-muted-foreground">
                                    AdSense использует cookies для персонализации рекламы
                                    и измерения ее эффективности. Мы используем Google
                                    Consent Mode, чтобы учитывать выбор пользователя.
                                </p>
                            </div>

                            <div className="rounded-lg border bg-muted/50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <Mail className="h-5 w-5 text-primary" />
                                    <h3 className="font-semibold">Email-подписка</h3>
                                </div>
                                <ul className="ml-7 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                                    <li>
                                        <strong>Функциональное хранилище</strong> — язык
                                        интерфейса, выбранное направление писем, статус
                                        подписки и защита от повторной подписки
                                    </li>
                                </ul>
                                <p className="ml-7 mt-2 text-sm text-muted-foreground">
                                    Эти данные нужны для работы формы подписки и не
                                    используются для рекламного таргетинга.
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4 dark:bg-primary/10">
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                <strong>Управление cookies:</strong> при первом посещении
                                баннер позволяет принять или отклонить аналитические и
                                рекламные cookies. Чтобы изменить этот выбор позже,
                                очистите данные сайта в браузере и перезагрузите страницу.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">4. Сторонние сервисы</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="leading-relaxed text-muted-foreground">
                            Сайт использует следующие сторонние сервисы:
                        </p>
                        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                            <li>
                                <strong>Yandex.Metrika</strong> —{" "}
                                <a
                                    href="https://yandex.ru/legal/confidential/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    Политика конфиденциальности Yandex
                                </a>
                            </li>
                            <li>
                                <strong>Google Analytics / Google Tag Manager</strong> —{" "}
                                <a
                                    href="https://policies.google.com/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    Политика конфиденциальности Google
                                </a>
                            </li>
                            <li>
                                <strong>Google AdSense</strong> —{" "}
                                <a
                                    href="https://policies.google.com/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    Политика конфиденциальности Google
                                </a>
                            </li>
                            <li>
                                <strong>Resend</strong> — сервис доставки email-рассылки (
                                <a
                                    href="https://resend.com/legal/privacy-policy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    Политика конфиденциальности Resend
                                </a>
                                )
                            </li>
                            <li>
                                <strong>Supabase</strong> — безопасное хранение данных
                                подписки (
                                <a
                                    href="https://supabase.com/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    Политика конфиденциальности Supabase
                                </a>
                                )
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">5. Безопасность данных</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="leading-relaxed text-muted-foreground">
                            Мы храним email-адреса подписчиков и связанную с подпиской
                            техническую информацию только в объеме, необходимом для
                            работы подписки.
                        </p>
                        <p className="leading-relaxed text-muted-foreground">
                            Мы применяем стандартные технические и организационные меры,
                            чтобы снизить риск несанкционированного доступа к этим данным.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">6. Ваши права</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="leading-relaxed text-muted-foreground">
                            В зависимости от вашей юрисдикции вы можете:
                        </p>
                        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                            <li>
                                Принять или отклонить аналитические и рекламные cookies при
                                первом посещении
                            </li>
                            <li>
                                Изменить этот выбор позже, очистив данные сайта в браузере
                                и снова открыв страницу
                            </li>
                            <li>
                                Запросить удаление данных email-подписки через ссылку
                                отписки или по email
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">7. Изменения в политике</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="leading-relaxed text-muted-foreground">
                            Мы можем обновлять эту Политику конфиденциальности. Дата
                            последнего обновления указана в начале страницы.
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-primary/20 bg-primary/5 dark:bg-primary/10">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Mail className="h-6 w-6 text-primary" />
                            <CardTitle className="text-2xl">8. Контакты</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-muted-foreground">
                            Если у вас есть вопросы по этой Политике конфиденциальности,
                            напишите нам:
                        </p>
                        <a
                            href="mailto:vles8878@gmail.com"
                            className="inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary/80"
                        >
                            <Mail className="h-4 w-4" />
                            vles8878@gmail.com
                        </a>
                    </CardContent>
                </Card>
            </div>

            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
        </main>
    )
}
