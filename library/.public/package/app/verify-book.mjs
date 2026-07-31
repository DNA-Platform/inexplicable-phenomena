import puppeteer from 'puppeteer';

const PORT = process.env.PORT || 5199;
const BASE = `http://localhost:${PORT}`;
const shots = process.env.SHOTS || '';

const browser = await puppeteer.launch({ headless: 'new', args: ['--window-size=1380,940'] });
const page = await browser.newPage();
await page.setViewport({ width: 1380, height: 940 });
const errors = [];
const checks = [];
page.on('console', m => { if (m.type() === 'error' || m.type() === 'warn') errors.push(`[after check ${checks.length}] ${m.type()}: ${m.text().slice(0, 90)}`); });
page.on('pageerror', e => errors.push(`pageerror: ${e}`));

const text = () => page.evaluate(() => document.body.innerText);
const has = (sel) => page.evaluate(s => !!document.querySelector(s), sel);
const clickChip = (label) => page.evaluate(l => {
    const el = Array.from(document.querySelectorAll('a,button')).find(b => b.textContent?.trim() === l);
    if (el) el.click();
    return !!el;
}, label);
const clickHead = () => page.evaluate(() => { const h = document.querySelector('.book-page > div'); h?.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
const clickToc = (heading) => page.evaluate(h => {
    const l = Array.from(document.querySelectorAll('.toc-title')).find(e => e.textContent === h);
    (l?.parentElement)?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    return !!l;
}, heading);
const settle = () => new Promise(r => setTimeout(r, 550));

const check = (name, ok) => { checks.push([name, ok]); };

await page.goto(`${BASE}/`, { waitUntil: 'networkidle0', timeout: 30000 });
await settle();

check('the root is the shelf — two spines', await page.evaluate(() => document.querySelectorAll('.shelf-card').length === 2));
if (shots) await page.screenshot({ path: 'shot-shelf.png' });

await page.click('[data-book="algebra"]');
await page.waitForFunction(() => document.body.innerText.includes('the classes'), { timeout: 10000 });
await settle();
let t = await text();
check('ALGEBRA: the spine opens the page — the dark sheet, lenses book · github · night', t.includes('github') && t.includes('night') && t.includes('the classes'));
if (shots) await page.screenshot({ path: 'shot-algebra-page.png' });
await clickChip('the books →');
await page.waitForSelector('.shelf-card', { timeout: 10000 });
await settle();
check('the page hands back to the shelf', await page.evaluate(() => document.querySelectorAll('.shelf-card').length === 2));

await page.click('[data-book="manifold"]');
await page.waitForSelector('[data-cover]', { timeout: 8000 });
await page.waitForFunction(() => document.body.innerText.includes('stitched from folds'), { timeout: 8000 }).catch(() => {});
await settle();
t = await text();
check('MANIFOLD: the cover face — its own book, its own ink', t.includes('open the book') && t.includes('stitched from folds'));
if (shots) await page.screenshot({ path: 'shot-manifold-cover.png' });

await page.click('[data-cover]');
await settle();
t = await text();
check('MANIFOLD: opening the cover lands inside — the contents, folio 1', t.includes('apparatus') && (await page.evaluate(() => document.querySelectorAll('.toc-title').length)) === 7);

check('MANIFOLD: the book fits the view — reading scrolls inside the page', await page.evaluate(() => { const p = document.querySelector('.book-page'); return !!p && p.getBoundingClientRect().bottom <= window.innerHeight + 2; }));

await clickChip('← the cover');
await settle();
t = await text();
check('MANIFOLD: leafing back past the contents closes the book to its cover', t.includes('open the book') && !(await has('.book-page')));
await page.waitForSelector('[data-cover]', { timeout: 8000 });
await page.click('[data-cover]');
await settle();

await page.evaluate(() => { const l = Array.from(document.querySelectorAll('.entry-summary .toc-title')).find(e => e.textContent === 'The Fold'); (l?.parentElement)?.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
await settle();
t = await text();
check('MANIFOLD: a contents line turns to the fold', t.includes('chapter 3') && t.includes('developing one thought'));
check('MANIFOLD: the sections show their structure', t.includes('The Crease'));
check('MANIFOLD: a quote sets itself apart on the page', await has('.book-page blockquote'));
check('MANIFOLD: a footnote lands at the page foot', t.includes('felt before it is found'));
check('MANIFOLD: mathematics lives in the chapter', await page.evaluate(() => document.querySelectorAll('.page-body .katex').length >= 2));
if (shots) await page.screenshot({ path: 'shot-manifold-chapter.png' });

await clickChip('next →');
await settle();
t = await text();
check('MANIFOLD: the chart follows', t.includes('chapter 4') && t.includes('The Chart'));

await clickChip('skim');
await settle();
t = await text();
check('MANIFOLD: the skim page is the summary', t.includes('A page is a chart of a curved book') && !t.includes('the overlaps are the whole trick'));

await clickChip('the model');
await settle();
t = await text();
check('MANIFOLD: the model page corroborates, formatted', t.toUpperCase().includes('THE MODEL, UNADORNED') && t.includes('the overlaps are the whole trick') && t.includes('#4.1') && t.includes('¶ 1.1'));

await clickChip('read');
await clickHead();
await settle();
await page.evaluate(() => { const l = Array.from(document.querySelectorAll('.entry-summary .toc-title')).find(e => e.textContent === 'Curvature'); (l?.parentElement)?.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
await settle();
t = await text();
check('MANIFOLD: the contents turns to curvature', t.includes('chapter 5') && t.includes('parallel transport'));

await clickChip('leave the ribbon');
await settle();
t = await text();
check('MANIFOLD: the ribbon is left on the page', await has('[data-ribbon]') && t.includes('the ribbon lies here'));
await clickChip('next →');
await settle();
t = await text();
check('MANIFOLD: the geodesic reads', t.includes('chapter 6') && t.includes('never steers'));
await page.click('[data-ribbon]');
await settle();
t = await text();
check('MANIFOLD: the bookmark knows the way back', t.includes('chapter 5') && t.includes('Curvature'));

await clickHead();
await settle();
await page.evaluate(() => { const l = Array.from(document.querySelectorAll('.entry-summary .toc-title')).find(e => e.textContent === 'The Reference'); (l?.parentElement)?.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
await settle();
t = await text();
check('MANIFOLD: the reference chapter reads', t.includes('chapter 7') && t.includes('A Sentence That Stands For'));
await page.evaluate(() => { const l = Array.from(document.querySelectorAll('.book-link')).find(e => e.textContent === 'this very paragraph'); l?.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
await settle();
check('MANIFOLD: following a reference lights the span and fades', await page.evaluate(() => !!document.getElementById('7.1.3')?.classList.contains('lit')));
await page.click('.book-link');
await settle();
t = await text();
check('MANIFOLD: a reference in the prose travels the book', t.includes('chapter 3') && t.includes('developing one thought'));

await page.click('[data-dogear]');
await settle();
t = await text();
check('MANIFOLD: the dog-ear turns the page over — the manuscript of this very page', t.toLowerCase().includes('the manuscript') && t.includes('class $TheFold extends $Chapter'));
await page.evaluate(() => { Array.from(document.querySelectorAll('button')).find(b => b.textContent?.trim() === 'Book.tsx')?.click(); });
await settle();
t = await text();
check('MANIFOLD: the model reads on the page back', t.includes('class $Book extends $Referent'));
if (shots) await page.screenshot({ path: 'shot-manifold-manuscript.png' });
await clickHead();
await settle();
t = await text();
check('MANIFOLD: the running head turns the page back to the reading', t.includes('chapter 3'));

await clickChip('the manuscript');
await settle();
t = await text();
check('MANIFOLD: the manuscript reads as a book of code', t.toLowerCase().includes('the book of code') && t.includes('04-the-chart.tsx'));
await clickToc('04-the-chart.tsx');
await settle();
t = await text();
check('MANIFOLD: a page of the book of code is a file', t.includes('class $TheChart'));
await clickChip('read');
await settle();
t = await text();
check('MANIFOLD: the reading resumes where it stood', t.includes('chapter 3'));

await clickChip('← the shelf');
await page.waitForSelector('.shelf-card', { timeout: 10000 });
await settle();
check('back on the shelf after the manifold', await page.evaluate(() => document.querySelectorAll('.shelf-card').length === 2));

await page.goto(`${BASE}/page`, { waitUntil: 'networkidle0', timeout: 30000 });
await settle();
t = await text();
check('the page demo still stands and links back', t.length > 50 && t.includes('the books'));

const filed = errors.filter(e => e.includes('Maximum update depth'));
const unfiled = errors.filter(e => !e.includes('Maximum update depth'));
if (filed.length) console.log(`KNOWN  teardown update storm (filed framework finding) fired ${filed.length}x`);
check('zero console errors beyond the filed teardown finding', unfiled.length === 0);

await browser.close();
let pass = true;
for (const [name, ok] of checks) {
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
    if (!ok) pass = false;
}
if (!pass && errors.length) console.log('console:', errors.slice(0, 6));
process.exit(pass ? 0 : 1);
