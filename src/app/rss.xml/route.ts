import { allPosts } from ".contentlayer/generated"

export async function GET() {
    const baseUrl = "https://renohacks.com"
    
    // Получаем последние 20 постов
    const recentPosts = allPosts
        .filter(post => !post.draft)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 20)

    const rssItems = recentPosts.map(post => {
        const url = `${baseUrl}${post.url}`
        const pubDate = new Date(post.date).toUTCString()
        
        return `
    <item>
        <title><![CDATA[${post.title}]]></title>
        <description><![CDATA[${post.description}]]></description>
        <link>${url}</link>
        <guid isPermaLink="true">${url}</guid>
        <pubDate>${pubDate}</pubDate>
        <category><![CDATA[${post.tags?.join(', ') || 'Ремонт'}]]></category>
        <enclosure url="${baseUrl}${post.cover}" type="image/jpeg" />
    </item>`
    }).join('')

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Renohacks - Ремонт и дизайн</title>
        <description>Полезные советы по ремонту квартир, дизайну интерьера и DIY проектам</description>
        <link>${baseUrl}</link>
        <language>ru</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
        <image>
            <url>${baseUrl}/favicon.ico</url>
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
