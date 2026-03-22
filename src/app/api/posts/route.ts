import { NextResponse } from "next/server"
import { allPosts } from ".contentlayer/generated"
import { toPostIndexItem } from "@/lib/post-index"

export const revalidate = 3600

export async function GET() {
    try {
        const publishedPosts = allPosts
            .filter((post) => !post.draft)
            .map(toPostIndexItem)

        return NextResponse.json(publishedPosts)
    } catch {
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
    }
}
