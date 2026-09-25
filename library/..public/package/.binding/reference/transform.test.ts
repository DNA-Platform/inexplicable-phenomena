import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { fixture, read } from '../.test/staging';
import { transforming } from './transform';

// WHAT THE TRANSFORM WRITES INTO A READER'S PROSE, which is the one thing in the compiler that edits
// what a person sees. Every promise here is about the text that comes out: the address a reference
// is given, the words it keeps, the id a mention is given, and the refusal when a name is not the
// library's. And what never comes out: a component, since the compiler knows none — Doug,
// 2026-09-24: "The compiler ALWAYS should give: `[text](identifier)`."
const { card } = read();
const chapter = join(fixture, 'paper', '1-the-argument.tsx');
const cover = join(fixture, 'the-library', '.cover.tsx');

describe('a reference in prose', () => {
    const made = transforming(readFileSync(chapter, 'utf8'), chapter, card);

    it('resolves every form to the address the catalogue holds, and refuses none', () => {
        expect(made.missing).toEqual([]);
        expect(made.text).toContain('[The Library](/the-library/)');
        expect(made.text).toContain('[The Evidence](/a-paper/#the-evidence)');
        expect(made.text).toContain('[The Work](/some-projects/#the-work)');
    });

    it('keeps the words a writer gave and puts the address behind them', () => {
        expect(made.text).toContain('[the log](/the-log/)');
        expect(made.text).not.toContain('$[');
    });

    it('compiles a reference in a string to the same thing', () => {
        expect(made.text).toContain("const supporting = 'and the evidence is in [The Evidence](/a-paper/#the-evidence)';");
    });

    it('adds no component, so what reads the link is whatever element the writer put it in', () => {
        const written = readFileSync(chapter, 'utf8');
        expect(made.text.match(/<\/?[A-Z]\w*/gu)).toEqual(written.match(/<\/?[A-Z]\w*/gu));
    });
});

describe('an annotation on a cover', () => {
    const made = transforming(readFileSync(cover, 'utf8'), cover, card);

    it('is verified and then writes both halves into the element, the self url # for the page it stands on', () => {
        expect(made.missing).toEqual([]);
        expect(made.text).toContain('<Title>[The Library](#)</Title>');
        expect(made.text).toContain('<Subject>[The Library](#)</Subject>');
    });

    it('writes the words and the address when the writer gave both', () => {
        expect(made.text).toContain('<Author>[Written by the Log](/the-log/)</Author>');
    });
});

// THE COMPILER KNOWS NO COMPONENT, so no element is read for being a mention. Doug, 2026-09-24:
// "It doesn't know about specific components. To generate any is to break polymorphism."
describe('a mention in a table of contents', () => {
    const table = join(fixture, 'the-log', '.table.tsx');
    const made = transforming(readFileSync(table, 'utf8'), table, card);

    it('written with the notation, receives both halves whatever element it stands in', () => {
        expect(made.missing).toEqual([]);
        expect(made.text).toContain('<Chapter>[A Persona](/a-persona/#synopsis)</Chapter>');
    });

    it('written with an empty display is an empty anchor to the book, and keeps no star', () => {
        expect(made.text).toContain('<Book>[](/a-persona/)</Book>');
    });

    it('written as plain words is left as it was written', () => {
        expect(made.text).toContain('<Chapter>Entries</Chapter>');
        expect(made.text).toContain('<Chapter print={false}>The Log</Chapter>');
    });
});

// A RESOURCE IS DRAWN ON EVERY PAGE THAT WEARS IT, so it is never "here".
describe('a resource shared by every page', () => {
    const resource = join(fixture, 'the-library', '1-the-shelves.tsx.tsx');
    const made = transforming(readFileSync(resource, 'utf8'), resource, card);

    it('keeps the address of the book it lives in, even though it lives there', () => {
        expect(made.missing).toEqual([]);
        expect(made.text).toContain('<Reference>[The Library](/the-library/)</Reference>');
    });
});

// `[[[ X ]]]` ALLOCATES AN ADDRESS WHERE IT STANDS: its words and the id it is given, and a
// reference reaches it as it reaches a chapter.
describe('a mention that allocates', () => {
    const shelves = join(fixture, 'the-library', '1-the-shelves.tsx');
    const made = transforming(readFileSync(shelves, 'utf8'), shelves, card);

    it('keeps its words and gives them the id, both halves and no component', () => {
        expect(made.missing).toEqual([]);
        expect(made.text).toContain('[The First Shelf](the-first-shelf) is the one');
        expect(made.text).not.toContain('<Fold>');
    });

    it('and a reference to it lands on the fragment its id is', () => {
        expect(made.text).toContain('[The First Shelf](/the-library/#the-first-shelf)');
    });

    it('takes its id from the name it was given, which is the name a reference asks for', () => {
        const code = `export default class C { print() { return (<Paragraph>[[[ the shelf ]]]( The First Shelf ) here</Paragraph>); } }`;
        expect(transforming(code, shelves, card).text).toContain('<Paragraph>[the shelf](the-first-shelf) here</Paragraph>');
    });

    it('allocates the same in a string, which is handed to whatever reads it', () => {
        const code = `const said = '[[[ The First Shelf ]]]';`;
        expect(transforming(code, shelves, card).text).toBe(`const said = '[The First Shelf](the-first-shelf)';`);
    });
});

describe('what the transform refuses', () => {
    it('a name the library does not hold, by file and line', () => {
        const code = `export default class C { print() { return (<Paragraph>\n  see $[ Nowhere ]\n</Paragraph>); } }`;
        const made = transforming(code, chapter, card);
        expect(made.missing).toEqual([{ key: 'Nowhere', file: chapter, line: 2 }]);
    });

    it('a relative reference to a chapter the standing book does not have', () => {
        const code = `export default class C { print() { return (<Paragraph>$[ ./The Work ]</Paragraph>); } }`;
        expect(transforming(code, chapter, card).missing.map(one => one.key)).toEqual(['A Paper / The Work']);
    });

    it('and nothing about what a file imports, since it writes nothing a file must hold', () => {
        const code = `export default class C { print() { return (<Paragraph>$[ The Library ]</Paragraph>); } }`;
        const made = transforming(code, chapter, card);
        expect(made.missing).toEqual([]);
        expect(made.text).toContain('<Paragraph>[The Library](/the-library/)</Paragraph>');
    });
});
