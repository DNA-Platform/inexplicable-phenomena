import puppeteer from 'file:///C:/Source/dna-platform/inexplicable-phenomena/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';
const [url = 'http://localhost:5310/', wait = '1500', strip = '56'] = process.argv.slice(2);
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1100, height: 800 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; document.body.style.scrollBehavior = 'auto'; });
const hrefs = await page.evaluate(() => [...document.querySelectorAll('.pd-table-of-contents a[href^="#"]')].map(a => a.getAttribute('href')));
const rows = [];
for (const href of hrefs) {
    await page.evaluate(() => scrollTo(0, 0));
    await page.evaluate(h => { location.hash = h; }, href);
    await page.evaluate(() => { const id = decodeURIComponent(location.hash.slice(1)); document.getElementById(id)?.scrollIntoView(); });
    await new Promise(r => setTimeout(r, Number(wait)));
    const seen = await page.evaluate((h, s) => {
        const id = decodeURIComponent(h.slice(1));
        const el = document.getElementById(id);
        if (!el) return { found: false };
        const r = el.getBoundingClientRect();
        return { found: true, top: Math.round(r.top), below: r.top >= Number(s) - 1 && r.top < innerHeight };
    }, href, strip);
    rows.push({ href, ...seen });
}
const landing = rows.filter(r => r.found && r.below).length;
const missing = rows.filter(r => !r.found).length;
const hidden = rows.filter(r => r.found && !r.below).slice(0, 6).map(r => `${r.href}@${r.top}`);
console.log(`rows ${rows.length} · found ${rows.length - missing} · landing below the strip ${landing} · hidden ${hidden.join(' ')}`);
await browser.close();
