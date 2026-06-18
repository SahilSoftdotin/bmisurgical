// Minimal static file server for the BMI Surgical Institute concepts.
// Usage: node server.js   ->   http://localhost:8080
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = process.env.PORT || 8080;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.join(ROOT, path.normalize(urlPath).replace(/^(\.\.[/\\])+/, ''));
  if (!filePath.startsWith(ROOT)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404, {'Content-Type':'text/html'}); return res.end('<h1>404 Not Found</h1><p><a href="/">Back to concepts</a></p>'); }
    res.writeHead(200, {'Content-Type': TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream'});
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`\n  BMI Surgical Institute concepts running:\n`);
  console.log(`  Local:   http://localhost:${PORT}`);
  console.log(`  Concept A: http://localhost:${PORT}/clean-modern.html`);
  console.log(`  Concept B: http://localhost:${PORT}/warm-friendly.html\n`);
});
