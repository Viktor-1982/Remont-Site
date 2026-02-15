import { getPageMetadata } from "@/lib/seo"
import { MaterialsChecklist } from "@/components/materials-checklist"

export const metadata = getPageMetadata("/tools/materials-checklist", {
    title: "Чеклист покупок материалов для ремонта | Renohacks",
    description:
        "Полный список материалов для ремонта с возможностью отмечать купленное. Ничего не забудьте купить для вашего ремонта. Экспорт и импорт чеклиста.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function MaterialsChecklistPage() {
    return (
        <div className="container py-12 md:py-16">
            <MaterialsChecklist />
        </div>
    )
}


