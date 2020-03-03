import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio';
import { EXCLUDEDIR } from './constant.js';

async function checkDir() {
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
    console.log('checkDir done!');
}

async function checkHTML() {
    const $ = cheerio.load(fs.readFileSync('./index.html').toString());
    $('#globalScript').text('');
    fs.writeFileSync('./index.html', $.html());
    console.log('checkHTML done!');
}

async function checkAll() {

    await checkDir();

    await checkHTML();

}

checkAll();