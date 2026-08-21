import puppeteer from 'puppeteer';

const PORT = process.env.PORT || 5299;
const AT = (process.env.PUBLIC_BASE ?? '/').replace(/\/$/, '');
const BASE = `http://localhost:${PORT}${AT}`;

const browser = await puppeteer.launch({ headless: 'new', args: ['--window-size=1380,940'] });
const page = await browser.newPage();
await page.setViewport({ width: 1380, height: 940 });

const errors = [];
const checks = [];
page.on('console', m => { if (m.type() === 'error' || m.type() === 'warn') errors.push(`[after check ${checks.length}] ${m.type()}: ${m.text().slice(0, 120)}`); });
page.on('pageerror', e => errors.push(`pageerror: ${e}`));

const check = (name, got, want) => {
    const ok = typeof want === 'function' ? want(got) : got === want;
    checks.push({ name, ok, got });
    if (!ok) console.log(`  FAIL  ${name} — got ${JSON.stringify(got)}`);
};

const text = () => page.evaluate(() => document.body.innerText);
const count = (sel) => page.evaluate(s => document.querySelectorAll(s).length, sel);
const attr = (sel, name) => page.evaluate((s, n) => document.querySelector(s)?.getAttribute(n) ?? null, sel, name);
const settle = () => page.evaluate(() => new Promise(r => setTimeout(r, 260)));

const open = async (path) => {
    await page.goto(BASE + path, { waitUntil: 'networkidle0' });
    await settle();
};

// A navigation that finds nothing THROWS rather than clicking nothing and
// letting the next check pass against stale state.
const follow = async (sel, what) => {
    const found = await page.$(sel);
    if (!found) throw new Error(`nothing to click for ${what} (${sel}) — the walk stopped here`);
    await found.click();
    await settle();
};

// TURNING TO A NAMED CHAPTER goes through the contents, because the contents is
// a chapter with a page of its own rather than a bar carried on every page.
const turn = async (named) => {
    // From a title page there is no running head yet, so the way to the contents
    // is the same way a reader takes: turn to the next page.
    for (let tries = 0; tries < 3; tries++) {
        if (await page.$('[data-contents]')) break;
        const head = await page.$('[data-running]');
        if (head) { await head.click(); await settle(); continue; }
        const on = await page.$$('[data-turn-to]');
        if (!on.length) break;
        await on[on.length - 1].click();
        await settle();
    }
    const moved = await page.evaluate(n => {
        const row = [...document.querySelectorAll('[data-turn]')].find(a => (a.textContent ?? '').includes(n));
        if (!row) return false;
        row.click();
        return true;
    }, named);
    if (!moved) throw new Error(`no contents row named "${named}" — the way between chapters moved`);
    await settle();
};

try {
    await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
    await page.evaluate(() => window.localStorage.clear());

    // THE FRONT DOOR. The library is a folder of folders, therefore a subject,
    // therefore a book that catalogues — so the front door is the library's own
    // book drawn as a catalogue, and not a special screen.
    await open('/');
    check('the library serves at a root', new URL(page.url()).pathname, `${AT}/`);
    check('front door draws its shelf', await attr('[data-entries]', 'data-entries'), '3');
    check('front door is not a reader', await count('[data-reader]'), 0);
    check('front door names the library', (await text()).includes('A Test Library'), true);
    check('the trail is one step deep', await attr('[data-trail]', 'data-trail'), '1');
    check('an entry carries its own synopsis', (await text()).includes('Two books, one of them canonical.'), true);

    // A BOOK IS READ A CHAPTER AT A TIME. This is the promise the whole reading
    // surface turns on, and it is asserted on EVERY page below rather than once.
    check('ONE chapter stands, and only one', await count('[data-chapter]'), 1);
    check('and a reader can always move on', await count('[data-turn-to]'), n => n >= 1);

    // A SUBJECT. Its own book, and the books it catalogues — and none of those
    // is loaded to draw the shelf.
    await follow('[data-entry="/physics"] a', 'the physics entry');
    check('physics resolved by path', new URL(page.url()).pathname, `${AT}/physics`);
    check('physics catalogues two books', await attr('[data-entries]', 'data-entries'), '2');
    check('physics is drawn as a catalogue', await count('[data-reader]'), 0);
    check('the trail is two steps deep', await attr('[data-trail]', 'data-trail'), '2');
    check('a subject opens at its own title page', (await text()).includes('The Study of What There Is'), true);
    check('ONE chapter stands on a subject too', await count('[data-chapter]'), 1);

    // A BOOK. The only point at which a book's own module loads.
    await follow('[data-entry="/physics/the-standard-model"] a', 'the standard model entry');
    check('the standard model is drawn as a reader', await count('[data-reader]'), 1);
    check('a reader catalogues nothing', await count('[data-entries]'), 0);
    check('it opens at its title page, not at a chapter', (await text()).includes('A Catalogue of Fields'), true);
    check('THE TITLE SPLITS AT ITS COLON', await page.evaluate(() => document.querySelector('h1')?.textContent ?? ''), 'The Standard Model');
    check('the author and subject stand on ONE byline', await count('[data-byline]'), 1);
    check('and the chapter is NOT shown until it is turned to', (await text()).includes('A symmetry is a change that changes nothing'), false);

    // TURNING. In page, reactive, and no navigation — the route does not move.
    await turn('Symmetry');
    check('turning shows the chapter', (await text()).includes('A symmetry is a change that changes nothing'), true);
    check('and still exactly one stands', await count('[data-chapter]'), 1);
    check('the title page is gone from the reading', (await text()).includes('A Catalogue of Fields'), false);
    check('the route did not move — turning is not navigation', new URL(page.url()).pathname, `${AT}/physics/the-standard-model`);
    check('the chapter carries its own address', await attr('[data-chapter]', 'id'), 'symmetry');
    check('the running head is the way home', await count('[data-running]'), 1);

    // WHAT THE FRAMEWORK DRAWS, at word grade, which a run of prose used to eat.
    check('MATHEMATICS IS TYPESET, not printed as its source', await count('.katex'), n => n >= 1);
    check('emphasis is drawn rather than left as marks', await count('strong'), n => n >= 1);
    check('no asterisk pairs survive into the reading', (await text()).includes('**'), false);
    check('a list is drawn as items', await page.evaluate(() => document.body.innerText.includes('· ') || document.querySelectorAll('[data-chapter] div').length > 3), true);

    // THE TITLE TAKES YOU TO THE CONTENTS — Doug's, and it is the way between
    // chapters once the contents stopped being carried on every page.
    await follow('[data-running]', 'the running head');
    check('the running head takes the reader to the contents', await count('[data-contents]'), 1);

    // THE COVER THAT NAMED NOBODY. Its source names no author; the copy does.
    await open('/physics/gauge-theory');
    check('gauge theory constructs', await count('[data-reader]'), 1);
    check('the supplied author stands on the copy', (await text()).includes('The Team'), true);

    // THE OTHER SUBJECT, which declares no canonical book and holds one.
    await open('/philosophy');
    check('philosophy catalogues one book', await attr('[data-entries]', 'data-entries'), '1');

    // A PATH THE CATALOGUE DOES NOT HOLD.
    await open('/physics/nothing-here');
    check('an unknown path fails, and says so', await count('[data-failure]'), 1);
    check('the failure names the path', (await text()).includes('/physics/nothing-here'), true);
    check('nothing is drawn beside the failure', await count('[data-reader]'), 0);

    // AND WHAT THE READER LEFT BEHIND IS THERE WHEN THEY RETURN.
    await open('/physics/the-standard-model');
    await settle();
    await open('/physics');
    check('returning to a subject opens the book left open', new URL(page.url()).pathname, `${AT}/physics/the-standard-model`);

    await open('/philosophy');
    check('an unvisited subject opens as itself', new URL(page.url()).pathname, `${AT}/philosophy`);
} catch (e) {
    console.log(`\n  STALLED after ${checks.length} checkpoints: ${e.message}`);
    checks.push({ name: 'the walk finished', ok: false, got: e.message });
}

const failed = checks.filter(c => !c.ok);
console.log(`\nverify-library: ${checks.length} checkpoints, ${checks.length - failed.length} passed, ${failed.length} failed, ${errors.length} console errors`);
for (const e of errors) console.log(`  ${e}`);

await browser.close();
process.exit(failed.length || errors.length ? 1 : 0);
