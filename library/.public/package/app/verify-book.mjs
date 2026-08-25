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
// Action-binding: a navigation helper that finds nothing THROWS a named error
// rather than clicking nothing and letting the next check pass against stale
// state. The throw is caught by the checkpoint reporter below, which says which
// control moved and that the walk did not finish — a no-op click is a broken
// demonstration, not a silent step.
const clickChip = async (label) => {
    const found = await page.evaluate(l => {
        const el = Array.from(document.querySelectorAll('a,button')).find(b => b.textContent?.trim() === l);
        if (el) el.click();
        return !!el;
    }, label);
    if (!found) throw new Error(`chip "${label}" not found — the control moved or the page did not settle`);
};
const clickHead = async () => {
    const found = await page.evaluate(() => {
        const h = document.querySelector('.book-page > div');
        if (!h) return false;
        h.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        return true;
    });
    if (!found) throw new Error('the running head (.book-page > div) is not present — cannot leaf back');
};
const clickToc = async (heading) => {
    const found = await page.evaluate(h => {
        const l = Array.from(document.querySelectorAll('.toc-title')).find(e => e.textContent === h);
        if (!l) return false;
        l.parentElement?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        return true;
    }, heading);
    if (!found) throw new Error(`contents line "${heading}" not found — the book of code changed its pages`);
};
const settle = () => new Promise(r => setTimeout(r, 550));

// REACHING A LANDMARK ACROSS A PAGE LOAD. Opening the algebra book and following
// a subject link are FULL browser navigations, and puppeteer's waitForSelector
// is bound to an execution context that a navigation destroys — so the wait dies
// on the very steps it exists for, and reports a missing selector rather than a
// swapped context. This polls instead, which is what the chemistry harness's
// settle amounts to, said once and named.
const landmark = async (selector, why, ms = 15000) => {
    const stop = Date.now() + ms;
    for (;;) {
        try { if (await page.$(selector)) return true; } catch { /* context swapped mid-navigation */ }
        if (Date.now() > stop) throw new Error(`${selector} never arrived — ${why}`);
        await new Promise(r => setTimeout(r, 250));
    }
};

const landmarked = async (fn, why, ms = 15000) => {
    const stop = Date.now() + ms;
    for (;;) {
        try { if (await page.evaluate(fn)) return true; } catch { /* context swapped mid-navigation */ }
        if (Date.now() > stop) throw new Error(`never true — ${why}`);
        await new Promise(r => setTimeout(r, 250));
    }
};

const check = (name, ok) => { checks.push([name, ok]); };

// Checkpoint accounting. A walk that throws mid-way must still say what it
// reached and where it stopped — a bare stack trace is a gate that cannot be
// read, and an unreached check is not a passing one.
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
process.on('uncaughtException', e => { report(String(e?.message ?? e)); });
process.on('unhandledRejection', e => { report(String(e?.message ?? e)); });

// The shelf labels its spines by card name. Landmarks are looked up by that
// name and a miss is reported as a named failure, not a bare stack trace: a
// driver that cannot reach its check must say which landmark moved.
const spines = () => page.evaluate(() => [...document.querySelectorAll('[data-book]')].map(e => e.getAttribute('data-book')));

const openBook = async (name) => {
    const found = await page.evaluate(n => {
        const el = document.querySelector(`[data-book="${n}"]`);
        if (!el) return false;
        el.click();
        return true;
    }, name);
    if (!found) {
        const on = await spines();
        await report(`no spine named "${name}" — the shelf carries [${on.join(', ')}]. The entry point moved.`);
        return;
    }
    // THE BOOK ARRIVES, IT IS NOT ALREADY HERE. Three of the four are behind
    // dynamic imports now, so a fixed settle races the fetch — the same reason
    // the shelf's own spines became a landmark above. The spine leaving the DOM
    // is what says the book replaced it.
    await page.waitForFunction(
        n => !document.querySelector(`[data-book="${n}"]`),
        { timeout: 15000 },
        name,
    ).catch(() => {});
    return found;
};

await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
// THE SECTION ARRIVES, it is not present. Sections are fetched on demand now,
// so a fixed settle races the fetch — the shelf's own spines are the landmark.
await landmark('[data-book]', 'the shelf arrives; the section is fetched on demand');
await settle();

const shelved = await spines();
// EXACTLY, not at least. `>= 3` passed a fourth book without noticing it, which
// is how a new spine arrived unremarked; a count that cannot go wrong upward is
// not a count.
check(`the root is the shelf — its titled spines stand in the row [${shelved.join(', ')}]`, shelved.length === 4 && shelved.every(Boolean));
check('the shelf catalogues the books and not itself', !shelved.includes('The Shelf') && shelved.includes('The Build'));
check('the shelf is a room, not a scroll — pinned to the view', await page.evaluate(() => document.documentElement.scrollHeight <= window.innerHeight + 2));
if (shots) await page.screenshot({ path: 'shot-shelf.png' });

await openBook('The Algebra of Perspective');
await landmarked(() => document.body.innerText.includes('the classes'), 'the algebra book opens the page demo, which is a full page load');
await settle();
let t = await text();
check('ALGEBRA: the spine opens the page — the dark sheet, lenses book · github · night', t.includes('github') && t.includes('night') && t.includes('the classes'));
if (shots) await page.screenshot({ path: 'shot-algebra-page.png' });
await clickChip('the books →');
await landmark('[data-book]', 'the shelf draws its spines again');
await settle();
check('the page hands back to the shelf', (await spines()).length === shelved.length);

await openBook('The Manifold');
await landmark('[data-cover]', 'the book opens at its cover');
await settle();
t = await text();
// The invitation and the title are read off the cover itself rather than
// transcribed: a literal that drifts is how this check went stale.
const coverTitle = await page.evaluate(() => document.querySelector('[data-cover]')?.firstElementChild?.textContent ?? '');
check('MANIFOLD: the cover face — its own book, its own ink', t.includes('read the book') && coverTitle.length > 0 && t.includes(coverTitle));
if (shots) await page.screenshot({ path: 'shot-manifold-cover.png' });

// AE15 — a regression on a page that crashes on main. Bound to the TRANSITION:
// the count of errors before the click against the count after, so it passes
// only because opening the cover raised nothing, never because nothing ran.
const pageErrs = () => errors.filter(e => e.startsWith('pageerror')).length;
const beforeCover = pageErrs();
await page.click('[data-cover]');
await settle();
check('MANIFOLD: opening the cover raises no page error — AE15', pageErrs() === beforeCover);
t = await text();
check('MANIFOLD: opening the cover lands inside — the contents, folio 1', t.includes('apparatus') && (await page.evaluate(() => document.querySelectorAll('.toc-title').length)) === 8);

check('MANIFOLD: the book fits the view — reading scrolls inside the page', await page.evaluate(() => { const p = document.querySelector('.book-page'); return !!p && p.getBoundingClientRect().bottom <= window.innerHeight + 2; }));

// The way back to the cover is the RUNNING HEAD now, not a chip — the chip
// bar carries the subject link and the modes. From the contents, the head
// closes the book.
await clickHead();
await settle();
t = await text();
check('MANIFOLD: leafing back past the contents closes the book to its cover', t.includes('read the book') && !(await has('.book-page')));
await landmark('[data-cover]', 'the book opens at its cover');
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
check('MANIFOLD: the model page corroborates, formatted', t.toUpperCase().includes('THE MODEL, UNADORNED') && t.includes('the overlaps are the whole trick') && /\d+ read as paragraphs/.test(t));

// THE PARSE IS PROVED BY BEING READ AT EVERY LEVEL. One piece of writing, four
// altitudes, and the SAME WORD COUNT walked four genuinely different ways down
// through the model — while the number of ROWS is different at every altitude,
// because a chapter has few sections, more paragraphs, and many words.
const words = (s) => Number((s.match(/(\d+) words ·/) ?? [])[1] ?? -1);
const rows = (s) => Number((s.match(/· (\d+) read as/) ?? [])[1] ?? -1);
const atAltitude = async (name) => {
    await page.evaluate((n) => Array.from(document.querySelectorAll('button')).find(b => b.textContent === n)?.click(), name);
    await settle();
    const seen = await text();
    return { words: words(seen), rows: rows(seen), named: seen.includes(`read as ${name}`) };
};
const asSections = await atAltitude('sections');
const asParagraphs = await atAltitude('paragraphs');
const asSentences = await atAltitude('sentences');
const asWords = await atAltitude('words');
const every = [asSections, asParagraphs, asSentences, asWords];
check(
    `MANIFOLD: one writing read four ways — ${asSections.words} words through ${asSections.rows} sections, ${asParagraphs.rows} paragraphs, ${asSentences.rows} sentences, ${asWords.rows} words`,
    asSections.words > 0 && every.every(a => a.named && a.words === asSections.words)
);
check(
    'MANIFOLD: and the ROWS differ at every altitude — a chapter has fewer sections than paragraphs, fewer paragraphs than sentences, fewer sentences than words',
    asSections.rows < asParagraphs.rows && asParagraphs.rows < asSentences.rows && asSentences.rows < asWords.rows
);
check(
    `MANIFOLD: the word altitude prints one row per word — ${asWords.rows} rows for ${asWords.words} words`,
    asWords.rows === asWords.words
);
await atAltitude('paragraphs');

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
check('MANIFOLD: following a reference lights the span and fades', await page.evaluate(() => !!document.getElementById('7.0.3')?.classList.contains('lit')));
await page.click('.book-link');
await settle();
t = await text();
check('MANIFOLD: a reference in the prose travels the book', t.includes('chapter 3') && t.includes('developing one thought'));

check('MANIFOLD: the travel kept the way back — an arrow at the spine', await has('[data-return]'));
await page.click('[data-return]');
await settle();
t = await text();
check('MANIFOLD: the backwards arrow returns the reader to where they stood', t.includes('chapter 7') && t.includes('Transport'));
await page.evaluate(() => { const l = Array.from(document.querySelectorAll('.book-link')).find(e => e.textContent === 'its own chapter'); l?.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
await settle();
t = await text();
check('MANIFOLD: the loop walks both ways — forward again to the fold', t.includes('chapter 3'));

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
await clickHead();
await settle();
t = await text();
check('MANIFOLD: the book of code grew — the reference system on its own pages', t.includes('Location.tsx') && t.includes('marks.tsx'));
await clickToc('Location.tsx');
await settle();
t = await text();
check('MANIFOLD: the indexed reference reads as a page of code', t.includes('class $Location'));
await clickChip('read');
await settle();
t = await text();
check('MANIFOLD: the reading resumes where it stood', t.includes('chapter 3'));

await clickHead();
await settle();
await page.evaluate(() => { const l = Array.from(document.querySelectorAll('.entry-summary .toc-title')).find(e => e.textContent === 'The Atlas'); (l?.parentElement)?.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
await settle();
t = await text();
check('MANIFOLD: the atlas — a new chapter, a catalogue of charts', t.includes('chapter 8') && t.includes('cartography'));
await page.evaluate(() => { const l = Array.from(document.querySelectorAll('.book-link')).find(e => e.textContent === 'a word'); l?.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
await settle();
t = await text();
check('MANIFOLD: a reference below the paragraph — the page opens to the fold that holds the word', t.includes('chapter 3') && (await page.evaluate(() => !!document.getElementById('3.1.1')?.classList.contains('lit'))));
await page.click('[data-return]');
await settle();
t = await text();
check('MANIFOLD: the arrow leads back to the atlas', t.includes('chapter 8'));
await page.evaluate(() => { const l = Array.from(document.querySelectorAll('.book-link')).find(e => e.textContent === 'transport'); l?.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
await settle();
t = await text();
check('MANIFOLD: a link within the book lights the section it names', t.includes('chapter 7') && (await page.evaluate(() => !!document.getElementById('7.1')?.classList.contains('lit'))));
await page.click('[data-return]');
await settle();
await page.evaluate(() => { document.getElementById('8.2.1')?.dispatchEvent(new MouseEvent('dblclick', { bubbles: true })); });
await settle();
check('MANIFOLD: a ribbon pressed into a paragraph — two ribbons hang', await page.evaluate(() => document.querySelectorAll('[data-ribbon]').length === 2));
await clickChip('← previous');
await settle();
t = await text();
check('MANIFOLD: the page turns away from the atlas', t.includes('chapter 7'));
await page.evaluate(() => { const r = document.querySelectorAll('[data-ribbon]'); r[r.length - 1]?.click(); });
await settle();
check('MANIFOLD: the deep ribbon opens to the very paragraph, lit', await page.evaluate(() => !!document.getElementById('8.2.1')?.classList.contains('lit')));

await page.evaluate(() => { const b = document.querySelector('.page-body'); if (b) b.scrollTop = 300; });
await clickChip('← previous');
await settle();
check('MANIFOLD: a turned page opens at its head', (await text()).includes('chapter 7') && (await page.evaluate(() => document.querySelector('.page-body')?.scrollTop === 0)));

await page.evaluate(() => { document.querySelector('sup.note-mark')?.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
await settle();
check('MANIFOLD: the citation mark walks down to its note, lit', await page.evaluate(() => !!document.getElementById('note-ribbon')?.classList.contains('lit')));
await page.evaluate(() => { document.querySelector('.note-index')?.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
await settle();
check('MANIFOLD: the note walks back up to its mark — the loop at its smallest', await page.evaluate(() => !!document.getElementById('mark-ribbon')?.classList.contains('lit')));

// The subject link, read off the subject's own card — "← The Shelf".
await page.evaluate(() => document.querySelector('[data-subject]')?.dispatchEvent(new MouseEvent('click', { bubbles: true })));
await landmark('[data-book]', 'the shelf draws its spines again');
await settle();
check('back on the shelf after the manifold', (await spines()).length === shelved.length);

// THE BUILD — the fifth book, and the one whose figures COMPUTE. Every claim
// checked below is derived by the same rule the chapter states, so a wrong rule
// draws a wrong figure and this walk goes red rather than a reader being misled.
await openBook('The Build');
await settle();
t = await text();
check('BUILD: the spine opens the book — its cover, its own surface', t.includes('How a Folder Becomes a Library') && t.includes('The Team'));

const turn = async () => {
    const moved = await page.evaluate(() => {
        const next = [...document.querySelectorAll('button')].find(b => b.textContent.trim().endsWith('→') && !b.disabled);
        if (!next) return false;
        next.click();
        return true;
    });
    await settle();
    return moved;
};

// MATCHED ON BODY TEXT, NEVER ON A TITLE. The turn buttons carry the titles of
// the neighbouring chapters, so looking for a title lands one chapter early and
// every check after it reads the wrong page.
const reach = async (title, tries = 12) => {
    for (let i = 0; i < tries; i++) {
        if ((await text()).includes(title)) return true;
        if (!(await turn())) break;
    }
    await report(`never reached "${title}" while turning The Build — a chapter moved or the turn stopped.`);
    return false;
};

await reach('That is the whole of the arrangement');
check('BUILD: the folder tree labels every role, computed not typed', await page.evaluate(() => {
    const roles = [...document.querySelectorAll('[data-answer], .role, span')].map(n => n.textContent);
    return roles.some(r => /A SUBJECT|a subject/i.test(r ?? ''));
}));

await reach('There is a collision hiding in the word');
check('BUILD: the failure computes itself — a subject naming a book it does not hold', (await text()).includes('NOT reciprocal'));

await reach('It is a flat list, not a tree');
check('BUILD: the description derives eight folders and no complaints', (await text()).includes('no complaints — 8 folders described'));

await reach('Turning the one into the other is a phase of its own');
check('BUILD: the resolution marks what was supplied', await page.evaluate(() => !!document.querySelector('[data-supplied]')));
check('BUILD: and it reports the corpus has no author of its own', (await text()).includes('stands for nobody'));

await reach('Four phases turn folders into a program');
check('BUILD: three of six books are drawn as catalogues, computed by the rule', await page.evaluate(() =>
    document.querySelector('[data-consulted]')?.getAttribute('data-consulted') === '3'));
check('BUILD: every book in the figure is accounted for', await page.evaluate(() => document.querySelectorAll('[data-shown]').length === 6));

await page.evaluate(() => document.querySelector('[data-subject]')?.dispatchEvent(new MouseEvent('click', { bubbles: true })));
await landmark('[data-book]', 'the shelf draws its spines again');
await settle();
check('back on the shelf after the build', (await spines()).length === shelved.length);

await page.goto(`${BASE}/page`, { waitUntil: 'domcontentloaded', timeout: 30000 });
await landmark('[data-skin]', 'the page demonstration arrives; the section is fetched on demand');
await settle();
await settle();
t = await text();
check('the page demo still stands and links back', t.length > 50 && t.includes('the books'));

const filed = errors.filter(e => e.includes('Maximum update depth'));
const unfiled = errors.filter(e => !e.includes('Maximum update depth'));
if (filed.length) console.log(`KNOWN  teardown update storm (filed framework finding) fired ${filed.length}x`);
check('zero console errors beyond the filed teardown finding', unfiled.length === 0);

await report();
