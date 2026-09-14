import puppeteer from 'file:///C:/Source/dna-platform/inexplicable-phenomena/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';
const [url = 'http://localhost:5310/'] = process.argv.slice(2);
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(String(e.message).slice(0, 120)));
page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 120)); });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
const seen = await page.evaluate(() => ({
    citations: [...document.querySelectorAll('.pd-citation')].map(a => `${a.textContent}→${a.getAttribute('href')}`),
    entries: [...document.querySelectorAll('.pd-entry')].map(e => `${e.id}: ${e.textContent.slice(0, 28)}`),
    panels: document.body.textContent.split('Bond Constructor Failed').length - 1
}));
console.log(JSON.stringify(seen, null, 1));
console.log('errors:', errors.length, errors.slice(0, 3));
await browser.close();
