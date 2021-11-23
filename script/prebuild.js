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
    "https://cdn.bootcss.com/react/16.8.6/umd/react.development.js"
  );
  $("#ReactDom").attr(
    "src",
    "https://cdn.bootcss.com/react-dom/16.8.6/umd/react-dom.development.js"
  );
  $("#Babel").attr(
    "src",
    "https://cdn.bootcss.com/babel-standalone/6.26.0/babel.js"
  );
  fs.writeFileSync(indexHtmlPath, $.html());
  console.log("预发布：三方库资源更换&清除全局变量完毕!!");
}

async function checkAll() {
  await clearMarkdownCreatedHTML();
  await changeLibSrcAndClearGlobalVar();
}

checkAll();
