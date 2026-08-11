import puppeteer from 'puppeteer';

// The /page demo, checked. This file used to build a `report` object, log it as
// JSON, and exit 0 no matter what — a reporter a human was meant to read, which
// is a relay: it cannot fail, so its green is not evidence. Every observation is
// now an assertion with a scope in its name, and any miss exits non-zero. The
// discipline is the stale-build law's: say what the green exercised, or the
// number is not yet evidence.

const PORT = process.env.PORT || 5199;
const BASE = `http://localhost:${PORT}`;
const shots = process.env.SHOTS || process.argv[2] || '';

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1500, height: 1000 });

const errors = [];
const checks = [];
page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
page.on('console', m => {
    const t = m.type();
    if (t === 'error' || t === 'warn' || t === 'warning') errors.push(`[after check ${checks.length}] ${t}: ${m.text().slice(0, 120)}`);
});

const check = (name, ok) => { checks.push([name, ok]); };
const settle = (ms = 550) => new Promise(r => setTimeout(r, ms));

// Checkpoint accounting, the same spine verify-book carries: a walk that throws
// mid-way still says what it reached and where it stopped. A missing control is
// a named stall, never a bare stack trace.
let reported = false;
const report = async (stall) => {
    if (reported) return;
    reported = true;
    try { await browser.close(); } catch { /* already gone */ }
    let pass = true;
    for (const [name, ok] of checks) {
        console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
        if (!ok) pass = false;
    }
    if (stall) {
        console.log(`\nSTALLED at checkpoint ${checks.length + 1}: ${stall}`);
        pass = false;
    }
    console.log(`\n${checks.length} checkpoints reached${stall ? ' — THE WALK DID NOT FINISH' : ''}`);
    if (!pass && errors.length) console.log('console:', errors.slice(0, 8));
    process.exit(pass ? 0 : 1);
};
process.on('uncaughtException', e => report(String(e?.message ?? e)));
process.on('unhandledRejection', e => report(String(e?.message ?? e)));

const skin = () => page.evaluate(() => document.querySelector('[data-skin]')?.getAttribute('data-skin') ?? null);

// Action-binding: a chip that is not found FAILS the run — it does not click
// nothing and let the next observation pass against stale state. The click
// either happened or the walk stops here, named.
const chip = async (name) => {
    const found = await page.evaluate(n => {
        const b = [...document.querySelectorAll('button')].find(x => x.textContent?.trim() === n);
        if (b) b.click();
        return !!b;
    }, name);
    if (!found) throw new Error(`chip "${name}" not found — the control moved or the page did not settle`);
};

const readWords = () => page.evaluate(() => {
    const c = [...document.querySelectorAll('footer span')].find(s => /words/i.test(s.textContent ?? ''));
    return c ? parseInt(c.querySelector('b')?.textContent ?? '-1', 10) : -1;
});

await page.goto(`${BASE}/`, { waitUntil: 'networkidle2', timeout: 20000 });
await settle(1000);
check('the root is a full page — no nav chrome around the shelf', await page.evaluate(() => !document.querySelector('nav')));

await page.goto(`${BASE}/page`, { waitUntil: 'networkidle2', timeout: 20000 });
await settle(800);
check('PAGE: the book lens renders — data-skin "book"', (await skin()) === 'book');
check('PAGE: mathematics typesets — katex nodes on the page', (await page.evaluate(() => document.querySelectorAll('.katex').length)) > 0);
const bookWords = await readWords();
check(`PAGE: the word count reads off the model — a positive number (${bookWords})`, bookWords > 0);
if (shots) await page.screenshot({ path: `${shots}/page-book.png`, fullPage: true });

// Each lens is a switch, not a no-op: the chip is found (action-binding) AND the
// skin actually changes (bound to the change, not the resting state).
await chip('github');
await settle();
check('PAGE: the github lens switches — data-skin "github"', (await skin()) === 'github');

await chip('night');
await settle();
check('PAGE: the night lens switches — data-skin "night"', (await skin()) === 'night');

await chip('anatomy');
await settle();
const anatomyRows = await page.evaluate(() => document.querySelectorAll('[data-skin="anatomy"] > div').length);
check(`PAGE: the anatomy lens is the parts rendered — data-skin "anatomy" with ${anatomyRows} rows`, (await skin()) === 'anatomy' && anatomyRows > 0);
if (shots) await page.screenshot({ path: `${shots}/page-anatomy.png`, fullPage: true });

// THE KEYSTROKE — the count moves off the LIVE model on a keystroke, bound to
// the change: one word typed is exactly one word more (the 226→227 check that has
// stood since Sprint 45). A static-printed count fails this by not moving.
await chip('edit');
await settle();
const before = await readWords();
await page.click('textarea');
await page.keyboard.down('Control');
await page.keyboard.press('End');
await page.keyboard.up('Control');
await page.keyboard.type(' zebra');
await settle(700);
const after = await readWords();
check(`PAGE: a keystroke moves the count off the live model — ${before} → ${after} (+1)`, before > 0 && after === before + 1);

await chip('book');
await settle();
check('PAGE: the book lens returns — data-skin "book"', (await skin()) === 'book');

await chip('the classes');
await settle();
check('PAGE: the classes drawer shows the source — class $Latex', await page.evaluate(() => document.body.innerText.includes('class $Latex')));

// Browser history: chips mutate model state without navigating, so the history
// stack is / then /page. Back leaves the demo; forward returns to it.
await page.goBack();
await settle(800);
check('PAGE: browser back leaves the page demo', !page.url().endsWith('/page'));
await page.goForward();
await settle(800);
check('PAGE: browser forward returns to the page demo', page.url().endsWith('/page'));

await page.goto(`${BASE}/nonsense`, { waitUntil: 'networkidle2', timeout: 20000 });
await settle(600);
check('PAGE: an unknown route renders a fallback, not a blank', (await page.evaluate(() => document.body.innerText.trim().length)) > 0);

const filed = errors.filter(e => e.includes('Maximum update depth'));
const unfiled = errors.filter(e => !e.includes('Maximum update depth'));
if (filed.length) console.log(`KNOWN  teardown update storm (filed framework finding) fired ${filed.length}x`);
check('PAGE: zero console errors beyond the filed teardown finding', unfiled.length === 0);

await report();
