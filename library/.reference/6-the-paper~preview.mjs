// Makes the small picture of a publication: its first page, drawn by Chrome's own viewer with the viewer's toolbar
// and panes asked off, photographed at a page's shape and cut to the page. The viewer draws a document served to
// it and not one opened from the disk as a file, so the tool serves the PDF itself for the moment of the
// photograph. Run once for a paper, and the picture stands beside the paper's chapter as any picture does.
//
//     node library/.reference/6-the-paper~preview.mjs <paper.pdf> <picture.png> [page]
//
// The page is the first unless said otherwise: a scan of a bound book opens on its boards, and its title page is
// the one to show.

import { readFileSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repository = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const puppeteer = createRequire(resolve(repository, 'package.json'))('puppeteer');
const [paper, picture, pageNumber = '1'] = process.argv.slice(2);
if (paper === undefined || picture === undefined) { console.log('node 6-the-paper~preview.mjs <paper.pdf> <picture.png> [page]'); process.exit(1); }

// THE PAGE'S OWN SHAPE, read off the first page box the PDF declares, so a letter-size paper and an A4 one are each
// cut to their page; A4's shape where a PDF declares none. The viewer draws the page across the width and leaves a
// gutter of its own colour at the edges, which the cut leaves out.
const bytes = readFileSync(resolve(paper));
const box = /MediaBox\s*\[\s*([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)\s*\]/u.exec(bytes.toString('latin1'));
const shape = box === null ? 1.4142 : Math.abs(Number(box[4]) - Number(box[2])) / Math.abs(Number(box[3]) - Number(box[1]));
const width = 640;
const gutter = 10;
const height = Math.round((width - 2 * gutter) * shape) + 2 * gutter;

// THE WHOLE DOCUMENT AT ONCE, AND NO RANGES OFFERED: offered ranges, the viewer drew the page and cleared it again
// between two photographs, or never drew; given the whole file it draws and keeps it. Measured 2026-11-10.
const server = createServer((request, response) => {
    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Length', bytes.length);
    response.end(bytes);
});
await new Promise(ready => server.listen(0, '127.0.0.1', ready));
const { port } = server.address();

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width, height });
await page.goto(`http://127.0.0.1:${port}/paper.pdf#toolbar=0&navpanes=0&scrollbar=0&page=${pageNumber}`, { waitUntil: 'load', timeout: 60000 });
// THE VIEWER DRAWS WHEN IT DRAWS, and nothing in the page says when: a photograph of a page not yet drawn weighs a
// few kilobytes and one drawn weighs many, so the tool photographs until the weight says drawn, for twenty seconds
// at most, and says so when it gave up.
const clip = { x: gutter, y: 0, width: width - 2 * gutter, height: height - 2 * gutter };
let photograph;
let waited = 0;
for (;;) {
    await new Promise(settle => setTimeout(settle, 1000));
    waited += 1;
    photograph = await page.screenshot({ clip });
    if (photograph.length > 8000 || waited >= 20) break;
}
// THE PHOTOGRAPH THAT PASSED IS THE ONE KEPT, since the viewer may clear the page again between two photographs.
writeFileSync(picture, photograph);
console.log(`${paper} -> ${picture}, ${width - 2 * gutter} by ${height - 2 * gutter}, the page's shape ${shape.toFixed(3)}${box === null ? ' assumed' : ''}, drawn after ${waited} s${photograph.length > 8000 ? '' : ' — NOT DRAWN, the picture is blank'}`);
await browser.close();
server.close();
