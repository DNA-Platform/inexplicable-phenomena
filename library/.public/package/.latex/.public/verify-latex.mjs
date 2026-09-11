// THE LATEX GATE. Drives the served paper and fails naming what failed — Sprint 62, U4, in library/.public/.lib/projection/68-sprint-62--clean-foundations.md.
import puppeteer from 'file:///C:/Source/dna-platform/inexplicable-phenomena/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const [url = 'http://localhost:5310/', strip = '56'] = process.argv.slice(2);
const failures = [];
const expect = (held, message) => { if (!held) failures.push(message); return held; };

const up = async () => {
    for (let tries = 0; tries < 30; tries++) {
        try { if ((await fetch(url)).status === 200) return true; } catch { }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    return false;
};
if (!await up()) { console.error(`verify-latex: nothing answers at ${url} — start the servers with sh serve.sh`); process.exit(2); }

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1100, height: 800 });
const errors = [];
page.on('pageerror', error => errors.push(String(error.message).slice(0, 160)));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text().slice(0, 160)); });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });

const reading = async (name) => {
    const seen = await page.evaluate(() => ({
        title: document.querySelector('.pd-title')?.textContent.replace(/\s+/g, ' ').trim() ?? '',
        abstract: [...document.querySelectorAll('h2, h3')].some(heading => heading.textContent.trim() === 'Abstract'),
        katex: document.querySelectorAll('.katex-error').length,
        panels: document.body.textContent.split('Bond Constructor Failed').length - 1,
        chars: document.body.textContent.length,
        rows: [...document.querySelectorAll('.pd-table-of-contents a[href^="#"]')].map(a => a.getAttribute('href')),
        citations: [...document.querySelectorAll('.pd-citation')].map(a => ({ text: a.textContent, href: a.getAttribute('href') })),
        entries: document.querySelectorAll('.pd-entry').length
    }));
    expect(/P/.test(seen.title) && /NP/.test(seen.title), `${name}: the title does not carry the formula — "${seen.title}"`);
    expect(seen.abstract, `${name}: no Abstract heading`);
    expect(seen.katex === 0, `${name}: ${seen.katex} KaTeX errors`);
    expect(seen.panels === 0, `${name}: ${seen.panels} refusal panels`);
    expect(seen.citations.length > 0 && seen.citations.every(one => /^\[?\d+(, \d+)*\]?$/.test(one.text)), `${name}: a citation draws its key — ${seen.citations.filter(one => !/^\[?\d+(, \d+)*\]?$/.test(one.text)).map(one => one.text).slice(0, 5).join(', ')}`);

    const land = async (href) => {
        await page.evaluate(() => scrollTo(0, 0));
        await page.evaluate(hash => { location.hash = hash; const id = decodeURIComponent(hash.slice(1)); document.getElementById(id)?.scrollIntoView(); }, href);
        await new Promise(resolve => setTimeout(resolve, 250));
        return page.evaluate((hash, top) => {
            const target = document.getElementById(decodeURIComponent(hash.slice(1)));
            if (!target) return 'missing';
            const rect = target.getBoundingClientRect();
            return rect.top >= Number(top) - 1 && rect.top < innerHeight ? 'landed' : `hidden at ${Math.round(rect.top)}`;
        }, href, strip);
    };
    const rowsHidden = [];
    for (const href of seen.rows) { const where = await land(href); if (where !== 'landed') rowsHidden.push(`${href} ${where}`); }
    expect(rowsHidden.length === 0, `${name}: ${rowsHidden.length} of ${seen.rows.length} contents rows do not land below the strip — ${rowsHidden.slice(0, 4).join('; ')}`);
    const citationsHidden = [];
    for (const one of seen.citations) { const where = await land(one.href); if (where !== 'landed') citationsHidden.push(`${one.href} ${where}`); }
    expect(citationsHidden.length === 0, `${name}: ${citationsHidden.length} of ${seen.citations.length} citations do not land — ${citationsHidden.slice(0, 4).join('; ')}`);

    console.log(`${name}: ${seen.chars} chars · ${seen.rows.length} rows landing ${seen.rows.length - rowsHidden.length} · ${seen.citations.length} citations landing ${seen.citations.length - citationsHidden.length} · ${seen.entries} entries · ${seen.katex} KaTeX errors · ${seen.panels} panels`);
};

await reading('latex');
const markdown = await page.$('button ::-p-text(Markdown)').catch(() => null);
if (markdown) {
    await markdown.click();
    await page.waitForNetworkIdle({ idleTime: 500, timeout: 30000 }).catch(() => { });
    await reading('markdown');
} else failures.push('the strip has no Markdown choice to click');

expect(errors.length === 0, `${errors.length} page errors — ${errors.slice(0, 3).join(' | ')}`);
await browser.close();

if (failures.length > 0) {
    console.error(`verify-latex: ${failures.length} failed\n  ${failures.join('\n  ')}`);
    process.exit(1);
}
console.log('verify-latex: green');
