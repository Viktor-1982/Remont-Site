/**
 * Парсит FAQ секцию из MDX контента
 * Поддерживает форматы:
 * - <FAQSection items={[{ question: "...", answer: "..." }]} />
 * - ## ❓ FAQ / ## Frequently Asked Questions / ## Частые вопросы
 *   - ### Вопрос?\nОтвет
 *   - **Вопрос?**\nОтвет
 *   - Вопрос?\nОтвет
 */

export interface FAQItem {
    question: string
    answer: string
}

function cleanText(text: string): string {
    return text
        .replace(/<[^>]+>/g, " ")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/\*([^*]+)\*/g, "$1")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/^>\s*/gm, "")
        .replace(/^(?:A|О|Ответ|Answer):\s*/i, "")
        .replace(/\s+/g, " ")
        .trim()
}

function cleanQuestion(text: string): string {
    return cleanText(text)
        .replace(/^#+\s*/, "")
        .replace(/^(?:\d+[\.\)]\s*|[-*•]\s*)/, "")
        .replace(/^(?:Q|В|Вопрос|Question):\s*/i, "")
        .trim()
}

export function parseFAQ(rawContent: string): FAQItem[] {
    const faqs: FAQItem[] = []
    if (!rawContent) return faqs

    const content = rawContent.replace(/\r\n/g, "\n")

    // 1. Поддержка JSX-компонента <FAQSection items={[...]} />
    const jsxFaqMatch = content.match(/<FAQSection[\s\S]*?items=\{\s*\[([\s\S]*?)\]\s*\}[\s\S]*?\/>/)
    if (jsxFaqMatch) {
        const itemsBlock = jsxFaqMatch[1]
        const itemRegex = /\{\s*question:\s*(["'`])([\s\S]*?)\1\s*,\s*answer:\s*(["'`])([\s\S]*?)\3\s*,?\s*\}/g
        let itemMatch: RegExpExecArray | null
        while ((itemMatch = itemRegex.exec(itemsBlock)) !== null) {
            const question = cleanQuestion(itemMatch[2])
            const answer = cleanText(itemMatch[4])
            if (question && answer) {
                faqs.push({ question, answer })
            }
        }
        if (faqs.length > 0) return faqs
    }

    // 2. Ищем Markdown-секцию FAQ до следующего заголовка второго уровня (## ) или конца статьи
    const faqSectionMatch = content.match(
        /(?:^|\n)##\s+[^\n]*(?:FAQ|Frequently Asked Questions|Common Questions|Частые вопросы|Часто задаваемые вопросы|Ответы на частые вопросы)[^\n]*\n([\s\S]*?)(?=\n##\s+|$)/i
    )
    if (!faqSectionMatch) return faqs

    // Отрезаем завершающие JSX-виджеты (например <SimpleNewsletter />, <ComparisonTable />) в конце секции
    const faqBody = faqSectionMatch[1].split(/\n<(?:SimpleNewsletter|ComparisonTable|MaterialComparison|ToolCTA|Calculator)\b/)[0]

    // 2a. Если внутри секции используются подзаголовки ### Вопрос
    if (/^###\s+/m.test(faqBody)) {
        const blocks = faqBody.split(/^###\s+/m).slice(1)
        for (const block of blocks) {
            const lines = block.split("\n")
            const rawQuestion = lines[0]?.trim() || ""
            const rawAnswer = lines
                .slice(1)
                .filter((line) => !line.trim().startsWith("---") && !line.trim().startsWith("<"))
                .join(" ")
            const question = cleanQuestion(rawQuestion)
            const answer = cleanText(rawAnswer)
            if (question && answer) {
                faqs.push({ question, answer })
            }
        }
        if (faqs.length > 0) return faqs
    }

    // 2b. Паттерн с жирным вопросом **Вопрос?**
    const boldQuestionRegex = /\*\*([^*\n]+?)\*\*\s*\n+([^\n]+(?:\n(?!\*\*|---|###|##)[^\n]+)*)/g
    let match: RegExpExecArray | null
    while ((match = boldQuestionRegex.exec(faqBody)) !== null) {
        const question = cleanQuestion(match[1])
        const rawAnswer = match[2]
            .split("\n")
            .filter((line) => !line.trim().startsWith("---") && !line.trim().startsWith("<"))
            .join(" ")
        const answer = cleanText(rawAnswer)
        if (question && answer) {
            faqs.push({ question, answer })
        }
    }
    if (faqs.length > 0) return faqs

    // 2c. Построчный fallback (вопросы без жирного выделения, заканчивающиеся на ?)
    const lines = faqBody.split("\n")
    let currentQuestion = ""
    let currentAnswer: string[] = []

    const flush = () => {
        if (currentQuestion && currentAnswer.length > 0) {
            const question = cleanQuestion(currentQuestion)
            const answer = cleanText(currentAnswer.join(" "))
            if (question && answer) {
                faqs.push({ question, answer })
            }
        }
    }

    for (const rawLine of lines) {
        const line = rawLine.trim()
        if (!line || line.startsWith("---")) continue
        if (line.startsWith("<")) continue

        if (line.endsWith("?")) {
            flush()
            currentQuestion = line
            currentAnswer = []
        } else if (currentQuestion) {
            currentAnswer.push(line)
        }
    }
    flush()

    return faqs
}
