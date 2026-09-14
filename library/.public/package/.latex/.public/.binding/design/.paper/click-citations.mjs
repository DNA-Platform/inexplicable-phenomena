// Drive a page, CLICK every citation, and say what happened — not whether an href matches an id.
import puppeteer from 'file:///C:/Source/dna-platform/inexplicable-phenomena/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const [url, label, wait = '400', reading = ''] = process.argv.slice(2);
const shots = 'C:/Users/dougl/AppData/Local/Temp/claude/c--Source-dna-platform-inexplicable-phenomena/824c833b-11c1-4076-956e-ce488e24abd4/scratchpad';
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
const errors = [];
page.on('pageerror', e => errors.push('pageerror ' + e.message));
page.on('console', m => { if (m.type() === 'error') errors.push('console ' + m.text().slice(0, 160)); });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
await page.waitForSelector('.pd-book', { timeout: 30000 });
if (reading !== '') {
    await page.evaluate(name => [...document.querySelectorAll('button')].find(b => b.textContent.trim() === name)?.click(), reading);
    await new Promise(r => setTimeout(r, 800));
}
console.log('scroll-behavior:', await page.evaluate(() => [getComputedStyle(document.documentElement).scrollBehavior, getComputedStyle(document.body).scrollBehavior].join('/')));
{
    const first = await page.$('.pd-citation');
    if (first) {
        await first.evaluate(e => e.scrollIntoView({ block: 'center' }));
        const box = await first.boundingBox();
        await page.screenshot({ path: `${shots}/citation-${label}.png`, clip: { x: Math.max(0, box.x - 260), y: Math.max(0, box.y - 60), width: 560, height: 140 } });
        console.log('citation text/classes:', await first.evaluate(e => [e.textContent, e.className, getComputedStyle(e).verticalAlign, getComputedStyle(e).fontSize, getComputedStyle(e, '::before').content, getComputedStyle(e, '::after').content].join(' | ')));
    }
}

const before = await page.evaluate(() => ({
    panels: document.querySelectorAll('[class*="refus"], [class*="Refus"]').length,
    citations: [...document.querySelectorAll('.pd-citation')].map(a => ({
        tag: a.tagName, href: a.getAttribute('href'), text: a.textContent.trim().slice(0, 30), cls: a.className,
    })),
    ids: [...document.querySelectorAll('[id]')].filter(e => e.classList.contains('pd-meaning')).map(e => e.id),
    folded: [...document.querySelectorAll('.pd-references .pd-meaning, .pd-references [id]')].map(e => `${e.tagName}#${e.id}`).slice(0, 20),
}));
console.log(`== ${label} ==  citations ${before.citations.length}  keyed anchors ${before.ids.length}  panels ${before.panels}`);
console.log('keyed:', before.ids.join(' '));
console.log('in references:', before.folded.join(' '));

const rows = [];
for (let at = 0; at < before.citations.length; at++) {
    const start = page.url();
    const scrolledBefore = await page.evaluate(() => window.scrollY);
    const clicked = await page.evaluate(at => {
        const a = document.querySelectorAll('.pd-citation')[at];
        if (!a) return 'missing';
        a.scrollIntoView({ block: 'center', behavior: 'instant' });
        const inner = a.querySelector('a');
        (inner ?? a).click();
        return (inner ?? a).getAttribute('href');
    }, at);
    await new Promise(r => setTimeout(r, Number(wait)));
    const after = await page.evaluate(() => {
        const hash = decodeURIComponent(location.hash.slice(1));
        const target = hash ? document.getElementById(hash) : null;
        const rect = target?.getBoundingClientRect();
        return {
            url: location.href, hash,
            found: !!target, tag: target?.tagName, text: target?.textContent.trim().slice(0, 50),
            inView: rect ? rect.top >= -2 && rect.top < window.innerHeight : false, top: rect ? Math.round(rect.top) : null,
            scrollY: Math.round(window.scrollY),
        };
    });
    rows.push({ at: at + 1, href: clicked, hash: after.hash, found: after.found, inView: after.inView, top: after.top, moved: after.scrollY !== scrolledBefore, navigated: after.url.split('#')[0] !== start.split('#')[0], target: after.text });
}
console.table(rows);
const working = rows.filter(r => r.found && r.inView).length;
console.log(`WORKING (target found AND in view after click): ${working} of ${rows.length}`);
if (errors.length) console.log('errors:', errors.slice(0, 5));
await browser.close();
