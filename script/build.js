import fs from "fs";
import path from "path";
import cheerio from "cheerio";
import showdown from "showdown";
import { EXCLUDEDIR } from "./constant.js";

const converter = new showdown.Converter();

const getDirInfo = (dir) => {
  const files = fs.readdirSync(dir);
  const noteDirs = files.map((file) => {
    const filePath = path.resolve(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory() && !EXCLUDEDIR.includes(file)) {
      return {
        date: file,
        filePath,
        files: fs
          .readdirSync(filePath)
          .filter((fileName) => /\.md$/.test(fileName)),
      };
    }
  });
  const result = noteDirs
    .filter((i) => i)
    .reduce((pre, item) => {
      const result = item.files.map((i) => {
        const name = i.split(".md")[0];
        return {
          name,
          date: item.date,
          mdPath: `${item.filePath}/${name}.md`,
          htmlPath: `${item.filePath}/${name}.html`,
        };
      });
      return [...pre, ...result];
    }, []);
  return result;
};

const genHtml = (list) => {
  for (const item of list) {
    const mdStr = fs.readFileSync(item.mdPath, "utf8");
    const html = converter.makeHtml(mdStr);
    fs.writeFileSync(item.htmlPath, html, "utf8");
  }
};

const rootDir = path.resolve(__dirname, "../");

const fileInfo = getDirInfo(rootDir);

genHtml(fileInfo);

const noteHtmlDir = [...new Set(fileInfo.map((i) => i.date))].map((date) => {
  return {
    fileDirName: date,
    fileNames: fileInfo.filter((o) => o.date === date).map((r) => r.name),
  };
});

const $ = cheerio.load(fs.readFileSync("./index.html").toString());
$("#globalScript").text(`window.noteHtmlDir=${JSON.stringify(noteHtmlDir)}`);
fs.writeFileSync("./index.html", $.html());

// console.log("noteHtmlDir: ", noteHtmlDir);
