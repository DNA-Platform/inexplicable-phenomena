import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { fixture, read } from '../.test/staging';
import { transforming } from './transform';

// WHAT THE TRANSFORM WRITES INTO A READER'S PROSE, which is the one thing in the compiler that edits
// what a person sees. Every promise here is about the text that comes out: the address a reference
// is given, the words it keeps, the id a mention is given, and what it raises when a name is not the
// library's. And what never comes out: a component, since the compiler knows none — Doug,
// 2026-09-24: "The compiler ALWAYS should give: `[text](identifier)`."
const { card } = read();
const chapter = join(fixture, 'paper', '1-the-argument.tsx');
const cover = join(fixture, 'the-library', '.cover.tsx');

describe('a reference in prose', () => {
    const made = transforming(readFileSync(chapter, 'utf8'), chapter, card);

    it('resolves every form to the address the catalogue holds, and misses none', () => {
        expect(made.missing).toEqual([]);
        expect(made.text).toContain('<Means>[The Library](/the-library/)</Means>');
        expect(made.text).toContain('<Means>[The Evidence](/a-paper/#the-evidence)</Means>');
        expect(made.text).toContain('<Means>[The Work](/some-projects/#the-work)</Means>');
    });

    it('keeps the words a writer gave and puts the address behind them', () => {
        expect(made.text).toContain('<Means>[the log](/the-log/)</Means>');
        expect(made.text).not.toContain('$[');
    });

    it('compiles a reference in a string to the same thing', () => {
        expect(made.text).toContain("const evidence = '[The Evidence](/a-paper/#the-evidence)';");
    });

    it('adds no component, so what reads the link is whatever element the writer put it in', () => {
        const written = readFileSync(chapter, 'utf8');
        expect(made.text.match(/<\/?[A-Z]\w*/gu)).toEqual(written.match(/<\/?[A-Z]\w*/gu));
    });
});

// A TITLE FORM NAMES THE WRITING ITS FILE IS — Doug, 2026-09-25: "It uses the compiler syntax!!
// Please know this. All titles in chapters use it." In a chapter file it names that chapter of its
// book, so the url it compiles to carries the fragment the chapter's title wears as its id.
describe('a title form', () => {
    it('in a chapter names that chapter, and compiles to its book\'s page and its fragment', () => {
        const made = transforming(readFileSync(chapter, 'utf8'), chapter, card);
        expect(made.text).toContain('<Title>[The Argument](/a-paper/#the-argument)</Title>');
    });

    it('in a chapter whose title is parenthetical, names it all the same', () => {
        const synopsis = join(fixture, 'the-library', '.synopsis.tsx');
        const made = transforming(readFileSync(synopsis, 'utf8'), synopsis, card);
        expect(made.missing).toEqual([]);
        expect(made.text).toContain('<Title><Parenthetical />[Synopsis](/the-library/#synopsis)</Title>');
    });

    it('naming what its file is not, is missed rather than guessed', () => {
        const code = `export default () => (<Chapter><Title>[[ Nowhere ]]</Title></Chapter>);`;
        expect(transforming(code, chapter, card).missing.map(missing => missing.key)).toEqual(['A Paper / Nowhere']);
    });
});

describe('the annotations of a cover', () => {
    const made = transforming(readFileSync(cover, 'utf8'), cover, card);

    it('are verified and then written as both halves, the url of the page they stand on included', () => {
        expect(made.missing).toEqual([]);
        expect(made.text).toContain('<Title>[The Library](/the-library/)</Title>');
        expect(made.text).toContain('<Subject>[The Library](/the-library/)</Subject>');
        expect(made.text).toContain('<About>[The Library](/the-library/)</About>');
        expect(made.text).not.toContain('](#)');
    });

    it('write the words and the address when the writer gave both', () => {
        expect(made.text).toContain('<Author>[the log](/the-log/)</Author>');
    });
});

// THE COMPILER KNOWS NO COMPONENT, so a table is read and written by its notation alone. Doug,
// 2026-09-24: "It doesn't know about specific components. To generate any is to break polymorphism."
describe('a table of contents', () => {
    const table = join(fixture, 'the-log', '.table.tsx');
    const made = transforming(readFileSync(table, 'utf8'), table, card);

    it('refers to its chapters by their fragments, and to the synopsis of the book it answers for', () => {
        expect(made.missing).toEqual([]);
        expect(made.text).toContain('<Content>[Entries](/the-log/#entries)</Content>');
        expect(made.text).toContain('<Content>[Synopsis](/a-persona/#synopsis)</Content>');
    });

    it('answers for the book it catalogues with the book\'s url, and keeps no star', () => {
        expect(made.text).toContain('<Content>[A Persona](/a-persona/)</Content>');
        expect(made.text).not.toContain(']**');
    });
});

// A RESOURCE IS DRAWN ON EVERY PAGE THAT WEARS IT, and what it refers to carries its url like everything else.
describe('a resource shared by every page', () => {
    const resource = join(fixture, 'the-library', '1-the-shelves.tsx.tsx');
    const made = transforming(readFileSync(resource, 'utf8'), resource, card);

    it('keeps the address of the book it lives in, even though it lives there', () => {
        expect(made.missing).toEqual([]);
        expect(made.text).toContain('<Means>[The Library](/the-library/)</Means>');
    });
});

// `[[[ X ]]]` ALLOCATES AN ADDRESS WHERE IT STANDS: its words and the id it is given, and a
// reference reaches it as it reaches a chapter.
describe('a mention that allocates', () => {
    const shelves = join(fixture, 'the-library', '1-the-shelves.tsx');
    const made = transforming(readFileSync(shelves, 'utf8'), shelves, card);

    it('keeps its words and gives them the id, both halves and no component', () => {
        expect(made.missing).toEqual([]);
        expect(made.text).toContain('<Mention>[The First Shelf](the-first-shelf)</Mention>');
    });

    it('and a reference to it lands on the fragment its id is', () => {
        expect(made.text).toContain('<Means>[The First Shelf](/the-library/#the-first-shelf)</Means>');
    });

    it('takes its id from the name it was given, which is the name a reference asks for', () => {
        const code = `export default () => (<Paragraph><Mention>[[[ the shelf ]]]( The First Shelf )</Mention> here</Paragraph>);`;
        expect(transforming(code, shelves, card).text).toContain('<Mention>[the shelf](the-first-shelf)</Mention>');
    });

    it('allocates the same in a string, which is handed to whatever reads it', () => {
        const code = `const said = '[[[ The First Shelf ]]]';`;
        expect(transforming(code, shelves, card).text).toBe(`const said = '[The First Shelf](the-first-shelf)';`);
    });
});

describe('what the transform misses', () => {
    it('a name the library does not hold, by file and line', () => {
        const code = `export default () => (<Paragraph>\n  see <Means>$[ Nowhere ]</Means>\n</Paragraph>);`;
        const made = transforming(code, chapter, card);
        expect(made.missing).toEqual([{ key: 'Nowhere', file: chapter, line: 2 }]);
    });

    it('a relative reference to a chapter the standing book does not have', () => {
        const code = `export default () => (<Paragraph><Means>$[ ./The Work ]</Means></Paragraph>);`;
        expect(transforming(code, chapter, card).missing.map(missing => missing.key)).toEqual(['A Paper / The Work']);
    });

    it('and nothing about what a file imports, since it writes nothing a file must hold', () => {
        const code = `export default () => (<Paragraph>$[ The Library ]</Paragraph>);`;
        const made = transforming(code, chapter, card);
        expect(made.missing).toEqual([]);
        expect(made.text).toContain('<Paragraph>[The Library](/the-library/)</Paragraph>');
    });
});
