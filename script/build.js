import fs from "fs";
import path from "path";
import cheerio from "cheerio";
import marked from "marked";
import highlight from "highlight.js";
import globby from "globby";

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  escaped: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  // fix background not work
  // https://github.com/jonschlinkert/remarkable/issues/224
  langPrefix: "hljs language-",
  highlight(code) {
    return highlight.highlightAuto(code).value;
  },
});

const getNoteDirInfo = async () => {
  const matchPath = path.resolve(__dirname, "../pages/2???.??/*.md");
  const paths = await globby(matchPath);
  const files = paths.map((item) => {
    const arr = item.split("/");
    const date = arr[arr.length - 2];
    const title = arr[arr.length - 1].split(".")[0];
    arr.pop();
    const pathPrefix = arr.join("/").concat(`/${title}`);
    return {
      date,
      title,
      mdPath: `${pathPrefix}.md`,
      htmlPath: `${pathPrefix}.html`,
    };
  });
  return files;
};

const genHtml = async (list) => {
  for (const file of list) {
    const mdStr = await fs.readFileSync(file.mdPath, "utf8");
    const html = marked(mdStr);
    const templatePath = path.resolve(__dirname, "../template/layout.html");
    const $ = cheerio.load(fs.readFileSync(templatePath).toString());
    $("body").append(html);
    $("title").text(file.title);
    fs.writeFileSync(file.htmlPath, $.html(), "utf8");
  }
};

const formatInjectParam = (params) => {
  const result = [...new Set(params.map((i) => i.date))].sort().map((date) => {
    return {
      fileDirName: date,
      fileNames: params.filter((o) => o.date === date).map((r) => r.title),
    };
  });
  return result;
};

const indexHtmlInject = (params) => {
  const indexHtmlPath = "./index.html";
  const $ = cheerio.load(fs.readFileSync(indexHtmlPath).toString());
  $("#globalScript").text(`window.noteList=${JSON.stringify(params)}`);
  fs.writeFileSync(indexHtmlPath, $.html());
};

const main = async () => {
  const noteDirInfo = await getNoteDirInfo();

  await genHtml(noteDirInfo);

  const noteList = formatInjectParam(noteDirInfo);

  indexHtmlInject(noteList);
};

main();
