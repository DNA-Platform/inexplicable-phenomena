import { describe, it, expect } from 'vitest';
import { $, $check } from '@dna-platform/chemistry';
import { render, act } from '@testing-library/react';
import { $Writing, $Composition, $Book, Book, $Chapter, $Cover, Document, Cover, Synopsis, TableOfContents, Title, Author, Subject, Reference, Section, Heading, Paragraph, $Title, html, $Theme, Theme, $Document, $TypeOfDocument, reflection, For, $Synopsis } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;

const cover = () => (
    <Cover>
        <Title>Chemistry<Reference>#0</Reference></Title>
        <Author>Doug</Author>
        <Subject>Science</Subject>
    </Cover>
);

describe('a book is made of chapters, and its first three are its cover, its synopsis and its table, by position', () => {
    class $CoverChapter extends $Chapter { print() { return cover(); } }
    class $SynopsisChapter extends $Chapter { print() { return <Synopsis><For>Chemistry</For>A book about chemistry.</Synopsis>; } }
    class $TableChapter extends $Chapter { print() { return <TableOfContents><Title>Table of Contents</Title>One.</TableOfContents>; } }
    const CoverChapter = $($CoverChapter);
    const SynopsisChapter = $($SynopsisChapter);
    const TableChapter = $($TableChapter);
    const book = () => built<$Book>(<Book><CoverChapter /><SynopsisChapter /><TableChapter /></Book>);

    it('AND THE BOOK ANSWERS EACH BY ITS PLACE', () => {
        const held = book();
        held.specify();
        expect(held.chapters.length).toBe(3);
        expect(held.cover).toBeInstanceOf($CoverChapter);
        expect(held.synopsis).toBeInstanceOf($SynopsisChapter);
        expect(held.table).toBeInstanceOf($TableChapter);
    });

    it('and every chapter carries a positional link the book made', () => {
        const held = book();
        expect(html.text(held.cover?.mention?.path()?._block)).toBe('0');
        expect(html.text(held.table?.mention?.path()?._block)).toBe('2');
        expect(held.document).toBe(held.cover?.mention);
    });

    it('a book of chapters specifies clean', () => {
        expect(() => book().specify()).not.toThrow();
    });

});

describe('a book is named by its title', () => {
    class $CoverChapter extends $Chapter { print() { return <Cover><Title>Alan Turing<Reference>#0</Reference></Title><Author>Wikipedians</Author><Subject>Biography</Subject></Cover>; } }
    const CoverChapter = $($CoverChapter);

    // A NAME IS THE COPY, NOT A TOKEN — Doug, 2026-09-15: "you NEVER write urls… names aren't
    // actually kebab cased". This supersedes the promise that a name was the KEBAB of the copy,
    // which stood until that ruling; the slug it used to answer is now asked for where a URL is.
    it('AND ITS NAME IS THE TITLE\'S COPY', () => {
        const held = built<$Book>(<Book><CoverChapter /></Book>);
        expect(html.text(held.title?.heading()?._block)).toBe('Alan Turing');
        expect(held.name).toBe('Alan Turing');
    });

    it('and it is slugged only where a URL is made, where an acronym stays one word', () => {
        class $PaperChapter extends $Chapter { print() { return <Cover><Title>P versus NP<Reference>#0</Reference></Title><Author>Scott Aaronson</Author><Subject>Complexity</Subject></Cover>; } }
        const PaperChapter = $($PaperChapter);
        const held = built<$Book>(<Book><PaperChapter /></Book>);
        expect(held.name).toBe('P versus NP');
        expect(reflection.slug(held.name)).toBe('p-versus-np');
    });

    // A BOOK IS NAMED THROUGH ITS TYPES, NOT THROUGH ITS CLASSES. A library writes its own cover and
    // its own title — the wiki's twenty kinds are exactly that — so a book whose cover and title are
    // subclasses, drawn by a chapter of its own, answers its name the same way.
    it('AND A COVER AND TITLE OF THE LIBRARY\'S OWN KINDS ARE STILL FOUND', () => {
        class $Plate extends $Cover { }
        class $Banner extends $Title { }
        const Plate = $($Plate);
        const Banner = $($Banner);
        class $PlateChapter extends $Chapter { print() { return <Plate><Banner>Alan Turing<Reference>#0</Reference></Banner><Author>Wikipedians</Author><Subject>Biography</Subject></Plate>; } }
        const PlateChapter = $($PlateChapter);
        const held = built<$Book>(<Book><PlateChapter /></Book>);
        expect(held.title).toBeInstanceOf($Banner);
        expect(held.name).toBe('Alan Turing');
    });
});

describe('a cover\'s title means the book, and a title elsewhere is a name', () => {
    // STRUCK 2026-09-15 — Doug: "we want to forget the web and think in books." A cover's title used
    // to be required to hold a written <Reference>, which is an ADDRESS typed into a book. A title
    // already means the thing it titles. What survives is that a cover must CARRY one, and both
    // halves are promised here so striking a demand does not leave the cover unguarded.
    it('A COVER STANDS ON ITS TITLE ALONE, WITH NO ADDRESS WRITTEN INTO IT', () => {
        const held = built<$Writing>(<Cover><Title>Chemistry</Title><Author>Doug</Author><Subject>Science</Subject></Cover>);
        expect(() => held.specify()).not.toThrow();
    });

    it('and a cover carrying NO title is still refused', () => {
        const held = built<$Writing>(<Cover><Author>Doug</Author><Subject>Science</Subject></Cover>);
        expect(() => held.specify()).toThrow(/carries its title/);
    });

    it('and a title elsewhere is a name', () => {
        const held = built<$Writing>(<Title>Chemistry</Title>);
        expect(() => held.specify()).not.toThrow();
    });

    it('AND ONE THAT MEANS SOMETHING STANDS', () => {
        const held = built<$Writing>(<Title>Chemistry<Reference>#0</Reference></Title>);
        expect(() => held.specify()).not.toThrow();
    });
});

// A SYNOPSIS IS FOR A BOOK — Doug, 2026-09-15: "canonicals are uniquely associated with something
// so they are always FOR it". It is what makes a synopsis reusable: printed inside another book it
// still names the book it is the synopsis OF.
describe('a synopsis says the book it is for', () => {
    it('AND IT CARRIES THE COMPILED ADDRESS OF THAT BOOK', () => {
        const held = built<$Synopsis>(<Synopsis><For>[Alan Turing](/alan-turing/)</For><Title>About</Title></Synopsis>);
        expect(html.text(held.canonical()?.path()?._block)).toBe('/alan-turing/');
    });

    it('AND ONE THAT SAYS NOTHING IS REFUSED, because a synopsis is written to be read elsewhere', () => {
        const held = built<$Synopsis>(<Synopsis><Title>About</Title></Synopsis>);
        expect(held.canonical()).toBeUndefined();
        expect(() => held.specify()).toThrow(/the book it is for/);
    });
});

describe('a book draws what it holds, under one sheet', () => {
    const drawn = (book: $Book) => {
        const Drawn = $(book);
        return render(<Drawn />).container;
    };
    const documented = (heading: string) => (
        <Document>
            <Section>
                <Heading>{heading}</Heading>
                <Paragraph>One.</Paragraph>
            </Section>
        </Document>
    );
    const synopsis = (print: boolean) => (
        <Synopsis print={print}>
            <For>Chemistry</For>
            <Section>
                <Heading>About</Heading>
                <Paragraph>Quietly.</Paragraph>
            </Section>
        </Synopsis>
    );
    class $CoverChapter extends $Chapter { print() { return cover(); } }
    class $QuietChapter extends $Chapter { print() { return synopsis(false); } }
    class $PrintedChapter extends $Chapter { print() { return synopsis(true); } }
    class $TableChapter extends $Chapter { print() { return <TableOfContents><Title>Table of Contents</Title>One.</TableOfContents>; } }
    class $FirstChapter extends $Chapter { print() { return documented('First things'); } }
    const CoverChapter = $($CoverChapter);
    const QuietChapter = $($QuietChapter);
    const PrintedChapter = $($PrintedChapter);
    const TableChapter = $($TableChapter);
    const FirstChapter = $($FirstChapter);

    it('and the book draws FLAT under the sheet, its parts in the order they were written', () => {
        const held = built<$Book>(<Book><CoverChapter /><PrintedChapter /><TableChapter /><FirstChapter /></Book>);
        const host = drawn(held);
        const children = [...host.querySelectorAll('main > .pd-book > .pd-chapter')].map(chapter => chapter.firstElementChild);
        expect(children[0]?.matches('header.pd-cover')).toBe(true);
        expect(children[1]?.matches('.pd-synopsis')).toBe(true);
        expect(children[2]?.matches('nav.pd-table-of-contents')).toBe(true);
        expect(children[3]?.matches('article.pd-document')).toBe(true);
    });

    it('a title written as copy makes its own heading', () => {
        const held = built<$Title>(<Title>Chemistry</Title>);
        expect(html.text(held.heading()?._block)).toBe('Chemistry');
    });

    it('AND A SYNOPSIS DRAWS NOTHING UNLESS IT IS PRINTED', () => {
        const quiet = drawn(built<$Book>(<Book><CoverChapter /><QuietChapter /><FirstChapter /></Book>));
        const printed = drawn(built<$Book>(<Book><CoverChapter /><PrintedChapter /><FirstChapter /></Book>));
        expect(quiet.textContent).not.toContain('Quietly');
        expect(printed.textContent).toContain('Quietly');
    });
});

describe('every piece of writing is in a book, and a book themes what it holds', () => {
    const documented = () => $(
        <Document>
            <Section>
                <Heading>One</Heading>
                <Paragraph>One.</Paragraph>
            </Section>
        </Document>,
        Document
    );


    it('A THEME REGISTERED ON A BOOK IS THE ONE ITS PROSE IS DRAWN IN', async () => {
        class $Small extends $Theme { override size = '11px'; }
        const Small = $($Small);
        class $Pocket extends $Book { }
        const Pocket = $($Pocket);
        $(Pocket, Theme)(Small);
        class $CoverChapter extends $Chapter { print() { return <Cover><Title>T<Reference>#0</Reference></Title><Author>A</Author><Subject>S</Subject></Cover>; } }
        class $OneChapter extends $Chapter { print() { return <Document><Section><Heading>One</Heading><Paragraph>One.</Paragraph></Section></Document>; } }
        const CoverChapter = $($CoverChapter);
        const OneChapter = $($OneChapter);
        const held = $(<Pocket />, $(<CoverChapter />), $(<OneChapter />));
        const Drawn = $(held);
        await act(async () => { render(<Drawn />); });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        const css = [...document.querySelectorAll('style')].map(style => style.textContent).join('')
            + [...document.styleSheets].flatMap(sheet => [...sheet.cssRules]).map(rule => rule.cssText).join('');
        expect(css).toContain('font-size:11px');
    });

    // A THEME IS NOT WRITING, SO IT IS NOT WRITTEN IN. It is view stuff — no type and
    // no specification — and a piece of writing makes its own in its bond, through the
    // scope it is bonded in. Registering one on a book is therefore the only way to
    // change what the book and everything inside it is drawn in.
    it('AND EVERY PIECE OF WRITING IN THAT BOOK IS DRAWN IN IT TOO', () => {
        class $Tiny extends $Theme { override size = '9px'; }
        const Tiny = $($Tiny);
        class $Pamphlet extends $Book { }
        const Pamphlet = $($Pamphlet);
        $(Pamphlet, Theme)(Tiny);
        const inside = documented();
        $(<Pamphlet />, $(<Cover><Title>T</Title><Author>A</Author><Subject>S</Subject></Cover>, Cover), inside);
        expect(inside.theme).toBeInstanceOf($Theme);
    });
});
