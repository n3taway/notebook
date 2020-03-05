import fs from 'fs';
import cheerio from 'cheerio';
import liveServer from 'live-server';

async function switchSrc() {
    const $ = cheerio.load(fs.readFileSync('./index.html').toString());
    $('#React').attr('src', './lib/react.development.js');
    $('#ReactDom').attr('src', './lib/react-dom.development.js');
    $('#Babel').attr('src', './lib/babel.js');
    fs.writeFileSync('./index.html', $.html());
    console.log('switchSrc done!');
}

async function localService() {
    const params = {
        port: 8080, // Set the server port. Defaults to 8080.
        host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
        root: "./", // Set root directory that's being served. Defaults to cwd.
        open: false, // When false, it won't load your browser by default.
        file: "index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
        logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
    };
    liveServer.start(params);
}

async function dev() {
    await switchSrc();
    await localService();
}

dev();