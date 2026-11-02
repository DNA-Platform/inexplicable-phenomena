import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { proof } from './proof';

// THE PROOF READS BUILT PAGES OFF THE DISK, so each promise here writes the two or three pages it
// is about and asks the proof what it makes of them.
const faces: string[] = [];

const built = (pages: Record<string, string>): string => {
    const face = mkdtempSync(join(tmpdir(), 'proof-'));
    faces.push(face);
    for (const [page, html] of Object.entries(pages)) {
        mkdirSync(join(face, page, '..'), { recursive: true });
        writeFileSync(join(face, page), `<!doctype html><html><body><main>${html}</main></body></html>`);
    }

    return face;
};

const saidOf = (pages: Record<string, string>): string[] => proof(built(pages), Object.keys(pages)).map(one => one.says);

afterAll(() => { for (const face of faces) rmSync(face, { recursive: true, force: true }); });

describe('where a link leads', () => {
    it('passes a link to an id that answers once, on this page or another', () => {
        expect(saidOf({
            'index.html': '<a href="#here">here</a><h2 id="here">Here</h2><a href="/other/#there">there</a>',
            'other/index.html': '<h2 id="there">There</h2>',
        })).toEqual([]);
    });

    it('refuses a link to an id that nothing answers to', () => {
        expect(saidOf({
            'index.html': '<a href="#gone">gone</a><a href="/other/#missing">missing</a>',
            'other/index.html': '<h2 id="there">There</h2>',
        })).toEqual([
            'a link addresses #gone, and nothing on this page answers to it',
            'a link addresses /other/#missing, and nothing on other/index.html answers to #missing',
        ]);
    });

    // Doug, 2026-09-20: "It concerns me that navigation worked. How could it if the synopsis shared
    // a name with the title." It worked by landing on the first of two, and a set had hidden the
    // second from this proof.
    it('refuses a link to an id that answers more than once, on this page or another', () => {
        expect(saidOf({
            'index.html': '<a href="#twice">twice</a><h2 id="twice">A</h2><h2 id="twice">B</h2><a href="/other/#thrice">thrice</a>',
            'other/index.html': '<h2 id="thrice">A</h2><h2 id="thrice">B</h2><h2 id="thrice">C</h2>',
        })).toEqual([
            '#twice is worn by 2 elements on this page, and an id is worn once',
            'a link addresses #twice, and 2 elements on this page answer to it, so a reader lands on whichever comes first',
            '#thrice is worn by 3 elements on this page, and an id is worn once',
            'a link addresses /other/#thrice, and 3 elements on other/index.html answer to #thrice, so a reader lands on whichever comes first',
        ]);
    });

    // Doug, 2026-09-20: "it should refuse mentions that surface the same id."
    it('refuses an id worn twice though no link addresses it', () => {
        expect(saidOf({ 'index.html': '<h2 id="cautions">A</h2><h2 id="cautions">B</h2>' }))
            .toEqual(['#cautions is worn by 2 elements on this page, and an id is worn once']);
    });
});
