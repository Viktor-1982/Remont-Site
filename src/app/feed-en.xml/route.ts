import { allPosts } from ".contentlayer/generated"
import { NextResponse } from "next/server"

export const revalidate = 3600

export async function GET() {
    const baseUrl = "https://renohacks.com"

    // Фильтруем только английские посты
    const enPosts = allPosts
        .filter((p) => !p.draft && p.url.startsWith("/en/"))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    const items = enPosts
        .slice(0, 20)
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
      <title>Renohacks — home renovation & interior ideas</title>
      <link>${baseUrl}/en</link>
      <description>Latest DIY renovation and interior design tips</description>
      <language>en</language>
      ${items}
    </channel>
  </rss>`

    return new NextResponse(xml, {
        headers: { "Content-Type": "application/xml; charset=utf-8" },
    })
}
