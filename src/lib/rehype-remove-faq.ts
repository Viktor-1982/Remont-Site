import { visit } from 'unist-util-visit'

/**
 * Плагин для Rehype.
 * Находит заголовок FAQ (H2 или H3) и удаляет весь последующий контент до следующего заголовка H2/H3
 * или разделителя HR. Это предотвращает рендеринг сырого Markdown FAQ, так как мы 
 * отображаем его через кастомный компонент <FAQSection />.
 */
export function rehypeRemoveFaq() {
    return (tree: any) => {
        let startIndex = -1
        let endIndex = -1

        // Находим индекс заголовка FAQ
        for (let i = 0; i < tree.children.length; i++) {
            const node = tree.children[i]

            // Проверяем, что это заголовок h2 или h3
            if (node.type === 'element' && (node.tagName === 'h2' || node.tagName === 'h3')) {
                // Извлекаем текст из детей узла
                const text = node.children
                    .filter((child: any) => child.type === 'text')
                    .map((child: any) => child.value)
                    .join('')

                if (/FAQ|часто задаваемые вопросы|частые вопросы|frequently asked questions|common questions/i.test(text)) {
                    startIndex = i
                    break
                }
            }
        }

        // Если заголовок FAQ найден, ищем конец блока FAQ
        if (startIndex !== -1) {
            for (let i = startIndex + 1; i < tree.children.length; i++) {
                const node = tree.children[i]

                // Конец FAQ — это следующий заголовок H2/H3 или разделитель HR
                if (node.type === 'element' && (node.tagName === 'h2' || node.tagName === 'h3' || node.tagName === 'hr')) {
                    endIndex = i
                    break
                }
            }

            // Если не нашли конца, значит FAQ идет до конца файла
            if (endIndex === -1) {
                endIndex = tree.children.length
            }

            // Удаляем узлы сырого текста FAQ (оставляем сам заголовок FAQ, 
            // так как он может быть нужен для кастомного компонента обертки)
            if (endIndex > startIndex + 1) {
                tree.children.splice(startIndex + 1, endIndex - startIndex - 1)
            }
        }
    }
}
