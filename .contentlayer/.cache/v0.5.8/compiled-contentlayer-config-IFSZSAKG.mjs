// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import remarkMdxImages from "remark-mdx-images";
var toDate = (input) => {
  if (!input) return null;
  const d = new Date(input);
  return isNaN(d.getTime()) ? null : d;
};
var estimateReadingTime = (text) => {
  const words = (text || "").replace(/\s+/g, " ").trim().split(" ").filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return { words, minutes };
};
function slugifyUnicode(text) {
  return text.toLowerCase().normalize("NFKD").replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s+/g, "-");
}
function extractHeadings(raw) {
  const lines = raw.split(/\n/);
  const out = [];
  for (const line of lines) {
    const m2 = line.match(/^##\s+(.+)/);
    const m3 = line.match(/^###\s+(.+)/);
    const hit = m2 ? { level: 2, text: m2[1].trim() } : m3 ? { level: 3, text: m3[1].trim() } : null;
    if (hit) {
      const slug = slugifyUnicode(hit.text);
      out.push({ level: hit.level, text: hit.text, slug });
    }
  }
  return out;
}
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  // файлы лежат в content/posts/**/*
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true, description: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A" },
    description: { type: "string", required: true, description: "\u041A\u0440\u0430\u0442\u043A\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" },
    date: { type: "date", required: true, description: "YYYY-MM-DD" },
    updated: { type: "date", required: false, description: "\u0414\u0430\u0442\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F" },
    cover: { type: "string", required: false, description: "\u041F\u0443\u0442\u044C \u043E\u0442 /public" },
    tags: { type: "list", of: { type: "string" }, required: false },
    draft: { type: "boolean", required: false, default: false },
    author: { type: "string", required: false, default: "repair-blog" }
    // ВНИМАНИЕ: readingTime НЕ поле, а computedField ниже
  },
  computedFields: {
    // Превращаем content/posts/painting/prepare-walls.mdx → painting/prepare-walls
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^posts\//, "")
    },
    url: {
      type: "string",
      resolve: (doc) => `/posts/${doc._raw.flattenedPath.replace(/^posts\//, "")}`
    },
    dateParsed: {
      type: "date",
      resolve: (doc) => toDate(doc.date)
    },
    updatedParsed: {
      type: "date",
      resolve: (doc) => toDate(doc.updated || null)
    },
    toc: {
      type: "json",
      resolve: (doc) => extractHeadings(doc.body.raw)
    },
    readingTime: {
      type: "json",
      resolve: (doc) => estimateReadingTime(doc.body.raw)
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  disableImportAliasWarning: true,
  mdx: {
    remarkPlugins: [
      remarkGfm,
      remarkMdxImages
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "append" }]
    ]
  }
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-IFSZSAKG.mjs.map
