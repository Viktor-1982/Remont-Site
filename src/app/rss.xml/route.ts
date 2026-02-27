import { allPosts } from ".contentlayer/generated"

function escapeXml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
}

export async function GET() {
    const baseUrl = "https://renohacks.com"
    
    // РџРѕР»СѓС‡Р°РµРј РїРѕСЃР»РµРґРЅРёРµ 20 РїРѕСЃС‚РѕРІ
    const recentPosts = allPosts
        .filter((post) => !post.draft && !post.url.startsWith("/en/"))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 20)

    const rssItems = recentPosts.map(post => {
        const url = `${baseUrl}${post.url}`
        const pubDate = new Date(post.date).toUTCString()
        
        const enclosure = post.cover
            ? `<enclosure url="${escapeXml(`${baseUrl}${post.cover}`)}" type="image/jpeg" />`
            : ""

        return `
    <item>
        <title><![CDATA[${escapeXml(post.title)}]]></title>
        <description><![CDATA[${escapeXml(post.description || "")}]]></description>
        <link>${escapeXml(url)}</link>
        <guid isPermaLink="true">${escapeXml(url)}</guid>
        <pubDate>${pubDate}</pubDate>
        <category><![CDATA[${escapeXml(post.tags?.join(", ") || "Р РµРјРѕРЅС‚")}]]></category>
        ${enclosure}
    </item>`
    }).join('')

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Renohacks - Р РµРјРѕРЅС‚ Рё РґРёР·Р°Р№РЅ</title>
        <description>РџРѕР»РµР·РЅС‹Рµ СЃРѕРІРµС‚С‹ РїРѕ СЂРµРјРѕРЅС‚Сѓ РєРІР°СЂС‚РёСЂ, РґРёР·Р°Р№РЅСѓ РёРЅС‚РµСЂСЊРµСЂР° Рё DIY РїСЂРѕРµРєС‚Р°Рј</description>
        <link>${baseUrl}</link>
        <language>ru</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
        <image>
            <url>${baseUrl}/icon.svg</url>
            <title>Renohacks</title>
            <link>${baseUrl}</link>
        </image>
        ${rssItems}
    </channel>
</rss>`

    return new Response(rss, {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    })
}

