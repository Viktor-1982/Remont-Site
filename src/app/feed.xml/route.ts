import { allPosts } from ".contentlayer/generated"
import { NextResponse } from "next/server"

export const revalidate = 3600 // обновлять каждые 60 минут

export async function GET() {
    const baseUrl = "https://renohacks.com"

    // сортируем по дате
    const sorted = allPosts
        .filter((p) => !p.draft)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    const items = sorted
        .slice(0, 20) // последние 20 статей
        .map(
            (post) => `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${baseUrl}${post.url}</link>
        <guid>${baseUrl}${post.url}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description><![CDATA[${post.description || ""}]]></description>
      </item>`
        )
        .join("")

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Renohacks — DIY, интерьер и ремонт</title>
      <link>${baseUrl}</link>
      <description>Последние статьи о ремонте, дизайне и DIY</description>
      <language>ru</language>
      ${items}
    </channel>
  </rss>`

    return new NextResponse(xml, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
        },
    })
}
