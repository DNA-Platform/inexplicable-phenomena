// Snapshot a bound page off the preview: the document as drawn, its sheets inline, its scripts stripped,
// so a sketch can dress it with a sheet and a switch of its own.
//   node snapshot.mjs <url> <out.html> [width] [height]
import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';

const [url, out, width = '1434', height = '780'] = process.argv.slice(2);
const puppeteer = createRequire('c:/Source/dna-platform/inexplicable-phenomena/library/.public/.binding/package.json')('puppeteer');
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: Number(width), height: Number(height), deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'load' });
await page.waitForFunction(() => {
    const root = document.getElementById('root');
    return root !== null && Object.keys(root).some(key => key.startsWith('__reactContainer')) && document.body.innerText.trim() !== '';
}, { timeout: 30000, polling: 50 });
await page.evaluate(() => document.fonts.ready);
await new Promise(done => setTimeout(done, 1200));
const html = await page.evaluate(async () => {
    for (const script of document.querySelectorAll('script')) script.remove();
    // The linked sheets are brought into the file, since a sketch is opened from disk where the preview's paths reach nothing.
    for (const link of document.querySelectorAll('link[rel="stylesheet"]')) {
        const text = await (await fetch(link.href)).text();
        const style = document.createElement('style');
        style.setAttribute('data-inlined', link.getAttribute('href') ?? '');
        style.textContent = text;
        link.replaceWith(style);
    }
    for (const link of document.querySelectorAll('link[rel="modulepreload"]')) link.remove();
    // The sheets styled-components holds in memory are written back as text so the file carries them.
    for (const style of document.querySelectorAll('style[data-styled]')) {
        const sheet = style.sheet;
        if (sheet === null || style.textContent.trim() !== '') continue;
        style.textContent = [...sheet.cssRules].map(rule => rule.cssText).join('\n');
    }
    return '<!doctype html>\n' + document.documentElement.outerHTML;
});
writeFileSync(out, html);
const counts = await page.evaluate(() => ({
    code: document.querySelectorAll('.pd-code').length,
    highlighted: document.querySelectorAll('.pd-code [class^="hljs-"]').length,
    lines: document.querySelectorAll('.pd-code-line').length,
    open: document.querySelector('.pd-chapter.pa-open .pd-title')?.textContent?.trim(),
}));
console.log(`snapshot: ${out} (${html.length} bytes); code figures ${counts.code}, highlighted spans ${counts.highlighted}, numbered lines ${counts.lines}, open page "${counts.open}"`);
await browser.close();
