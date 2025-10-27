// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import readingTime from "reading-time";
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" } },
    cover: { type: "string", required: true },
    author: { type: "string", required: true },
    translationOf: { type: "string" },
    draft: { type: "boolean", default: false },
    keywords: { type: "list", of: { type: "string" } }
  },
  computedFields: {
    // 🧭 Язык статьи: en или ru
    locale: {
      type: "string",
      resolve: (post) => /(^|[\\/])en[\\/]/.test(post._raw.sourceFilePath) ? "en" : "ru"
    },
    // 🔗 Слаг — используется для slug и url
    slug: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath.replace(/^posts[\\/]/, "").replace(/^en[\\/]/, "")
    },
    // 🌐 Полный URL статьи
    url: {
      type: "string",
      resolve: (post) => /(^|[\\/])en[\\/]/.test(post._raw.sourceFilePath) ? `/en/posts/${post._raw.flattenedPath.replace(/^en[\\/]/, "")}` : `/posts/${post._raw.flattenedPath}`
    },
    // ⏱️ Время чтения
    readingTime: {
      type: "string",
      resolve: (post) => Math.ceil(readingTime(post.body.raw).minutes) + " \u043C\u0438\u043D"
    },
    // 📚 Оглавление для TableOfContents
    headings: {
      type: "json",
      resolve: (doc) => Array.from(doc.body.raw.matchAll(/^###?\s+(.*)$/gm)).map(
        ([, text]) => ({
          text,
          level: text.startsWith("##") ? 2 : 3
        })
      )
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content/posts",
  documentTypes: [Post]
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-2QKTT6W2.mjs.map
