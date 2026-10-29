import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { manifest } from '../manifest/manifest';
import { bound, pulled, type Galley } from './galleys';

// THE GATES BEFORE THE RENDER. Sprint 118, D5, on the night Sprint 117 lost a render of 3,204 s to three headings:
// a heading's id worn twice is refused at the catalogue before any page is drawn, naming both places; and when the
// proof refuses a page for a fault the catalogue cannot see, the record keeps every page that passed, so the next
// bind draws the refused page alone, and the bind is refused all the same until the page is mended.
const refused = (galley: Galley): string => {
    try {
        return bound(galley);
    } catch (error) {
        const held = error as { stdout?: string; stderr?: string };
        return `${held.stdout ?? ''}\n${held.stderr ?? ''}`;
    }
};
const chapterOf = (galley: Galley): string => join(galley.library, 'paper', '2-the-evidence.tsx');
const edited = (galley: Galley, from: string, to: string): void => {
    const at = chapterOf(galley);
    const text = readFileSync(at, 'utf8');
    if (!text.includes(from)) throw new Error(`the chapter does not hold ${from}`);
    writeFileSync(at, text.replace(from, to));
};

describe('a heading whose id a title already wears', () => {
    const galley = pulled();
    afterAll(() => { galley.remove(); });

    it('is refused at the catalogue before any page is drawn, naming both places, and passes once renamed', () => {
        edited(galley, '        <Catchword />', '        <Section>\n            <Heading>The Evidence</Heading>\n            <Paragraph>Said twice on one page.</Paragraph>\n        </Section>\n        <Catchword />');
        const output = refused(galley);
        expect(output).toMatch(/SAME-ADDRESS/u);
        expect(output).toMatch(/The Evidence/u);
        expect(output).not.toMatch(/^render /mu);
        edited(galley, '<Heading>The Evidence</Heading>', '<Heading>The evidence, weighed</Heading>');
        const green = bound(galley);
        expect(green).toMatch(/^proof +\d+ pages read back/mu);
    });
});

describe('a page the proof refuses', () => {
    const galley = pulled();
    afterAll(() => { galley.remove(); });

    it('is left unrecorded while every other page is kept, so the next bind draws it alone, and the bind is green once mended', () => {
        edited(galley, '        <Catchword />', '        <Paragraph>A link <a href="#nowhere">nowhere</a> answers.</Paragraph>\n        <Catchword />');
        const first = refused(galley);
        expect(first).toMatch(/nothing on this page answers to it/u);
        expect(first).toMatch(/manifest written/u);
        const record = manifest.read(galley.binding);
        const addresses = Object.keys(record.pages);
        expect(addresses.length).toBeGreaterThan(0);
        expect(addresses.some(address => address.includes('paper'))).toBe(false);
        const second = refused(galley);
        expect(second).toMatch(/^render +1 page drawn/mu);
        expect(second).toMatch(/nothing on this page answers to it/u);
        edited(galley, '<a href="#nowhere">nowhere</a>', 'somewhere');
        const third = bound(galley);
        expect(third).toMatch(/^render +1 page drawn/mu);
        expect(third).toMatch(/^proof +\d+ pages read back/mu);
    });
});
