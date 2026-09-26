import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Section, Section, Heading, $Paragraph, Paragraph, Strict, Closed } from '@dna-platform/public';
import { $Book, Book, BookSpecification, $Chapter, Chapter, Title, $Cover, Cover, Synopsis, TableOfContents, Author, Subject } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;

const APaper = (): React.ReactNode => (
    <Chapter>
        <Cover />
        <Title>[A Paper](/a-paper/)</Title>
        <Author>[A Persona](/a-persona/)</Author>
        <Subject>[The Library](/the-library/)</Subject>
    </Chapter>
);

const WhatItArgues = (): React.ReactNode => (
    <Chapter>
        <Synopsis />
        <Title>[Synopsis](/a-paper/#synopsis)</Title>
        <Paragraph>That a reference names a thing and never a place.</Paragraph>
    </Chapter>
);

const WhereThingsAre = (): React.ReactNode => (
    <Chapter>
        <TableOfContents />
        <Title>[Table of Contents](/a-paper/#table-of-contents)</Title>
        <Paragraph>The argument, and the evidence for it.</Paragraph>
    </Chapter>
);

const TheArgument = (): React.ReactNode => (
    <Chapter>
        <Title>[The Argument](/a-paper/#the-argument)</Title>
        <Section>
            <Heading>What is claimed</Heading>
            <Paragraph>A reference names a thing and never a place.</Paragraph>
        </Section>
    </Chapter>
);

describe('a book is a composition at 7, strict and closed, whose canonical is its cover', () => {
    it('stands its level and pair, and holds the chapters its functions return', () => {
        const book = built<$Book>(<Book>{APaper()}{WhatItArgues()}{WhereThingsAre()}{TheArgument()}</Book>);
        expect(book.level).toBe(7);
        expect(book.is(Strict)).toBe(true);
        expect(book.is(Closed)).toBe(true);
        expect(book.parts.length).toBe(4);
        expect(book.parts.every(part => part instanceof $Chapter)).toBe(true);
        expect(book.specification).toBeInstanceOf(BookSpecification);
        expect(book.specify()).toEqual([]);
    });

    it('its canonical is the chapter carrying the cover, wherever it stands', () => {
        const book = built<$Book>(<Book>{TheArgument()}{WhatItArgues()}{APaper()}{WhereThingsAre()}</Book>);
        expect(book.canonical?.is($Cover)).toBe(true);
        expect(book.canonical).toBe(book.parts[2]);
        expect(book.specify()).toEqual([]);
    });

    it('a book with no cover, or two, or two synopses, says so when asked', () => {
        const uncovered = built<$Book>(<Book>{WhatItArgues()}{WhereThingsAre()}{TheArgument()}</Book>);
        expect(uncovered.canonical).toBeUndefined();
        expect(uncovered.specify()).toContain('Book: a book has one cover, and this one does not');
        const covered = built<$Book>(<Book>{APaper()}{APaper()}{WhatItArgues()}{WhereThingsAre()}</Book>);
        expect(covered.specify()).toContain('Book: a book has one cover, and this one does not');
        const twice = built<$Book>(<Book>{APaper()}{WhatItArgues()}{WhatItArgues()}{WhereThingsAre()}</Book>);
        expect(twice.specify()).toContain('Book: a book has one synopsis, and this one does not');
    });

    it('holds chapters, and a section standing straight in it is not a part it may hold', () => {
        const book = built<$Book>(<Book>{APaper()}{WhatItArgues()}{WhereThingsAre()}<Section><Heading>h</Heading></Section></Book>);
        expect(book.specify()).toContain('Book: a strict composition holds parts at its level or one below, and this one holds another');
    });

    it('exposes what its cover says — its title, its author, its subject and what it is about', () => {
        const book = built<$Book>(<Book>{APaper()}{WhatItArgues()}{WhereThingsAre()}{TheArgument()}</Book>);
        expect(book.title?.name).toBe('A Paper');
        expect(book.author?.name).toBe('A Persona');
        expect(book.author?.reference?.identifier).toBe('/a-persona/');
        expect(book.subject?.reference?.identifier).toBe('/the-library/');
        expect(book.about).toBeUndefined();
    });

    it('exposes its cover, its synopsis and its table — the chapters carrying each, wherever they stand', () => {
        const book = built<$Book>(<Book>{TheArgument()}{WhereThingsAre()}{APaper()}{WhatItArgues()}</Book>);
        expect(book.cover).toBe(book.parts[2]);
        expect(book.cover).toBe(book.canonical);
        expect(book.synopsis).toBe(book.parts[3]);
        expect(book.table).toBe(book.parts[1]);
        const untabled = built<$Book>(<Book>{APaper()}{WhatItArgues()}{TheArgument()}</Book>);
        expect(untabled.table).toBeUndefined();
    });

    it('a chapter that does not specify makes the book say so, coded to that chapter', () => {
        const Untitled = (): React.ReactNode => <Chapter><Paragraph>no title</Paragraph></Chapter>;
        const book = built<$Book>(<Book>{APaper()}{WhatItArgues()}{WhereThingsAre()}{Untitled()}</Book>);
        expect(book.specify()).toContain('Book / Chapter 3: a chapter has one title as its canonical, and this one does not');
    });
});

describe('every writing has a book', () => {
    it('a paragraph three levels down answers its book, in its own $Define and when drawn', () => {
        const seen: { defined?: $Book; drawn?: $Book } = {};
        class $Looking extends $Paragraph {
            override view(): ReactNode {
                seen.drawn = this.$book;
                return super.view();
            }

            protected override $Define(): void {
                super.$Define();
                seen.defined = this.$book;
            }
        }
        const Looking = $($Looking);
        const book = built<$Book>(
            <Book>
                {APaper()}
                <Chapter>
                    <Title>[The Argument](/a-paper/#the-argument)</Title>
                    <Section>
                        <Heading>What is claimed</Heading>
                        <Looking>A reference names a thing and never a place.</Looking>
                    </Section>
                </Chapter>
            </Book>
        );
        expect(seen.defined).toBe(book);
        const Drawn = $(book);
        render(<Drawn />);
        expect(seen.drawn).toBe(book);
    });

    it('a book answers itself', () => {
        const book = built<$Book>(<Book>{APaper()}{TheArgument()}</Book>);
        expect(book.$book).toBe(book);
    });

    it('a writing lent a book answers it over the one above, and a paragraph inside it answers the lent one too', () => {
        const lent = built<$Book>(<Book>{APaper()}</Book>);
        const book = built<$Book>(<Book>{APaper()}{TheArgument()}</Book>);
        const chapter = book.text.find($Chapter)[1];
        const section = chapter.text.find($Section)[0];
        section.$book = lent;
        expect(section.$book).toBe(lent);
        expect(section.text.find($Paragraph)[0].$book).toBe(lent);
        expect(chapter.$book).toBe(book);
    });

    it('a writing built alone answers none, and nothing loops', () => {
        expect(built<$Paragraph>(<Paragraph>alone</Paragraph>).$book).toBeUndefined();
        expect(built<$Chapter>(TheArgument()).text.find($Section)[0].$book).toBeUndefined();
    });
});
