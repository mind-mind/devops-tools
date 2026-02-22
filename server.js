const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get("/sitemap.xml", (req, res) => {
  const baseUrl = "https://devops-tools.minddreamer.online";
  const ignoreFolders = ["node_modules", "css", "js"];

  const folders = fs.readdirSync(__dirname).filter(file => {
    return (
      fs.statSync(path.join(__dirname, file)).isDirectory() &&
      !ignoreFolders.includes(file)
    );
  });

  const urls = folders.map(folder => `
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

  res.header("Content-Type", "application/xml");
  res.send(sitemap);
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});