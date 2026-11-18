// Photograph a sketch opened from disk at a form named in the hash.
//   node sketch-shoot.mjs <file.html> <out.png> <width> <height> <hash> [full]
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const [file, out, width, height, hash = 'a', full] = process.argv.slice(2);
const puppeteer = createRequire('c:/Source/dna-platform/inexplicable-phenomena/library/.public/.binding/package.json')('puppeteer');
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: Number(width), height: Number(height), deviceScaleFactor: 1 });
await page.goto(`${pathToFileURL(resolve(file)).href}#${hash}`, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await new Promise(done => setTimeout(done, 900));
const found = await page.evaluate(() => {
    const read = (selector, properties) => {
        const one = document.querySelector(selector);
        if (one === null) return `${selector}: none`;
        const s = getComputedStyle(one);
        const b = one.getBoundingClientRect();
        return `${selector} ${Math.round(b.x)},${Math.round(b.y)} ${Math.round(b.width)}×${Math.round(b.height)} ` + properties.map(p => `${p}=${s[p]}`).join(' ');
    };
    return [
        `form ${document.body.dataset.form} body classes ${document.body.className}`,
        read('.pd-chapter.pa-open .pd-title', ['fontFamily', 'fontSize']),
        read('.sk-editor', ['maxHeight', 'backgroundColor']),
        read('.sk-bar', ['height', 'backgroundImage']),
        read('.sk-tab', ['fontFamily', 'fontSize', 'color']),
        read('.sk-pane', ['fontFamily', 'fontSize', 'lineHeight', 'color', 'backgroundColor', 'maxHeight', 'overflowY']),
        read('.sk-pane .hljs-keyword', ['color']),
        read('.sk-pane .hljs-string', ['color']),
        read('.sk-appendix', ['fontSize', 'opacity']),
        `document ${document.scrollingElement.scrollHeight} tall, scrollY ${window.scrollY}`,
    ];
});
console.log(found.join('\n'));
await page.screenshot({ path: out, fullPage: full === 'full' });
console.log(`photograph: ${out}`);
await browser.close();
