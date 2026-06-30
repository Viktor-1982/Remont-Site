import { getPageMetadata } from "@/lib/seo"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, CheckCircle, XCircle, Shield, Scale, Mail, Home, Heart, Lightbulb, Users } from "lucide-react"
import Script from "next/script"

export const metadata = getPageMetadata("/ru/terms", {
  title: "Правила пользования сайтом | Renohacks",
  description:
    "Правила и условия использования Renohacks.com. Что можно и нельзя делать на сайте, как мы относимся к конфиденциальности и где проходят границы нашей ответственности.",
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
      name: "Правила пользования",
      item: `${baseUrl}/terms`,
    },
  ],
}

export default function TermsOfUsePage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-12 md:py-20">
      <div className="mb-12 text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 dark:bg-primary/20">
          <FileText className="h-10 w-10 text-primary" />
        </div>
        <h1 className="mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
          Правила пользования сайтом
        </h1>
        <p className="text-lg text-muted-foreground">Условия использования Renohacks.com</p>
      </div>

      <div className="space-y-8">
        <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 shadow-xl dark:to-primary/10">
          <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
          <CardHeader className="relative z-10">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 shadow-lg">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">О сайте</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <p className="text-base leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Renohacks.com</strong> — это блог о ремонте, дизайне интерьера и DIY-проектах.
              Мы публикуем практические советы, пошаговые инструкции, калькуляторы и подборки идей, которые помогают
              планировать ремонт спокойнее и принимать более взвешенные решения.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-500/20 bg-gradient-to-br from-card to-green-500/5 shadow-lg dark:to-green-500/10">
          <CardHeader>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/10 shadow-lg">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl font-bold">Что можно делать</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
                <span className="text-2xl">📖</span>
                Использование контента
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                  <span>
                    <strong className="text-foreground">Читать статьи</strong> и инструкции для личного использования
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                  <span>
                    <strong className="text-foreground">Использовать калькуляторы</strong> для планирования ремонта
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                  <span>
                    <strong className="text-foreground">Сохранять ссылки</strong> на полезные материалы и возвращаться к ним позже
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                  <span>
                    <strong className="text-foreground">Делиться ссылками</strong> на статьи в социальных сетях и мессенджерах
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                  <span>
                    <strong className="text-foreground">Печатать материалы</strong> для личного использования на объекте или дома
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
                <span className="text-2xl">💬</span>
                Взаимодействие
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                  <span>
                    <strong className="text-foreground">Задавать вопросы</strong> по email
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                  <span>
                    <strong className="text-foreground">Предлагать темы</strong> для новых статей и разборов
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                  <span>
                    <strong className="text-foreground">Сообщать об ошибках</strong> в статьях, калькуляторах и данных
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                  <span>
                    <strong className="text-foreground">Делиться опытом</strong> ремонта через контакты сайта
                  </span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-red-500/20 bg-gradient-to-br from-card to-red-500/5 shadow-lg dark:to-red-500/10">
          <CardHeader>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/10 shadow-lg">
                <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-2xl font-bold">Что запрещено</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-3 text-xl font-semibold">🚫 Копирование контента</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
                  <span>
                    <strong className="text-foreground">Копировать статьи</strong> полностью или частично без разрешения
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
                  <span>
                    <strong className="text-foreground">Использовать изображения</strong> в коммерческих целях без согласования
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
                  <span>
                    <strong className="text-foreground">Переводить контент</strong> и публиковать его без согласования
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
                  <span>
                    <strong className="text-foreground">Создавать производные материалы</strong> на базе нашего контента без разрешения
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold">🚫 Технические ограничения</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
                  <span>
                    <strong className="text-foreground">Пытаться взломать сайт</strong> или получить несанкционированный доступ
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
                  <span>
                    <strong className="text-foreground">Использовать автоматизированные инструменты</strong> для агрессивного сбора данных
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
                  <span>
                    <strong className="text-foreground">Перегружать сервер</strong> множественными запросами и скриптами
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
                  <span>
                    <strong className="text-foreground">Распространять вредоносное ПО</strong> или использовать сайт во вредоносных сценариях
                  </span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-500/20 bg-gradient-to-br from-card to-blue-500/5 shadow-lg dark:to-blue-500/10">
          <CardHeader>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/10 shadow-lg">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-2xl font-bold">Конфиденциальность</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="mb-3 text-xl font-semibold">📊 Какие данные мы собираем</h3>
              <p className="mb-3 text-muted-foreground">Мы стараемся собирать только те данные, которые действительно нужны для работы сайта:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <strong className="text-foreground">Анонимная аналитика</strong> для понимания того, какие страницы и инструменты полезнее всего
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <strong className="text-foreground">Контактные данные</strong> только если вы сами отправляете их через форму или письмо
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <strong className="text-foreground">Cookies</strong> для корректной работы интерфейса и улучшения пользовательского опыта
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 dark:bg-primary/10">
              <p className="text-sm text-muted-foreground">
                Подробнее о сборе и использовании данных читайте в{" "}
                <Link href="/privacy" className="font-medium text-primary hover:underline">
                  Политике конфиденциальности
                </Link>
                .
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-500/20 bg-gradient-to-br from-card to-orange-500/5 shadow-lg dark:to-orange-500/10">
          <CardHeader>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/10 shadow-lg">
                <Scale className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle className="text-2xl font-bold">Ответственность</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="mb-3 text-xl font-semibold">🛠 Информация о ремонте</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <strong className="text-foreground">Советы и статьи</strong> носят информационный и рекомендательный характер
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <strong className="text-foreground">Пользователь сам отвечает</strong> за применение этих советов в конкретном проекте
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <strong className="text-foreground">Перед важными решениями</strong> мы рекомендуем консультироваться с профильными специалистами
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <strong className="text-foreground">Мы не отвечаем</strong> за ущерб, возникший из-за самостоятельного применения рекомендаций
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold">🧮 Калькуляторы</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <strong className="text-foreground">Результаты калькуляторов</strong> являются оценочными и подходят для предварительного планирования
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <strong className="text-foreground">Фактический расход и цены</strong> могут отличаться из-за материала, региона, подрядчика и условий объекта
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <strong className="text-foreground">Всегда учитывайте запас</strong> и проверяйте параметры материалов перед покупкой
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <strong className="text-foreground">Цены и тарифы</strong> нужно перепроверять самостоятельно перед заказом
                  </span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-2 bg-gradient-to-br from-card to-secondary/10 shadow-lg dark:to-secondary/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
          <CardHeader className="relative z-10">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 shadow-lg">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">Наши принципы</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative z-10 space-y-4">
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
                <Lightbulb className="h-5 w-5 text-primary" />
                Миссия
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                Мы хотим помогать людям делать ремонт спокойнее и понятнее: через практические статьи, полезные инструменты и
                честные рекомендации без лишнего шума.
              </p>
            </div>
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
                <Users className="h-5 w-5 text-primary" />
                Ценности
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <strong className="text-foreground">Практичность</strong> — публикуем материалы, которые можно применять в реальном ремонте
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <strong className="text-foreground">Доступность</strong> — объясняем сложные вещи простым языком
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <strong className="text-foreground">Качество</strong> — стараемся поддерживать материалы и калькуляторы в актуальном состоянии
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <strong className="text-foreground">Честность</strong> — не выдаём ориентировочные расчёты за полноценный инженерный проект
                  </span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5 shadow-xl dark:bg-primary/10">
          <CardHeader>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 to-primary/20 shadow-lg ring-2 ring-primary/20">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-2xl font-bold text-transparent">
                Контакты
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Если у вас есть вопросы по этим правилам или по использованию сайта, напишите нам:
            </p>
            <a
              href="mailto:vles8878@gmail.com"
              className="group inline-flex items-center gap-3 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90 hover:shadow-lg active:scale-95"
            >
              <Mail className="h-5 w-5 group-hover:animate-bounce" />
              <span>vles8878@gmail.com</span>
            </a>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200 bg-blue-50 shadow-lg dark:border-blue-800 dark:bg-blue-900/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">📋 Краткая памятка</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-green-600 dark:text-green-400" />
                <div>
                  <strong className="text-foreground">Можно:</strong> читать статьи, пользоваться калькуляторами, сохранять и пересылать ссылки
                </div>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="mt-0.5 h-6 w-6 shrink-0 text-red-600 dark:text-red-400" />
                <div>
                  <strong className="text-foreground">Нельзя:</strong> копировать контент и использовать материалы в коммерческих целях без согласования
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="mt-0.5 h-6 w-6 shrink-0 text-blue-600 dark:text-blue-400" />
                <div>
                  <strong className="text-foreground">Конфиденциальность:</strong> мы стараемся бережно обращаться с данными и не собирать лишнее
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Scale className="mt-0.5 h-6 w-6 shrink-0 text-orange-600 dark:text-orange-400" />
                <div>
                  <strong className="text-foreground">Ответственность:</strong> итоговые решения по ремонту и закупке материалов пользователь принимает сам
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                <div>
                  <strong className="text-foreground">Связь:</strong> vles8878@gmail.com для вопросов по правилам и работе сайта
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="py-8 text-center">
          <p className="mb-2 text-lg font-medium text-primary">Спасибо, что пользуетесь Renohacks.com.</p>
          <p className="text-sm text-muted-foreground">Последнее обновление: 25 марта 2026 года</p>
        </div>
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
