const fs = require("fs");

// 从 markdown 源文件提取纯文本
function extractText(filePath) {
  try {
    const src = fs.readFileSync(filePath, "utf-8");
    const body = src.replace(/^---[\s\S]*?---\n*/, "");
    return body
      .replace(/^#+\s*/gm, "")           // 标题标记
      .replace(/\[([^\]]*)\]\([^)]+\)/g, "$1")  // 链接只留文字
      .replace(/[*_~`>]/g, "")            // 格式符号
      .replace(/\n{2,}/g, " ")            // 段落间距变空格
      .replace(/\s+/g, " ")
      .trim();
  } catch {
    return "";
  }
}

class SearchIndex {
  data() {
    return {
      permalink: "/search.json",
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    const index = [];
    const targetTags = ["post", "tutorial", "project"];

    for (const page of data.collections.all) {
      const raw = page.data && page.data.tags;
      if (!raw) continue;
      const tags = Array.isArray(raw) ? raw : [raw];
      if (!tags.some((t) => targetTags.includes(t))) continue;

      const text = extractText(page.inputPath);
      const excerpt =
        page.data.description ||
        (text.length > 160 ? text.slice(0, 160) + "…" : text);

      index.push({
        title: page.data.title || "",
        url: page.url,
        tags: tags.filter((t) => targetTags.includes(t)),
        excerpt,
        content: text,
      });
    }

    // 项目数据
    if (data.projects) {
      for (const proj of data.projects) {
        index.push({
          title: proj.title,
          url: proj.github,
          tags: ["project"],
          excerpt: proj.description || "",
        });
      }
    }

    return JSON.stringify(index);
  }
}

module.exports = SearchIndex;
