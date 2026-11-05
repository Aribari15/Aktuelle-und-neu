import { mkdir, readFile, writeFile } from 'node:fs/promises';

// Upstream: GPL-3.0-or-later; retain original copyright and license.
const upstream = 'https://raw.githubusercontent.com/InvalidPandaa/nuvio-german-providers/main/providers/serienstream.js';
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 25000);
let code;
try {
  const response = await fetch(upstream, { signal: controller.signal });
  if (!response.ok) throw new Error(`Upstream HTTP ${response.status}`);
  code = await response.text();
} finally {
  clearTimeout(timeout);
}
if (!code.includes('module.exports = provider(getStreams);')) {
  throw new Error('Upstream-Struktur unerwartet geändert. Veröffentlichung gestoppt.');
}
await mkdir('dist/providers', { recursive: true });
await writeFile('dist/providers/serienstream.js', '/* Basierend auf InvalidPandaa/nuvio-german-providers, GPL-3.0-or-later. */\n' + code);
await writeFile('dist/manifest.json', await readFile('manifest.json', 'utf8'));
console.log('Build erfolgreich. Dies bestätigt keine Live-Wiedergabe.');
