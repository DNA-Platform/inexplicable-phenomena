// verify-hydration.mjs — the strong criterion: a REAL browser, a REAL refresh.
// Work the reading desk — turn pages, place the ribbon, note the margin —
// reload the page, and read all three faces: the desk must resume mid-chapter,
// with the chapter NAME visible, not just a number.

import puppeteer from 'puppeteer';

const PORT = process.env.PORT || 5173;
const url = `http://localhost:${PORT}/persistence`;

const state = (page) => page.evaluate(() => {
    const face = (name) => document.querySelector(`[data-face="${name}"]`);
    const book = face('book'), card = face('card'), spine = face('spine');
    if (!book || !card || !spine) return null;
    return {
        page: card.dataset.page, ribbon: card.dataset.ribbon, notes: card.dataset.notes,
        bookPage: book.dataset.page, spinePage: spine.dataset.page,
        cardText: card.textContent,
    };
});
const act = (page, name) => page.evaluate((name) => {
    document.querySelector(`[data-act="${name}"]`)?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
}, name);
const settle = (ms = 500) => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
let failed = 0;
const check = (name, ok, saw) => {
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok ? '' : '  saw: ' + JSON.stringify(saw)}`);
    if (!ok) failed++;
};

await page.goto(url, { waitUntil: 'networkidle0' });
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: 'networkidle0' });
await settle();

let seen = await state(page);
check('the desk opens fresh: chapter 1 "Loomings", no ribbon, no notes',
    seen && seen.page === '1' && seen.ribbon === '0' && seen.notes === '0' && seen.cardText.includes('Loomings'), seen);

await act(page, 'turn-forward');
await act(page, 'turn-forward');
await act(page, 'ribbon');
await act(page, 'note');
await act(page, 'note');
await settle();
seen = await state(page);
check('acts land and EVERY FACE follows: chapter 3 "The Lee Shore", ribbon at 3, 2 notes, book and spine agree',
    seen && seen.page === '3' && seen.ribbon === '3' && seen.notes === '2'
    && seen.bookPage === '3' && seen.spinePage === '3' && seen.cardText.includes('The Lee Shore'), seen);

await page.reload({ waitUntil: 'networkidle0' });
await settle();
seen = await state(page);
check('AFTER REFRESH the desk resumes mid-chapter: "The Lee Shore" stands, ribbon and notes kept',
    seen && seen.page === '3' && seen.ribbon === '3' && seen.notes === '2'
    && seen.bookPage === '3' && seen.cardText.includes('The Lee Shore'), seen);

await act(page, 'return');
await settle();
await page.reload({ waitUntil: 'networkidle0' });
await settle();
seen = await state(page);
check('the book returned + refresh: the desk opens fresh again',
    seen && seen.page === '1' && seen.ribbon === '0' && seen.notes === '0' && seen.cardText.includes('Loomings'), seen);

await browser.close();
console.log(failed === 0 ? 'ALL SEEN — the reading survived the refresh.' : failed + ' FAILED');
process.exit(failed === 0 ? 0 : 1);
