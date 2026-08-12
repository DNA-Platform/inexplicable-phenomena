import puppeteer from 'puppeteer';

// The /page demo, checked. This file used to build a `report` object, log it as
// JSON, and exit 0 no matter what — a reporter a human was meant to read, which
// is a relay: it cannot fail, so its green is not evidence. Every observation is
// now an assertion with a scope in its name, and any miss exits non-zero. The
// discipline is the stale-build law's: say what the green exercised, or the
// number is not yet evidence.
//
// AND ITS LANDMARKS ARE READ OFF THE PAGE. It stalled for a whole sprint on a
// chip named `anatomy` that had been renamed `reading`, while a `compare` lens
// arrived with no check at all — so the lens list is now taken from the control
// bar itself, and a lens the bar offers that this walk never visited is a NAMED
// FAILURE rather than a silence. Counts are derived the same way: the reading
// lens is measured against its own footer, and the compare lens's verdict
// against the two sums it claims to summarise. A transcribed literal is how a
// driver goes stale without anyone touching it.

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

const skin = () => page.evaluate(() => document.querySelector('[data-skin]')?.getAttribute('data-skin') ?? null);

// Checkpoint accounting, the same spine verify-book carries: a walk that throws
// mid-way still says what it reached and where it stopped. A missing control is
// a named stall, never a bare stack trace — and the stall says where the walk
// was standing when it stopped, because "which checkpoint" without "on which
// page, in which lens" is half an answer.
let reported = false;
const report = async (stall) => {
    if (reported) return;
    reported = true;
    let standing = '';
    if (stall) {
        try { standing = `at ${page.url()} · lens ${await skin()}`; } catch { standing = 'on a page that could no longer be read'; }
    }
    try { await browser.close(); } catch { /* already gone */ }
    let pass = true;
    checks.forEach(([name, ok], i) => {
        console.log(`${ok ? 'PASS' : 'FAIL'}  ${String(i + 1).padStart(2)}  ${name}`);
        if (!ok) pass = false;
    });
    if (stall) {
        console.log(`\nSTALLED at checkpoint ${checks.length + 1}, standing ${standing}`);
        console.log(`  why: ${stall}`);
        if (checks.length) console.log(`  last reached: ${checks[checks.length - 1][0]}`);
        pass = false;
    }
    console.log(`\n${checks.length} checkpoints reached${stall ? ' — THE WALK DID NOT FINISH' : ''}`);
    if (!pass && errors.length) console.log('console:', errors.slice(0, 8));
    process.exit(pass ? 0 : 1);
};
process.on('uncaughtException', e => report(String(e?.message ?? e)));
process.on('unhandledRejection', e => report(String(e?.message ?? e)));

// Action-binding: a chip that is not found FAILS the run — it does not click
// nothing and let the next observation pass against stale state. The click
// either happened or the walk stops here, named, and the stall says which chips
// the bar DOES carry so a rename reads as a rename.
const chip = async (name) => {
    const found = await page.evaluate(n => {
        const b = [...document.querySelectorAll('button')].find(x => x.textContent?.trim() === n);
        if (b) b.click();
        return !!b;
    }, name);
    if (!found) {
        const on = await page.evaluate(() => [...document.querySelectorAll('button')].map(b => b.textContent?.trim()).filter(Boolean));
        throw new Error(`chip "${name}" not found — the bar carries [${on.join(', ')}]. The control was renamed or moved.`);
    }
};

// The lenses are whatever the control bar offers, up to the rule that separates
// them from the modes. Read, never transcribed.
const lenses = () => page.evaluate(() => {
    const bar = document.querySelector('button')?.parentElement;
    if (!bar) return [];
    const names = [];
    for (const el of bar.children) {
        if (el.tagName !== 'BUTTON') break;
        names.push(el.textContent?.trim() ?? '');
    }
    return names;
});

// Every lens this walk visits is remembered, so the walk can be measured against
// the bar at the end.
const visited = new Set();
const lens = async (name) => {
    await chip(name);
    await settle();
    visited.add(name);
    return skin();
};

// A reading off the sheet's own footer — the model's numbers, not the driver's.
const reading = (label) => page.evaluate(l => {
    const c = [...document.querySelectorAll('footer span')].find(s => new RegExp(l, 'i').test(s.textContent ?? ''));
    return c ? parseInt(c.querySelector('b')?.textContent ?? '-1', 10) : -1;
}, label);

const readWords = () => reading('words');

// The reading lens's rows, found by SHAPE — a row is the three-celled child, so
// the head and the footer fall out without a count being written down. The
// preview is kept VERBATIM: it is a part's own copy, and the keystroke check
// below finds it in the source to aim at.
const readingRows = () => page.evaluate(() => [...document.querySelectorAll('[data-skin="reading"] > div')]
    .map(el => [...el.children].map(c => c.textContent ?? ''))
    .filter(cells => cells.length === 3)
    .map(([tag, preview, stats]) => ({ tag: tag.trim(), preview, stats: stats.trim() })));

// The parallel text's two sums and the verdict that claims to summarise them.
const parallel = () => page.evaluate(() => {
    const face = document.querySelector('[data-skin="compare"]');
    if (!face) return null;
    const sums = [...(face.innerText ?? '').matchAll(/(\d+) parts · (\d+) words · (\d+) mentioned/g)]
        .map(m => ({ parts: +m[1], words: +m[2], mentioned: +m[3] }));
    const verdict = [...face.querySelectorAll('div')]
        .map(d => d.textContent?.trim() ?? '')
        .find(t => t.startsWith('The readings')) ?? '';
    return { sums, verdict };
});

await page.goto(`${BASE}/`, { waitUntil: 'networkidle2', timeout: 20000 });
await settle(1000);
check('the root is a full page — no nav chrome around the shelf', await page.evaluate(() => !document.querySelector('nav')));

await page.goto(`${BASE}/page`, { waitUntil: 'networkidle2', timeout: 20000 });
await settle(800);
visited.add('book');
check('PAGE: the book lens renders — data-skin "book"', (await skin()) === 'book');
check('PAGE: mathematics typesets — katex nodes on the page', (await page.evaluate(() => document.querySelectorAll('.katex').length)) > 0);
const bookWords = await readWords();
check(`PAGE: the word count reads off the model — a positive number (${bookWords})`, bookWords > 0);
if (shots) await page.screenshot({ path: `${shots}/page-book.png`, fullPage: true });

const offered = await lenses();
check(`PAGE: the control bar offers its lenses [${offered.join(' · ')}] — read off the bar, not transcribed`, offered.length > 0 && offered.every(n => n.length > 0));

// Each lens is a switch, not a no-op: the chip is found (action-binding) AND the
// skin actually changes (bound to the change, not the resting state).
check('PAGE: the github lens switches — data-skin "github"', (await lens('github')) === 'github');
check('PAGE: the night lens switches — data-skin "night"', (await lens('night')) === 'night');

// THE READING LENS — the model rendered as itself. Named `anatomy` until last
// sprint, which is what stalled this walk.
const readingSkin = await lens('reading');
const rows = await readingRows();
check(
    `PAGE: the reading lens is the model rendered — data-skin "reading" with ${rows.length} rows, each tagged and counted`,
    readingSkin === 'reading' && rows.length > 0 && rows.every(r => r.tag && r.stats),
);
// Derived, not transcribed: the rows that are WRITING must number exactly what
// the lens's own footer calls its paragraphs. A row that says "content, not
// writing" is a fence, and the footer does not count those either.
const written = rows.filter(r => r.stats !== 'content, not writing');
const paragraphs = await reading('paragraphs');
check(
    `PAGE: the reading lens agrees with its own footer — ${written.length} rows of writing against ${paragraphs} paragraphs, ${rows.length - written.length} rows of content`,
    paragraphs > 0 && written.length === paragraphs,
);
const readingWords = await readWords();
check(
    `PAGE: the book lens and the reading lens read ONE model — ${bookWords} words on both`,
    readingWords > 0 && readingWords === bookWords,
);
if (shots) await page.screenshot({ path: `${shots}/page-reading.png`, fullPage: true });

// THE COMPARE LENS — a parallel text, and its claim is a verdict line that must
// be corroborated by the two sums standing above it.
check(`PAGE: the compare lens switches — data-skin "compare"`, (await lens('compare')) === 'compare');
const facing = await parallel();
check(
    `PAGE: the parallel text sets the passage twice — two faces, summed [${(facing?.sums ?? []).map(s => `${s.parts} parts/${s.words} words`).join(' · ')}]`,
    !!facing && facing.sums.length === 2,
);
const verdict = facing?.verdict ?? '';
check(
    `PAGE: the compare lens returns a verdict of agreement — "${verdict.slice(0, 72)}${verdict.length > 72 ? '…' : ''}"`,
    verdict.startsWith('The readings agree') && !/DISAGREE/.test(verdict),
);
// The verdict is a sentence the page writes about itself, so it is checked
// against the numbers it is a sentence about — a line claiming agreement while
// the sums differ is exactly the failure this lens exists to catch.
const claimedWords = Number(verdict.match(/agree: (\d+) words/)?.[1] ?? NaN);
const claimedGap = Number(verdict.match(/differ by (\d+)/)?.[1] ?? NaN);
const [left, right] = facing?.sums ?? [];
check(
    `PAGE: the verdict is corroborated by the sums it summarises — ${left?.words} = ${right?.words} words, claimed ${claimedWords}; parts differ by ${Math.abs((left?.parts ?? 0) - (right?.parts ?? 0))}, claimed ${claimedGap}`,
    !!left && !!right
    && left.words === right.words
    && claimedWords === left.words
    && claimedGap === Math.abs(left.parts - right.parts),
);
if (shots) await page.screenshot({ path: `${shots}/page-compare.png`, fullPage: true });

// The guard that keeps this file from going stale again: a lens the bar offers
// and this walk never visited is a FAILURE, not a silence. The next lens added
// to the page fails here on the day it arrives.
const unchecked = offered.filter(n => !visited.has(n));
check(
    `PAGE: no lens on the bar goes unchecked — walked [${[...visited].join(' · ')}]${unchecked.length ? ` — UNVISITED [${unchecked.join(' · ')}]` : ''}`,
    unchecked.length === 0,
);

// Back to a lens that carries the model's footer before the keystroke: the
// compare lens has none, and reading a count that isn't there is how a live
// check quietly becomes a dead one.
check('PAGE: the book lens returns after the walk of lenses — data-skin "book"', (await lens('book')) === 'book');

// THE KEYSTROKE — the count moves off the LIVE model on a keystroke, bound to
// the change: one word typed is exactly one word more (the 226→227 check that has
// stood since Sprint 45). A static-printed count fails this by not moving.
//
// IT TYPES WHERE THE MODEL SAYS PROSE IS. The old aim was Ctrl+End, and the
// document now ENDS INSIDE AN UNCLOSED FENCE on purpose — "the last thing on the
// page, so nothing after it can be lost" — so a word typed there is content
// rather than writing and correctly moves no count. The caret is placed instead
// at the end of a paragraph the reading lens named, found verbatim in the
// source: the page says where prose is, and the driver aims at that.
const prose = rows.find(r => r.tag.startsWith('¶')) ?? rows.find(r => r.stats !== 'content, not writing');
if (!prose) throw new Error('the reading lens shows no row of writing — there is nowhere to type that the model would count');
await chip('edit');
await settle();
const before = await readWords();
const caret = await page.evaluate(copy => {
    const ta = document.querySelector('textarea');
    if (!ta) return -2;
    const at = ta.value.indexOf(copy);
    if (at < 0) return -1;
    ta.focus();
    ta.setSelectionRange(at + copy.length, at + copy.length);
    return at + copy.length;
}, prose.preview);
if (caret === -2) throw new Error('the edit chip opened no textarea — the source pane is not there to type into');
if (caret < 0) throw new Error(`the model's paragraph "${prose.preview.slice(0, 48)}…" is nowhere in the source the pane shows — the driver cannot aim at prose`);
await page.keyboard.type(' zebra');
await settle(700);
const after = await readWords();
check(`PAGE: a keystroke in prose moves the count off the live model — typed at the end of ${prose.tag}, ${before} → ${after} (+1)`, before > 0 && after === before + 1);

// And the edited model is ONE model: the other lens reads the same number
// without being told, which is what "the page reads the model" means.
const echoed = await lens('reading');
const echoedWords = await readWords();
check(`PAGE: the edit reads the same in another lens — reading shows ${echoedWords} too`, echoed === 'reading' && echoedWords === after);
check('PAGE: the book lens returns with the edit still standing', (await lens('book')) === 'book' && (await readWords()) === after);

// And the other half of the same claim, which is the page's own: a word typed
// INSIDE the unclosed fence is content, not writing. Bound to the change — the
// source really grew — and it only means anything because the keystroke above
// has just proved the model is live.
await page.click('textarea');
await page.keyboard.down('Control');
await page.keyboard.press('End');
await page.keyboard.up('Control');
const grownFrom = await page.evaluate(() => document.querySelector('textarea')?.value.length ?? -1);
await page.keyboard.type(' quokka');
await settle(700);
const grownTo = await page.evaluate(() => document.querySelector('textarea')?.value.length ?? -1);
const held = await readWords();
check(
    `PAGE: a word typed inside the unclosed fence is content, not writing — the source grew ${grownFrom} → ${grownTo} and the count held at ${held}`,
    grownTo === grownFrom + 7 && held === after,
);

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
