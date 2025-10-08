import { allPosts } from ".contentlayer/generated"
import { NextResponse } from "next/server"

export const revalidate = 3600

function escapeXml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
}

export async function GET() {
    const baseUrl = "https://renohacks.com"

    const posts = allPosts
        .filter((p) => !p.draft && p.url.startsWith("/en/"))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 30)

    const items = posts
        .map(
            (p) => `
      <item>
        <title><![CDATA[${escapeXml(p.title)}]]></title>
        <link>${escapeXml(`${baseUrl}${p.url}`)}</link>
        <guid>${escapeXml(`${baseUrl}${p.url}`)}</guid>
        <pubDate>${new Date(p.date).toUTCString()}</pubDate>
        <description><![CDATA[${escapeXml(p.description || "")}]]></description>
        ${
                p.cover
                    ? `<media:content url="${escapeXml(baseUrl + p.cover)}" medium="image" />`
                    : ""
            }
      </item>`
        )
        .join("")

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
    <channel>
      <title>Renohacks — home renovation &amp; interior design</title>
      <link>${baseUrl}/en</link>
      <description>Latest DIY renovation and design tips</description>
      <language>en</language>
      ${items}
    </channel>
  </rss>`

    return new NextResponse(xml, {
        headers: { "Content-Type": "application/xml; charset=utf-8" },
    })
}
