import { getPageMetadata } from "@/lib/seo"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Wrench, Calculator, Palette, DollarSign, Home, Mail, Target } from "lucide-react"
import Script from "next/script"

export const metadata = getPageMetadata("/about", {
    title: "О проекте Renohacks | Блог о ремонте и дизайне",
    description:
        "Renohacks — ваш гид по ремонту: фото-гайды, DIY советы, бесплатные калькуляторы материалов. Всё для качественного ремонта дома своими руками.",
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
            name: "О проекте",
            item: `${baseUrl}/about`,
        },
    ],
}

const features = [
    {
        icon: Camera,
        title: "Фото-гайды",
        description: "Пошаговые инструкции с фотографиями по покраске стен, ремонту ванной и кухни",
    },
    {
        icon: Wrench,
        title: "DIY проекты",
        description: "Практические лайфхаки и проекты для экономии бюджета при ремонте",
    },
    {
        icon: Calculator,
        title: "Калькуляторы",
        description: "Бесплатные инструменты для расчёта краски, обоев, плитки и других материалов",
    },
    {
        icon: Palette,
        title: "Идеи дизайна",
        description: "Актуальные тренды интерьера 2025–2026 и вдохновляющие идеи для вашего дома",
    },
    {
        icon: DollarSign,
        title: "Сметы и бюджеты",
        description: "Реальные примеры смет и бюджетов на разные виды ремонта",
    },
]

export default function AboutPage() {
    return (
        <main className="container mx-auto px-4 py-12 md:py-20">
            {/* Hero Section */}
            <div className="mx-auto max-w-4xl text-center mb-16">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 dark:bg-primary/20 mb-6">
                    <Home className="w-10 h-10 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    О проекте Renohacks
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    <strong className="text-foreground">renohacks.com</strong> — блог о ремонте, дизайне интерьера и новинках в строительстве, 
                    где мы делимся практическими советами, актуальными трендами, пошаговыми фото-гайдами и бесплатными калькуляторами.
                </p>
            </div>

            {/* Mission Section */}
            <div className="mx-auto max-w-4xl mb-16">
                <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 dark:to-primary/10 shadow-xl">
                    {/* Декоративные элементы */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                    
                    <CardHeader className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg">
                                <Target className="w-6 h-6 text-primary" />
                            </div>
                            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                Наша цель
                            </CardTitle>
                        </div>
                        <CardDescription className="text-base text-lg">
                            Помочь вам создать уютный и стильный дом: от качественного ремонта до актуального дизайна
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <p className="text-muted-foreground leading-relaxed text-base">
                            Мы делимся не только практическими советами по ремонту, но и актуальными трендами дизайна интерьера, 
                            новинками материалов и технологий. Наша цель — помочь вам создать дом, который будет одновременно 
                            функциональным, красивым и недорогим. Главное — правильный подход, практические советы и понимание того, 
                            на чём можно сэкономить, а на чём лучше не экономить.
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Features Grid */}
            <div className="mx-auto max-w-6xl mb-16">
                <h2 className="text-3xl font-bold text-center mb-12">Что мы делаем</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        const gradients = [
                            "from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20",
                            "from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20",
                            "from-orange-500/10 to-red-500/10 dark:from-orange-500/20 dark:to-red-500/20",
                            "from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20",
                            "from-indigo-500/10 to-violet-500/10 dark:from-indigo-500/20 dark:to-violet-500/20",
                        ]
                        return (
                            <Card 
                                key={index} 
                                className="group relative overflow-hidden border-2 border-border/50 hover:border-primary/50 dark:border-border/30 dark:hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-card via-card to-primary/5 dark:to-primary/10 shadow-md dark:shadow-lg"
                            >
                                {/* Декоративный градиентный фон */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-30 dark:opacity-0 group-hover:opacity-50 dark:group-hover:opacity-100 transition-opacity duration-300`} />
                                
                                {/* Блестящий эффект при наведении */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                
                                <CardHeader className="relative z-10">
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradients[index % gradients.length]} opacity-80 dark:opacity-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg ring-2 ring-primary/10 dark:ring-primary/20`}>
                                        <Icon className="w-7 h-7 text-primary group-hover:text-primary/90 transition-colors" />
                                    </div>
                                    <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="relative z-10">
                                    <CardDescription className="text-base leading-relaxed text-foreground/70 dark:text-muted-foreground group-hover:text-foreground/90 dark:group-hover:text-foreground/80 transition-colors duration-300">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>

            {/* Target Audience */}
            <div className="mx-auto max-w-4xl mb-16">
                <Card className="relative overflow-hidden border-2 bg-gradient-to-br from-card to-secondary/10 dark:to-secondary/20 shadow-lg">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
                    <CardHeader className="relative z-10">
                        <CardTitle className="text-2xl font-bold">Для кого этот блог</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10">
                        <p className="text-muted-foreground leading-relaxed text-base">
                            Наш контент будет полезен всем, кто планирует ремонт, интересуется дизайном интерьера или следит за новинками 
                            в строительстве и отделке: от косметического обновления до капитального ремонта квартиры.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all duration-300 cursor-default">
                                Косметический ремонт
                            </Badge>
                            <Badge variant="secondary" className="hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all duration-300 cursor-default">
                                Капитальный ремонт
                            </Badge>
                            <Badge variant="secondary" className="hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all duration-300 cursor-default">
                                Дизайн интерьера
                            </Badge>
                            <Badge variant="secondary" className="hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all duration-300 cursor-default">
                                DIY энтузиасты
                            </Badge>
                            <Badge variant="secondary" className="hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all duration-300 cursor-default">
                                Владельцы квартир
                            </Badge>
                            <Badge variant="secondary" className="hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all duration-300 cursor-default">
                                Дизайнеры
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Contact Section */}
            <div className="mx-auto max-w-4xl">
                <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 dark:from-primary/20 dark:via-primary/10 dark:to-accent/20 border-2 border-primary/30 shadow-xl">
                    {/* Анимированный фон */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.15),transparent_50%)] animate-pulse-slow" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.15),transparent_50%)] animate-pulse-slow" style={{ animationDelay: '1s' }} />
                    
                    <CardHeader className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/20 flex items-center justify-center shadow-lg ring-2 ring-primary/20">
                                <Mail className="w-6 h-6 text-primary" />
                            </div>
                            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                Связь с нами
                            </CardTitle>
                        </div>
                        <CardDescription className="text-base text-lg">
                Есть вопросы, предложения или идеи для статей? 
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <p className="text-muted-foreground mb-6 text-base">
                            Мы всегда открыты к диалогу и готовы помочь вам с ремонтом.
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
