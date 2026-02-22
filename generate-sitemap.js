const fs = require("fs");
const path = require("path");

const baseUrl = "https://devops-tools.minddreamer.online";
const rootDir = __dirname;

const ignoreFolders = ["node_modules", "css", "js"];

function getDirectories(dir) {
  return fs.readdirSync(dir).filter(file => {
    const fullPath = path.join(dir, file);
    return (
      fs.statSync(fullPath).isDirectory() &&
      !ignoreFolders.includes(file)
    );
  });
}

const folders = getDirectories(rootDir);

let urls = folders.map(folder => `
  <url>
    <loc>${baseUrl}/${folder}/</loc>
    <priority>0.8</priority>
  </url>
`).join("");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>${baseUrl}/</loc>
    <priority>1.0</priority>
  </url>

  ${urls}

</urlset>`;

fs.writeFileSync(path.join(rootDir, "sitemap.xml"), sitemap);

console.log("✅ sitemap.xml generated successfully");