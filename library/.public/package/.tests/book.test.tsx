import { describe, it, expect, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Annotation, $Section, Section, Heading, $Paragraph, Paragraph, Strict, Closed, $Theme } from '@dna-platform/public';
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
        <Title>[Synopsis](/a-paper/)</Title>
        <Paragraph>That a reference names a thing and never a place.</Paragraph>
    </Chapter>
);

const WhereThingsAre = (): React.ReactNode => (
    <Chapter>
        <TableOfContents />
        <Title>[Table of Contents](/a-paper/table-of-contents/)</Title>
        <Paragraph>The argument, and the evidence for it.</Paragraph>
    </Chapter>
);

const TheArgument = (): React.ReactNode => (
    <Chapter>
        <Title>[The Argument](/a-paper/the-argument/)</Title>
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

    // A catalogue's chapter is a synopsis of another book — its Synopsis handed that book's synopsis chapter — so a
    // book has one synopsis OF ITSELF and may carry others'.
    it('has one synopsis of itself, which it exposes, and may carry a chapter that is another book\'s synopsis', () => {
        const LogSynopsis = (): React.ReactNode => (
            <Chapter><Synopsis /><Title>[Synopsis](/the-log/)</Title><Paragraph>The one book here that is by what it is about.</Paragraph></Chapter>
        );
        const OfTheLog = (): React.ReactNode => (
            <Chapter>
                <Title>[Of the Log](/a-paper/of-the-log/)</Title>
                <Synopsis>{LogSynopsis()}</Synopsis>
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

    // THE BOOKMARK — Doug, 2026-09-26: "it is a bookmark right? It is the place where the user is (recently was) and
    // it is a record of him being there." The app and the render hand the book the url its page is open at; the
    // book finds the chapter whose title means it, by equality and nothing read, and turns to it once mounted.
    it('given a bookmark, the chapter whose title means it is the bookmark; given none, or one no chapter means, none', () => {
        const book = built<$Book>(<Book bookmark="/a-paper/the-argument/">{APaper()}{WhatItArgues()}{WhereThingsAre()}{TheArgument()}</Book>);
        expect(book.$bookmark).toBe('/a-paper/the-argument/');
        expect(book.bookmark).toBe(book.parts[3]);
        expect(built<$Book>(<Book>{APaper()}{TheArgument()}</Book>).bookmark).toBeUndefined();
        expect(built<$Book>(<Book bookmark="/elsewhere/">{APaper()}{TheArgument()}</Book>).bookmark).toBeUndefined();
    });

    // A CATALOGUE'S CHAPTER KEEPS ITS OWN TITLE, found by driving every link of the test library, 2026-09-27 — Doug: "I
    // clicked table of contents and of libby and I don't think either went to the right place." The Synopsis used to send
    // the chapter's title to the book it holds the synopsis of, replacing the reference the compiler wrote, and the
    // bookmark, found by what a title means, no longer found the chapter at its own route. Doug: "the Synopsis can't use
    // the title of the chapter… as a minimal synopsis, I would have it put the inner contents and annotations in if
    // possible, but skip the title as a default and customize from there for your library."
    it('a catalogue\'s chapter holding another book\'s synopsis keeps its own title, and is the bookmark at its own route', () => {
        const LibbySynopsis = (): React.ReactNode => (
            <Chapter><Synopsis /><Title>[Synopsis](/libby/)</Title><Paragraph>A librarian's own account.</Paragraph></Chapter>
        );
        const OfLibby = (): React.ReactNode => <Chapter><Title>[Of Libby](/the-library/of-libby/)</Title><Synopsis>{LibbySynopsis()}</Synopsis></Chapter>;
        const book = built<$Book>(<Book bookmark="/the-library/of-libby/">{APaper()}{OfLibby()}</Book>);
        const ofLibby = book.parts[1] as $Chapter;
        expect(ofLibby.title?.means?.identifier).toBe('/the-library/of-libby/');
        expect(ofLibby.annotations.expressed($Synopsis)?.means?.identifier).toBe('/libby/');
        expect(book.bookmark).toBe(ofLibby);
    });

    it('mounted, turns to its bookmark, and turns again when the bookmark moves', async () => {
        const turned = vi.fn();
        // THE CHAPTER'S ELEMENT IS WHAT TURNS since 2026-09-27, found from its title's id — named here by that title.
        Element.prototype.scrollIntoView = function (this: Element) { turned(this.classList.contains('pd-chapter') ? this.querySelector('.pd-title')?.id ?? '' : this.id); };
        const book = built<$Book>(<Book bookmark="/a-paper/the-argument/">{APaper()}{WhatItArgues()}{WhereThingsAre()}{TheArgument()}</Book>);
        const Drawn = $(book);
        await act(async () => { render(<Drawn />); });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(turned.mock.calls).toEqual([['the-argument']]);
        act(() => { book.$bookmark = '/a-paper/'; });
        expect(turned.mock.calls).toEqual([['the-argument'], ['a-paper']]);
        act(() => { book.$bookmark = '/a-paper/'; });
        act(() => { book.$bookmark = '/elsewhere/'; });
        expect(turned.mock.calls).toHaveLength(2);
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
                bound.book = this.book;
                bound.cover = this.book?.cover;
                bound.table = this.book?.table;
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
                <Title>[The Argument](/a-paper/the-argument/)</Title>
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
                seen.drawn = this.book;
                return super.view();
            }

            protected override $Define(): void {
                super.$Define();
                seen.defined = this.book;
            }
        }
        const Looking = $($Looking);
        const book = built<$Book>(
            <Book>
                {APaper()}
                <Chapter>
                    <Title>[The Argument](/a-paper/the-argument/)</Title>
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
        expect(book.book).toBe(book);
    });

    // Doug, 2026-09-30: "They should never be inconsistent. I don't really like the idea that they should ever be
    // specified. Why not have $chapter, chapter and book, and if $chapter is there, chapter returns it, otherwise it
    // looks it up, and then book is always the book of the chapter." So nothing is ever told a book: a writing lent a
    // chapter answers that chapter's book, and so does everything inside it.
    it('a writing lent a chapter answers that chapter\'s book over the one above, and a paragraph inside it answers the same', () => {
        const elsewhere = built<$Book>(<Book>{APaper()}{TheArgument()}</Book>);
        const book = built<$Book>(<Book>{APaper()}{TheArgument()}</Book>);
        const chapter = book.text.find($Chapter)[1];
        const section = chapter.text.find($Section)[0];
        section.$chapter = elsewhere.text.find($Chapter)[1];
        expect(section.chapter).toBe(elsewhere.text.find($Chapter)[1]);
        expect(section.book).toBe(elsewhere);
        expect(section.text.find($Paragraph)[0].book).toBe(elsewhere);
        expect(chapter.book).toBe(book);
    });

    it('a writing built alone answers none, and nothing loops', () => {
        expect(built<$Paragraph>(<Paragraph>alone</Paragraph>).book).toBeUndefined();
        expect(built<$Chapter>(TheArgument()).text.find($Section)[0].book).toBeUndefined();
    });

    // A BOOK ALWAYS HAS A THEME — Sprint 94, Doug, 2026-09-29: "let's give Book a theme property that returns the
    // annotation. We probably want themes to be unique and subclasses can add their own in $Define. Books can type
    // the theme property more specifically." And: "If the framework can't assume a theme, it has no place to draw
    // values from, right?" The class stands the framework's; a written one in front is the one; a subclass stands
    // its own and types the property as it. Uniqueness is expression's: one theme is ever expressed, the front's.
    it('always has a theme: the class stands the framework\'s and answers it, and a written one in front is the one answered', () => {
        const plain = built<$Book>(<Book>{APaper()}{TheArgument()}</Book>);
        expect(plain.theme).toBeInstanceOf($Theme);
        // NO VALUES OF ITS OWN since Sprint 97's policy — Doug: "none — a library names its own."
        expect(plain.theme.values).toEqual({});
        expect(plain.specify().filter(said => said.includes('theme'))).toEqual([]);
        const dark = built<$Book>(<Book><Dark />{APaper()}{TheArgument()}</Book>);
        expect(dark.theme).toBeInstanceOf($Dark);
        expect((dark.theme as $Dark).ink).toBe('white');
        expect(dark.annotations.find($Theme)).toHaveLength(2);
        expect(dark.annotations.containsOne($Theme)).toBe(true);
        expect(dark.specify().filter(said => said.includes('theme'))).toEqual([]);
    });

    it('a book class stands its own theme in $Define and types the property as it', () => {
        const darkened = built<$Darkened>(<Darkened>{APaper()}{TheArgument()}</Darkened>);
        expect(darkened.theme).toBeInstanceOf($Dark);
        expect(darkened.theme.ink).toBe('white');
        expect(darkened.annotations.find($Theme)).toHaveLength(2);
        expect(darkened.specify().filter(said => said.includes('theme'))).toEqual([]);
    });
});

class $Dark extends $Theme {
    ink = 'white';
    override get values(): Record<string, string> { return { ink: this.ink }; }
}
const Dark = $($Dark);

class $Darkened extends $Book {
    override get theme(): $Dark {
        const theme = this.annotations.expressed($Dark);
        if (theme === undefined) throw new Error('a darkened book always has a dark theme, and this one has none');
        return theme;
    }

    protected override $Define(): void {
        super.$Define();
        this.annotations.add(this,
            <Dark />
        );
    }
}
const Darkened = $($Darkened);
