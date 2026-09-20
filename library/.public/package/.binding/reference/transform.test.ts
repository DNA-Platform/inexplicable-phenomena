import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { fixture, read } from '../.test/staging';
import { transforming } from './transform';

// WHAT THE TRANSFORM WRITES INTO A READER'S PROSE, which is the one thing in the compiler that edits
// what a person sees. Every promise here is about the text that comes out: the address a reference
// is given, the words it keeps, the name an annotation is left with, and the refusal when a name is
// not the library's.
const { card } = read();
const chapter = join(fixture, 'paper', '1-the-argument.tsx');
const cover = join(fixture, 'the-library', '.cover.tsx');

describe('a reference in prose', () => {
    const made = transforming(readFileSync(chapter, 'utf8'), chapter, card);

    it('resolves every form to the address the catalogue holds, and refuses none', () => {
        expect(made.missing).toEqual([]);
        expect(made.text).toContain('<Ref>[The Library](/the-library/)</Ref>');
        expect(made.text).toContain('<Ref>[The Evidence](/a-paper/#the-evidence)</Ref>');
        expect(made.text).toContain('<Ref>[The Work](/some-projects/#the-work)</Ref>');
    });

    it('keeps the words a writer gave and puts the address behind them', () => {
        expect(made.text).toContain('<Ref>[the log](/the-log/)</Ref>');
        expect(made.text).not.toContain('$[');
    });

    it('compiles a reference in a string to the same thing, without the element prose needs', () => {
        expect(made.text).toContain("const supporting = 'and the evidence is in [The Evidence](/a-paper/#the-evidence)';");
    });

    it('does not owe a Ref to a file that imports one', () => {
        expect(made.owes).toEqual([]);
    });
});

describe('an annotation on a cover', () => {
    const made = transforming(readFileSync(cover, 'utf8'), cover, card);

    it('is verified and then writes its address into the element — and none for the page it stands on', () => {
        expect(made.missing).toEqual([]);
        expect(made.text).toContain('<Title>The Library</Title>');
        expect(made.text).toContain('<Subject>[The Library]()</Subject>');
    });

    it('writes the words and the address when the writer gave both', () => {
        expect(made.text).toContain('<Author>[Written by the Log](/the-log/)</Author>');
    });
});

// A MENTION WRITTEN WITH PLAIN WORDS IS COMPILED TOO, because the structure has always read it as
// naming what it says — Doug, 2026-09-19: "There should not be anymore dynamic link generation."
describe('a mention in a table of contents', () => {
    const table = join(fixture, 'the-log', '.table.tsx');
    const made = transforming(readFileSync(table, 'utf8'), table, card);

    it('written as plain words receives its address', () => {
        expect(made.missing).toEqual([]);
        expect(made.text).toContain('<Chapter>[Entries](/the-log/#entries)</Chapter>');
    });

    it('written with an empty display is an empty anchor to the book, and keeps no star', () => {
        expect(made.text).toContain('<Book>[](/a-persona/)</Book>');
    });

    it('that does not print is compiled all the same, because the compiler does not read print', () => {
        expect(made.text).toContain('<Chapter print={false}>[The Log]()</Chapter>');
    });
});

// A RESOURCE IS DRAWN ON EVERY PAGE THAT WEARS IT, so it is never "here" — and a Reference element
// receives the address alone, because a reference carries a path and nothing else.
describe('a resource shared by every page', () => {
    const resource = join(fixture, 'the-library', '1-the-shelves.tsx.tsx');
    const made = transforming(readFileSync(resource, 'utf8'), resource, card);

    it('keeps the address of the book it lives in, even though it lives there', () => {
        expect(made.missing).toEqual([]);
        expect(made.text).toContain('<Book>[The Library](/the-library/)</Book>');
    });

    it('and a Reference element on a section receives the bare address, so the section is the link', () => {
        expect(made.text).toContain('<Reference>/the-library/</Reference>');
    });
});

// `[[[ X ]]]` ALLOCATES AN ADDRESS WHERE IT STANDS: the words stay, a Fold plants the id, and a
// reference reaches it as it reaches a chapter.
describe('a mention that allocates', () => {
    const shelves = join(fixture, 'the-library', '1-the-shelves.tsx');
    const made = transforming(readFileSync(shelves, 'utf8'), shelves, card);

    it('keeps its words and plants a fold beside them', () => {
        expect(made.missing).toEqual([]);
        expect(made.owes).toEqual([]);
        expect(made.text).toContain('<Fold>the-first-shelf</Fold>The First Shelf is the one');
    });

    it('and a reference to it lands on the fragment the fold planted', () => {
        expect(made.text).toContain('<Ref>[The First Shelf](/the-library/#the-first-shelf)</Ref>');
    });

    it('and a file that allocates without importing Fold owes it', () => {
        const code = `import { Paragraph } from '@dna-platform/public';\nexport default class C { print() { return (<Paragraph>\n  [[[ Somewhere ]]] here\n</Paragraph>); } }`;
        expect(transforming(code, shelves, card).owes).toEqual(['Fold']);
    });
});

describe('what the transform refuses', () => {
    it('a name the library does not hold, by file and line', () => {
        const code = `import { Ref } from '@dna-platform/public';\nexport default class C { print() { return (<Paragraph>\n  see $[ Nowhere ]\n</Paragraph>); } }`;
        const made = transforming(code, chapter, card);
        expect(made.missing).toEqual([{ key: 'Nowhere', file: chapter, line: 3 }]);
    });

    it('a relative reference to a chapter the standing book does not have', () => {
        const code = `import { Ref } from '@dna-platform/public';\nexport default class C { print() { return (<Paragraph>$[ ./The Work ]</Paragraph>); } }`;
        expect(transforming(code, chapter, card).missing.map(one => one.key)).toEqual(['A Paper / The Work']);
    });

    it('and says when a file writes a reference it cannot draw', () => {
        const code = `export default class C { print() { return (<Paragraph>$[ The Library ]</Paragraph>); } }`;
        const made = transforming(code, chapter, card);
        expect(made.missing).toEqual([]);
        expect(made.owes).toEqual(['Ref']);
    });
});
