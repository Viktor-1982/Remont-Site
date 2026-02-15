import { allPosts } from ".contentlayer/generated"

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
    .slice(0, 20)

  const items = posts
    .map((p) => {
      const url = `${baseUrl}${p.url}`
      const enclosure = p.cover
        ? `<enclosure url="${escapeXml(`${baseUrl}${p.cover}`)}" type="image/jpeg" />`
        : ""

      return `
    <item>
    <title><![CDATA[${escapeXml(p.title)}]]></title>
    <link>${escapeXml(url)}</link>
    <guid isPermaLink="true">${escapeXml(url)}</guid>
    <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    <description><![CDATA[${escapeXml(p.description || "")}]]></description>
    ${enclosure}
    </item>`
    })
    .join("")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Renohacks — home renovation &amp; interior design</title>
    <description>Latest DIY renovation and design tips</description>
    <link>${baseUrl}/en</link>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed-en.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${baseUrl}/favicon.ico</url>
      <title>Renohacks</title>
      <link>${baseUrl}/en</link>
    </image>
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
