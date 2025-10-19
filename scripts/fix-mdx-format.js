// scripts/fix-mdx-format.js
// 🔧 Конвертирует все .mdx файлы в UTF-8 без BOM и LF (Unix переводы строк)

import fs from "fs"
import path from "path"

const rootDirs = ["content/posts", "content/posts/en"]

function convertFile(filePath) {
    const buffer = fs.readFileSync(filePath)
    let content = buffer.toString("utf8")

    // Убираем BOM (EF BB BF)
    if (content.charCodeAt(0) === 0xfeff) {
        content = content.slice(1)
    }

    // Преобразуем CRLF → LF
    content = content.replace(/\r\n/g, "\n")

    fs.writeFileSync(filePath, content, "utf8")
    console.log("✅ Converted:", filePath)
}

function walk(dir) {
    for (const item of fs.readdirSync(dir)) {
        const full = path.join(dir, item)
        const stat = fs.statSync(full)
        if (stat.isDirectory()) walk(full)
        else if (full.endsWith(".mdx")) convertFile(full)
    }
}

for (const dir of rootDirs) {
    if (fs.existsSync(dir)) walk(dir)
}

console.log("\n✨ All .mdx files converted to UTF-8 (no BOM) with LF endings.\n")
