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
import { bound, home, staged, type Staged } from './staging';

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
const held = staged();
afterAll(() => { held.remove(); });

// WHAT A BIND PRINTED, WHETHER IT FINISHED OR NOT — the phases on one stream and the faults on the other.
const printed = (stage: Staged): string => {
    try {
        return bound(stage);
    } catch (error) {
        const failed = error as { stdout?: string; stderr?: string };
        return `${failed.stdout ?? ''}${failed.stderr ?? ''}`;
    }
};

describe('a bind of the test library', () => {
    const chosen = configure(held.binding);
    const found = walk(held.library, chosen);
    const table = catalogue(found, chosen).table;
    const page = (name: string): string => readFileSync(placeOf(held.face, table.routes.find(route => route.name === name)!), 'utf8');

    // Doug, 2026-09-25: "in ..public, we drop the v1 dependency in our test library this sprint."
    it('binds with this code, the package the repository links, and no other', () => {
        const at = createRequire(join(held.binding, 'package.json')).resolve('@dna-platform/public');
        expect(realpathSync(at).startsWith(realpathSync(resolve(home, '..')))).toBe(true);
    });

    it('runs every phase, specify among them, and finishes', () => {
        const said = bound(held);
        expect(said).toMatch(/^specify +\d+ books? read/mu);
        expect(said).toMatch(/^bound /mu);
    });

    it('wrote a page for every book, and every page holds its book', () => {
        for (const route of table.routes) {
            const at = placeOf(held.face, route);
            expect(existsSync(at), `${route.name} was not rendered at ${at}`).toBe(true);
            const html = readFileSync(at, 'utf8');
            expect(html, `${route.name} left #root empty`).not.toContain('<div id="root"></div>');
            expect(html).toMatch(/<div id="root">[\s\S]+<\/div>/u);
        }
    });

    it('wrote pages the browser will build as sent, whose every link leads to an id worn once', () => {
        const pages = table.routes.map(route => placeOf(held.face, route).slice(held.face.length + 1).split('\\').join('/'));
        expect(proof(held.face, [...pages, 'index.html'], chosen.resolution.base)).toEqual([]);
    });

    it('resolved every reference to the address the page carries', () => {
        const paper = page('A Paper');
        expect(paper).toContain('href="/the-library/"');
        expect(paper).toContain('href="/a-paper/#the-evidence"');
        expect(paper).toContain('href="/some-projects/#the-work"');
        expect(paper).toMatch(/<a href="\/the-log\/"[^>]*><span[^>]*>the log/u);
    });

    it('drew a cover inside its header, its title a link to its book, and a table inside its nav', () => {
        const paper = page('A Paper');
        expect(paper).toMatch(/<header class="pd-container"><span[^>]*><a href="\/a-paper\/"[^>]*><span[^>]*>A Paper/u);
        expect(paper).toMatch(/<nav class="pd-container">/u);
    });

    it('drew the byline its book class draws from what its cover says, in the words the cover gave', () => {
        expect(page('The Library')).toMatch(/by <a href="\/the-log\/"[^>]*><span[^>]*>the log[\s\S]*filed under <a href="\/the-library\/"/u);
        expect(page('Some Projects')).toMatch(/filed under <a href="\/the-library\/"[^>]*><span[^>]*>the library/u);
    });

    it('sent a reference to a chapter whose title is parenthetical to the fragment its title wears', () => {
        expect(page('The Log')).toMatch(/<a href="\/the-library\/#synopsis"[^>]*><span[^>]*>Synopsis/u);
        expect(page('The Library')).toMatch(/<span id="synopsis" class="[^"]*pa-parenthetical/u);
    });

    it('marked the autobiography and the biography on their covers', () => {
        expect(page('The Log')).toMatch(/<header class="pd-container"><span class="pa-biography pa-autobiography">/u);
        expect(page('A Persona')).toMatch(/<header class="pd-container"><span class="pa-biography">/u);
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
});

// WHAT A READER SEES — R25: the pages the bind wrote, served as the preview serves them and driven in
// a real browser, asserting visible text and never markup. Doug: "You don't release chemistry features
// without checking that they work."
describe('the bound test library, seen in a real browser', () => {
    let server: PreviewServer | undefined;
    let browser: Browser | undefined;
    let at = '';
    const heard: string[] = [];
    beforeAll(async () => {
        server = await preview({ configFile: join(held.binding, 'vite.config.ts'), preview: { port: 0 }, logLevel: 'silent' });
        at = server.resolvedUrls?.local[0] ?? '';
        browser = await puppeteer.launch({ headless: true });
    });
    afterAll(async () => {
        await browser?.close();
        await server?.close();
    });
    const opened = async (path: string): Promise<Page> => {
        const page = await browser!.newPage();
        page.on('console', message => heard.push(message.text()));
        await page.goto(new URL(path, at).href, { waitUntil: 'networkidle0' });
        return page;
    };

    it('shows the paper\'s cover in its header, and the byline its book draws, as links, with no annotation\'s writing showing', async () => {
        const paper = await opened('/a-paper/');
        expect(await paper.$eval('header', header => header.innerText.trim())).toBe('A Paper');
        const byline = await paper.$eval('#root > div > span > span', line => line.innerText.replace(/\s+/gu, ' ').trim());
        expect(byline).toBe('by A Persona, filed under The Library');
        expect(await paper.$eval('a[href="/a-persona/"]', link => link.innerText.trim())).toBe('A Persona');
        expect(await paper.$eval('#root', root => root.innerText)).not.toContain('/a-persona/');
    });

    it('navigates from an entry of the table to the id its chapter\'s title wears', async () => {
        const paper = await opened('/a-paper/');
        await paper.click('nav a[href="/a-paper/#the-evidence"]');
        await paper.waitForFunction(() => location.hash === '#the-evidence');
        expect(await paper.$eval('#the-evidence', title => title.innerText.trim())).toBe('The Evidence');
    });

    it('draws a table\'s parenthetical entries on the page and hidden, where the proof still reads them', async () => {
        const library = await opened('/the-library/');
        // THREE: the table's own title, parenthetical, and its two parenthetical entries.
        const hidden = await library.$$eval('nav a[href="/the-library/#synopsis"], nav a[href="/the-library/#table-of-contents"]',
            links => links.map(link => link.getClientRects().length === 0));
        expect(hidden).toEqual([true, true, true]);
        const shown = await library.$eval('nav', nav => nav.innerText);
        expect(shown).toContain('The Shelves');
        expect(shown).toContain('The Log');
        expect(shown).not.toContain('Table of Contents');
    });

    // A TABLE'S ENTRIES ARE CONTENTS — Doug: "Let's make a Content annotation, which is a type of
    // Reference"; "it's note should draw its words... put it in a span with a pa-content on there".
    it('draws a table\'s entries as the links their contents make, each name in a span wearing pa-content, in the order written', async () => {
        const paper = await opened('/a-paper/');
        const names = await paper.$$eval('nav span.pa-content', spans => spans.map(span => span.textContent));
        expect(names).toEqual(['The Argument', 'The Evidence', 'A Paper', 'Synopsis', 'Table of Contents']);
        expect(await paper.$eval('nav a[href="/a-paper/#the-argument"] span.pa-content', span => span.textContent)).toBe('The Argument');
        expect(await paper.$eval('nav', nav => nav.innerText)).not.toContain('](/');
    });

    it('hydrated every page it opened without re-rendering it', () => {
        expect(heard.filter(said => said.includes('hydration'))).toEqual([]);
    });
});

// WHAT A HAND-WRITTEN PAGE CANNOT FAKE — R26: take one entry out of a table and the compiler raises
// a fault naming the chapter, at catalogue, before anything is drawn.
describe('a bind of the test library with one entry taken out of a table', () => {
    const broken = staged();
    afterAll(() => { broken.remove(); });
    const table = join(broken.library, 'paper', '.table.tsx');
    writeFileSync(table, readFileSync(table, 'utf8').replace('            <Paragraph><Content>$[ ./The Evidence ]</Content></Paragraph>\n', ''));

    it('fails at catalogue, naming the book and the chapter its table does not refer to', () => {
        const said = printed(broken);
        expect(said).toMatch(/^catalogue +FAILED/mu);
        expect(said).toContain('CHAPTER-NOT-LISTED');
        expect(said).toContain('"The Evidence" is a chapter of "A Paper"');
        expect(said).not.toMatch(/^bound /mu);
    });
});

// AND WHAT ONLY THE RUNTIME CAN SAY, placed on the file that said it. The compiler reads no tag, so a
// Synopsis written on a section is a writing that does not specify, and specify says so on the
// chapter file its failure's code numbers — a book's contents are its chapters in file order.
describe('a bind of the test library with a synopsis said of a section', () => {
    const broken = staged();
    afterAll(() => { broken.remove(); });
    const chapter = join(broken.library, 'paper', '1-the-argument.tsx');
    writeFileSync(chapter, readFileSync(chapter, 'utf8')
        .replace("import { Chapter, Heading, Means, Paragraph, Section, Title }", "import { Chapter, Heading, Means, Paragraph, Section, Synopsis, Title }")
        .replace('            <Heading>What is claimed</Heading>', '            <Synopsis />\n            <Heading>What is claimed</Heading>'));

    it('fails at specify, on the chapter\'s own file, saying what does not specify', () => {
        const said = printed(broken);
        expect(said).toMatch(/^specify +FAILED/mu);
        expect(said).toMatch(/1-the-argument\.tsx\(1,1\): error SPEC: paper — APaper \/ Chapter 3 \/ Section 1: a synopsis is said of a chapter, and this is not one/u);
    });
});
