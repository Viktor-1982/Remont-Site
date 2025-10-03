import { allPosts } from ".contentlayer/generated"

export default function DevCheckPage() {
    return (
        <main className="container py-8 px-4">
            <h1 className="text-2xl font-bold mb-4">Dev check — allPosts</h1>
            <pre className="whitespace-pre-wrap rounded bg-slate-100 p-4 overflow-auto">
        {JSON.stringify(
            allPosts.map((p) => ({
                slug: p.slug,
                url: p.url,
                locale: p.locale,
                title: p.title,
                date: p.date,
                draft: p.draft ?? false,
                translationOf: p.translationOf ?? null,
            })),
            null,
            2
        )}
      </pre>
        </main>
    )
}
