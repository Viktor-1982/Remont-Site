import { AboutPageTemplate } from "@/components/pages/about-page"
import { getAboutDictionary } from "@/dictionaries/about"
import { getPageMetadata } from "@/lib/seo"

const dictionary = getAboutDictionary("ru")

export const metadata = getPageMetadata("/ru/about", {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    cover: "/images/og-default.png",
    type: "article",
})

export default function AboutPage() {
    return <AboutPageTemplate dictionary={dictionary} />
}
