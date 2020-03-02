import fs from 'fs';
import path from 'path';
import cp from 'child_process';

// 当前目录
const pwd = path.resolve(__dirname);
// 读取当前目录下的所有文件和文件夹
const allFilePath = fs.readdirSync(pwd);

// 排除不需要的文件夹
const EXCLUDEDIR = ['.git', 'node_modules', '.DS_Store'];
const DSSTORE = '.DS_Store';

// 将笔记文件夹放入笔记文件夹list
const noteDir = allFilePath
    .map(fileDirName => {
        const fullDirPath = path.resolve(__dirname, fileDirName);
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
        const fullDirPath = path.resolve(__dirname, fileDirName);
        const stats = fs.statSync(fullDirPath);
        if (stats.isDirectory() && !EXCLUDEDIR.includes(fileDirName)) {
            return {
                fileDirName,
                fullDirPath,
                fileNames: fs.readdirSync(fullDirPath).filter(fileName => /\.html$/.test(fileName))
            }
        }
    })
    .filter(item => item);


fs.writeFileSync(
    './index.html',
    fs.readFileSync('./index.html')
        .toString()
        .replace('globalScript', `
            window.noteHtmlDir=${JSON.stringify(noteHtmlDir)}
        `)
);
// console.log('noteHtmlDir: ', noteHtmlDir);
