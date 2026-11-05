import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const manifest = JSON.parse(await readFile('manifest.json', 'utf8'));
assert.equal(manifest.scrapers.length, 1);
const scraper = manifest.scrapers[0];
assert.equal(scraper.id, 'serienstream-ch');
assert.deepEqual(scraper.supportedTypes, ['tv']);
assert.equal(scraper.filename, 'providers/serienstream.js');
if (process.argv.includes('--dist')) {
  const built = JSON.parse(await readFile('dist/manifest.json', 'utf8'));
  assert.deepEqual(built, manifest);
  const code = await readFile('dist/providers/serienstream.js', 'utf8');
  assert.ok(code.includes('module.exports = provider(getStreams);'));
}
console.log('Strukturtests erfolgreich. Live-Playback nicht geprüft.');
