import fs from 'fs';
import path from 'path';
import cp from 'child_process';
import cheerio from 'cheerio';
import { EXCLUDEDIR } from './constant.js';

const pwd = path.resolve(__dirname, '../');
// 读取该目录下的所有文件和文件夹
const allFilePath = fs.readdirSync(pwd);

// 将笔记文件夹放入笔记文件夹list
const noteDir = allFilePath
    .map(fileDirName => {
        const fullDirPath = path.resolve(pwd, fileDirName);
        const stats = fs.statSync(fullDirPath);
        if (stats.isDirectory() && !EXCLUDEDIR.includes(fileDirName)) {
            return {
                fullDirPath,
                fileNames: fs.readdirSync(fullDirPath).filter(fileName => /\.md$/.test(fileName))
            }
        }
    })
    .filter(item => item);
// console.log('>>>', noteDir);
noteDir.forEach(note => {
    const { fullDirPath, fileNames } = note;
    fileNames.forEach(fileName => {
        cp.spawnSync(
            'ghmd',//执行命令
            [fileName],//命令参数
            {
                cwd: fullDirPath  //指定路径 执行以上命令
            }
        );
    });
});


// 生成html后遍历
const generateHtmlAllFilePath = fs.readdirSync(pwd);
const noteHtmlDir = generateHtmlAllFilePath
    .map(fileDirName => {
        const fullDirPath = path.resolve(pwd, fileDirName);
        const stats = fs.statSync(fullDirPath);
        if (stats.isDirectory() && !EXCLUDEDIR.includes(fileDirName)) {
            return {
                fileDirName,
                fileNames: fs.readdirSync(fullDirPath).filter(fileName => /\.html$/.test(fileName))
            }
        }
    })
    .filter(item => item);

const $ = cheerio.load(fs.readFileSync('./index.html').toString());
$('#globalScript').text(`window.noteHtmlDir=${JSON.stringify(noteHtmlDir)}`);
fs.writeFileSync('./index.html', $.html());

// console.log('noteHtmlDir: ', noteHtmlDir);
