import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { $, selection } from '@dna-platform/chemistry';
import type { ElementType } from 'react';
import { $Book, Book, Chapter, Cover, Author, Subject, Synopsis, TableOfContents, Title, Paragraph } from '@dna-platform/public';
import { $Table, Table, $SelfReference, Self, $Theme, Theme, $Format } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
const served = (book: $Book): string => {
    const Drawn = $(book);
    return renderToString(new ServerStyleSheet().collectStyles(<Drawn />));
};

class $Ledger extends $Table {
    override style = selection.div.attrs({ className: 'pa-ledger' })``;
}
class $Plain extends $SelfReference {
    override anchor: ElementType = selection.a.attrs({ className: 'pa-plain' })``;
}
class $Purple extends $Theme {
    ink = 'rebeccapurple';
    override get values(): Record<string, string> { return { ink: this.ink }; }
}
class $Framed extends $Format {
    style = selection.div.attrs({ className: 'pa-framed' })``;
}
const Ledger = $($Ledger);
const Plain = $($Plain);
const Purple = $($Purple);
const Framed = $($Framed);

const chapters = (): React.ReactNode[] => [
    <Chapter key="c"><Cover /><Title>[A Paper](/a-paper/)</Title><Author>[A Persona](/a-persona/)</Author><Subject>[The Library](/the-library/)</Subject></Chapter>,
    <Chapter key="s"><Synopsis /><Title>[Synopsis](/a-paper/)</Title><Paragraph>What it argues.</Paragraph></Chapter>,
    <Chapter key="t"><TableOfContents /><Title>[Where Things Are](/a-paper/where-things-are/)</Title></Chapter>,
    <Chapter key="a"><Table /><Framed /><Title>[A](/a-paper/a/)</Title><Paragraph>row one</Paragraph><Paragraph>row two</Paragraph></Chapter>,
];

// REPLACE BY REGISTRATION WHAT THE FRAMEWORK STANDS; REPLACE BY IMPORT WHAT A CHAPTER WRITES — Sprint 97's P5 as
// implementation corrected it. Doug: "Sometimes you might have to register it"; "simply writing a new $Table that we
// export as Table." A library's door registers on its book class, once, and what the framework stands for itself asks —
// Book's $(theme), Title's $(self) — so the registration answers. What a chapter WRITES is made by chemistry's eval of
// the chapter's children before the chapter's bond receives them, so no line of .public can ask for it: a written
// <Table /> is the framework's unless the chapter imports the library's Table under that name — found 2026-10-02 by
// U17's first promise and pitched to chemistry. Chemistry's contract: nothing registered, the very object given.
describe('a registration on a book class answers what the framework stands; what a chapter writes is replaced by import', () => {
    it('nothing registered: a chapter\'s <Table /> is the framework\'s, a title\'s Self the framework\'s, the Theme the bare base', () => {
        class $Untouched extends $Book { }
        const Untouched = $($Untouched);
        const html = served(built<$Book>(<Untouched>{chapters()}</Untouched>));
        expect(html).not.toContain('pa-ledger');
        expect(html).not.toContain('pa-plain');
        expect(html).not.toContain('--pd-ink');
        expect(html).toMatch(/class="[^"]*\bpa-table\b/u);
        expect(html).toMatch(/class="[^"]*\bpa-self-reference\b/u);
    });

    it('registered on a book class, the framework-stood Self and Theme are the library\'s; a chapter\'s written <Table /> is not, and is replaced by importing the library\'s as Table; a word of the library\'s own is untouched', () => {
        class $Mine extends $Book { }
        const Mine = $($Mine);
        $(Mine, Table)(Ledger);
        $(Mine, Self)(Plain);
        $(Mine, Theme)(Purple);
        const book = built<$Book>(<Mine>{chapters()}</Mine>);
        expect(book.theme).toBeInstanceOf($Purple);
        const html = served(book);
        expect(html).toMatch(/<a [^>]*class="[^"]*\bpa-plain\b/u);
        expect(html).toContain('--pd-ink:rebeccapurple');
        expect(html).toContain('pa-framed');
        expect(html).toMatch(/class="[^"]*\bpa-table\b/u);
        expect(html).not.toContain('pa-ledger');
        const imported = served(built<$Book>(<Mine>{chapters().slice(0, 3)}<Chapter key="l"><Ledger /><Title>[L](/a-paper/l/)</Title><Paragraph>row one</Paragraph></Chapter></Mine>));
        expect(imported).toContain('pa-ledger');
    });

    // THE COMPILER'S SHAPE: the library's door registers on $($TheLibrary); each book's .book.tsx is a subclass, and the
    // compiler builds the book as $($ThatSubclass) — a registration on a class is inherited by its subclasses, and
    // $($Class) is one component per class.
    it('a registration on the library\'s base book class reaches a book built from a subclass by its own $()', () => {
        class $TheLibrary extends $Book { }
        const TheLibrary = $($TheLibrary);
        $(TheLibrary, Self)(Plain);
        $(TheLibrary, Theme)(Purple);
        class $SomeProjects extends $TheLibrary { }
        const SomeProjects = $($SomeProjects);
        expect($($SomeProjects)).toBe(SomeProjects);
        const html = served(built<$Book>(<SomeProjects>{chapters()}</SomeProjects>));
        expect(html).toMatch(/<a [^>]*class="[^"]*\bpa-plain\b/u);
        expect(html).toContain('--pd-ink:rebeccapurple');
    });

    // D19 — SOME PROJECTS SHOWS THE BASE: a book registering the framework's own Theme on its own class, the nearest
    // scope winning over the library's.
    it('a book registering the framework\'s Theme on its own class draws the bare base under a library that registered another', () => {
        class $TheLibrary extends $Book { }
        const TheLibrary = $($TheLibrary);
        $(TheLibrary, Theme)(Purple);
        class $Bare extends $TheLibrary { }
        const Bare = $($Bare);
        $(Bare, Theme)(Theme);
        const book = built<$Book>(<Bare>{chapters()}</Bare>);
        expect(book.theme).toBeInstanceOf($Theme);
        expect(book.theme).not.toBeInstanceOf($Purple);
        expect(served(book)).not.toContain('--pd-ink');
    });
});
