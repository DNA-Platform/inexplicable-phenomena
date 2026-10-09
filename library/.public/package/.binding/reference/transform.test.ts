import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { fixture, read } from '../.test/galleys';
import { missing, rawModule, references, transforming } from './transform';

// WHAT THE TRANSFORM WRITES INTO A READER'S PROSE, which is the one thing in the compiler that edits
// what a person sees. Every promise here is about the text that comes out: the address a reference
// is given, the words it keeps, the url a mention is given for the place it makes, and what it raises
// when a name is not the library's. And what never comes out: a component, since the compiler knows none — Doug,
// 2026-09-24: "The compiler ALWAYS should give: `[text](identifier)`."
const { found, card } = read();
const chapter = join(fixture, 'paper', '1-the-argument.tsx');
const cover = join(fixture, 'library', '.cover.tsx');

// A LITERAL INSERTS A FILE WHERE IT STANDS, as one string expression — the chapter's own source as
// written, the text of a file beside it, or a picture's address. Sprint 92, on Doug's rulings.
describe('a literal, inserted', () => {
    const manual = found.books.find(book => book.folder === 'manual')!;
    const at = (chapter: string) => join(fixture, 'manual', chapter);
    const over = (chapter: string) => transforming(readFileSync(at(chapter), 'utf8'), at(chapter), card, manual);

    it('inserts the chapter\'s own source as written, the forms inside it uncompiled', () => {
        const written = readFileSync(at('6-the-mark-and-the-photograph.tsx'), 'utf8');
        const made = over('6-the-mark-and-the-photograph.tsx');
        expect(made.missing).toEqual([]);
        expect(made.text).toContain(`<Code>{${JSON.stringify(written)}}</Code>`);
        expect(written).toContain('![[ this ]]');
    });

    it('inserts the text of the file beside the chapter it names, by identifier and type', () => {
        const file = readFileSync(join(fixture, 'manual', '1-the-book.code.tsx'), 'utf8');
        const made = over('1-the-book.tsx');
        expect(made.missing).toEqual([]);
        expect(made.text).toMatch(/<Append\s+identifier="code"\s+type=".tsx"\s*>\s*\{"import/u);
        expect(made.text).toContain(`{${JSON.stringify(file)}}`);
        expect(made.text).not.toContain('![[');
    });

    it('inserts a picture as its address beside the pages, and a file by its type alone', () => {
        const made = over('6-the-mark-and-the-photograph.tsx');
        expect(made.text).toContain('<Image>{"/manual/6-the-mark-and-the-photograph.png"}</Image>');
        const mark = readFileSync(join(fixture, 'manual', '6-the-mark-and-the-photograph.svg'), 'utf8');
        expect(made.text).toContain(`<Svg>{${JSON.stringify(mark)}}</Svg>`);
    });

    it('leaves a literal beside an annotation in one figure, which is then ordinary TSX', () => {
        const made = transforming('export default () => (<Code>![[ code.tsx ]]<Framed /></Code>);', at('4-the-catchword.tsx'), card, manual);
        expect(made.missing).toEqual([]);
        expect(made.text).toMatch(/<Code>\{"[^\n]*"\}<Framed \/><\/Code>/u);
    });

    it('misses a literal naming a file the chapter does not have, by file and line', () => {
        const made = transforming('export default () => (<p>![[ nothing.ts ]]</p>);', at('1-the-book.tsx'), card, manual);
        expect(made.missing).toEqual([{ key: '![[ nothing.ts ]]', file: at('1-the-book.tsx'), line: 1 }]);
        expect(missing(made.missing[0], card.keys())).toContain('inserts ![[ nothing.ts ]], and no such file stands beside the chapter');
    });

    it('leaves a literal alone in a string, and one with the wrong brackets, which the bind refuses by name', () => {
        const made = transforming("export default () => (<p title=\"![[ .png ]]\">![ this ] and $[ The Library ]</p>);", at('1-the-book.tsx'), card, manual);
        expect(made.text).toContain('title="![[ .png ]]"');
        expect(made.text).toContain('![ this ] and $[ The Library ]');
    });
});

// THE TRANSFORM READS WHAT THE PARSER LOCATED AND NOTHING ELSE, and a raw module is a literal. Sprint 90.
describe('what the transform never touches', () => {
    it('a form in a comment, which the compiler does not read', () => {
        const work = join(fixture, 'projects', '1-the-work.tsx');
        const made = transforming(readFileSync(work, 'utf8'), work, card);
        expect(made.missing).toEqual([]);
        expect(made.text).toContain('// [[ A Ghost Title ]]');
    });

    it('a raw module, whose text is an Append\'s and is the file exactly as written', () => {
        const plugin = references({ library: () => found, catalogue: () => card, again: () => {} });
        const hook = plugin.transform as (this: unknown, code: string, id: string) => string | null;
        const raw = `export default ${JSON.stringify(readFileSync(chapter, 'utf8'))}`;
        expect(hook.call(undefined, raw, `${chapter}?raw`)).toBeNull();
        expect(hook.call(undefined, readFileSync(chapter, 'utf8'), chapter)).toContain('[The Library](/the-library/)');
        expect(rawModule('raw')).toBe(true);
        expect(rawModule('import&raw')).toBe(true);
        expect(rawModule(undefined)).toBe(false);
    });
});

describe('a reference in prose', () => {
    const made = transforming(readFileSync(chapter, 'utf8'), chapter, card);

    it('resolves every form to the address the catalogue holds, and misses none', () => {
        expect(made.missing).toEqual([]);
        expect(made.text).toContain('<Means>[The Library](/the-library/)</Means>');
        expect(made.text).toContain('<Means>[The Evidence](/a-paper/#the-evidence)</Means>');
        expect(made.text).toContain('<Means>[The Work](/some-projects/#the-work)</Means>');
    });

    it('keeps the words a writer gave and puts the address behind them', () => {
        expect(made.text).toContain('<Means>[Libby](/libby/)</Means>');
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
// book, so the url it compiles to is that chapter's own page under its book's.
describe('a title form', () => {
    it('in a chapter names that chapter, and compiles to its own page under its book\'s', () => {
        const made = transforming(readFileSync(chapter, 'utf8'), chapter, card);
        expect(made.text).toContain('<Title>[The Argument](/a-paper/#the-argument)</Title>');
    });

    // A SYNOPSIS'S TITLE GOES TO ITS BOOK — Doug, 2026-09-26: "we want the title of a synopsis chapter to
    // go to the book it is a synopsis of! Most titles are self-links." A reference to the synopsis is
    // given the chapter's own page, where the table of contents reaches it.
    it('in the synopsis names that chapter, and compiles to its book\'s url, while a reference to it compiles to its page', () => {
        const synopsis = join(fixture, 'library', '.synopsis.tsx');
        const made = transforming(readFileSync(synopsis, 'utf8'), synopsis, card);
        expect(made.missing).toEqual([]);
        expect(made.text).toMatch(/<Title>\s*<Parenthetical \/>\s*\[Synopsis\]\(\/the-library\/\)\s*<\/Title>/u);
        expect(transforming(`<Means>$[[ ./Synopsis ]]</Means>`, synopsis, card).text).toBe('<Means>[Synopsis](/the-library/#synopsis)</Means>');
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
        expect(made.text).toContain('<Subject>[Libraries](/the-library/)</Subject>');
        expect(made.text).toContain('<About>[The Library](/the-library/)</About>');
        expect(made.text).not.toContain('](#)');
    });

    it('write the words and the address when the writer gave both', () => {
        expect(made.text).toContain('<Author>[Libby](/libby/)</Author>');
    });
});

// THE COMPILER KNOWS NO COMPONENT, so a table is read and written by its notation alone. Doug,
// 2026-09-24: "It doesn't know about specific components. To generate any is to break polymorphism."
describe('a table of contents', () => {
    const table = join(fixture, 'libby', '.table.tsx');
    const made = transforming(readFileSync(table, 'utf8'), table, card);

    it('refers to its chapters by their pages, and to the synopsis of the book it answers for', () => {
        expect(made.missing).toEqual([]);
        expect(made.text).toContain('<Content>[Who I Am](/libby/#who-i-am)</Content>');
        expect(made.text).toContain('<Content>[a persona she vouches for, and its own account](/a-persona/#synopsis)</Content>');
    });

    it('answers for the book it catalogues with the book\'s url, and keeps no star', () => {
        expect(made.text).toContain('<Content>[A Persona](/a-persona/)</Content>');
        expect(made.text).not.toContain(']**');
    });
});

// A RESOURCE IS DRAWN ON EVERY PAGE THAT WEARS IT, and what it refers to carries its url like everything else.
describe('a resource shared by every page', () => {
    const resource = join(fixture, 'manual', '3-the-masthead-and-the-byline.code.tsx');
    const made = transforming(readFileSync(resource, 'utf8'), resource, card);

    it('keeps the address of the book it lives in, even though it lives there', () => {
        expect(made.missing).toEqual([]);
        expect(made.text).toContain('<Means>[The Library](/the-library/)</Means>');
    });
});

// `[[[ X ]]]` ALLOCATES AN ADDRESS WHERE IT STANDS: its words and the url of the place it makes — the
// page of the file it stands in, and its name's fragment — and a reference reaches it as it reaches a
// chapter. The id the element wears is its name's, made by the same slug; the compiler hands it no
// id since 2026-09-26 — Doug: "The url should be completely arbitrary."
describe('a mention that allocates', () => {
    const shelves = join(fixture, 'library', '1-the-shelves.tsx');
    const made = transforming(readFileSync(shelves, 'utf8'), shelves, card);

    it('keeps its words and gives them the url of its own place, both halves and no component', () => {
        expect(made.missing).toEqual([]);
        expect(made.text).toContain('<Mention>[The First Shelf](/the-library/#the-first-shelf)</Mention>');
    });

    it('and a reference to it is given the same url', () => {
        expect(made.text).toContain('<Means>[The First Shelf](/the-library/#the-first-shelf)</Means>');
    });

    it('is addressed by the name it was given, which is the name a reference asks for, and keeps its words', () => {
        const code = `export default () => (<Paragraph><Mention>[[[ the shelf ]]]( The First Shelf )</Mention> here</Paragraph>);`;
        expect(transforming(code, shelves, card).text).toContain('<Mention>[the shelf](/the-library/#the-first-shelf)</Mention>');
    });

    it('allocates the same in a string, which is handed to whatever reads it', () => {
        const code = `const said = '[[[ The First Shelf ]]]';`;
        expect(transforming(code, shelves, card).text).toBe(`const said = '[The First Shelf](/the-library/#the-first-shelf)';`);
    });

    it('naming a place its book does not make, is missed rather than given an id', () => {
        const code = `export default () => (<Paragraph><Mention>[[[ Nowhere ]]]</Mention></Paragraph>);`;
        expect(transforming(code, shelves, card).missing.map(missing => missing.key)).toEqual(['The Library / Nowhere']);
    });
});

describe('what the transform misses', () => {
    it('a name the library does not hold, by file and line', () => {
        const code = `export default () => (<Paragraph>\n  see <Means>$[[ Nowhere ]]</Means>\n</Paragraph>);`;
        const made = transforming(code, chapter, card);
        expect(made.missing).toEqual([{ key: 'Nowhere', file: chapter, line: 2 }]);
    });

    it('a relative reference to a chapter the standing book does not have', () => {
        const code = `export default () => (<Paragraph><Means>$[[ ./The Work ]]</Means></Paragraph>);`;
        expect(transforming(code, chapter, card).missing.map(missing => missing.key)).toEqual(['A Paper / The Work']);
    });

    it('and nothing about what a file imports, since it writes nothing a file must hold', () => {
        const code = `export default () => (<Paragraph>$[[ The Library ]]</Paragraph>);`;
        const made = transforming(code, chapter, card);
        expect(made.missing).toEqual([]);
        expect(made.text).toContain('<Paragraph>[The Library](/the-library/)</Paragraph>');
    });
});
