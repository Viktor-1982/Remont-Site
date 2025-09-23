import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "О проекте | renohacks.com",
    description:
        "О проекте renohacks.com — блог о ремонте и строительстве. Фото-гайды, лайфхаки, калькуляторы и обзоры материалов для дома и ремонта.",
    openGraph: {
        title: "О проекте | renohacks.com",
        description:
            "Узнайте подробнее о блоге renohacks.com: фото-гайды, лайфхаки и обзоры материалов для ремонта.",
        url: "https://renohacks.com/about",
        siteName: "renohacks.com",
        locale: "ru_RU",
        type: "article",
    },
}

export default function AboutPage() {
    return (
        <main className="container py-12 md:py-16 prose dark:prose-invert">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">О проекте</h1>

            <p>
                <strong>renohacks.com</strong> — это блог о ремонте и строительстве, где мы
                собираем лучшие практики, фото-гайды, лайфхаки и обзоры современных
                материалов.
            </p>

            <p>
                Наша цель — сделать ремонт простым и понятным. Мы хотим, чтобы каждый мог
                самостоятельно планировать, рассчитывать материалы и вдохновляться свежими
                идеями.
            </p>

            <h2>Что вы найдёте на сайте</h2>
            <ul>
                <li>📸 Пошаговые фото-гайды по ремонту</li>
                <li>🛠️ Удобные калькуляторы (краска, плитка, обои)</li>
                <li>💡 Полезные лайфхаки и советы</li>
                <li>📊 Обзоры материалов и сметы</li>
            </ul>

            <h2>Кто автор</h2>
            <p>
                Проект создан энтузиастом, который прошёл через десятки ремонтов и хочет
                поделиться опытом. Здесь собраны только практические и проверенные советы —
                то, что реально работает.
            </p>
        </main>
    )
}
