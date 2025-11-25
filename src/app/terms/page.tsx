import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, CheckCircle, XCircle, Shield, Scale, Mail, Home, Heart, Lightbulb, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Правила пользования сайтом | Renohacks",
  description: "Правила и условия использования сайта Renohacks.com. Информация о том, что можно и нельзя делать на сайте, конфиденциальность и ответственность.",
  openGraph: {
    title: "Правила пользования сайтом | Renohacks",
    description: "Правила и условия использования сайта Renohacks.com",
    type: "website",
  },
}

export default function TermsOfUsePage() {
  return (
    <main className="container mx-auto px-4 py-12 md:py-20 max-w-5xl">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 dark:bg-primary/20 mb-6">
          <FileText className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Правила пользования сайтом
        </h1>
        <p className="text-muted-foreground text-lg">Условия использования Renohacks.com</p>
      </div>

      <div className="space-y-8">
        {/* О сайте */}
        <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 dark:to-primary/10 shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg">
                <Home className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">О сайте</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <p className="text-muted-foreground leading-relaxed text-base">
              <strong className="text-foreground">Renohacks.com</strong> — это блог о ремонте, дизайне интерьера и DIY проектах. 
              Мы предоставляем практические советы, пошаговые руководства, калькуляторы и вдохновение для создания уютного дома.
            </p>
          </CardContent>
        </Card>

        {/* Что можно делать */}
        <Card className="border-2 border-green-500/20 bg-gradient-to-br from-card to-green-500/5 dark:to-green-500/10 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/10 flex items-center justify-center shadow-lg">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl font-bold">Что можно делать</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">📖</span>
                Использование контента
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Читать статьи</strong> и руководства для личного использования</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Использовать калькуляторы</strong> для планирования ремонта</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Сохранять ссылки</strong> на интересные материалы</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Делиться ссылками</strong> на статьи в социальных сетях</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Печатать статьи</strong> для личного использования</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">💬</span>
                Взаимодействие
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Задавать вопросы</strong> через контактную форму</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Предлагать темы</strong> для новых статей</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Сообщать об ошибках</strong> в калькуляторах или статьях</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Делиться опытом</strong> ремонта (через контакты)</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Что запрещено */}
        <Card className="border-2 border-red-500/20 bg-gradient-to-br from-card to-red-500/5 dark:to-red-500/10 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/10 flex items-center justify-center shadow-lg">
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-2xl font-bold">Что запрещено</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">🚫 Копирование контента</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Копировать статьи</strong> полностью или частично без разрешения</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Использовать изображения</strong> в коммерческих целях</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Переводить контент</strong> без согласования</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Создавать производные работы</strong> на основе наших материалов</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">🚫 Технические ограничения</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Взламывать сайт</strong> или пытаться получить несанкционированный доступ</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Использовать автоматизированные скрипты</strong> для сбора данных</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Перегружать сервер</strong> множественными запросами</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Распространять вредоносное ПО</strong> через наш сайт</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Конфиденциальность */}
        <Card className="border-2 border-blue-500/20 bg-gradient-to-br from-card to-blue-500/5 dark:to-blue-500/10 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-2xl font-bold">Конфиденциальность</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-3">📊 Сбор данных</h3>
              <p className="text-muted-foreground mb-3">Мы собираем только необходимые данные:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong className="text-foreground">Аналитика посещений</strong> (анонимная статистика)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong className="text-foreground">Контактная информация</strong> (только при обращении)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong className="text-foreground">Cookies</strong> для улучшения работы сайта</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 p-4 rounded-lg bg-primary/5 dark:bg-primary/10 border border-primary/20">
              <p className="text-sm text-muted-foreground">
                Подробнее о конфиденциальности читайте в нашей{" "}
                <Link href="/privacy" className="text-primary hover:underline font-medium">Политике конфиденциальности</Link>.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Ответственность */}
        <Card className="border-2 border-orange-500/20 bg-gradient-to-br from-card to-orange-500/5 dark:to-orange-500/10 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/10 flex items-center justify-center shadow-lg">
                <Scale className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle className="text-2xl font-bold">Ответственность</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-3">🏗️ Информация о ремонте</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong className="text-foreground">Советы носят рекомендательный характер</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong className="text-foreground">Пользователь несет ответственность</strong> за свои действия</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong className="text-foreground">Рекомендуем консультироваться</strong> с профессионалами</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong className="text-foreground">Мы не несем ответственности</strong> за ущерб от применения советов</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">🔧 Калькуляторы</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong className="text-foreground">Результаты приблизительные</strong> и для планирования</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong className="text-foreground">Фактические цены могут отличаться</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong className="text-foreground">Учитывайте региональные особенности</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong className="text-foreground">Проверяйте актуальность цен</strong> самостоятельно</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Наши принципы */}
        <Card className="relative overflow-hidden border-2 bg-gradient-to-br from-card to-secondary/10 dark:to-secondary/20 shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
          <CardHeader className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">Наши принципы</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                Миссия
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Мы помогаем людям создавать уютные и функциональные дома, предоставляя практические советы и вдохновение для ремонта и дизайна.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Ценности
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong className="text-foreground">Практичность</strong> — только проверенные советы</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong className="text-foreground">Доступность</strong> — понятные инструкции для всех</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong className="text-foreground">Качество</strong> — тщательно отобранный контент</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong className="text-foreground">Честность</strong> — прозрачность в рекомендациях</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Контакты */}
        <Card className="bg-primary/5 dark:bg-primary/10 border-primary/20 shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/20 flex items-center justify-center shadow-lg ring-2 ring-primary/20">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Контакты
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Если у вас есть вопросы о правилах пользования, свяжитесь с нами:
            </p>
            <a
              href="mailto:info@renohacks.com"
              className="group inline-flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <Mail className="w-5 h-5 group-hover:animate-bounce" />
              <span>info@renohacks.com</span>
            </a>
          </CardContent>
        </Card>

        {/* Краткая памятка */}
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">📋 Краткая памятка</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-foreground">Можно:</strong> читать, использовать калькуляторы, делиться ссылками
                </div>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-foreground">Нельзя:</strong> копировать контент, использовать в коммерческих целях
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-foreground">Безопасно:</strong> мы защищаем ваши данные
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Scale className="w-6 h-6 text-orange-600 dark:text-orange-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-foreground">Ответственность:</strong> пользователь несет ответственность за применение советов
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-6 h-6 text-primary mt-0.5 shrink-0" />
                <div>
                  <strong className="text-foreground">Связь:</strong> info@renohacks.com для любых вопросов
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-lg font-medium text-primary mb-2">Спасибо за использование Renohacks.com! 🏠✨</p>
          <p className="text-sm text-muted-foreground">Последнее обновление: 28 октября 2025 года</p>
        </div>
      </div>
    </main>
  )
}
