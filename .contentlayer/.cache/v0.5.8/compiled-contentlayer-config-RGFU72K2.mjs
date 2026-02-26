var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/lib/parse-faq.ts
var parse_faq_exports = {};
__export(parse_faq_exports, {
  parseFAQ: () => parseFAQ
});
function parseFAQ(content) {
  const faqs = [];
  const faqMatch = content.match(/##\s*[❓💬]?\s*(?:FAQ|Частые вопросы|частые вопросы|часто задаваемые вопросы|Ответы на частые вопросы)[\s\S]*?(?=##|$)/i);
  if (!faqMatch) return faqs;
  const faqSection = faqMatch[0];
  const questionPattern1 = /\*\*([^*]+?)\*\*\s*\n+([^\n]+(?:\n(?!\*\*)[^\n]+)*?)(?=\n\*\*|\n---|$)/g;
  let match;
  while ((match = questionPattern1.exec(faqSection)) !== null) {
    const question = match[1].trim();
    const answer = match[2].trim().replace(/\*\*/g, "").replace(/\n\n+/g, " ").replace(/\n/g, " ").trim();
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }
  if (faqs.length === 0) {
    const lines = faqSection.split("\n");
    let currentQuestion = "";
    let currentAnswer = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("##")) continue;
      if (line.match(/^\*\*.*\?\*\*$/)) {
        if (currentQuestion && currentAnswer.length > 0) {
          faqs.push({
            question: currentQuestion.replace(/\*\*/g, ""),
            answer: currentAnswer.join(" ").trim()
          });
        }
        currentQuestion = line;
        currentAnswer = [];
      } else if (line.endsWith("?") && !line.includes("**")) {
        if (currentQuestion && currentAnswer.length > 0) {
          faqs.push({
            question: currentQuestion.replace(/\*\*/g, ""),
            answer: currentAnswer.join(" ").trim()
          });
        }
        currentQuestion = line;
        currentAnswer = [];
      } else if (currentQuestion && line && !line.startsWith("##") && !line.startsWith("---")) {
        currentAnswer.push(line.replace(/\*\*/g, ""));
      } else if ((line.startsWith("---") || line.startsWith("##")) && currentQuestion && currentAnswer.length > 0) {
        faqs.push({
          question: currentQuestion.replace(/\*\*/g, ""),
          answer: currentAnswer.join(" ").trim()
        });
        break;
      }
    }
    if (currentQuestion && currentAnswer.length > 0) {
      faqs.push({
        question: currentQuestion.replace(/\*\*/g, ""),
        answer: currentAnswer.join(" ").trim()
      });
    }
  }
  return faqs;
}
var init_parse_faq = __esm({
  "src/lib/parse-faq.ts"() {
    "use strict";
  }
});

// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

// src/lib/rehype-remove-faq.ts
function rehypeRemoveFaq() {
  return (tree) => {
    let startIndex = -1;
    let endIndex = -1;
    for (let i = 0; i < tree.children.length; i++) {
      const node = tree.children[i];
      if (node.type === "element" && (node.tagName === "h2" || node.tagName === "h3")) {
        const text = node.children.filter((child) => child.type === "text").map((child) => child.value).join("");
        if (/FAQ|часто задаваемые вопросы|частые вопросы|frequently asked questions|common questions/i.test(text)) {
          startIndex = i;
          break;
        }
      }
    }
    if (startIndex !== -1) {
      for (let i = startIndex + 1; i < tree.children.length; i++) {
        const node = tree.children[i];
        if (node.type === "element" && (node.tagName === "h2" || node.tagName === "h3" || node.tagName === "hr")) {
          endIndex = i;
          break;
        }
      }
      if (endIndex === -1) {
        endIndex = tree.children.length;
      }
      if (endIndex > startIndex + 1) {
        tree.children.splice(startIndex + 1, endIndex - startIndex - 1);
      }
    }
  };
}

// contentlayer.config.ts
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
    // Вычисляем время чтения с учетом реальной скорости чтения для каждого языка
    // Русский: ~180 слов/мин (более медленное чтение из-за сложности языка)
    // Английский: ~200 слов/мин (стандартная скорость)
    readingTime: {
      type: "string",
      resolve: (post) => {
        const isEnglish = /(^|[\\/])en[\\/]/.test(post._raw.sourceFilePath);
        const wordsPerMinute = isEnglish ? 200 : 180;
        const time = readingTime(post.body.raw, { wordsPerMinute });
        return Math.ceil(time.minutes) + " \u043C\u0438\u043D";
      }
    },
    // 📚 Оглавление для TableOfContents
    headings: {
      type: "json",
      resolve: (doc) => Array.from(doc.body.raw.matchAll(/^(##+)\s+(.*)$/gm)).map(
        ([, markers, text]) => ({
          text,
          level: markers.length
          // ## = 2, ### = 3
        })
      )
    },
    // ❓ Подготовленный FAQ для компонента (чтобы не парсить в клиентском браузере)
    faqItems: {
      type: "json",
      resolve: (doc) => {
        Promise.resolve().then(() => (init_parse_faq(), parse_faq_exports)).then((m) => m.parseFAQ).catch(() => () => []).then((parseFAQ2) => parseFAQ2(doc.body.raw));
      }
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content/posts",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section"
          }
        }
      ],
      rehypeRemoveFaq
      // 🧹 Очищаем оригинальный текст FAQ (оставляя только заголовок для компонента)
    ]
  }
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-RGFU72K2.mjs.map
