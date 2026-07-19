// Полная проверка включая динамические посты
const BASE = "http://localhost:3000"

// Статические страницы
const staticPages = [
    { path: "/",                      expectEN: "/",              expectRU: "/ru" },
    { path: "/ru",                    expectEN: "/",              expectRU: "/ru" },
    { path: "/about",                 expectEN: "/about",         expectRU: "/ru/about" },
    { path: "/ru/about",              expectEN: "/about",         expectRU: "/ru/about" },
    { path: "/calculators",           expectEN: "/calculators",         expectRU: "/ru/calculators" },
    { path: "/ru/calculators",        expectEN: "/calculators",         expectRU: "/ru/calculators" },
    { path: "/calculators/tile",      expectEN: "/calculators/tile",    expectRU: "/ru/calculators/tile" },
    { path: "/ru/calculators/tile",   expectEN: "/calculators/tile",    expectRU: "/ru/calculators/tile" },
    { path: "/calculators/paint",     expectEN: "/calculators/paint",   expectRU: "/ru/calculators/paint" },
    { path: "/calculators/wallpaper", expectEN: "/calculators/wallpaper", expectRU: "/ru/calculators/wallpaper" },
    { path: "/calculators/flooring",  expectEN: "/calculators/flooring",  expectRU: "/ru/calculators/flooring" },
    { path: "/calculators/screed",    expectEN: "/calculators/screed",    expectRU: "/ru/calculators/screed" },
    { path: "/calculators/baseboard", expectEN: "/calculators/baseboard", expectRU: "/ru/calculators/baseboard" },
    { path: "/calculators/budget",    expectEN: "/calculators/budget",    expectRU: "/ru/calculators/budget" },
    { path: "/calculators/ventilation", expectEN: "/calculators/ventilation", expectRU: "/ru/calculators/ventilation" },
    { path: "/calculators/lighting",  expectEN: "/calculators/lighting",  expectRU: "/ru/calculators/lighting" },
    { path: "/calculators/underfloor-heating", expectEN: "/calculators/underfloor-heating", expectRU: "/ru/calculators/underfloor-heating" },
    { path: "/calculators/color-palette", expectEN: "/calculators/color-palette", expectRU: "/ru/calculators/color-palette" },
    { path: "/costs",                 expectEN: "/costs",         expectRU: "/ru/smety" },
    { path: "/ru/smety",              expectEN: "/costs",         expectRU: "/ru/smety" },
    { path: "/tools",                 expectEN: "/tools",               expectRU: "/ru/tools" },
    { path: "/ru/tools",              expectEN: "/tools",               expectRU: "/ru/tools" },
    { path: "/tools/materials-checklist", expectEN: "/tools/materials-checklist", expectRU: "/ru/tools/materials-checklist" },
    { path: "/bathroom",              expectEN: "/bathroom",      expectRU: "/ru/bathroom" },
    { path: "/ru/bathroom",           expectEN: "/bathroom",      expectRU: "/ru/bathroom" },
    { path: "/kitchen",               expectEN: "/kitchen",       expectRU: "/ru/kitchen" },
    { path: "/ru/kitchen",            expectEN: "/kitchen",       expectRU: "/ru/kitchen" },
    { path: "/flooring",              expectEN: "/flooring",      expectRU: "/ru/flooring" },
    { path: "/ru/flooring",           expectEN: "/flooring",      expectRU: "/ru/flooring" },
    { path: "/bedroom",               expectEN: "/bedroom",       expectRU: "/ru/bedroom" },
    { path: "/ru/bedroom",            expectEN: "/bedroom",       expectRU: "/ru/bedroom" },
    { path: "/walls",                 expectEN: "/walls",         expectRU: "/ru/walls" },
    { path: "/ru/walls",              expectEN: "/walls",         expectRU: "/ru/walls" },
    { path: "/lighting",              expectEN: "/lighting",      expectRU: "/ru/lighting" },
    { path: "/ru/lighting",           expectEN: "/lighting",      expectRU: "/ru/lighting" },
    { path: "/small-apartment",       expectEN: "/small-apartment",   expectRU: "/ru/small-apartment" },
    { path: "/budget-planning",       expectEN: "/budget-planning",   expectRU: "/ru/budget-planning" },
    { path: "/ru/budget-planning",    expectEN: "/budget-planning",   expectRU: "/ru/budget-planning" },
    { path: "/series",                expectEN: "/series",        expectRU: "/ru/series" },
    { path: "/ru/series",             expectEN: "/series",        expectRU: "/ru/series" },
    { path: "/series/kitchen-breakdown", expectEN: "/series/kitchen-breakdown", expectRU: "/ru/series/kitchen-breakdown" },
    { path: "/tags",                  expectEN: "/tags",          expectRU: "/ru/tags" },
    { path: "/ru/tags",               expectEN: "/tags",          expectRU: "/ru/tags" },
    { path: "/tags/advice",           expectEN: "/tags/advice",   expectRU: "/ru/tags/advice" },
    { path: "/quiz/interior-style",   expectEN: "/quiz/interior-style", expectRU: "/ru/quiz/interior-style" },
    { path: "/ru/quiz/interior-style", expectEN: "/quiz/interior-style", expectRU: "/ru/quiz/interior-style" },
    { path: "/privacy",               expectEN: "/privacy",       expectRU: "/ru/privacy" },
    { path: "/ru/privacy",            expectEN: "/privacy",       expectRU: "/ru/privacy" },
    { path: "/terms",                 expectEN: "/terms",         expectRU: "/ru/terms" },
    { path: "/ru/terms",              expectEN: "/terms",         expectRU: "/ru/terms" },
    { path: "/editorial-standards",   expectEN: "/editorial-standards", expectRU: "/ru/editorial-standards" },
    { path: "/ru/editorial-standards", expectEN: "/editorial-standards", expectRU: "/ru/editorial-standards" },
]

// Динамические посты — EN версия → RU версия должна существовать
const postPages = [
    // EN посты → ожидаем RU перевод
    {
        path: "/posts/microcement-in-interior-2026",
        expectEN: "/posts/microcement-in-interior-2026",
        expectRU: "/ru/posts/mikrocement-v-interiere-2026",
    },
    {
        path: "/posts/shadow-gap-and-micro-baseboards-2026",
        expectEN: "/posts/shadow-gap-and-micro-baseboards-2026",
        expectRU: "/ru/posts/tenevoy-plintus-i-mikroplintus-2026",
    },
    {
        path: "/posts/spc-vs-porcelain-tile-2026",
        expectEN: "/posts/spc-vs-porcelain-tile-2026",
        expectRU: "/ru/posts/spc-laminat-protiv-keramogranita-2026",
    },
    {
        path: "/posts/spa-like-bathroom-on-a-budget",
        expectEN: "/posts/spa-like-bathroom-on-a-budget",
        expectRU: "/ru/posts/vannaya-v-stile-domashnego-spa-bez-pereplaty",
    },
    {
        path: "/posts/lighting-trends-2026-for-home-and-apartment",
        expectEN: "/posts/lighting-trends-2026-for-home-and-apartment",
        expectRU: "/ru/posts/osveshchenie-2026-trendy-dlya-kvartiry-i-doma",
    },
    {
        path: "/posts/gray-minimalism-is-dead-2026-trends",
        expectEN: "/posts/gray-minimalism-is-dead-2026-trends",
        expectRU: "/ru/posts/seryj-minimalizm-mertv",
    },
    {
        path: "/posts/home-renovation-costs-2026",
        expectEN: "/posts/home-renovation-costs-2026",
        expectRU: "/ru/posts/skolko-stoit-remont-kvartiry-2026", // real RU translation slug
    },
    // RU посты → EN
    {
        path: "/ru/posts/mikrocement-v-interiere-2026",
        expectEN: "/posts/microcement-in-interior-2026",
        expectRU: "/ru/posts/mikrocement-v-interiere-2026",
    },
    {
        path: "/ru/posts/tenevoy-plintus-i-mikroplintus-2026",
        expectEN: "/posts/shadow-gap-and-micro-baseboards-2026",
        expectRU: "/ru/posts/tenevoy-plintus-i-mikroplintus-2026",
    },
    {
        path: "/ru/posts/spc-laminat-protiv-keramogranita-2026",
        expectEN: "/posts/spc-vs-porcelain-tile-2026",
        expectRU: "/ru/posts/spc-laminat-protiv-keramogranita-2026",
    },
    {
        path: "/ru/posts/seryj-minimalizm-mertv",
        expectEN: "/posts/gray-minimalism-is-dead-2026-trends",
        expectRU: "/ru/posts/seryj-minimalizm-mertv",
    },
]

const allTests = [...staticPages, ...postPages]
let passed = 0, failed = 0
const failures = []

for (const test of allTests) {
    try {
        const res = await fetch(`${BASE}/api/switch-target?path=${encodeURIComponent(test.path)}`)
        const data = await res.json()
        const targets = data?.targets ?? data ?? {}

        const enOk = targets.en === test.expectEN
        const ruOk = targets.ru === test.expectRU

        if (enOk && ruOk) {
            passed++
            console.log(`✅ ${test.path}`)
        } else {
            failed++
            const msgs = []
            if (!enOk) msgs.push(`EN: got "${targets.en}" expected "${test.expectEN}"`)
            if (!ruOk) msgs.push(`RU: got "${targets.ru}" expected "${test.expectRU}"`)
            console.log(`❌ ${test.path} → ${msgs.join(' | ')}`)
            failures.push({ path: test.path, targets, expected: { en: test.expectEN, ru: test.expectRU } })
        }
    } catch (e) {
        failed++
        console.log(`💥 ${test.path} — ${e.message}`)
        failures.push({ path: test.path, error: e.message })
    }
}

console.log(`\n── Итог ─────────────────────────────────`)
console.log(`✅ Прошли:  ${passed} / ${allTests.length}`)
console.log(`❌ Упали:   ${failed} / ${allTests.length}`)
if (failures.length) {
    console.log(`\n── Провалы ───────────────────────────────`)
    failures.forEach(f => console.log(JSON.stringify(f, null, 2)))
}
