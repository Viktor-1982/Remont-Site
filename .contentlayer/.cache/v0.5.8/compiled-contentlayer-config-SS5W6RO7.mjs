// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
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
    cover: { type: "string" },
    tags: { type: "list", of: { type: "string" } },
    readingTime: { type: "number" }
  },
  computedFields: {
    slug: { type: "string", resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, "") },
    headings: { type: "json", resolve: (doc) => extractHeadings(doc.body.raw) },
    url: { type: "string", resolve: (doc) => `/posts/${doc._raw.flattenedPath.replace(/^posts\//, "")}` }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  disableImportAliasWarning: true,
  mdx: {
    /* ... */
  }
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-SS5W6RO7.mjs.map
