import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { afterAll, describe, expect, it } from 'vitest';
import { configure } from '../configuration/configuration';
import { walk } from '../inventory/walk';
import { catalogue } from '../catalogue/catalogue';
import { placeOf } from '../rendering/place';
import { proof } from '../specification/proof';
import { staged } from './staging';

// THE WHOLE BINDER, END TO END, OVER A LIBRARY THAT IS KNOWN TO BE RIGHT.
//
// This is the regression suite: every phase of a bind runs over the test library, and what comes
// out the far end is read back. It replaced `specification/rendering.test.ts`, which asked the same
// questions of whatever library the binder happened to be standing in — and in the binder's own
// home that is no library at all, so the suite could not run where the binder lives.
//
// IT IS SLOW BY THE STANDARD OF A UNIT TEST, because a bind is, and that is why it is its own
// project and its own script rather than something `npm test` pays for on every run.
const held = staged();
afterAll(() => { held.remove(); });

describe('a bind of the test library', () => {
    const chosen = configure(held.binding);
    const found = walk(held.library, chosen);
    const table = catalogue(found, chosen).table;
    let bound = '';

    it('runs every phase and finishes', () => {
        // WITHOUT THE TEST RUNNER'S `NODE_ENV`. Vitest sets it to `test`; a bind decides for itself
        // what each phase runs as, and the prerender's children insist on `production`.
        const { NODE_ENV: _, ...environment } = process.env;
        bound = execFileSync('npx', ['tsx', 'binding.ts'], { cwd: held.binding, encoding: 'utf8', shell: true, stdio: ['ignore', 'pipe', 'pipe'], env: environment });
        expect(bound).toMatch(/^bound /mu);
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

    it('wrote pages the browser will build as sent, whose every link leads somewhere that exists', () => {
        const pages = table.routes.map(route => placeOf(held.face, route).slice(held.face.length + 1).split('\\').join('/'));
        expect(proof(held.face, [...pages, 'index.html'], chosen.resolution.base)).toEqual([]);
    });

    it('resolved every reference to the address the page carries', () => {
        const paper = readFileSync(placeOf(held.face, table.routes.find(route => route.name === 'A Paper')!), 'utf8');
        expect(paper).toContain('href="/the-library/"');
        expect(paper).toContain('href="/a-paper/#the-evidence"');
        expect(paper).toContain('href="/some-projects/#the-work"');
        expect(paper).toMatch(/<a href="\/the-log\/"[^>]*>the log<\/a>/u);
    });

    it('drew the words a cover gave, and named the book behind them', () => {
        const library = readFileSync(placeOf(held.face, table.routes.find(route => route.name === 'The Library')!), 'utf8');
        expect(library).toMatch(/<a href="\/the-log\/"[^>]*>Written by the Log<\/a>/u);
    });

    it('sent a reference to a chapter that does not print its title to the page it is part of', () => {
        const log = readFileSync(placeOf(held.face, table.routes.find(route => route.name === 'The Log')!), 'utf8');
        expect(log).toMatch(/<a href="\/the-library\/"[^>]*>What This Is<\/a>/u);
        expect(log).toContain('href="/the-library/#the-shelves"');
    });
});
