import { NextResponse } from "next/server"

export const revalidate = 3600 // обновлять раз в час

export async function GET() {
    return NextResponse.redirect("https://renohacks.com/rss.xml", 301)
}
