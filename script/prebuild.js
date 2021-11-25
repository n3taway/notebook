import fs from "fs";
import path from "path";
import cheerio from "cheerio";
import globby from "globby";

async function clearMarkdownCreatedHTML() {
  const htmlFilePath = path.resolve(__dirname, "../pages/**/*.html");
  const filePaths = await globby(htmlFilePath);
  for (const htmlPath of filePaths) {
    await fs.unlinkSync(htmlPath);
  }
  console.log("预发布：清除md生成的html完毕!");
}

async function changeLibSrcAndClearGlobalVar() {
  const indexHtmlPath = "./index.html";
  const $ = cheerio.load(fs.readFileSync(indexHtmlPath).toString());
  $("#globalScript").text("");
  $("#React").attr(
    "src",
    "https://cdn.jsdelivr.net/npm/react@16.8.6/cjs/react.production.min.js"
  );
  $("#ReactDom").attr(
    "src",
    "https://cdn.jsdelivr.net/npm/react-dom@16.8.6/umd/react-dom.production.min.js"
  );
  $("#Babel").attr(
    "src",
    "https://cdn.jsdelivr.net/npm/babel-standalone@6.26.0/babel.min.js"
  );
  fs.writeFileSync(indexHtmlPath, $.html());
  console.log("预发布：三方库资源更换&清除全局变量完毕!!");
}

async function checkAll() {
  await clearMarkdownCreatedHTML();
  await changeLibSrcAndClearGlobalVar();
}

checkAll();
