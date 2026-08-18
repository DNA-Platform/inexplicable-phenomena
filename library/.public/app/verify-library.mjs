import puppeteer from 'puppeteer';

const PORT = process.env.PORT || 5299;
const BASE = `http://localhost:${PORT}/inexplicable-phenomena`;

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

// A navigation that finds nothing THROWS rather than clicking nothing and
// letting the next check pass against stale state.
const settle = () => page.evaluate(() => new Promise(r => setTimeout(r, 220)));

const open = async (path) => {
    await page.goto(BASE + path, { waitUntil: 'networkidle0' });
    await settle();
};

const follow = async (sel, what) => {
    const found = await page.$(sel);
    if (!found) throw new Error(`nothing to click for ${what} (${sel}) — the walk stopped here`);
    await found.click();
    await settle();
};

try {
    // A READER ARRIVING FOR THE FIRST TIME. Every walk below assumes nothing was
    // left behind, so the drawer is emptied before it starts.
    await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
    await page.evaluate(() => window.localStorage.clear());

    // THE FRONT DOOR. The library is a folder of folders, therefore a subject,
    // therefore a book that catalogues — so the front door is the library's own
    // book drawn as a catalogue, and not a special screen.
    await open('/');
    // MOVED 2026-08-17: the corpus gained `the-team`, the book that authors
    // itself, so the library catalogues three where it catalogued two.
    check('front door draws entries', await attr('[data-entries]', 'data-entries'), '3');
    check('front door is not a reader', await count('[data-reader]'), 0);
    check('front door names the library', (await text()).includes('A Test Library'), true);
    check('the trail is one step deep', await attr('[data-trail]', 'data-trail'), '1');
    check('an entry carries its own synopsis', (await text()).includes('Two books, one of them canonical.'), true);

    // A SUBJECT. Its own chapters and the books it catalogues, through the same
    // members — and none of those books is loaded to draw it.
    await follow('[data-entry="/physics"] div', 'the physics entry');
    check('physics resolved by path', new URL(page.url()).pathname, '/inexplicable-phenomena/physics');
    check('physics catalogues two books', await attr('[data-entries]', 'data-entries'), '2');
    check('physics is drawn as a catalogue', await count('[data-reader]'), 0);
    check('the trail is two steps deep', await attr('[data-trail]', 'data-trail'), '2');

    // A SUBJECT IS BOTH THINGS AT ONCE. Its own writing stands beside the books
    // it catalogues, and a subject page that showed only entries would be
    // hiding half of what the book is.
    check('physics draws its own writing too', await attr('[data-own]', 'data-own'), '3');
    check('a subject chapter of its own stands', (await text()).includes('A subject is not a folder that announces itself'), true);

    // A BOOK. The only point at which a book's own module loads.
    await follow('[data-entry="/physics/the-standard-model"] div', 'the standard model entry');
    check('the standard model is drawn as a reader', await count('[data-reader]'), 1);
    check('a reader catalogues nothing', await count('[data-entries]'), 0);
    check('its chapter stands', (await text()).includes('A symmetry is a change that changes nothing'), true);

    // THE CHAPTER'S FIGURE STANDS. Where a book's own figure comes from is not
    // settled in the corpus yet; what is settled is that a chapter may carry one
    // and that it draws where it was written.
    check('the chapter draws its figure', (await text()).includes("standing where a book's own would go"), true);

    // THE COVER THAT NAMED NOBODY. Its source names no author; the copy does,
    // and that is the only reason it constructs at all.
    await open('/physics/gauge-theory');
    check('gauge theory constructs', await count('[data-reader]'), 1);
    check('the supplied author stands on the copy', (await text()).includes('The Team'), true);

    // THE OTHER SUBJECT, which declares no canonical book and holds one.
    await open('/philosophy');
    check('philosophy catalogues one book', await attr('[data-entries]', 'data-entries'), '1');

    // A PATH THE CATALOGUE DOES NOT HOLD. A failure that names what was asked
    // for, never a blank page.
    await open('/physics/nothing-here');
    check('an unknown path fails, and says so', await count('[data-failure]'), 1);
    check('the failure names the path', (await text()).includes('/physics/nothing-here'), true);
    check('nothing is drawn beside the failure', await count('[data-reader]'), 0);

    // A CHAPTER HAS AN ADDRESS, and the address follows the reader rather than
    // being clicked. The route stays the book; the fragment moves.
    await open('/physics/the-standard-model');
    check('chapters carry anchors', await count('[data-chapter]'), 4);
    check('the second chapter is named for its title', await attr('[data-chapter="3"]', 'id'), 'symmetry');
    check('the fragment starts at the cover', await page.evaluate(() => window.location.hash), '#the-standard-model');
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await settle();
    check('the fragment follows the reader down', await page.evaluate(() => window.location.hash), '#symmetry');
    check('the route is still the book', new URL(page.url()).pathname, '/inexplicable-phenomena/physics/the-standard-model');

    // AND WHAT THE READER LEFT BEHIND IS THERE WHEN THEY RETURN. A bookmark is
    // kept per TOP-LEVEL subject: coming back to the subject opens the book they
    // were in, at the place they were at. This is a fresh load, not a click.
    await open('/physics');
    check('returning to a subject opens the book left open', new URL(page.url()).pathname, '/inexplicable-phenomena/physics/the-standard-model');
    check('and it opens at the place left off', await page.evaluate(() => window.location.hash), '#symmetry');

    // A SUBJECT NOBODY HAS READ KEEPS NOTHING, so it opens as itself.
    await open('/philosophy');
    check('an unvisited subject opens as itself', new URL(page.url()).pathname, '/inexplicable-phenomena/philosophy');
} catch (e) {
    console.log(`\n  STALLED after ${checks.length} checkpoints: ${e.message}`);
    checks.push({ name: 'the walk finished', ok: false, got: e.message });
}

const failed = checks.filter(c => !c.ok);
console.log(`\nverify-library: ${checks.length} checkpoints, ${checks.length - failed.length} passed, ${failed.length} failed, ${errors.length} console errors`);
for (const e of errors) console.log(`  ${e}`);

await browser.close();
process.exit(failed.length || errors.length ? 1 : 0);
