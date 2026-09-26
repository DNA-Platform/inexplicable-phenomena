import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Annotation, $Section, Section, Heading, $Paragraph, Paragraph, Strict, Closed } from '@dna-platform/public';
import { $Book, Book, BookSpecification, $Chapter, Chapter, Title, $Cover, Cover, $Synopsis, Synopsis, TableOfContents, Author, Subject } from '@dna-platform/public';

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
        expect(twice.specify()).toContain('Book: a book has one synopsis of itself, and this one does not');
    });

    it('holds chapters, and a section standing straight in it is not a part it may hold', () => {
        const book = built<$Book>(<Book>{APaper()}{WhatItArgues()}{WhereThingsAre()}<Section><Heading>h</Heading></Section></Book>);
        expect(book.specify()).toContain('Book: a strict composition holds parts at its level or one below, and this one holds another');
    });

    it('exposes what its cover says — its title, its author, its subject and what it is about', () => {
        const book = built<$Book>(<Book>{APaper()}{WhatItArgues()}{WhereThingsAre()}{TheArgument()}</Book>);
        expect(book.title?.name).toBe('A Paper');
        expect(book.author?.name).toBe('A Persona');
        expect(book.author?.means?.identifier).toBe('/a-persona/');
        expect(book.subject?.means?.identifier).toBe('/the-library/');
        expect(book.about).toBeUndefined();
    });

    // Doug, 2026-09-26: "Book can mean what its Cover means - return that, because a link that goes to the cover is one that goes to the book".
    it('means what its cover means, which is the book itself', () => {
        const book = built<$Book>(<Book>{TheArgument()}{APaper()}{WhatItArgues()}{WhereThingsAre()}</Book>);
        expect(book.means).toBe(book.cover?.mention);
        expect(book.means?.identifier).toBe('/a-paper/');
        expect(built<$Book>(<Book>{TheArgument()}</Book>).means).toBeUndefined();
    });

    // A catalogue's chapter is a synopsis of another book, so a book has one synopsis OF ITSELF and may carry others'.
    it('has one synopsis of itself, which it exposes, and may carry a chapter that is another book\'s synopsis', () => {
        const OfTheLog = (): React.ReactNode => (
            <Chapter>
                <Title>[Of the Log](/a-paper/#of-the-log)</Title>
                <Chapter><Synopsis /><Title>[Synopsis](/the-log/#synopsis)</Title></Chapter>
                <Synopsis />
            </Chapter>
        );
        const book = built<$Book>(<Book>{APaper()}{OfTheLog()}{WhatItArgues()}{WhereThingsAre()}</Book>);
        expect(book.specify()).toEqual([]);
        expect(book.synopsis).toBe(book.parts[2]);
        expect(book.parts[1].annotations.expressed($Synopsis)?.means?.identifier).toBe('/the-log/');
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

// Doug, 2026-09-26: "$Bound is on writing... bound calls bound on all its contents and annotations after it
// binds itself, and then $Book is the only bond constructor that actually calls it".
describe('a book binds: once it is whole, every writing in it is bound, top to bottom', () => {
    it('a paragraph three levels down and its annotation find the book whole in their $Bound; a chapter built alone is never bound', () => {
        const bound: { book?: $Book; cover?: $Chapter; table?: $Chapter; order: string[] } = { order: [] };
        class $Binding extends $Paragraph {
            protected override $Bound(): void {
                bound.book = this.$book;
                bound.cover = this.$book?.cover;
                bound.table = this.$book?.table;
                bound.order.push('paragraph');
                super.$Bound();
            }
        }
        class $Noting extends $Annotation {
            protected override $Bound(): void {
                bound.order.push('annotation');
                super.$Bound();
            }
        }
        const Binding = $($Binding);
        const Noting = $($Noting);
        const chapter = (): ReactNode => (
            <Chapter>
                <Title>[The Argument](/a-paper/#the-argument)</Title>
                <Section>
                    <Heading>What is claimed</Heading>
                    <Binding>A reference names a thing and never a place. <Noting /></Binding>
                </Section>
            </Chapter>
        );
        built<$Chapter>(chapter());
        expect(bound.order).toEqual([]);
        const book = built<$Book>(<Book>{APaper()}{WhereThingsAre()}{chapter()}</Book>);
        expect(bound.book).toBe(book);
        expect(bound.cover).toBe(book.cover);
        expect(bound.table).toBe(book.table);
        expect(bound.order).toEqual(['paragraph', 'annotation']);
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
