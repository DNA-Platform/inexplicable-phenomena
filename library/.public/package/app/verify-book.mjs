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
const clickEntry = (heading) => page.evaluate(h => {
    const el = Array.from(document.querySelectorAll('.contents-entry')).find(e => e.textContent?.includes(h));
    if (el) el.click();
    return !!el;
}, heading);
const settle = () => new Promise(r => setTimeout(r, 550));

const check = (name, ok) => { checks.push([name, ok]); };

await page.goto(`${BASE}/`, { waitUntil: 'networkidle0', timeout: 30000 });
await settle();

check('the root is the shelf — two spines', await page.evaluate(() => document.querySelectorAll('.shelf-card').length === 2));
if (shots) await page.screenshot({ path: 'shot-shelf.png' });

await page.click('[data-book="algebra"]');
await settle();
check('the cover face invites', (await text()).includes('open the book'));

await page.click('[data-cover]');
await settle();
let t = await text();
check('the open book is a single page, sized like a book', await has('.book-page') && !(await has('.spread')));
check('it opens at the title page, folio 0', t.includes('A Study in Reading'));
if (shots) await page.screenshot({ path: 'shot-title-page.png' });

await clickChip('next →');
await settle();
t = await text();
check('the second page is the contents', t.includes('apparatus') && (await page.evaluate(() => document.querySelectorAll('.toc-title').length)) === 6);
await page.evaluate(() => { const l = Array.from(document.querySelectorAll('.toc-title')).find(e => e.textContent === 'Coordinates'); (l?.parentElement)?.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
await settle();
t = await text();
check('a contents line turns to its chapter', t.includes('chapter 3') && t.includes('Every act of reading'));
check('the sections show their own structure', t.includes('The Frame'));
check('the summary stays out of the reading', !t.includes('The book rotates the frame page by page.'));
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

await clickChip('read');
await page.evaluate(() => { const h = document.querySelector('.book-page > div'); h?.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
await settle();
t = await text();
check('the running head returns to the contents', t.includes('apparatus'));
await page.evaluate(() => { const l = Array.from(document.querySelectorAll('.toc-title')).find(e => e.textContent === 'The Summary Law'); (l?.parentElement)?.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
await settle();
t = await text();
check('the contents turns to the chapter it names', t.includes('chapter 5') && t.includes('The Second Book'));

await page.evaluate(() => { const h = document.querySelector('.book-page > div'); h?.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
await settle();
await page.evaluate(() => { const l = Array.from(document.querySelectorAll('.toc-title')).find(e => e.textContent === 'The Measure of Reading'); (l?.parentElement)?.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
await settle();
check('mathematics renders in the prose', await page.evaluate(() => document.querySelectorAll('.page-body .katex').length >= 2));

await page.evaluate(() => { const h = document.querySelector('.book-page > div'); h?.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
await settle();
await page.evaluate(() => { const h = document.querySelector('.book-page > div'); h?.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
await settle();
t = await text();
check('on the contents, the running head goes to the cover', t.includes('A Study in Reading'));
await page.evaluate(() => { const h = document.querySelector('.book-page > div'); h?.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
await settle();

await clickChip('the writing');
await settle();
t = await text();
check('the writing drawer shows the chapter file as written', await has('.writing-drawer') && t.includes('class $') && t.includes('view()'));

await page.evaluate(() => { const h = document.querySelector('.book-page > div'); h?.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
await settle();
await page.evaluate(() => { const l = Array.from(document.querySelectorAll('.entry-summary .toc-title')).find(e => e.textContent === 'Coordinates'); (l?.parentElement)?.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
await settle();
const followed = await page.waitForFunction(() => document.body.innerText.includes('class $Coordinates extends $Chapter'), { timeout: 4000 }).then(() => true).catch(() => false);
check('the code follows the reading — a chapter turn shows its file', followed);

await clickChip('the model');
await settle();
t = await text();
check('the code follows the mode — the model shows Book.tsx', t.includes('class $Book extends $Referent'));
await clickChip('read');
await settle();
await page.evaluate(() => { Array.from(document.querySelectorAll('button')).find(b => b.textContent?.trim() === 'Chapter.tsx')?.click(); });
await settle();
t = await text();
check('the key code of the model is in the drawer', t.includes('class $Chapter extends $Referent') && t.includes('written()'));
if (shots) await page.screenshot({ path: 'shot-writing.png' });

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
