// Полная проверка switch-target API для всех типов страниц
// Запускать: node scratch/verify-switcher.mjs (после запуска dev сервера)

const BASE = "http://localhost:3000"

const testPages = [
    // ── Главные ──────────────────────────────────────────────────────────────
    { path: "/",                      expectEN: "/",              expectRU: "/ru" },
    { path: "/ru",                    expectEN: "/",              expectRU: "/ru" },

    // ── About ─────────────────────────────────────────────────────────────────
    { path: "/about",                 expectEN: "/about",         expectRU: "/ru/about" },
    { path: "/ru/about",              expectEN: "/about",         expectRU: "/ru/about" },

    // ── Calculators ───────────────────────────────────────────────────────────
    { path: "/calculators",           expectEN: "/calculators",         expectRU: "/ru/calculators" },
    { path: "/ru/calculators",        expectEN: "/calculators",         expectRU: "/ru/calculators" },
    { path: "/calculators/tile",      expectEN: "/calculators/tile",    expectRU: "/ru/calculators/tile" },
    { path: "/ru/calculators/tile",   expectEN: "/calculators/tile",    expectRU: "/ru/calculators/tile" },
    { path: "/calculators/paint",     expectEN: "/calculators/paint",   expectRU: "/ru/calculators/paint" },
    { path: "/ru/calculators/paint",  expectEN: "/calculators/paint",   expectRU: "/ru/calculators/paint" },
    { path: "/calculators/wallpaper", expectEN: "/calculators/wallpaper", expectRU: "/ru/calculators/wallpaper" },
    { path: "/calculators/flooring",  expectEN: "/calculators/flooring",  expectRU: "/ru/calculators/flooring" },
    { path: "/calculators/screed",    expectEN: "/calculators/screed",    expectRU: "/ru/calculators/screed" },
    { path: "/calculators/baseboard", expectEN: "/calculators/baseboard", expectRU: "/ru/calculators/baseboard" },
    { path: "/calculators/budget",    expectEN: "/calculators/budget",    expectRU: "/ru/calculators/budget" },
    { path: "/calculators/ventilation", expectEN: "/calculators/ventilation", expectRU: "/ru/calculators/ventilation" },
    { path: "/calculators/lighting",  expectEN: "/calculators/lighting",  expectRU: "/ru/calculators/lighting" },
    { path: "/calculators/underfloor-heating", expectEN: "/calculators/underfloor-heating", expectRU: "/ru/calculators/underfloor-heating" },
    { path: "/calculators/color-palette", expectEN: "/calculators/color-palette", expectRU: "/ru/calculators/color-palette" },

    // ── Costs / Smety ─────────────────────────────────────────────────────────
    { path: "/costs",                 expectEN: "/costs",         expectRU: "/ru/smety" },
    { path: "/ru/smety",              expectEN: "/costs",         expectRU: "/ru/smety" },

    // ── Tools ─────────────────────────────────────────────────────────────────
    { path: "/tools",                 expectEN: "/tools",               expectRU: "/ru/tools" },
    { path: "/ru/tools",              expectEN: "/tools",               expectRU: "/ru/tools" },
    { path: "/tools/materials-checklist", expectEN: "/tools/materials-checklist", expectRU: "/ru/tools/materials-checklist" },

    // ── Topic hubs ────────────────────────────────────────────────────────────
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
    { path: "/ru/small-apartment",    expectEN: "/small-apartment",   expectRU: "/ru/small-apartment" },
    { path: "/budget-planning",       expectEN: "/budget-planning",   expectRU: "/ru/budget-planning" },
    { path: "/ru/budget-planning",    expectEN: "/budget-planning",   expectRU: "/ru/budget-planning" },

    // ── Series ────────────────────────────────────────────────────────────────
    { path: "/series",                expectEN: "/series",        expectRU: "/ru/series" },
    { path: "/ru/series",             expectEN: "/series",        expectRU: "/ru/series" },
    { path: "/series/kitchen-breakdown", expectEN: "/series/kitchen-breakdown", expectRU: "/ru/series/kitchen-breakdown" },
    { path: "/ru/series/kitchen-breakdown", expectEN: "/series/kitchen-breakdown", expectRU: "/ru/series/kitchen-breakdown" },

    // ── Tags ──────────────────────────────────────────────────────────────────
    { path: "/tags",                  expectEN: "/tags",          expectRU: "/ru/tags" },
    { path: "/ru/tags",               expectEN: "/tags",          expectRU: "/ru/tags" },
    { path: "/tags/advice",           expectEN: "/tags/advice",   expectRU: "/ru/tags/advice" },
    { path: "/ru/tags/novinki",       expectEN: "/tags/novinki",  expectRU: "/ru/tags/novinki" },

    // ── Quiz ──────────────────────────────────────────────────────────────────
    { path: "/quiz/interior-style",   expectEN: "/quiz/interior-style", expectRU: "/ru/quiz/interior-style" },
    { path: "/ru/quiz/interior-style", expectEN: "/quiz/interior-style", expectRU: "/ru/quiz/interior-style" },

    // ── Legal pages ───────────────────────────────────────────────────────────
    { path: "/privacy",               expectEN: "/privacy",       expectRU: "/ru/privacy" },
    { path: "/ru/privacy",            expectEN: "/privacy",       expectRU: "/ru/privacy" },
    { path: "/terms",                 expectEN: "/terms",         expectRU: "/ru/terms" },
    { path: "/ru/terms",              expectEN: "/terms",         expectRU: "/ru/terms" },
    { path: "/editorial-standards",   expectEN: "/editorial-standards", expectRU: "/ru/editorial-standards" },
    { path: "/ru/editorial-standards", expectEN: "/editorial-standards", expectRU: "/ru/editorial-standards" },
]

let passed = 0
let failed = 0
const failures = []

for (const test of testPages) {
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
            const enMsg = enOk ? "" : ` EN: got "${targets.en}" expected "${test.expectEN}"`
            const ruMsg = ruOk ? "" : ` RU: got "${targets.ru}" expected "${test.expectRU}"`
            console.log(`❌ ${test.path}${enMsg}${ruMsg}`)
            failures.push({ path: test.path, targets, expected: { en: test.expectEN, ru: test.expectRU } })
        }
    } catch (e) {
        failed++
        console.log(`💥 ${test.path} — FETCH ERROR: ${e.message}`)
        failures.push({ path: test.path, error: e.message })
    }
}

console.log(`\n── Итог ─────────────────────────────────────`)
console.log(`✅ Прошли:  ${passed}`)
console.log(`❌ Упали:   ${failed}`)
console.log(`📊 Всего:   ${testPages.length}`)

if (failures.length) {
    console.log(`\n── Детали провалов ───────────────────────────`)
    failures.forEach(f => console.log(JSON.stringify(f, null, 2)))
}
