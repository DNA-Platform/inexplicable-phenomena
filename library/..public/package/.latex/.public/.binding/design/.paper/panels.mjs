import puppeteer from 'file:///C:/Source/dna-platform/inexplicable-phenomena/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';
const [url = 'http://localhost:5310/'] = process.argv.slice(2);
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
const seen = await page.evaluate(() => {
    const nav = document.querySelector('nav.pd-table-of-contents');
    const texts = [...nav.querySelectorAll('.pd-row')].map(r => r.textContent.replace(/\s+/g, ' ').trim()).filter(t => t.includes('$Chemistry') || t.includes('failed') || t.includes('refus'));
    const distinct = [...new Set(texts.map(t => t.slice(t.indexOf('$Chemistry'), t.indexOf('$Chemistry') + 400)))];
    return { refused: texts.length, distinct: distinct.slice(0, 3) };
});
console.log(JSON.stringify(seen, null, 1));
await browser.close();
