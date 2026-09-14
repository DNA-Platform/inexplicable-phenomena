import puppeteer from 'file:///C:/Source/dna-platform/inexplicable-phenomena/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';
const [url = 'http://localhost:5310/', out = 'toc-now.png'] = process.argv.slice(2);
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1100, height: 1400 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
const seen = await page.evaluate(() => {
    const nav = document.querySelector('nav.pd-table-of-contents');
    const rows = nav ? nav.querySelectorAll('.pd-row') : [];
    const depth = r => { let d = 0; for (let at = r.parentElement; at && at !== nav; at = at.parentElement) if (at.classList.contains('pd-row')) d++; return d; };
    const depths = [...rows].map(depth);
    return {
        rows: rows.length, top: depths.filter(d => d === 0).length, second: depths.filter(d => d === 1).length, third: depths.filter(d => d === 2).length,
        anchors: nav ? nav.querySelectorAll('a').length : 0,
        resolving: [...(nav ? nav.querySelectorAll('a[href^="#"]') : [])].filter(a => document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)))).length,
        firstRow: rows[0] ? rows[0].outerHTML.slice(0, 220) : null,
        navHeight: nav ? nav.getBoundingClientRect().height : 0
    };
});
console.log(JSON.stringify(seen, null, 1));
const nav = await page.$('nav.pd-table-of-contents');
if (nav) await nav.screenshot({ path: out });
await browser.close();
