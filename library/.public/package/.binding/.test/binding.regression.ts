import { existsSync, readFileSync, realpathSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, resolve } from 'node:path';
import puppeteer, { type Browser, type Page } from 'puppeteer';
import { preview, type PreviewServer } from 'vite';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { configure } from '../configuration/configuration';
import { walk } from '../inventory/walk';
import { catalogue } from '../catalogue/catalogue';
import { placeOf } from '../rendering/place';
import { proof } from '../specification/proof';
import { bound, home, pulled, type Galley } from './galleys';

// THE WHOLE BINDER, END TO END, OVER A LIBRARY THAT IS KNOWN TO BE RIGHT.
//
// This is the regression suite: every phase of a bind runs over the test library, and what comes
// out the far end is read back. It replaced `specification/rendering.test.ts`, which asked the same
// questions of whatever library the binder happened to be standing in — and in the binder's own
// home that is no library at all, so the suite could not run where the binder lives.
//
// IT IS SLOW BY THE STANDARD OF A UNIT TEST, because a bind is, and that is why it is its own
// project and its own script rather than something `npm test` pays for on every run.
//
// AND IT READS WHAT THIS CODE WRITES. A Means draws its words in its own element inside the anchor
// its Reference lends it, and its annotations' own writing stands inside that element too, so an
// anchor is matched by its address and the words it opens with, never by bare words.
const galley = pulled();
afterAll(() => { galley.remove(); });

// WHAT A BIND PRINTED, WHETHER IT FINISHED OR NOT — the phases on one stream and the faults on the other.
const printed = (galley: Galley): string => {
    try {
        return bound(galley);
    } catch (error) {
        const failed = error as { stdout?: string; stderr?: string };
        return `${failed.stdout ?? ''}${failed.stderr ?? ''}`;
    }
};

describe('a bind of the test library', () => {
    const chosen = configure(galley.binding);
    const found = walk(galley.library, chosen);
    const table = catalogue(found, chosen).table;
    const page = (name: string): string => readFileSync(placeOf(galley.face, table.routes.find(route => route.name === name)!), 'utf8');
    const chapterPage = (book: string, chapter: string): string =>
        readFileSync(placeOf(galley.face, table.routes.find(route => route.name === book)!.chapters.find(one => one.name === chapter)!), 'utf8');

    // Doug, 2026-09-25: "in ..public, we drop the v1 dependency in our test library this sprint."
    it('binds with this code, the package the repository links, and no other', () => {
        const at = createRequire(join(galley.binding, 'package.json')).resolve('@dna-platform/public');
        expect(realpathSync(at).startsWith(realpathSync(resolve(home, '..')))).toBe(true);
    });

    it('runs every phase, specify among them, and finishes', () => {
        const said = bound(galley);
        expect(said).toMatch(/^specify +\d+ books? read/mu);
        expect(said).toMatch(/^bound /mu);
    });

    // A CHAPTER IS A ROUTE OF ITS BOOK — Doug, 2026-09-26: "The book is a static page returned by github
    // pages, the chapters are routes on a local spa." A page at every address, the book at each.
    it('wrote a page for every book and for every chapter of it, and every page holds its book', () => {
        for (const route of table.routes)
            for (const { name, address } of [route, ...route.chapters]) {
                const at = placeOf(galley.face, { address });
                expect(existsSync(at), `${name} was not rendered at ${at}`).toBe(true);
                const html = readFileSync(at, 'utf8');
                expect(html, `${name} left #root empty`).not.toContain('<div id="root"></div>');
                expect(html).toMatch(/<div id="root">[\s\S]+<\/div>/u);
            }
    });

    it('wrote pages the browser will build as sent, whose every link leads to an id worn once', () => {
        const pages = table.routes.flatMap(route => [route, ...route.chapters]).map(one => placeOf(galley.face, one).slice(galley.face.length + 1).split('\\').join('/'));
        expect(proof(galley.face, [...pages, 'index.html'], chosen.resolution.base)).toEqual([]);
    });

    it('resolved every reference to the address the page carries', () => {
        const paper = page('A Paper');
        expect(paper).toContain('href="/the-library/"');
        expect(paper).toContain('href="/a-paper/the-evidence/"');
        expect(paper).toContain('href="/some-projects/the-work/"');
        expect(paper).toMatch(/<a href="\/libby\/"[^>]*><span[^>]*>Libby/u);
    });

    it('drew a cover inside its header, its title a link to its book, and a table inside its nav', () => {
        const paper = page('A Paper');
        expect(paper).toMatch(/<header class="pd-container"><div[^>]*><a href="\/a-paper\/"[^>]*><div[^>]*>A Paper/u);
        expect(paper).toMatch(/<nav class="pd-container">/u);
    });

    it('drew the byline its book class draws from what its cover says, in the words the cover gave', () => {
        expect(page('The Library')).toMatch(/pd-label">Author<[\s\S]{0,200}?<a href="\/libby\/"[^>]*><span[^>]*>Libby[\s\S]*pd-label">Filed under<[\s\S]{0,200}?<a href="\/the-library\/"/u);
        expect(page('Some Projects')).toMatch(/pd-label">Filed under<[\s\S]{0,200}?<a href="\/the-library\/"[^>]*><span[^>]*>Libraries/u);
    });

    // A SYNOPSIS'S TITLE GOES TO ITS BOOK — Doug, 2026-09-26: "we want the title of a synopsis chapter to go
    // to the book it is a synopsis of! Most titles are self-links."
    it('sent a reference to a chapter whose title is parenthetical to its page, where its title wears its id unseen and links to its book', () => {
        expect(page('Libby')).toMatch(/<a href="\/the-library\/synopsis\/"[^>]*><span[^>]*>Synopsis/u);
        expect(page('The Library')).toMatch(/<a href="\/the-library\/"[^>]*><div id="synopsis" class="[^"]*pa-parenthetical/u);
    });

    // R4 — Doug: "just have the book expose its cover, table, synopsis... and other things use it from there."
    it('drew in the argument its book\'s title and a link to its book\'s table, read from its book alone', () => {
        expect(page('A Paper')).toMatch(/<span class="pd-word">A Paper(?:<span class="pd-annotation">[^<]*<\/span>)*<\/span>: <a href="\/a-paper\/table-of-contents\/"[^>]*><span[^>]*>Table of Contents/u);
    });

    it('marked the autobiography and the biography on their covers', () => {
        expect(page('Libby')).toMatch(/<header class="pd-container"><div class="(?=[^"]*\bpa-cover\b)(?=[^"]*\bpa-biography\b)(?=[^"]*\bpa-autobiography\b)[^"]*">/u);
        // THE PERSONA'S COVER STANDS INSIDE ITS FRAME, the layer its book adds to every chapter at its bind.
        expect(page('A Persona')).toMatch(/<header class="pd-container"><div class="[^"]*pd-container[^"]*"><div class="(?=[^"]*\bpa-cover\b)(?=[^"]*\bpa-biography\b)(?![^"]*\bpa-autobiography\b)[^"]*">/u);
    });

    // Doug, 2026-09-26: "the annotations should frequently mark their presence with a CSS class."
    it('marked each chapter a cover, a synopsis or a table of contents said of with that annotation\'s class', () => {
        const paper = page('A Paper');
        // A CHAPTER'S OWN ELEMENT IS A DIV since Sprint 88, block by its level; the layer around it is the format's.
        expect(paper).toMatch(/<header class="pd-container"><div class="(?=[^"]*\bpd-chapter\b)[^"]*\bpa-cover\b/u);
        expect(paper).toMatch(/<nav class="pd-container"><div class="[^"]*\bpa-table-of-contents\b/u);
        expect(paper.match(/class="[^"]*\bpa-synopsis\b/gu)).toHaveLength(1);
    });

    // A TABLE'S ENTRIES ARE CONTENTS — Doug: "Let's make a Content annotation, which is a type of
    // Reference"; "it's note should draw its words... put it in a span with a pa-content on there".
    it('drew a table\'s entries as the links their contents make, each name in a span wearing pa-content, in the order written', () => {
        const paper = page('A Paper');
        expect([...paper.matchAll(/<span class="pa-content">([^<]*)<\/span>/gu)].map(found => found[1]))
            .toEqual(['The Argument', 'The Evidence', 'A Paper', 'Synopsis', 'Table of Contents']);
        expect(paper).toMatch(/<a href="\/a-paper\/the-argument\/"[^>]*>(?:(?!<\/a>)[\s\S])*<span class="pa-content">The Argument<\/span>/u);
    });

    // THE CATALOGUE IS A TABLE — its section interpreted as a grid, its rows and cells marked by authorship.
    it('drew the library\'s catalogue as a grid: the section wearing pa-table, its rows pa-row, its cells pa-col', () => {
        const library = page('The Library');
        expect(library).toMatch(/class="[^"]*\bpa-table\b[^"]*\bpa-cols-2\b/u);
        // A HEADER ROW AND THREE BOOKS since Sprint 88, the header bold by the theme.
        expect(library.match(/class="[^"]*\bpa-row\b/gu)).toHaveLength(4);
        expect(library.match(/class="[^"]*\bpa-col\b/gu)).toHaveLength(8);
        expect(library).toMatch(/\.pa-table\s*\{\s*display:\s*grid/u);
    });

    // ONE TABLE IS DRAWN, NOT WRITTEN — Some Projects', its entries what its chapters mention.
    it('drew Some Projects\' table from its contents, every chapter a link inside its nav', () => {
        const projects = page('Some Projects');
        expect(projects).toMatch(/<nav[^>]*>[\s\S]*<a href="\/some-projects\/the-work\/"[^>]*>[\s\S]*The Work[\s\S]*<\/nav>/u);
        expect(projects).toMatch(/<nav[^>]*>[\s\S]*<a href="\/some-projects\/table-of-contents\/"[^>]*>[\s\S]*<\/nav>/u);
        // THE SYNOPSIS ENTRY LINKS TO THE BOOK, as its title does, beside the cover's — and since Sprint 86 the
        // table chapter's catchword too, whose Previous is the synopsis and so means the book.
        expect((/<nav[\s\S]*?<\/nav>/u.exec(projects)?.[0] ?? '').match(/<a href="\/some-projects\/"/gu)).toHaveLength(3);
        expect(projects).not.toMatch(/<nav[^>]*>[\s\S]*pa-content[\s\S]*<\/nav>/u);
    });

    // A CATALOGUE'S CHAPTER IS ANOTHER BOOK'S SYNOPSIS — Libby's, handed to the chapter's Synopsis, which
    // keeps the imported chapter off the page, gives the catalogue's chapter its parts, and sends the
    // chapter's title to Libby. Doug, 2026-09-26: "the chapter is kept out of the Synopsis annotation's
    // text, so that even in theory, it is not on the page."
    it('drew in the library a chapter that is Libby\'s synopsis: Libby\'s words under its own title, which links to Libby, and no second id', () => {
        const library = page('The Library');
        expect(library).toContain('authorship in this library begins with her');
        expect(library.match(/ id="synopsis"/gu)).toHaveLength(1);
        // THE TITLE STAYS THE CHAPTER'S OWN since 2026-09-27 — Doug: "the Synopsis can't use the title of the chapter."
        expect(library).toMatch(/<a href="\/the-library\/of-libby\/"[^>]*><div id="of-libby"/u);
        expect(library).not.toMatch(/<a href="\/libby\/"[^>]*><div id="of-libby"/u);
        expect(library).not.toMatch(/<a href="\/libby\/"[^>]*><div id="synopsis"/u);
    });

    // A HEADING WRITTEN AS A MENTION IS A FRAGMENT OF ITS CHAPTER'S ROUTE — Doug, 2026-09-26: "Long distance
    // urls to that which was mentioned also must work." Libby refers to what the argument claims; the
    // argument's own page wears the id, and the heading links to itself with the same url.
    it('addressed the argument\'s marked heading on the argument\'s page, where Libby\'s link lands and the heading links to itself', () => {
        expect(page('Libby')).toMatch(/<a href="\/a-paper\/the-argument\/#what-is-claimed"[^>]*><span[^>]*>What is claimed/u);
        const argument = chapterPage('A Paper', 'The Argument');
        expect(argument).toMatch(/<a href="\/a-paper\/the-argument\/#what-is-claimed"[^>]*>(?:(?!<\/a>)[\s\S])*id="what-is-claimed"/u);
        expect(argument.match(/ id="what-is-claimed"/gu)).toHaveLength(1);
        expect(argument).not.toContain('[[[');
    });

    // A STYLE ONE BOOK HAS AND THE OTHERS DO NOT, on its own page and on no other — the leak the render
    // once kept one child per page to prevent. Doug, 2026-09-26: "Yes it was a style leak bug."
    it('drew the paper\'s own style on its page and on no other', () => {
        for (const route of table.routes)
            expect(/font-family: ?monospace/u.test(page(route.name)), route.name).toBe(route.name === 'A Paper');
    });

    // THE ORDINARY VIEW, which the test library's book class stands as its theme — Doug, 2026-09-25:
    // "it is a format annotation that is also a theme that is global to a book."
    it('drew every book inside its theme, whose sheet hides every annotation\'s own writing', () => {
        for (const route of table.routes) {
            const html = page(route.name);
            expect(html, route.name).toMatch(/<div id="root"><!--\$--><div class="[^"]*pd-container">/u);
            expect(html, route.name).toMatch(/\.pd-annotation\s*\{\s*display:\s*none/u);
        }
    });

    // THE CATCHWORD — Sprint 86: a Previous and a Next at the foot of every chapter, each the neighbour's title
    // linking to its route, and at the ends a self-reference. Doug: "I like previous of the cover is the cover
    // and next of the last chapter is the last chapter - I prefer self-reference to undefined."
    it('drew at the foot of the paper\'s chapters a catchword whose Next links the next chapter and whose Previous the one before, the ends self-references', () => {
        const argument = chapterPage('A Paper', 'The Argument');
        expect(argument).toMatch(/<a href="\/a-paper\/the-evidence\/"[^>]*><span class="pd-word pd-next pa-reference">The Evidence/u);
        expect(argument).toMatch(/<a href="\/a-paper\/table-of-contents\/"[^>]*><span class="pd-word pd-previous pa-reference">Table of Contents/u);
        const evidence = chapterPage('A Paper', 'The Evidence');
        expect(evidence).toMatch(/<a href="\/a-paper\/the-evidence\/"[^>]*><span class="pd-word pd-next pa-reference pa-self-reference">The Evidence/u);
        expect(evidence).toMatch(/<a href="\/a-paper\/the-argument\/"[^>]*><span class="pd-word pd-previous pa-reference">The Argument/u);
        expect(page('A Paper')).toMatch(/<a href="\/a-paper\/"[^>]*><span class="pd-word pd-previous pa-reference pa-self-reference">A Paper/u);
    });

    // PAGINATED — Sprint 86: Some Projects' chapters are pages, marked once, and the page the address names is
    // the open one; every other book is untouched.
    it('marked Some Projects paginated, every chapter a page and the addressed chapter alone open, and no other book', () => {
        const projects = page('Some Projects');
        expect(projects).toMatch(/class="[^"]*\bpa-paginated\b/u);
        expect(projects.match(/class="[^"]*\bpa-page\b/gu)).toHaveLength(4);
        expect(projects.match(/class="[^"]*\bpa-open\b/gu)).toHaveLength(1);
        // THE CLASSES IN ANY ORDER: an annotation's class is taken back and put again at every define, so it moves.
        expect(projects).toMatch(/class="(?=[^"]*\bpa-cover\b)(?=[^"]*\bpa-open\b)/u);
        expect(projects).toMatch(/\.pa-paginated \.pa-page:not\(\.pa-open\)\s*\{\s*display:\s*none/u);
        const work = chapterPage('Some Projects', 'The Work');
        expect(work.match(/class="[^"]*\bpa-open\b/gu)).toHaveLength(1);
        expect(work).toMatch(/class="[^"]*\bpa-open\b[^"]*"[^>]*>(?:(?!<\/span>)[\s\S])*?id="the-work"/u);
        expect(work).not.toMatch(/class="(?=[^"]*\bpa-cover\b)(?=[^"]*\bpa-open\b)/u);
        // THE MARKS, NOT THE SHEET: the default theme's rules for the three classes stand on every page since Sprint 88.
        for (const route of table.routes)
            if (route.name !== 'Some Projects')
                expect(page(route.name), route.name).not.toMatch(/class="[^"]*\b(?:pa-paginated|pa-page|pa-open)\b/u);
    });

    // SPRINT 88 — every level marks itself and draws its element; the theme's sheet is on every page; the persona's
    // poem is Lines; the paper's argument has a space, a break and the three basics; Libby is dark; frames stand in
    // two places.
    it('drew every level as its element wearing its mark, and the default theme\'s sheet on every page', () => {
        for (const route of table.routes) {
            const html = page(route.name);
            expect(html, route.name).toMatch(/<div class="[^"]*\bpd-book\b/u);
            expect(html, route.name).toMatch(/<div class="[^"]*\bpd-chapter\b/u);
            expect(html, route.name).toMatch(/<div class="[^"]*\bpd-paragraph\b/u);
            expect(html, route.name).toMatch(/<div[^>]*class="[^"]*\bpd-sentence\b[^"]*\bpd-title\b/u);
            expect(html, route.name).toMatch(/<span class="[^"]*\bpd-word\b/u);
            expect(html, route.name).toMatch(/font-family:Georgia/u);
            expect(html, route.name).toMatch(/\.pd-paragraph\{margin-block:1\.25rem;\}/u);
        }
    });

    it('drew the persona\'s poem as three lines, each a div wearing the sentence\'s mark and its own', () => {
        const persona = chapterPage('A Persona', 'Who Writes Here');
        expect(persona.match(/<div class="[^"]*\bpd-sentence\b[^"]*\bpd-line\b[^"]*">/gu)).toHaveLength(3);
        expect(persona).toContain('A voice Libby lent out,');
    });

    it('drew in the argument a space of three, a break, and the three basics as their elements', () => {
        const argument = chapterPage('A Paper', 'The Argument');
        expect(argument).toMatch(/<span class="(?=[^"]*\bpd-space\b)(?=[^"]*\bpa-blank\b)[^"]*">   </u);
        // NOTHING WRITTEN IN IT: what follows the break's open tag is its annotations' own writing or its close.
        expect(argument).toMatch(/<div class="(?=[^"]*\bpd-break\b)(?=[^"]*\bpa-blank\b)[^"]*">(?:<span class="pd-annotation">|<\/div>)/u);
        expect(argument).toMatch(/<em class="pd-container"><span class="[^"]*\bpa-emphasis\b[^"]*">names/u);
        expect(argument).toMatch(/<b class="pd-container"><span class="[^"]*\bpa-bold\b[^"]*">never/u);
        expect(argument).toMatch(/<u class="pd-container"><span class="[^"]*\bpa-underline\b[^"]*">place/u);
        expect(argument).toMatch(/\.pa-blank\{visibility:hidden;\}/u);
    });

    it('drew Libby dark by its own theme in front of the library\'s, and no other book dark', () => {
        expect(page('Libby')).toMatch(/color:ivory;background:#1f1f24/u);
        for (const route of table.routes)
            if (route.name !== 'Libby')
                expect(page(route.name), route.name).not.toContain('#1f1f24');
    });

    it('drew the frame on Some Projects\' book and on each of the persona\'s chapters, its border in the theme\'s ink', () => {
        const projects = page('Some Projects');
        expect(projects).toMatch(/border:1px solid #23262a;padding:1\.25rem;margin-block:1\.25rem/u);
        expect(projects).toMatch(/<div class="[^"]*\bpd-container\b[^"]*"><div class="[^"]*\bpd-book\b/u);
        const persona = page('A Persona');
        expect(persona.match(/<div class="[^"]*\bpd-container\b[^"]*"><div class="[^"]*\bpd-chapter\b/gu)).toHaveLength(4);
        expect(page('Libby')).not.toMatch(/border:1px solid [^;]*;padding:1\.25rem;margin-block:1\.25rem/u);
    });
});

// WHAT A READER SEES — R25: the pages the bind wrote, served as the preview serves them and driven in
// a real browser, asserting visible text and never markup. Doug: "You don't release chemistry features
// without checking that they work."
describe('the bound test library, seen in a real browser', () => {
    // ONE PAGE, OPENED ONCE, AND ONLY WHAT A BROWSER ALONE CAN SAY: what shows once the theme's sheet
    // applies, and that the page hydrates without drawing again. Doug, 2026-09-26: "You are supposed to
    // use headless chrome to see the thing. What can't be checked a faster way?" What the markup says
    // is read from the pages above, and a link landing on its id is the proof's.
    let server: PreviewServer | undefined;
    let browser: Browser | undefined;
    let paper: Page;
    const heard: string[] = [];
    beforeAll(async () => {
        server = await preview({ configFile: join(galley.binding, 'vite.config.ts'), preview: { port: 0 }, logLevel: 'silent' });
        browser = await puppeteer.launch({ headless: true });
        paper = await browser.newPage();
        paper.on('console', message => heard.push(message.text()));
        await paper.goto(new URL('/a-paper/', server.resolvedUrls?.local[0] ?? '').href, { waitUntil: 'networkidle0' });
    });
    afterAll(async () => {
        await browser?.close();
        await server?.close();
    });

    it('shows the paper\'s cover in its header, and the byline its book draws, with no annotation\'s writing showing', async () => {
        // THE COVER'S TITLE, THEN ITS CATCHWORD — itself and the synopsis — since Sprint 86; on its own line since
        // Sprint 88, the catchword being a paragraph and a paragraph a block.
        expect(await paper.$eval('header', header => header.innerText.trim())).toBe('A Paper\nA Paper · Synopsis');
        // THE BYLINE IS A PARAGRAPH, and a paragraph is a div since Sprint 88.
        const byline = await paper.$eval('.pd-byline', paragraph => (paragraph as HTMLElement).innerText.replace(/\s+/gu, ' ').trim());
        expect(byline).toBe('AUTHOR A Persona FILED UNDER Libraries');
        expect(await paper.$eval('#root', root => root.innerText)).not.toContain('/a-persona/');
    });

    it('shows a table\'s entries and hides its parenthetical ones, where the proof still reads them', async () => {
        // FOUR HIDDEN: the table's own title, parenthetical, and its three parenthetical entries — and one shown,
        // the table chapter's catchword's Previous, the synopsis, which means the book, since Sprint 86.
        const hidden = await paper.$$eval('nav a[href="/a-paper/"], nav a[href="/a-paper/synopsis/"], nav a[href="/a-paper/table-of-contents/"]',
            links => links.map(link => link.getClientRects().length === 0));
        expect(hidden).toEqual([true, true, true, true, false]);
        const shown = await paper.$eval('nav', nav => nav.innerText);
        expect(shown).toContain('The Argument');
        expect(shown).toContain('The Evidence');
        expect(shown).not.toContain('Table of Contents');
        expect(shown).not.toContain('](/');
    });

    it('hydrated the page without drawing it again', () => {
        expect(heard.filter(said => said.includes('hydration'))).toEqual([]);
    });

    // A CHAPTER'S PAGE OPENS TURNED TO THAT CHAPTER: the book is handed the address as its bookmark and,
    // mounted, turns to the chapter whose title means it. Doug, 2026-09-26: "it is the place where the
    // user is (recently was) and it is a record of him being there."
    // A WINDOW A THIRD OF THE PAPER'S HEIGHT — measured 2026-09-27: the whole paper stands in 300 pixels, the
    // evidence's title at 113, so a window of 300 had nothing to scroll.
    it('opens a chapter\'s page turned to that chapter, its title in view', async () => {
        const evidence = await browser!.newPage();
        await evidence.setViewport({ width: 800, height: 100 });
        await evidence.goto(new URL('/a-paper/the-evidence/', server!.resolvedUrls?.local[0] ?? '').href, { waitUntil: 'networkidle0' });
        expect(await evidence.evaluate(() => window.scrollY)).toBeGreaterThan(0);
        const top = await evidence.$eval('#the-evidence', title => title.getBoundingClientRect().top);
        expect(top).toBeGreaterThanOrEqual(0);
        expect(top).toBeLessThan(100);
        await evidence.close();
    });

    // THE ROUTER — R9. Doug, 2026-09-26: "Everything needs to go through the router." A link within the book
    // is taken in place: the address moves, the page is the same page, the book turns; back is the same
    // route the other way.
    it('takes a link within the book in place: the address moves, the page is not reloaded, the book turns, and back returns', async () => {
        const paper = await browser!.newPage();
        await paper.setViewport({ width: 800, height: 100 });
        await paper.goto(new URL('/a-paper/', server!.resolvedUrls?.local[0] ?? '').href, { waitUntil: 'networkidle0' });
        await paper.evaluate(() => { (window as unknown as { samePage: boolean }).samePage = true; });
        await paper.click('nav a[href="/a-paper/the-evidence/"]');
        await new Promise(resolve => setTimeout(resolve, 300));
        expect(await paper.evaluate(() => location.pathname)).toBe('/a-paper/the-evidence/');
        expect(await paper.evaluate(() => (window as unknown as { samePage?: boolean }).samePage)).toBe(true);
        expect(await paper.evaluate(() => window.scrollY)).toBeGreaterThan(0);
        await paper.goBack();
        await new Promise(resolve => setTimeout(resolve, 300));
        expect(await paper.evaluate(() => location.pathname)).toBe('/a-paper/');
        expect(await paper.evaluate(() => (window as unknown as { samePage?: boolean }).samePage)).toBe(true);
        await paper.close();
    });

    // "Long distance urls to that which was mentioned also must work." A link to another book is the browser's
    // to follow; that page's own router lands on the heading once its book has drawn.
    it('follows a long-distance link to another book\'s heading: that page loads, turned to the heading', async () => {
        const libby = await browser!.newPage();
        await libby.setViewport({ width: 800, height: 100 });
        await libby.goto(new URL('/libby/', server!.resolvedUrls?.local[0] ?? '').href, { waitUntil: 'networkidle0' });
        await Promise.all([libby.waitForNavigation({ waitUntil: 'networkidle0' }), libby.click('a[href="/a-paper/the-argument/#what-is-claimed"]')]);
        await new Promise(resolve => setTimeout(resolve, 300));
        expect(await libby.evaluate(() => `${location.pathname}${location.hash}`)).toBe('/a-paper/the-argument/#what-is-claimed');
        const top = await libby.$eval('#what-is-claimed', heading => heading.getBoundingClientRect().top);
        expect(top).toBeGreaterThanOrEqual(0);
        expect(top).toBeLessThan(100);
        await libby.close();
    });

    // PAGINATED, SEEN — Doug: "I am happy to see scrolling and next/previous simple paginated chapters as an
    // example of what can be done in the test library." One chapter shows at a time, and the catchword's
    // Previous turns the page in place.
    it('shows on the work\'s page the work alone, the synopsis not displayed, and its Previous turns to the table in place', async () => {
        const projects = await browser!.newPage();
        await projects.goto(new URL('/some-projects/the-work/', server!.resolvedUrls?.local[0] ?? '').href, { waitUntil: 'networkidle0' });
        const shown = await projects.$eval('#root', root => root.innerText);
        expect(shown).toContain('Some chapters name nothing');
        expect(shown).not.toContain('An ordinary book');
        expect(await projects.$$eval('.pa-page', pages => pages.map(page => page.getClientRects().length > 0))).toEqual([false, false, false, true]);
        await projects.evaluate(() => { (window as unknown as { samePage: boolean }).samePage = true; });
        await projects.click('.pa-open a[href="/some-projects/table-of-contents/"]');
        await new Promise(resolve => setTimeout(resolve, 300));
        expect(await projects.evaluate(() => location.pathname)).toBe('/some-projects/table-of-contents/');
        expect(await projects.evaluate(() => (window as unknown as { samePage?: boolean }).samePage)).toBe(true);
        const turned = await projects.$eval('#root', root => root.innerText);
        expect(turned).not.toContain('Some chapters name nothing');
        expect(turned).toContain('The Work');
        expect(await projects.$$eval('.pa-page', pages => pages.map(page => page.getClientRects().length > 0))).toEqual([false, false, true, false]);
        await projects.close();
    });

    // A SELF-REFERENCE DRAWS WITHOUT AN UNDERLINE — the catchword's Next at the end of the paper.
    it('shows the evidence\'s catchword: its Next a self-reference without an underline, its Previous a link with one', async () => {
        const evidence = await browser!.newPage();
        await evidence.goto(new URL('/a-paper/the-evidence/', server!.resolvedUrls?.local[0] ?? '').href, { waitUntil: 'networkidle0' });
        expect(await evidence.$eval('a:has(> .pa-self-reference)', link => getComputedStyle(link).textDecorationLine)).toBe('none');
        expect(await evidence.$eval('a[href="/a-paper/the-argument/"]:has(> .pa-reference:not(.pa-self-reference))', link => getComputedStyle(link).textDecorationLine)).toBe('underline');
        await evidence.close();
    });

    // SPRINT 88, SEEN — Doug: "please use this primarily as a sprint to make the test library minimally readable."
    it('shows the poem one line under another, the space three wide, the break starting a new line, and the basics styled', async () => {
        const persona = await browser!.newPage();
        await persona.goto(new URL('/a-persona/who-writes-here/', server!.resolvedUrls?.local[0] ?? '').href, { waitUntil: 'networkidle0' });
        const tops = await persona.$$eval('.pd-line', lines => lines.map(line => line.getBoundingClientRect().top));
        expect(tops).toHaveLength(3);
        expect(tops[1]).toBeGreaterThan(tops[0]);
        expect(tops[2]).toBeGreaterThan(tops[1]);
        await persona.close();
        const argument = await browser!.newPage();
        await argument.goto(new URL('/a-paper/the-argument/', server!.resolvedUrls?.local[0] ?? '').href, { waitUntil: 'networkidle0' });
        expect(await argument.$eval('.pd-space', space => space.getBoundingClientRect().width)).toBeGreaterThan(6);
        expect(await argument.$eval('.pd-break', line => getComputedStyle(line).display)).toBe('block');
        expect(await argument.$eval('.pa-emphasis', word => getComputedStyle(word).fontStyle)).toBe('italic');
        expect(await argument.$eval('.pa-bold', word => getComputedStyle(word).fontWeight)).toBe('700');
        expect(await argument.$eval('.pa-underline', word => getComputedStyle(word).textDecorationLine)).toBe('underline');
        await argument.close();
    });

    it('shows Libby on dark paper in ivory ink, and the paper in the library\'s ink', async () => {
        const libby = await browser!.newPage();
        await libby.goto(new URL('/libby/', server!.resolvedUrls?.local[0] ?? '').href, { waitUntil: 'networkidle0' });
        expect(await libby.$eval('.pd-book', book => getComputedStyle(book.parentElement!).backgroundColor)).toBe('rgb(31, 31, 36)');
        expect(await libby.$eval('.pd-book', book => getComputedStyle(book).color)).toBe('rgb(255, 255, 240)');
        await libby.close();
        expect(await paper.$eval('.pd-book', book => getComputedStyle(book).color)).toBe('rgb(35, 38, 42)');
    });

    // THE VISUAL LANGUAGE — Sprint 88 U9: a label above every chapter's title saying what the chapter is, drawn by
    // the library's theme from the marks the kinds wear and suppressed where the title is already parenthetical; the
    // byline's labels saying who wrote the book and where it stands; the running head naming the library then the
    // book, and the library alone on its own page. Doug, 2026-09-27: "I am not sure what a cover is, or a table of
    // contents, or a regular chapter, and it's not clear what will take me to the subject, or who is the author.
    // Help me know where I am."
    it('labels every chapter with what it is, the cover with who wrote it and where it stands, and the head with where the reader is', async () => {
        const libby = await browser!.newPage();
        await libby.goto(new URL('/libby/', server!.resolvedUrls?.local[0] ?? '').href, { waitUntil: 'networkidle0' });
        const label = (selector: string): Promise<string> => libby.$eval(selector, title => getComputedStyle(title, '::before').content);
        expect(await label('.pa-cover .pd-title')).toBe('"Autobiography"');
        expect(await label('#who-i-am')).toMatch(/^"Chapter " counter\(chapter\)$/u);
        expect(await label('#synopsis')).toBe('none');
        // innerText, never textContent: a word's hidden annotations — its level's "2", a reference's url — are in textContent.
        expect(await libby.$$eval('.pd-byline .pd-label', labels => labels.map(label => (label as HTMLElement).innerText))).toEqual(['AUTHOR', 'FILED UNDER']);
        expect(await libby.$eval('.pd-running-head', head => (head as HTMLElement).innerText)).toBe('THE LIBRARY / LIBBY: TABLE OF CONTENTS');
        await libby.goto(new URL('/the-library/', server!.resolvedUrls?.local[0] ?? '').href, { waitUntil: 'networkidle0' });
        expect(await libby.$eval('.pd-running-head', head => (head as HTMLElement).innerText)).toBe('THE LIBRARY: TABLE OF CONTENTS');
        await libby.close();
    });

    // PITCHED, 2026-09-27, found in the console while driving the links: on every themed page chemistry reports "$Theme
    // did not call $Format — every declared bond constructor on the chain must be called", logs it and carries on. Theme's
    // bond passes over Format's on purpose, since Format's would wrap the theme in a second provider; the fix is a template
    // method on Format that Theme overrides — Doug's to rule. The check does not fire in the package's own build, so this
    // is the lowest place that sees it; expected to fail until then, and the day it passes is the day to flip it.
    it('draws a themed page without chemistry reporting the theme\'s bond chain in the console', async () => {
        const said: string[] = [];
        const library = await browser!.newPage();
        library.on('console', (message: { text(): string }) => { said.push(message.text()); });
        await library.goto(new URL('/the-library/', server!.resolvedUrls?.local[0] ?? '').href, { waitUntil: 'networkidle0' });
        await library.close();
        expect(said.filter(line => line.includes('did not call'))).toEqual([]);
    });

    // PITCHED, 2026-09-27, found by driving every link — Doug: "I clicked table of contents and of libby and I don't
    // think either went to the right place." A chapter route within the book changes the address and the book turns
    // by scrolling its chapter's TITLE into view; the table's title is parenthetical, which the framework hides, and
    // a hidden element scrolls nothing. Of Libby's title was sent to Libby's book by its Synopsis, so the book finds
    // no chapter at Of Libby's own route and turns nowhere. Both are the Book's, in .public; the promise stands as an
    // expected failure until Doug rules the fix, and goes red the day it passes, which is the day to flip it.
    it('turns to the table of contents and to Of Libby when their routes are taken within the library', async () => {
        const library = await browser!.newPage();
        await library.setViewport({ width: 900, height: 700 });
        await library.goto(new URL('/the-library/', server!.resolvedUrls?.local[0] ?? '').href, { waitUntil: 'networkidle0' });
        const turned = async (href: string, landmark: string): Promise<number> => {
            await library.evaluate((at: string) => (document.querySelector(`a[href="${at}"]`) as HTMLElement).click(), href);
            await new Promise(resolve => setTimeout(resolve, 300));
            return library.$eval(landmark, element => Math.round(element.getBoundingClientRect().top));
        };
        const table = await turned('/the-library/table-of-contents/', 'nav.pd-container');
        expect(table).toBeGreaterThanOrEqual(0);
        expect(table).toBeLessThan(120);
        // OF LIBBY IS THE LAST CHAPTER, so the page ends before its top can reach the viewport's: the landing is the
        // page's end with the title in view.
        const ofLibby = await turned('/the-library/of-libby/', '#of-libby');
        expect(ofLibby).toBeGreaterThanOrEqual(0);
        expect(ofLibby).toBeLessThan(await library.evaluate(() => innerHeight));
        expect(await library.evaluate(() => Math.ceil(scrollY + innerHeight) >= document.documentElement.scrollHeight - 1)).toBe(true);
        await library.close();
    });
});

// WHAT A HAND-WRITTEN PAGE CANNOT FAKE — R26: take one entry out of a table and the compiler raises
// a fault naming the chapter, at catalogue, before anything is drawn.
describe('a bind of the test library with a catalogue row that does not refer to the book\'s synopsis', () => {
    let broken: Galley;
    beforeAll(() => {
        broken = pulled();
        const table = join(broken.library, 'the-library', '.table.tsx');
        writeFileSync(table, readFileSync(table, 'utf8').replace(" <Word><Content>$[ the librarian's own account ]( Libby / Synopsis )</Content></Word>", ''));
    });
    afterAll(() => { broken.remove(); });

    it('fails at catalogue, naming the row and the synopsis it owes', () => {
        const said = printed(broken);
        expect(said).toMatch(/^catalogue +FAILED/mu);
        expect(said).toContain('NO-SYNOPSIS');
        expect(said).toContain('answers for "Libby" and the table does not refer to its synopsis');
        expect(said).not.toMatch(/^bound /mu);
    });
});

// AND WHAT ONLY THE RUNTIME CAN SAY, placed on the file that said it. The compiler reads no tag, so a
// Synopsis written on a section is a writing that does not specify, and specify says so on the
// chapter file its failure's code numbers — a book's contents are its chapters in file order.
describe('a bind of the test library with a synopsis said of a section', () => {
    let broken: Galley;
    beforeAll(() => {
        broken = pulled();
        const chapter = join(broken.library, 'paper', '1-the-argument.tsx');
        writeFileSync(chapter, readFileSync(chapter, 'utf8')
            .replace('import { ', 'import { Synopsis, ')
            .replace('            <Heading>[[[ What is claimed ]]]</Heading>', '            <Synopsis />\n            <Heading>[[[ What is claimed ]]]</Heading>'));
    });
    afterAll(() => { broken.remove(); });

    it('fails at specify, on the chapter\'s own file, saying what does not specify', () => {
        const said = printed(broken);
        expect(said).toMatch(/^specify +FAILED/mu);
        expect(said).toMatch(/1-the-argument\.tsx\(1,1\): error SPEC: paper — APaper \/ Chapter 3 \/ Section 1: a synopsis is said of a chapter, and this is not one/u);
    });
});
