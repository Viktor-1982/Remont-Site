import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/about", {
    title: "О проекте",
    description:
        "О проекте renohacks.com — блог о ремонте и строительстве. Фото-гайды, лайфхаки, калькуляторы и обзоры материалов.",
    cover: "/images/og-default.png",
    type: "article",
})

export default function AboutPage() {
    return (
        <main className="container py-12 md:py-16 prose dark:prose-invert">
            <h1>О проекте</h1>
            <p>
                <strong>renohacks.com</strong> — блог о ремонте и строительстве, где мы
                делимся практикой, фото-гидами и калькуляторами.
            </p>
        </main>
    )
}
