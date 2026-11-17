import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { handler } from './src/lambda.js';

const root = fileURLToPath(new URL('.', import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' };
const port = Number(process.env.PORT || 3000);

createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname === '/api/rankings') {
    const payload = await handler({ queryStringParameters: Object.fromEntries(url.searchParams) });
    res.writeHead(payload.statusCode, payload.headers); res.end(payload.body); return;
  }
  const relative = url.pathname === '/' ? 'index.html' : url.pathname.slice(1);
  if (relative.includes('..')) { res.writeHead(403); res.end(); return; }
  try {
    const file = await readFile(join(root, 'public', relative));
    res.writeHead(200, { 'content-type': types[extname(relative)] ?? 'application/octet-stream' }); res.end(file);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(port, () => console.log(`EuroTrip Predictor: http://localhost:${port}`));
