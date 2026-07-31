// verify-book.mjs — drives The Books reader end to end and reports what was SEEN.
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
const clickEntry = (heading) => page.evaluate(h => {
    const l = Array.from(document.querySelectorAll('.entry-summary .toc-title')).find(e => e.textContent === h);
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
await settle();
check('pulling a book shows its cover — the one cover', (await text()).includes('open the book'));
if (shots) await page.screenshot({ path: 'shot-cover.png' });

await page.click('[data-cover]');
await settle();
let t = await text();
check('opening the cover lands inside — on the contents, folio 1', t.includes('apparatus') && (await page.evaluate(() => document.querySelectorAll('.toc-title').length)) === 7);
check('the open book is a single page, sized like a book', await has('.book-page') && !(await has('.spread')));
if (shots) await page.screenshot({ path: 'shot-contents.png' });

await clickChip('← the cover');
await settle();
t = await text();
check('leafing back past the contents closes the book to its cover', t.includes('open the book') && !(await has('.book-page')));
await page.click('[data-cover]');
await settle();

await clickEntry('Coordinates');
await settle();
t = await text();
check('a contents line turns to its chapter', t.includes('chapter 3') && t.includes('Every act of reading'));
check('the sections show their own structure', t.includes('The Frame'));
check('the summary stays out of the reading', !t.includes('The book rotates the frame page by page.'));
check('a quote sets itself apart on the page', await has('.book-page blockquote'));
check('a footnote lands at the page foot', t.includes('coordinate crime'));
if (shots) await page.screenshot({ path: 'shot-chapter.png' });

await clickChip('next →');
await settle();
t = await text();
check('the page turns forward', t.includes('The Index Law') && t.includes('chapter 4'));

await clickChip('skim');
await settle();
t = await text();
check('the skim page is the summary', t.includes('Assembly numbers the parts') && !t.includes('slides a latecomer'));

await clickChip('the model');
await settle();
t = await text();
check('the model page corroborates', t.toUpperCase().includes('THE MODEL, UNADORNED') && t.includes('slides a latecomer'));
check('the model is formatted — addresses at every grain', t.includes('#4.1') && t.includes('¶ 1.1'));
if (shots) await page.screenshot({ path: 'shot-model.png' });

await clickChip('read');
await clickHead();
await settle();
t = await text();
check('the running head returns to the contents', t.includes('apparatus'));

await clickHead();
await settle();
t = await text();
check('on the contents, the running head closes the book to its cover', t.includes('open the book') && !(await has('.book-page')));
await page.click('[data-cover]');
await settle();

await clickEntry('The Summary Law');
await settle();
t = await text();
check('the contents turns to the chapter it names', t.includes('chapter 5') && t.includes('The Second Book'));

await clickHead();
await settle();
await clickEntry('The Measure of Reading');
await settle();
check('mathematics renders in the prose', await page.evaluate(() => document.querySelectorAll('.page-body .katex').length >= 2));

await clickChip('leave the ribbon');
await settle();
t = await text();
check('the ribbon is left on the page', await has('[data-ribbon]') && t.includes('the ribbon lies here'));
await clickChip('next →');
await settle();
t = await text();
check('the new chapter reads — a reference is a sentence that stands for', t.includes('chapter 7') && t.includes('A Sentence That Stands For'));
check('the ribbon hangs over other pages while it lies in the book', await has('[data-ribbon]'));
await page.click('.book-link');
await settle();
t = await text();
check('a reference in the prose travels the book', t.includes('chapter 3') && t.includes('Every act of reading'));
await page.click('[data-ribbon]');
await settle();
t = await text();
check('the bookmark knows the way back — resolved through the book it is rendered inside', t.includes('chapter 6') && t.includes('The Measure of Reading'));
if (shots) await page.screenshot({ path: 'shot-ribbon.png' });

await page.click('[data-dogear]');
await settle();
t = await text();
check('the dog-ear turns the page over — the manuscript of this very page', t.toLowerCase().includes('the manuscript') && t.includes('class $TheMeasure extends $Chapter'));
check('the model files sit as tabs on the turned page', await page.evaluate(() => Array.from(document.querySelectorAll('button')).some(b => b.textContent?.trim() === 'Book.tsx')));
await page.evaluate(() => { Array.from(document.querySelectorAll('button')).find(b => b.textContent?.trim() === 'Book.tsx')?.click(); });
await settle();
t = await text();
check('the model reads on the page back', t.includes('class $Book extends $Referent'));
if (shots) await page.screenshot({ path: 'shot-manuscript.png' });
await clickHead();
await settle();
t = await text();
check('the running head turns the page back to the reading', t.includes('chapter 6') && t.includes('The Measure of Reading'));

await clickHead();
await settle();
if (!(await text()).includes('apparatus')) {
    await page.click('[data-cover]');
    await settle();
}
await clickEntry('Coordinates');
await settle();
await page.click('[data-dogear]');
let followed = await page.waitForFunction(() => document.body.innerText.includes('class $Coordinates extends $Chapter'), { timeout: 5000 }).then(() => true).catch(() => false);
if (!followed) {
    await page.click('[data-dogear]');
    followed = await page.waitForFunction(() => document.body.innerText.includes('class $Coordinates extends $Chapter'), { timeout: 5000 }).then(() => true).catch(() => false);
}
check('the manuscript follows the reading — every page turns over to its own file', followed);
await page.click('[data-dogear]');
await settle();

await clickChip('the manuscript');
await settle();
t = await text();
check('the manuscript reads as a book of code — with its own contents', t.toLowerCase().includes('the book of code') && t.includes('03-coordinates.tsx'));
await page.evaluate(() => { const l = Array.from(document.querySelectorAll('.toc-title')).find(e => e.textContent === '03-coordinates.tsx'); (l?.parentElement)?.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
await settle();
t = await text();
check('a page of the book of code is a file', t.includes('class $Coordinates extends $Chapter'));
await clickChip('next →');
await settle();
t = await text();
check('the book of code turns pages', t.includes('class $TheIndexLaw extends $Chapter'));
await clickHead();
await settle();
t = await text();
check('the running head returns to the code contents', t.toLowerCase().includes('the book of code'));
if (shots) await page.screenshot({ path: 'shot-code-book.png' });
await clickChip('read');
await settle();
t = await text();
check('the reading resumes where it stood', t.includes('chapter 3'));

await clickChip('← the shelf');
await settle();
check('back on the shelf', await page.evaluate(() => document.querySelectorAll('.shelf-card').length === 2));

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
