import { describe, it, expect } from 'vitest';
import { $, $check } from '@dna-platform/chemistry';
import { render, act } from '@testing-library/react';
import { $Writing, $Composition, $Book, Book, Document, Cover, Synopsis, TableOfContents, Title, Author, Subject, Reference, Section, Heading, Paragraph, $Title, html, $Theme, Theme, $Document, $TypeOfDocument } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;

const cover = () => (
    <Cover>
        <Title>Chemistry<Reference>#0</Reference></Title>
        <Author>Doug</Author>
        <Subject>Science</Subject>
    </Cover>
);

describe('a book reaches its cover, its synopsis, its table of contents and its chapters, in whatever order they stand', () => {
    const book = () => built<$Book>(
        <Book>
            {cover()}
            <Synopsis>A book about chemistry.</Synopsis>
            <TableOfContents>One.</TableOfContents>
            <Document>One.</Document>
        </Book>);

    it('and the book answers each of them', () => {
        const held = book();
        held.specify();
        expect(held.cover).toBeDefined();
        expect(held.synopsis).toBeDefined();
        expect(held.table).toBeDefined();
    });

    it('a book in that order specifies clean', () => {
        expect(() => book().specify()).not.toThrow();
    });

});

describe('a title is a section that means the book', () => {
    it('and a title with no meaning is refused', () => {
        const held = built<$Writing>(<Title>Chemistry</Title>);
        expect(() => held.specify()).toThrow(/means what it titles/);
    });

    it('AND ONE THAT MEANS SOMETHING STANDS', () => {
        const held = built<$Writing>(<Title>Chemistry<Reference>#0</Reference></Title>);
        expect(() => held.specify()).not.toThrow();
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
            <Section>
                <Heading>About</Heading>
                <Paragraph>Quietly.</Paragraph>
            </Section>
        </Synopsis>
    );

    it('and the book draws FLAT under the sheet, its parts in the order they were written', () => {
        const held = built<$Book>(<Book>{cover()}{synopsis(true)}<TableOfContents>One.</TableOfContents>{documented('First things')}</Book>);
        const host = drawn(held);
        const children = [...host.querySelectorAll('main > .pd-book > *')];
        expect(children[0].matches('header.pd-cover')).toBe(true);
        expect(children[1].matches('.pd-synopsis')).toBe(true);
        expect(children[2].matches('nav.pd-table-of-contents')).toBe(true);
        expect(children[3].matches('article.pd-document')).toBe(true);
    });

    it('a title written as copy makes its own heading', () => {
        const held = built<$Title>(<Title>Chemistry</Title>);
        expect(html.text(held.heading()?._block)).toBe('Chemistry');
    });

    it('AND A SYNOPSIS DRAWS NOTHING UNLESS IT IS PRINTED', () => {
        const quiet = drawn(built<$Book>(<Book>{cover()}{synopsis(false)}{documented('First things')}</Book>));
        const printed = drawn(built<$Book>(<Book>{cover()}{synopsis(true)}{documented('First things')}</Book>));
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

    it('a documented handed to a book answers that book', () => {
        const held = documented();
        const book = $(<Book />, $(<Cover><Title>T</Title><Author>A</Author><Subject>S</Subject></Cover>, Cover), held);
        expect(held.book).toBe(book);
        expect(held.searchFor<$Document>($TypeOfDocument)[0]?.book ?? held.book).toBe(book);
    });

    it('A THEME REGISTERED ON A BOOK IS THE ONE ITS PROSE IS DRAWN IN', async () => {
        class $Small extends $Theme { override size = '11px'; }
        const Small = $($Small);
        class $Pocket extends $Book { }
        const Pocket = $($Pocket);
        $(Pocket, Theme)(Small);
        const held = $(<Pocket />, $(<Cover><Title>T</Title><Author>A</Author><Subject>S</Subject></Cover>, Cover), documented());
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
