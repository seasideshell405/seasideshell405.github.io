const fs = require("fs");
const path = require("path");

module.exports = () => {
  const dir = path.join(__dirname, "..", "images");
  const galleryFile = path.join(dir, ".gallery");
  if (!fs.existsSync(galleryFile)) return [];

  // 读取精选名单
  const selected = fs
    .readFileSync(galleryFile, "utf-8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.endsWith(".webp"));

  return selected.map((f) => {
    const fp = path.join(dir, f);
    const sizeKB = fs.existsSync(fp) ? Math.round(fs.statSync(fp).size / 1024) : 0;
    return { file: f, url: `http://119.29.152.144/images/${f}`, size: `${sizeKB}KB` };
  });
};
