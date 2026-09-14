// Drive the paper on the chapter model: what the book draws, whether the contents resolves, what refuses.
import puppeteer from 'file:///C:/Source/dna-platform/inexplicable-phenomena/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';
const [url = 'http://localhost:5310/', label = 'paper'] = process.argv.slice(2);
const shots = 'C:/Users/dougl/AppData/Local/Temp/claude/c--Source-dna-platform-inexplicable-phenomena/824c833b-11c1-4076-956e-ce488e24abd4/scratchpad';
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
const errors = [];
page.on('pageerror', e => errors.push('pageerror ' + e.message.slice(0, 160)));
page.on('console', m => { if (m.type() === 'error') errors.push('console ' + m.text().slice(0, 160)); });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
try { await page.waitForSelector('.pd-book', { timeout: 20000 }); } catch { console.log('NO .pd-book'); }
const facts = await page.evaluate(() => {
    const book = document.querySelector('.pd-book');
    const rows = [...document.querySelectorAll('.pd-table-of-contents .pd-chapter')];
    const links = rows.map(r => r.querySelector('a')).filter(Boolean);
    return {
        children: [...(book?.children ?? [])].map(c => `${c.tagName.toLowerCase()}.${c.className.split(' ').slice(0, 3).join('.')}`),
        rows: rows.length, links: links.length,
        resolving: links.filter(a => document.getElementById(decodeURIComponent((a.getAttribute('href') ?? '').slice(1)))).length,
        dead: links.filter(a => !document.getElementById(decodeURIComponent((a.getAttribute('href') ?? '').slice(1)))).map(a => a.getAttribute('href')).slice(0, 5),
        rowHtml: rows[0]?.outerHTML.slice(0, 200),
        secondChild: book?.children[1]?.outerHTML.slice(0, 300),
        panels: document.querySelectorAll('[class*="refus"], [class*="Refus"]').length,
        panelText: [...document.querySelectorAll('[class*="refus"], [class*="Refus"]')].slice(0, 3).map(p => p.textContent.trim().slice(0, 140)),
        documents: document.querySelectorAll('.pd-book .pd-document').length,
        citations: document.querySelectorAll('.pd-citation').length,
        katex: document.querySelectorAll('.katex-error').length,
        chars: document.body.innerText.length,
    };
});
console.log(`== ${label} ==`);
console.log(JSON.stringify(facts, null, 1));
console.log('errors:', errors.length, errors.slice(0, 4));
await page.evaluate(() => window.scrollTo(0, 0));
await page.screenshot({ path: `${shots}/${label}-top.png`, clip: { x: 0, y: 0, width: 1280, height: 900 } });
await browser.close();
