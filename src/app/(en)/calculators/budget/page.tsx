import { BudgetPageTemplate } from "@/components/pages/budget-page"
import { RenovationBudgetPlannerEn } from "@/components/widgets/renovation-budget-planner-en"
import { getBudgetPageDictionary, getBudgetPageMetadata } from "@/dictionaries/budget-page"

export const metadata = getBudgetPageMetadata("en")

export default function BudgetPlannerPageEn() {
    const dictionary = getBudgetPageDictionary("en")

    return <BudgetPageTemplate dictionary={dictionary} widget={<RenovationBudgetPlannerEn />} isEnglish={true} />
}
