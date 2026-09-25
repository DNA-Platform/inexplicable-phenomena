import { existsSync, readFileSync, realpathSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, resolve } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
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
});

// WHAT A HAND-WRITTEN PAGE CANNOT FAKE — R26: take one entry out of a table and the compiler raises
// a fault naming the chapter, at catalogue, before anything is drawn.
describe('a bind of the test library with one entry taken out of a table', () => {
    const broken = staged();
    afterAll(() => { broken.remove(); });
    const table = join(broken.library, 'paper', '.table.tsx');
    writeFileSync(table, readFileSync(table, 'utf8').replace('            <Paragraph><Means>$[ ./The Evidence ]</Means></Paragraph>\n', ''));

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
