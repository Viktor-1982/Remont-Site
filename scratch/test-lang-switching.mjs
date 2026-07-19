import fs from 'fs';
import path from 'path';

const contentDir = 'c:/Users/Viktor/projects/repair-blog/content/posts';

function parseFrontmatter(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return {};
    
    const lines = match[1].split('\n');
    const metadata = {};
    for (const line of lines) {
        const parts = line.split(':');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            let value = parts.slice(1).join(':').trim();
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            }
            if (value.startsWith("'") && value.endsWith("'")) {
                value = value.slice(1, -1);
            }
            metadata[key] = value;
        }
    }
    return metadata;
}

function getPostInfo(dir, locale) {
    const files = fs.readdirSync(dir);
    const posts = [];
    for (const file of files) {
        if (file.endsWith('.mdx')) {
            const filePath = path.join(dir, file);
            const meta = parseFrontmatter(filePath);
            const slug = file.replace('.mdx', '');
            posts.push({
                file,
                filePath,
                slug,
                locale,
                translationOf: meta.translationOf || null,
                title: meta.title || slug
            });
        }
    }
    return posts;
}

// 1. Собираем посты
const ruPosts = getPostInfo(contentDir, 'ru');
const enPosts = getPostInfo(path.join(contentDir, 'en'), 'en');
const allPosts = [...ruPosts, ...enPosts];

console.log(`Loaded ${ruPosts.length} Russian posts and ${enPosts.length} English posts.`);

// Симуляция логики API /api/switch-target
function findMirror(current, all) {
    const key = current.translationOf || current.slug;
    return all.find(p => 
        (p.translationOf === key || p.slug === key) && 
        p.locale !== current.locale
    );
}

let errors = 0;
let success = 0;

console.log('\n--- VERIFYING LANGUAGE SWITCHES ---');

for (const post of allPosts) {
    const mirror = findMirror(post, allPosts);
    if (!mirror) {
        console.error(`[FAIL] No translation found for: ${post.locale.toUpperCase()} "${post.file}" (slug: ${post.slug}, translationOf: ${post.translationOf})`);
        errors++;
    } else {
        // Проверяем взаимность
        const backMirror = findMirror(mirror, allPosts);
        if (!backMirror || backMirror.slug !== post.slug) {
            console.error(`[WARN] Asymmetric translation mapping: ${post.locale.toUpperCase()} "${post.file}" -> ${mirror.locale.toUpperCase()} "${mirror.file}", but back-mapping leads to "${backMirror ? backMirror.file : 'none'}"`);
            errors++;
        } else {
            success++;
        }
    }
}

console.log(`\nVerification finished: ${success} successful mappings, ${errors} warnings/errors.`);
if (errors > 0) {
    process.exit(1);
} else {
    console.log('[OK] All language switches match perfectly!');
    process.exit(0);
}
