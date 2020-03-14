import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio';
import { EXCLUDEDIR } from './constant.js';

async function clearMarkdownCreatedHTML() {
    const pwd = path.resolve(__dirname, '../');
    const allFilePath = fs.readdirSync(pwd);
    allFilePath.forEach(fileDirName => {
        const fullDirPath = path.resolve(pwd, fileDirName);
        const stats = fs.statSync(fullDirPath);
        if (stats.isDirectory() && !EXCLUDEDIR.includes(fileDirName)) {
            fs.readdirSync(fullDirPath)
                .filter(fileName => !(/\.md$/.test(fileName)))
                .forEach(item => fs.unlinkSync(`${fullDirPath}/${item}`))
        }
    })
    console.log('预发布：清除md生成的html完毕!');
}

async function changeLibSrcAndclearGlobalVar() {
    const $ = cheerio.load(fs.readFileSync('./index.html').toString());
    $('#globalScript').text('');
    $('#React').attr('src','https://cdn.bootcss.com/react/16.8.6/umd/react.development.js');
    $('#ReactDom').attr('src','https://cdn.bootcss.com/react-dom/16.8.6/umd/react-dom.development.js');
    $('#Babel').attr('src','https://cdn.bootcss.com/babel-standalone/6.26.0/babel.js');
    fs.writeFileSync('./index.html', $.html());
    console.log('预发布：三方库资源更换&清除全局变量完毕!!');
}

async function checkAll() {

    await clearMarkdownCreatedHTML();

    await changeLibSrcAndclearGlobalVar();

}

checkAll();