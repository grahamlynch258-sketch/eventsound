// Serves dist/ the way Netlify does, for local checks of a finished build:
//   node scripts/serve-dist.mjs [port]
// Real files first, then public/_redirects rules (301s, SPA rewrites, 404).
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const DIST = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const PORT = Number(process.argv[2] || process.env.PORT || 4173);
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml' };

const rules = fs.readFileSync(path.join(DIST, '_redirects'), 'utf-8').split(/\r?\n/)
  .map(line => line.trim()).filter(line => line && !line.startsWith('#'))
  .map(line => { const [from, to, status] = line.split(/\s+/); return { from, to, status: Number(status) }; });

const send = (res, status, file) => { res.writeHead(status, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' }); fs.createReadStream(file).pipe(res); };
const isFile = f => fs.existsSync(f) && fs.statSync(f).isFile();

http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const target = path.normalize(path.join(DIST, pathname));
  if (!target.startsWith(DIST)) { res.writeHead(403).end(); return; }
  if (isFile(target)) return send(res, 200, target);
  if (pathname.endsWith('/') && isFile(path.join(target, 'index.html'))) return send(res, 200, path.join(target, 'index.html'));
  const rule = rules.find(r => (r.from.endsWith('*') ? pathname.startsWith(r.from.slice(0, -1)) : r.from === pathname));
  if (!rule) { res.writeHead(404).end('Not found'); return; }
  if (rule.status === 301 || rule.status === 302) { res.writeHead(rule.status, { Location: rule.to }).end(); return; }
  send(res, rule.status, path.join(DIST, rule.to));
}).listen(PORT, () => console.log(`dist served at http://localhost:${PORT}`));
