module.exports = function (eleventyConfig) {
  // 静态资源直接复制到输出目录
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy(".nojekyll");
  eleventyConfig.addPassthroughCopy({ "node_modules/swup/dist/Swup.umd.js": "js/swup.js" });

  // 全局数据
  eleventyConfig.addGlobalData("year", new Date().getFullYear());

  // 日期格式化过滤器
  eleventyConfig.addFilter("formatDate", function (date) {
    const d = new Date(date);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  });

  // 项目集合
  eleventyConfig.addCollection("projects", function (collection) {
    return collection.getFilteredByTag("project");
  });

  // 教程集合
  eleventyConfig.addCollection("tutorials", function (collection) {
    return collection.getFilteredByTag("tutorial");
  });

  // 博客集合
  eleventyConfig.addCollection("posts", function (collection) {
    return collection.getFilteredByTag("post");
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
