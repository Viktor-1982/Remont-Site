import { NextResponse } from "next/server"
import { allPosts } from ".contentlayer/generated"

export async function GET() {
    try {
        // Возвращаем только опубликованные посты
        const publishedPosts = allPosts.filter((post) => !post.draft)
        return NextResponse.json(publishedPosts)
    } catch {
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
    }
}

