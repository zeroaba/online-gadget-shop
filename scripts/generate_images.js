const fs = require("fs");
const path = require("path");
const products = require("./products.json");

const outDir = path.join(__dirname, "..", "frontend", "assets", "products");

const colorsByCategory = {
  mouse: { bg1: "#e6f5ef", bg2: "#f5efe6", accent: "#0a7a62" },
  monitor: { bg1: "#e8f1ff", bg2: "#f5f3ff", accent: "#2a4b9b" },
  headphones: { bg1: "#fff1e8", bg2: "#f7f0e9", accent: "#b84a00" }
};

const wrapName = (text, maxLen = 22) => {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  words.forEach(word => {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxLen) {
      if (line) lines.push(line);
      line = word;
    } else {
      line = next;
    }
  });
  if (line) lines.push(line);
  return lines.slice(0, 2);
};

const ensureDir = dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const makeSvg = product => {
  const colors = colorsByCategory[product.category] || colorsByCategory.mouse;
  const lines = wrapName(product.name);
  const lineY = lines.length === 1 ? [330] : [310, 350];
  const textLines = lines
    .map((line, idx) => {
      return `<text x="400" y="${lineY[idx]}" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" fill="#1b1b1b">${line}</text>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${colors.bg1}" />
      <stop offset="100%" stop-color="${colors.bg2}" />
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bg)" />
  <rect x="90" y="110" width="620" height="380" rx="38" fill="#ffffff" stroke="#d7ddd6" />
  <rect x="120" y="150" width="560" height="240" rx="28" fill="${colors.accent}" opacity="0.12" />
  <rect x="170" y="195" width="460" height="150" rx="22" fill="${colors.accent}" opacity="0.18" />
  ${textLines}
  <text x="400" y="430" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#5d645f">
    ${product.brand}
  </text>
</svg>`;
};

ensureDir(outDir);

products.forEach(product => {
  const filePath = path.join(outDir, path.basename(product.image));
  fs.writeFileSync(filePath, makeSvg(product), "utf8");
});

console.log(`Generated ${products.length} images in ${outDir}`);
