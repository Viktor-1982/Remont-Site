import { Metadata } from "next"
import { MaterialsChecklist } from "@/components/materials-checklist"

export const metadata: Metadata = {
    title: "Чеклист покупок материалов для ремонта | Renohacks",
    description:
        "Полный список материалов для ремонта с возможностью отмечать купленное. Ничего не забудьте купить для вашего ремонта. Экспорт и импорт чеклиста.",
    openGraph: {
        title: "Чеклист покупок материалов для ремонта",
        description: "Отслеживайте все материалы, необходимые для ремонта",
        type: "website",
    },
}

export default function MaterialsChecklistPage() {
    return (
        <div className="container py-12 md:py-16">
            <MaterialsChecklist />
        </div>
    )
}


