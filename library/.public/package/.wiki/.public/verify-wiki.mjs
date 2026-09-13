// THE WIKI GATE. Drives the served encyclopedia against Wikipedia's own recorded geometry and fails
// naming what failed — Sprint 63, U12.
//
// `node verify-wiki.mjs --baseline` records www.wikipedia.org AND en.wikipedia.org/wiki/Alan_Turing
// at five widths into .portal/portal.json; every other run checks ours against that recording, so the
// gate is offline and re-baselining is a deliberate act rather than a silent drift.
//
// IT MEASURES PARTS AND COUNTS, NOT ONLY BOXES. A search bar 540 wide holding a 484 input where the
// real one holds 394 passes every check made on the container, so every region names the pieces
// inside it; and a page that draws the right frame around the wrong content passes every geometric
// check, so the article's kinds are counted against the real article's.
//
// AND IT OPERATES THE PAGE. Geometry says nothing about whether a control works; this gate passed for
// a day while the language chooser drew seventy-seven editions in transparent ink.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'file:///C:/Source/dna-platform/inexplicable-phenomena/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const here = dirname(fileURLToPath(import.meta.url));
const recording = join(here, '.portal', 'portal.json');
const ours = process.env.WIKI ?? 'http://localhost:5311/';
const baselining = process.argv.includes('--baseline');
// ONE PAGE COSTS ONE PAGE: `--only=turing` runs that target alone; a baseline still records every page.
const only = process.argv.find(one => one.startsWith('--only='))?.slice(7);
// ONE WIDTH COSTS ONE WIDTH: `--at=1280` measures that width alone; the looks and counts are read at 1280 regardless.
const at = Number(process.argv.find(one => one.startsWith('--at='))?.slice(5) ?? 0);
const widths = [2560, 1920, 1600, 1536, 1440, 1366, 1280, 1200, 1120, 1024, 1000, 900, 768, 720, 640, 480, 414, 375, 360];

// WHAT ANY ENCYCLOPEDIA PAGE IS MEASURED BY: the same regions, counts and looks on every page
// of the type, recorded from the real page each stands beside.
const encyclopedia = {
    regions: [
        ['header bar', '.vector-header-container header', '.pd-header'],
        ['wordmark', '.mw-logo', '.pd-header > .pd-section:not(.pd-menu)'],
        ['main menu', '#vector-main-menu-dropdown-checkbox', '.pd-header > .pd-menu > .pd-summary'],
        ['search', '#p-search form', '.pd-search'],
        ['who you are', '.vector-user-links', '.pd-header > .pd-paragraph:not(.pd-search):not(.pd-heading)'],
        ['contents', '.vector-column-start', 'nav.pd-table-of-contents'],
        ['title', '#firstHeading', '.pd-cover > .pd-title .pd-heading'],
        ['languages', '#p-lang-btn', '.pd-cover > .pd-menu'],
        ['toolbar', '.vector-page-toolbar', '.pd-toolbar'],
        ['text top', '.vector-body', 'article.pd-synopsis'],
        ['indicator', '.mw-indicator', 'article.pd-synopsis .pd-image'],
        ['manual', 'table.sidebar', '.pd-manual'],
        ['first text', '.mw-parser-output .hatnote', '.pd-body > .pd-chapter > article .pd-hatnote'],
        ['infobox image', '.infobox-image img', '.pd-infobox img'],
        ['contents heading', '#vector-toc-pinned-container .vector-pinnable-header-label', '.pd-table-of-contents .pd-heading'],
        ['contents row', '#vector-toc .vector-toc-level-1:not(#toc-mw-content-text) > .vector-toc-link .vector-toc-text', '.pd-table-of-contents .pd-summary .pd-ref'],
        ['appearance heading', '#vector-appearance .vector-pinnable-header-label', '.pd-appearance h3'],
        ['rail', '.vector-column-end', '.pd-appearance'],
        ['infobox', '.infobox', '.pd-infobox'],
        ['footer', '.mw-footer', '.pd-footer'],
    ],
    counts: [
        ['illustrations', '.mw-content-ltr figure', '.pd-illustration:not(.pd-infobox *)'],
        ['manual groups', 'table.sidebar .sidebar-list', '.pd-manual .pd-menu'],
        ['manual links', 'table.sidebar a', '.pd-manual .pd-ref'],
        ['quotations', '.mw-content-ltr blockquote', '.pd-quote'],
        ['hatnotes', '.mw-content-ltr .hatnote', '.pd-hatnote'],
        // A MARK IS READ WHEN IT NAMES AN ENTRY, so the count asks for the marks that do.
        ['citation marks', '.mw-content-ltr p sup.reference:has(a[href^="#cite_note"]), .mw-content-ltr li sup.reference:has(a[href^="#cite_note"]), .mw-content-ltr figcaption sup.reference:has(a[href^="#cite_note"]), .mw-content-ltr blockquote sup.reference:has(a[href^="#cite_note"]), .infobox sup.reference:has(a[href^="#cite_note"])', '.pd-citation'],
        ['infobox rows', '.infobox tr:has(.infobox-label):has(.infobox-data)', '.pd-line'],
        ['languages offered', '.interlanguage-link', '.pd-cover > .pd-menu a'],
        ['tools offered', '#vector-page-tools a', '.pd-toolbar > .pd-menu a'],
        ['tabs', '#p-associated-pages a, #p-views a', '.pd-toolbar > .pd-paragraph a'],
    ],
    styles: [
        ['title', '#firstHeading', '.pd-cover > .pd-title .pd-heading'],
        ['title rule', '.vector-page-titlebar', '.pd-cover > .pd-title'],
        ['toolbar rule', '.vector-page-toolbar-container', '.pd-toolbar'],
        ['selected tab', '#p-associated-pages li.selected a', '.pd-toolbar > .pd-paragraph:first-of-type .pd-ref:first-child'],
        ['tab Talk', '#ca-talk a', '.pd-toolbar > .pd-paragraph:first-of-type .pd-ref:last-child'],
        ['view Read', '#ca-view a', '.pd-toolbar > .pd-paragraph:last-of-type .pd-ref:first-child'],
        ['view History', '#ca-history a', '.pd-toolbar > .pd-paragraph:last-of-type .pd-ref:last-child'],
        ['tools button', '#vector-page-tools-dropdown .vector-dropdown-label', '.pd-toolbar > .pd-menu > .pd-summary'],
        ['languages button', '#p-lang-btn .vector-dropdown-label', '.pd-cover > .pd-menu > .pd-summary'],
        ['site line', '#siteSub', 'article.pd-synopsis .pd-paragraph'],
        ['subpage line', '#contentSub .subpages', 'article.pd-synopsis .pd-paragraph:nth-of-type(2)'],
        ['hatnote', '.mw-content-ltr .hatnote', '.pd-hatnote'],
        ['second hatnote', '.mw-content-ltr .hatnote ~ .hatnote', '.pd-body > .pd-chapter > article .pd-hatnote + .pd-hatnote'],
        ['lead paragraph', '.mw-content-ltr section:first-of-type > p:not(.mw-empty-elt)', '.pd-body > .pd-chapter > article.pd-document > p.pd-paragraph:not(.pd-hatnote)'],
        ['lead bold', '.mw-content-ltr section:first-of-type > p b', '.pd-body > .pd-chapter > article.pd-document > .pd-paragraph .pd-bold'],
        ['lead italic', '.mw-content-ltr section p i', '.pd-body .pd-paragraph .pd-italics:not(.pd-aside .pd-italics):not(.pd-manual .pd-italics)'],
        ['body link', '.mw-content-ltr section p > a:not(.external)', '.pd-body > .pd-chapter > article.pd-document > .pd-paragraph:not(.pd-hatnote) .pd-book-link'],
        ['citation mark', 'section p > sup.reference > a', '.pd-body > .pd-chapter > article .pd-citation:not(.pd-infobox .pd-citation)'],
        ['section heading', '.mw-heading2 h2', '.pd-body > .pd-chapter > article > .pd-section:not(.pd-aside) > .pd-heading'],
        ['section rule', '.mw-heading2', '.pd-body > .pd-chapter > article > .pd-section:not(.pd-aside) > .pd-heading'],
        ['subheading', '.mw-heading3 h3', '.pd-body > .pd-chapter > article > .pd-section:not(.pd-aside) > .pd-section > .pd-heading'],
        ['infobox', '.infobox', '.pd-infobox'],
        ['infobox title', '.infobox-above', '.pd-infobox > .pd-heading'],
        ['infobox row', '.infobox-data', '.pd-line'],
        ['infobox caption', '.infobox-caption', '.pd-infobox .pd-caption'],
        ['infobox image', '.infobox-image img', '.pd-infobox img'],
        ['first figure image', '.mw-content-ltr figure img', '.pd-illustration:not(.pd-infobox *) img'],
        ['figure', '.mw-content-ltr figure', '.pd-body .pd-illustration:not(.pd-infobox *)'],
        ['figure caption', '.mw-content-ltr figure figcaption', '.pd-body .pd-illustration:not(.pd-infobox *) .pd-caption'],
        ['contents heading', '#vector-toc-pinned-container .vector-pinnable-header-label', '.pd-table-of-contents .pd-heading'],
        ['contents top', '#toc-mw-content-text > a .vector-toc-text', '.pd-table-of-contents > .pd-section > .pd-paragraph:first-of-type .pd-ref'],
        ['contents row', '#vector-toc .vector-toc-level-1:not(#toc-mw-content-text) > .vector-toc-link .vector-toc-text', '.pd-table-of-contents .pd-summary .pd-ref'],
        ['search field', '#searchInput', '.pd-search .pd-field'],
        ['search button', '#searchform button', '.pd-search .pd-button'],
        ['wordmark', '.mw-logo-wordmark', '.pd-header .pd-image'],
        ['tagline', '.mw-logo-tagline', '.pd-header > .pd-section:not(.pd-menu) > .pd-image + .pd-image'],
        ['user link', '#pt-createaccount-2 a', '.pd-header > .pd-paragraph:not(.pd-search):not(.pd-heading) .pd-ref'],
        ['appearance heading', '#vector-appearance .vector-pinnable-header-label', '.pd-appearance h3'],
        ['appearance group', '#vector-appearance .vector-menu-heading', '.pd-appearance h4'],
        // THE OPTION'S INDENT is what a reader sees; its bottom padding reads 4px on one of Wikipedia's pages and 0 on another.
        ['appearance option indent', '#vector-appearance .cdx-radio:first-of-type .cdx-radio__label', '.pd-appearance label'],
        ['appearance option', '#vector-appearance .cdx-radio:first-of-type .cdx-radio__label', '.pd-appearance label'],
        ['appearance radio', '#vector-appearance .cdx-radio__icon', '.pd-appearance input'],
        // THE PANELS' ROWS, read shut on both pages: a shut menu's rows keep their font, colour and padding.
        ['main menu row', '#vector-main-menu .vector-menu-content li a', '.pd-header > .pd-menu .pd-paragraph .pd-ref'],
        ['tools row', '#vector-page-tools .vector-menu-content li a', '.pd-toolbar > .pd-menu .pd-paragraph .pd-ref'],
        ['languages row', '#p-lang-btn .vector-menu-content li a', '.pd-cover > .pd-menu .pd-paragraph .pd-ref'],
        ['footer', '.mw-footer', '.pd-footer'],
        ['footer line', '#footer-info li', '.pd-footer .pd-paragraph:not(.pd-heading)'],
        ['footer link', '#footer-places a', '.pd-footer .pd-ref'],
        // THE MANUAL, part by part — Doug: "pull markup for many breakpoints and fix it." A toggle pair
        // reads our summary's ::after, because that is where ours draws its [show].
        ['manual box', 'table.sidebar', '.pd-manual'],
        ['manual title', 'table.sidebar .sidebar-title', '.pd-manual > .pd-section > .pd-heading'],
        ['manual title link', 'table.sidebar .sidebar-title a', '.pd-manual > .pd-section > .pd-heading .pd-ref'],
        ['manual field', 'table.sidebar input.searchboxInput', '.pd-manual .pd-search .pd-field'],
        ['manual search button', 'table.sidebar input[type=submit]', '.pd-manual .pd-search .pd-button'],
        ['manual band', 'table.sidebar .sidebar-list-title', '.pd-manual .pd-menu > .pd-summary'],
        ['manual toggle', 'table.sidebar .mw-collapsible-text', '.pd-manual .pd-menu > .pd-summary'],
        ['manual link', 'table.sidebar .sidebar-list-content a', '.pd-manual .pd-menu .pd-paragraph .pd-ref'],
        ['manual below', 'table.sidebar .sidebar-below', '.pd-manual > .pd-section > .pd-paragraph:nth-last-child(2)'],
        ['manual navbar', 'table.sidebar .sidebar-navbar', '.pd-manual > .pd-section > .pd-paragraph:last-child'],
        ['manual navbar link', 'table.sidebar .sidebar-navbar a', '.pd-manual > .pd-section > .pd-paragraph:last-child .pd-ref'],
    ],
    landmarks: [],
};

const targets = [
    {
        key: 'portal',
        // BELOW 768 WIKIPEDIA SERVES ITS PORTAL A DIFFERENT ARRANGEMENT, so what is asked there is
        // that every region is drawn and nothing scrolls sideways.
        pinned: [1280, 1000, 768],
        theirs: 'https://www.wikipedia.org/',
        ours: '',
        regions: [
            ['wordmark', '.central-textlogo__image', 'header .pd-image'],
            ['ring', '.central-featured', '.pd-languages'],
            ['first language', '.central-featured-lang.lang1', '.pd-language'],
            ['last language', '.central-featured-lang.lang10', 'last:.pd-language'],
            ['search', '.search-container', 'header form'],
            ['search field', '.search-container input[name=search]', 'input[name=search]'],
            ['search button', '.search-container button', 'button[type=submit]'],
            ['language button', '.lang-list-button', '.pd-editions h2'],
            ['project card', '.other-project', '.pd-projects > .pd-project'],
            ['card title', '.other-project-title', '.pd-projects > .pd-project .pd-title'],
            ['card tagline', '.other-project-tagline', '.pd-projects > .pd-project p:last-child'],
        ],
        counts: [],
        landmarks: [],
    },
    {
        key: 'turing',
        pinned: widths.filter(one => one >= 1120),
        theirs: 'https://en.wikipedia.org/wiki/Alan_Turing',
        ours: 'turing',
        ...encyclopedia,
    },
    // THE MANUAL OF STYLE IS BUILT BY THE SAME READER AS THE TURING PAGE, so it is measured the same
    // way: every region drawn, every count equal, every look Wikipedia's; where each region stands
    // is pinned on the Turing page alone, by Doug's word.
    {
        key: 'article',
        pinned: [],
        pinnedRegions: ['manual'],
        theirs: 'https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout',
        ours: 'article',
        ...encyclopedia,
    },
];

const measure = (page, list, which) => page.evaluate((list, which) => {
    const find = (selector) => {
        if (selector.startsWith('up:')) return document.querySelector(selector.slice(3))?.parentElement ?? null;
        if (selector.startsWith('last:')) { const all = document.querySelectorAll(selector.slice(5)); return all[all.length - 1] ?? null; }
        return document.querySelector(selector);
    };
    const seen = {};
    for (const one of list) {
        const el = find(one[which]);
        if (!el) { seen[one[0]] = null; continue; }
        const box = el.getBoundingClientRect();
        seen[one[0]] = { x: Math.round(box.x), y: Math.round(box.y), w: Math.round(box.width), h: Math.round(box.height) };
    }
    return seen;
}, list, which);

const tally = (page, list, which) => page.evaluate((list, which) => {
    const seen = {};
    for (const one of list) { try { seen[one[0]] = document.querySelectorAll(one[which]).length; } catch (e) { seen[one[0]] = 0; } }
    return seen;
}, list, which);

const present = (page, list, which) => page.evaluate((list, which) => {
    const seen = {};
    for (const one of list) seen[one[0]] = document.querySelector(one[which]) !== null;
    return seen;
}, list, which);

// THE LOOK OF EVERY ELEMENT IN THE TITLE BLOCK, read off both pages the same way: the face, the
// size, the weight, the colour, the rules above and below it, and the space around it. Doug: "the
// most iconic part of wikipedia — title, separators, font, spacing" — so each of those is a number
// the recording carries and a failure the run names.
const looked = ['fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'lineHeight', 'color', 'backgroundColor', 'borderTop', 'borderBottom', 'marginTop', 'marginBottom', 'marginLeft', 'paddingTop', 'paddingBottom', 'paddingLeft', 'textDecorationLine', 'height', 'boxShadow', 'width'];
const looks = (page, list, which) => page.evaluate((list, which, looked) => {
    const seen = {};
    for (const one of list) {
        let el = null;
        try { el = document.querySelector(one[which]); } catch (e) { el = null; }
        if (!el) { seen[one[0]] = null; continue; }
        const style = /toggle$/.test(one[0]) && which === 2 ? getComputedStyle(el, '::after') : getComputedStyle(el);
        const said = { tag: el.tagName };
        for (const name of looked) said[name] = style[name];
        if (/rule$/.test(one[0])) { const after = getComputedStyle(el, '::after'); said.afterContent = after.content; said.afterHeight = after.height; said.afterBackground = after.backgroundColor; }
        seen[one[0]] = said;
    }
    return seen;
}, list, which, looked);

const px = (value) => /^-?[\d.]+px$/.test(value) ? Number(value.slice(0, -2)) : undefined;
const family = (value) => value.split(',')[0].replace(/["']/g, '').trim().toLowerCase();
const weight = (value) => value === 'bold' ? '700' : value === 'normal' ? '400' : value;
const rule = (value) => /^0px/.test(value) ? 'none' : value;
const paint = (value) => value === 'rgba(0, 0, 0, 0)' ? 'transparent' : value;
const differs = (name, theirs, ours) => {
    const off = [];
    const ruled = /rule/.test(name), faced = /heading$|^title$/.test(name), pictured = ours.tag === 'IMG' || theirs.tag === 'IMG';
    // A HEIGHT IS COMPARED ONLY WHERE IT IS SET, on a tab or a button; everywhere else it is the text's.
    const boxed = /tab$|button$|^tab |^view /.test(name), sized = /image$|radio$/.test(name);
    for (const prop of looked) {
        if (prop === 'height' && !boxed && !sized) continue;
        if (prop === 'width' && !sized) continue;
        if (/indent$/.test(name) && prop !== 'paddingLeft') continue;
        if (pictured && /font|color|lineHeight|textDecoration/i.test(prop)) continue;
        if (ruled && !/^(border|margin|padding|boxShadow)/.test(prop)) continue;
        if (faced && /^(border|margin|padding|boxShadow)/.test(prop)) continue;
        if (prop === 'boxShadow' && !ruled) continue;
        const a = theirs[prop], b = ours[prop];
        if (a === undefined || b === undefined) continue;
        let same;
        if (prop === 'fontFamily') same = family(a) === family(b);
        else if (prop === 'fontWeight') same = weight(a) === weight(b);
        else if (/^border/.test(prop)) same = rule(a) === rule(b);
        else if (/color/i.test(prop)) same = paint(a) === paint(b);
        else if (px(a) !== undefined && px(b) !== undefined) same = Math.abs(px(a) - px(b)) <= 1;
        else if (prop === 'lineHeight' && (a === 'normal' || b === 'normal')) same = true;
        else same = a === b;
        if (!same) off.push(`${prop}: theirs ${a}, ours ${b}`);
    }
    if (ruled && theirs.afterContent !== undefined && theirs.afterContent !== 'none') {
        if (px(theirs.afterHeight) === undefined || px(ours.afterHeight) === undefined || Math.abs(px(theirs.afterHeight) - px(ours.afterHeight)) > 1) off.push(`::after height: theirs ${theirs.afterHeight}, ours ${ours.afterHeight}`);
        if (paint(theirs.afterBackground) !== paint(ours.afterBackground ?? '')) off.push(`::after background: theirs ${theirs.afterBackground}, ours ${ours.afterBackground}`);
    }
    return off;
};

const up = async (url) => {
    for (let tries = 0; tries < 30; tries++) {
        try { if ((await fetch(url)).status === 200) return true; } catch { }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    return false;
};

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
// AN ABORTED IMAGE IS A BROKEN ONE, and a browser draws a broken image's words in place of its box —
// on Wikipedia's side too, which put a 347px indicator into one recording. Every image is answered
// with one pixel instead: it loads at once, and its width and height say its box.
const pixel = { status: 200, contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>' };
const opened = async (width, url, timeout) => {
    const tab = await browser.newPage();
    await tab.setRequestInterception(true);
    tab.on('request', one => (one.resourceType() === 'image' ? one.respond(pixel) : /^(media|font)$/u.test(one.resourceType()) ? one.abort() : one.continue()));
    await tab.setViewport({ width, height: 900 });
    await tab.goto(url, { waitUntil: 'networkidle0', timeout });
    return tab;
};
const each = async (list, limit, work) => {
    const out = [];
    for (let from = 0; from < list.length; from += limit) out.push(...await Promise.all(list.slice(from, from + limit).map(work)));
    return out;
};

if (baselining) {
    const page = await browser.newPage();
    const read = {};
    for (const target of targets.filter(one => baselining || only === undefined || one.key === only)) {
        read[target.key] = { regions: {}, counts: {}, landmarks: {} };
        const seen = await each(widths, 4, async (width) => {
            const tab = await opened(width, target.theirs, 90000);
            const regions = await measure(tab, target.regions, 1);
            const extra = width === 1280 ? { counts: await tally(tab, target.counts, 1), landmarks: await present(tab, target.landmarks, 1) } : {};
            await tab.close();
            return { width, regions, ...extra };
        });
        for (const one of seen) {
            read[target.key].regions[one.width] = one.regions;
            if (one.counts) { read[target.key].counts = one.counts; read[target.key].landmarks = one.landmarks; }
            console.log(`  ${target.key.padEnd(7)} ${String(one.width).padStart(5)}  ${Object.values(one.regions).filter(Boolean).length} of ${target.regions.length} regions drawn`);
        }
        if ((target.styles ?? []).length) {
            await page.setViewport({ width: 1280, height: 900 });
            await page.goto(target.theirs, { waitUntil: 'networkidle0', timeout: 90000 });
            read[target.key].styles = await looks(page, target.styles, 1);
            console.log(`  ${target.key} styles: ${Object.values(read[target.key].styles).filter(Boolean).length} of ${target.styles.length} elements read`);
            read[target.key].contentsStep = await page.evaluate(() => {
                const li = [...document.querySelectorAll('#vector-toc .vector-toc-level-1')].find(one => one.querySelector('.vector-toc-level-2'));
                if (!li) return null;
                li.classList.add('vector-toc-list-item-expanded');
                const above = li.querySelector(':scope > .vector-toc-link .vector-toc-text').getBoundingClientRect().x;
                const below = li.querySelector('.vector-toc-level-2 > .vector-toc-link .vector-toc-text').getBoundingClientRect().x;
                return Math.round(below - above);
            });
            console.log(`  ${target.key} contents step: ${read[target.key].contentsStep}`);
        }
        if (target.counts.length) console.log(`  ${target.key} counts: ` + Object.entries(read[target.key].counts).map(([k, v]) => `${k} ${v}`).join(' · '));
        if (target.landmarks.length) console.log(`  ${target.key} landmarks: ` + Object.entries(read[target.key].landmarks).map(([k, v]) => `${k} ${v ? 'present' : 'absent'}`).join(' · '));
    }
    await mkdir(dirname(recording), { recursive: true });
    await writeFile(recording, JSON.stringify({ read: process.env.TODAY ?? 'undated', widths, targets: read }, null, 1), 'utf8');
    console.log(`verify-wiki: recorded into ${recording.slice(recording.indexOf('.wiki'))}`);
    await browser.close();
    process.exit(0);
}

if (!await up(ours)) { console.error(`verify-wiki: nothing answers at ${ours} — start the servers with sh serve.sh`); await browser.close(); process.exit(2); }
const wanted = await readFile(recording, 'utf8').then(JSON.parse).catch(() => null);
if (wanted === null) { console.error('verify-wiki: no recording — run with --baseline while Wikipedia is reachable'); await browser.close(); process.exit(2); }

const failures = [];
const expect = (held, message) => { if (!held) failures.push(message); };

for (const target of targets.filter(one => baselining || only === undefined || one.key === only)) {
    const want = wanted.targets?.[target.key];
    if (!want) { expect(false, `${target.key}: nothing recorded — re-run with --baseline`); continue; }
    const page = await browser.newPage();
    // AN IMAGE'S BOX IS ITS WIDTH AND HEIGHT, not its bytes: every image on the page is sized by the
    // page, so the bytes are not fetched while measuring — networkidle0 then arrives in a moment.
    await page.setRequestInterception(true);
    page.on('request', one => (one.resourceType() === 'image' ? one.respond(pixel) : /^(media|font)$/u.test(one.resourceType()) ? one.abort() : one.continue()));
    const errors = [];
    page.on('pageerror', error => errors.push(String(error.message).slice(0, 140)));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text().slice(0, 140)); });

    const visited = await each(at ? [at] : widths, 8, async (width) => {
        const tab = await opened(width, new URL(target.ours, ours).href, 60000);
        const seen = await measure(tab, target.regions, 2);
        const wide = await tab.evaluate(() => document.documentElement.scrollWidth);
        await tab.close();
        return { width, seen, wide };
    });
    for (const { width, seen, wide } of visited) {
        const slack = width >= 768 ? 6 : 12;
        // WHERE A REGION STANDS IS CHECKED AT THE WIDTHS THE DESIGN IS FOR. Below those Wikipedia
        // reflows its chrome into a different page — the contents becomes a menu at the top, who
        // you are collapses to one icon — and holding ours to those numbers would be holding it to
        // a design nobody built. What every width still owes: every region drawn, and no page that
        // scrolls sideways.
        const pinned = (target.pinned ?? widths).includes(width);
        let matched = 0;
        for (const [name] of target.regions) {
            const asked = want.regions[width]?.[name], got = seen[name];
            if (!asked) continue;
            if (!got) { expect(false, `${target.key} ${width}: ${name} is not drawn`); continue; }
            const placed = name === 'footer' || asked.y === undefined || Math.abs(asked.y - got.y) <= slack;
            if (Math.abs(asked.x - got.x) <= slack && Math.abs(asked.w - got.w) <= slack && placed) matched++;
            const held = pinned || (width >= 1120 && (target.pinnedRegions ?? []).includes(name));
            if (!held) continue;
            expect(Math.abs(asked.x - got.x) <= slack, `${target.key} ${width}: ${name} stands at x ${got.x} where Wikipedia sets ${asked.x}`);
            expect(Math.abs(asked.w - got.w) <= slack, `${target.key} ${width}: ${name} is ${got.w} wide where Wikipedia sets ${asked.w}`);
            if (pinned) expect(placed, `${target.key} ${width}: ${name} stands at y ${got.y} where Wikipedia sets ${asked.y}`);
        }
        expect(wide <= width + 1, `${target.key} ${width}: scrolls sideways — ${wide}`);
        console.log(`${target.key.padEnd(7)} ${String(width).padStart(5)}  ${matched} of ${target.regions.length} regions within ${slack}px${pinned ? '' : ' (drawn only — Wikipedia reflows here)'}`);
    }

    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(new URL(target.ours, ours).href, { waitUntil: 'networkidle0', timeout: 60000 });

    if (target.counts.length) {
        const got = await tally(page, target.counts, 2);
        const said = [];
        for (const [name] of target.counts) {
            const asked = want.counts?.[name] ?? 0;
            said.push(`${name} ${got[name]}/${asked}`);
            expect(got[name] === asked, `${target.key}: ${got[name]} ${name} where Wikipedia draws ${asked}`);
        }
        console.log(`${target.key} counts: ${said.join(' · ')}`);
    }

    if ((target.styles ?? []).length && want.styles) {
        const seen = await looks(page, target.styles, 2);
        let matched = 0;
        for (const [name] of target.styles) {
            const asked = want.styles[name], got = seen[name];
            if (!asked) continue;
            if (!got) { expect(false, `${target.key} style · ${name} is not drawn`); continue; }
            const off = differs(name, asked, got);
            if (off.length === 0) matched++;
            for (const one of off) expect(false, `${target.key} style · ${name} · ${one}`);
        }
        console.log(`${target.key} styles: ${matched} of ${target.styles.length} elements look as Wikipedia's`);
    }

    if (target.landmarks.length) {
        const got = await present(page, target.landmarks, 2);
        for (const [name] of target.landmarks) {
            const asked = want.landmarks?.[name];
            if (asked === undefined) continue;
            expect(got[name] === asked, `${target.key}: the ${name} landmark is ${got[name] ? 'present' : 'absent'} where Wikipedia's is ${asked ? 'present' : 'absent'}`);
        }
        console.log(`${target.key} landmarks: ` + Object.entries(got).map(([k, v]) => `${k} ${v ? 'present' : 'absent'}`).join(' · '));
    }

    const panels = await page.evaluate(() => document.body.textContent.split('Bond Constructor Failed').length - 1);
    expect(panels === 0, `${target.key}: ${panels} refusal panels`);
    expect(errors.length === 0, `${target.key}: ${errors.length} page errors — ${errors[0] ?? ''}`);

    if (target.key === 'portal') {
        const code = () => page.$eval('header form span', one => one.textContent);
        const before = await code();
        await page.select('select[name=language]', 'de');
        await new Promise(resolve => setTimeout(resolve, 300));
        const after = await code();
        expect(before === 'EN' && after === 'DE', `choosing an edition does not change the code shown — ${before} then ${after}`);
        await page.type('input[name=search]', 'turing');
        const typed = await page.$eval('input[name=search]', one => one.value);
        expect(typed === 'turing', `the search field does not take what is typed — "${typed}"`);
        const operable = await page.evaluate(() => {
            const field = document.querySelector('input[name=search]').getBoundingClientRect();
            const under = document.elementFromPoint(Math.round(field.x + 40), Math.round(field.y + field.height / 2));
            const chooser = document.querySelector('select[name=language]');
            const listed = chooser?.options[2];
            return {
                clickable: under?.getAttribute('name') === 'search',
                editions: chooser?.options.length ?? 0,
                readable: listed ? !/rgba\(.*0\)$/.test(getComputedStyle(listed).color) : false,
                hidden: chooser ? getComputedStyle(chooser).opacity === '0' : false,
            };
        });
        expect(operable.clickable, 'the search field does not take a click where a reader would click to type');
        expect(operable.editions >= 70, `the language chooser offers ${operable.editions} editions`);
        expect(operable.readable, 'the language chooser draws its editions in a colour nobody can read');
        expect(operable.hidden, 'the language chooser is not hidden the way wikipedia.org hides it — by opacity, so its list stays readable');
        console.log(`portal operated: code ${after} · field "${typed}" · ${operable.editions} editions · takes a click`);
    }
    // EVERY MENU ABOVE THE FOLD IS OPENED AND THE CONTENTS IS FOLLOWED. A page whose chrome only
    // DRAWS right is half a page; these are the four things a reader does with it.
    if (target.ours !== '') {
        const opened = await page.evaluate(() => {
            const said = {};
            for (const [name, selector] of [['bar', '.pd-header > .pd-menu'], ['languages', '.pd-cover > .pd-menu'], ['tools', '.pd-toolbar > .pd-menu'], ['contents', '.pd-table-of-contents .pd-menu'], ['manual', '.pd-manual .pd-menu']]) {
                const menu = document.querySelector(selector);
                if (menu === null) { said[name] = null; continue; }
                const panel = menu.querySelector(':scope > :not(.pd-summary)');
                // A SHUT <details> STILL HAS A BOX and still answers a visibility check, because the
                // browser hides what it holds by not PAINTING it. What is painted is what is under
                // the pointer, so that is what is asked.
                const drawn = () => {
                    if (panel === null) return false;
                    const first = panel.querySelector('a') ?? panel;
                    const box = first.getBoundingClientRect();
                    if (box.width === 0 || box.height === 0) return false;
                    const at = document.elementFromPoint(Math.round(box.x + Math.min(box.width / 2, 40)), Math.round(box.y + box.height / 2));
                    return at !== null && (at === first || first.contains(at) || panel.contains(at));
                };
                const shut = drawn();
                menu.open = true;
                said[name] = { shut, open: drawn() };
                if (name === 'contents' && panel !== null) {
                    const above = menu.querySelector(':scope > .pd-summary .pd-ref')?.getBoundingClientRect().x;
                    const below = panel.querySelector('.pd-ref')?.getBoundingClientRect().x;
                    said[name].step = above === undefined || below === undefined ? null : Math.round(below - above);
                }
                menu.open = false;
            }
            return said;
        });
        for (const [name, state] of Object.entries(opened)) {
            if (state === null) continue;
            const { shut, open, step } = state;
            expect(!shut && open, `the ${name} menu does not open — ${shut ? 'drawn' : 'hidden'} shut, ${open ? 'drawn' : 'hidden'} open`);
            if (name === 'contents' && want.contentsStep != null) expect(step !== null && Math.abs(step - want.contentsStep) <= 1, `${target.key}: a nested contents row stands ${step}px in from its holder where Wikipedia sets ${want.contentsStep}`);
        }
        const followed = await page.evaluate(() => {
            const rows = [...document.querySelectorAll('.pd-table-of-contents a')].filter(one => (one.getAttribute('href') ?? '#').length > 1);
            const lost = rows.filter(one => document.getElementById(decodeURIComponent(one.getAttribute('href').slice(1))) === null);
            return { rows: rows.length, lost: lost.map(one => one.getAttribute('href')) };
        });
        expect(followed.rows > 0, `${target.key}: the contents carries no row that names a section`);
        expect(followed.lost.length === 0, `${target.key}: ${followed.lost.length} contents rows land on nothing — ${followed.lost.slice(0, 4).join(', ')}`);
        const typed = await page.evaluate(() => { const field = document.querySelector('.pd-search input'); if (field === null) return 'no field'; field.value = 'turing'; return field.value; });
        expect(typed === 'turing', `the bar's field does not take what is typed — "${typed}"`);
        console.log(`${target.key} operated: ` + Object.entries(opened).filter(([, v]) => v !== null).map(([k, v]) => `${k} ${v.shut ? 'drawn' : 'hidden'}→${v.open ? 'drawn' : 'hidden'}`).join(' · ') + ` · ${followed.rows} contents rows land · field "${typed}"`);
    }
    await page.close();
}

await browser.close();
if (failures.length > 0) { console.error(`\nverify-wiki: RED — ${failures.length}`); for (const one of failures) console.error(`  ${one}`); process.exit(1); }
console.log(`\nverify-wiki: green against Wikipedia as recorded ${wanted.read}, at ${widths.join(', ')}`);
