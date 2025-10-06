// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import remarkMdxImages from "remark-mdx-images";
function extractHeadings(raw) {
  const lines = raw.split(/\n/);
  const out = [];
  for (const line of lines) {
    const m2 = line.match(/^##\s+(.+)/);
    const m3 = line.match(/^###\s+(.+)/);
    const hit = m2 ? { level: 2, text: m2[1].trim() } : m3 ? { level: 3, text: m3[1].trim() } : null;
    if (hit) {
      const slug = hit.text.toLowerCase().replace(/[^\wа-яё\s-]/gi, "").replace(/\s+/g, "-");
      out.push({ level: hit.level, text: hit.text, slug });
    }
  }
  return out;
}
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    date: { type: "date", required: true },
    // YYYY-MM-DD
    cover: { type: "string" },
    tags: { type: "list", of: { type: "string" } },
    author: { type: "string" },
    translationOf: { type: "string", required: false },
    draft: { type: "boolean", default: false },
    keywords: { type: "list", of: { type: "string" }, required: false }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, "")
    },
    locale: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.startsWith("posts/en/") ? "en" : "ru"
    },
    url: {
      type: "string",
      resolve: (doc) => {
        const slug = doc._raw.sourceFileName.replace(/\.mdx$/, "");
        return doc._raw.flattenedPath.startsWith("posts/en/") ? `/en/posts/${slug}` : `/posts/${slug}`;
      }
    },
    headings: { type: "json", resolve: (doc) => extractHeadings(doc.body.raw) },
    dateParsed: {
      type: "string",
      resolve: (doc) => doc.date ? new Date(doc.date).toISOString() : null
    },
    readingTime: {
      type: "number",
      resolve: (doc) => {
        const words = doc.body.raw ? doc.body.raw.split(/\s+/).length : 0;
        const minutes = Math.max(1, Math.ceil(words / 200));
        return minutes;
      }
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  disableImportAliasWarning: true,
  mdx: {
    remarkPlugins: [remarkGfm, remarkMdxImages],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
  }
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-5DCSATG2.mjs.map
