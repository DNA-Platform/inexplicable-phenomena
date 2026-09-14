import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const cover = resolve(here, '../../.encyclopedia/.cover.tsx');
const portal = 'https://www.wikipedia.org/';

const page = await fetch(portal).then(answer => answer.text());
const featured = /<div class="central-featured-lang lang(\d+)"[^>]*>\s*<a[^>]*href="([^"]+)"[^>]*>\s*<strong>([^<]+)<\/strong>\s*<small>([\s\S]*?)<\/small>/g;

const read = [];
for (let found; (found = featured.exec(page));) {
    const [, at, href, name, said] = found;
    read.push({
        at: Number(at),
        url: href.startsWith('//') ? `https:${href}` : href,
        name,
        said: said.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
    });
}
read.sort((one, two) => one.at - two.at);

if (read.length !== 10) {
    console.error(`languages: the portal names ten featured editions and this read ${read.length} — the markup moved`);
    process.exit(1);
}

const lines = read.map(one =>
    `                    <Language at={${one.at}}><BookLink>[${one.name}](${one.url})</BookLink> ${one.said}</Language>`);

const source = await readFile(cover, 'utf8');
const opening = source.indexOf('<Heading>Read Wikipedia in your language</Heading>');
const closing = source.indexOf('</Languages>');
if (opening === -1 || closing === -1 || closing < opening) {
    console.error('languages: the cover no longer carries a Languages ring with its heading');
    process.exit(1);
}

const head = source.slice(0, source.indexOf('\n', opening) + 1);
const tail = source.slice(source.lastIndexOf('\n', closing) + 1);
const written = `${head}${lines.join('\n')}\n${tail}`;
await writeFile(cover, written, 'utf8');

console.log(`languages: ${read.length} read from ${portal} on ${new Date().toISOString().slice(0, 10)}`);
for (const one of read) console.log(`  ${String(one.at).padStart(2)} ${one.name} — ${one.said}`);
console.log(`written into ${cover.slice(cover.indexOf('.wiki'))}`);
