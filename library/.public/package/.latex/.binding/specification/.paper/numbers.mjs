import puppeteer from 'file:///C:/Source/dna-platform/inexplicable-phenomena/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';
const [url = 'http://localhost:5310/'] = process.argv.slice(2);
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
const seen = await page.evaluate(() => ({
    citations: [...document.querySelectorAll('.pd-citation')].map(a => `${a.textContent}→${a.getAttribute('href')}`).slice(0, 10),
    entries: [...document.querySelectorAll('.pd-entry')].length,
    entryIds: [...document.querySelectorAll('.pd-entry[id]')].length,
    firstEntry: document.querySelector('.pd-entry')?.outerHTML.slice(0, 200),
    equations: [...document.querySelectorAll('.pd-equation')].map(e => e.getAttribute('data-number')).slice(0, 8),
    theorems: [...document.querySelectorAll('.pd-theorem')].map(e => e.textContent.slice(0, 20)).slice(0, 4),
    chars: document.body.textContent.length
}));
console.log(JSON.stringify(seen, null, 1));
await browser.close();
