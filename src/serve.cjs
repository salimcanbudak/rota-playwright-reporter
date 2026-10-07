#!/usr/bin/env node
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = fs.realpathSync(path.resolve(process.argv[2] || 'rota-report'));
const port = Number(process.argv[3] || 9324);
const types = {'.html':'text/html; charset=utf-8','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.webm':'video/webm','.zip':'application/zip'};
http.createServer((req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = fs.realpathSync(path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname)));
    if (!file.startsWith(root + path.sep) || !fs.statSync(file).isFile()) throw new Error();
    res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    if (file.startsWith(path.join(root, 'assets') + path.sep) && !['.png','.jpg','.webm'].includes(path.extname(file))) res.setHeader('Content-Disposition', 'attachment');
    fs.createReadStream(file).pipe(res);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(port, '127.0.0.1', () => console.log(`Rapor: http://127.0.0.1:${port}`));
