import type { Post } from ".contentlayer/generated"

export type Locale = "ru" | "en"

export interface ArticleCardPost {
    _id?: string
    slug: string
    locale: string
    title: string
    description?: string
    cover?: string
    url: string
    date?: string
    readingTime?: string
    rubric?: string
    tags?: string[]
}

export interface PostIndexItem extends ArticleCardPost {
    id: string
}

export function toPostIndexItem(post: Post): PostIndexItem {
    return {
        id: `${post.locale}:${post.slug}`,
        _id: post._id,
        slug: post.slug,
        locale: post.locale as Locale,
        title: post.title,
        description: post.description,
        cover: post.cover,
        url: post.url,
        date: post.date,
        readingTime: post.readingTime,
        rubric: post.rubric,
        tags: post.tags ?? [],
    }
}

let postIndexPromise: Promise<PostIndexItem[]> | null = null

export async function fetchPostIndex(): Promise<PostIndexItem[]> {
    if (!postIndexPromise) {
        postIndexPromise = fetch("/api/posts", { cache: "force-cache" })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch posts: ${response.status}`)
                }

                const data: unknown = await response.json()
                return Array.isArray(data) ? (data as PostIndexItem[]) : []
            })
            .catch((error) => {
                postIndexPromise = null
                throw error
            })
    }

    return postIndexPromise
}
