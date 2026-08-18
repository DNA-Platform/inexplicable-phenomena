import React, { type ReactElement, type ReactNode } from 'react';
import { describe, it, expect } from 'vitest';
import { $ } from '@dna-platform/chemistry';
import { $Book, Book } from '@/book/Book';
import { $Chapter, Chapter } from '@/book/Chapter';
import { Cover } from '@/book/Cover';
import { $Synopsis, Synopsis } from '@/book/Synopsis';
import { TableOfContents } from '@/book/TableOfContents';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Author } from '@/book/Author';
import { Subject } from '@/book/Subject';
import { $LibraryCard, LibraryCard } from '@/../app/src/sections/book/library/the-team/librarycard';

const section = (heading: string, prose: string, aside = false): ReactNode => (
    <Section parenthetical={aside}><Title>{heading}</Title>{'\n\n' + prose}</Section>
);

const summary = (gist: string): ReactNode => section('Summary', gist, true);

const chapter = (title: string, prose: string): ReactElement => <Chapter>{section(title, prose)}{summary('In brief.')}</Chapter>;

const cover = (title: string): ReactElement => (
    <Cover>
        <Section>
            <Title>{title}</Title>
            {'\n\nA book about reading. '}
            <Author>The Team</Author>{' '}<Subject>Demonstration</Subject>
        </Section>
    </Cover>
);

// A synopsis OF a book: it carries that book's card, and standing in another
// book it is a catalogue entry rather than that book's own account of itself.
const synopsisOf = (of?: $LibraryCard, hidden = false): ReactElement => (
    <Synopsis for={of} parenthetical={hidden}>
        {section('Synopsis', 'One object, many renderings.')}
        {summary('In brief.')}
    </Synopsis>
);

const card = (name: string): $LibraryCard => $(<LibraryCard name={name} title={name} />) as $LibraryCard;

describe('a chapter is a reference to the book it stands in', () => {
    it('a chapter carries its book rather than climbing to it', () => {
        const b: $Book = $(<Book>{cover('The Shelf')}<TableOfContents />{synopsisOf()}{chapter('Coordinates', 'Prose.')}</Book>);
        for (const c of b.chapters) expect(c.book).toBe(b);
    });

    it('a chapter DRAWN BY SOMETHING THAT IS NOT ITS BOOK still answers its book', () => {
        const b: $Book = $(<Book>{cover('The Shelf')}<TableOfContents />{synopsisOf()}{chapter('Coordinates', 'Prose.')}</Book>);
        const held = b.chapters[3];
        // What a parent answers is whoever interpreted it last. Standing the
        // chapter under a different chemical is exactly the case that used to
        // send the contents on an eight-hop walk.
        (held as unknown as { parent: unknown }).parent = b.tableOfContents;
        expect(held.parent).not.toBe(b);
        expect(held.book).toBe(b);
        expect(held.read()).toBe(b);
    });

    it('a chapter outside any book answers nothing rather than throwing, and read() says so', () => {
        const loose: $Chapter = $(chapter('Loose', 'Prose.')) as $Chapter;
        expect(loose.book).toBeUndefined();
        expect(() => loose.read()).toThrow(/outside any book/);
    });

    it('the contents finds its book by asking, with no walk left in it', () => {
        const b: $Book = $(<Book>{cover('The Shelf')}<TableOfContents />{synopsisOf()}{chapter('Coordinates', 'Prose.')}</Book>);
        expect(b.tableOfContents.book).toBe(b);
    });
});

describe('a synopsis is a chapter that points at the book it is OF', () => {
    it('a synopsis with no card of its own stands for the book it is in', () => {
        const b: $Book = $(<Book>{cover('The Shelf')}<TableOfContents />{synopsisOf()}{chapter('Coordinates', 'Prose.')}</Book>);
        expect(b.synopsis).toBeInstanceOf($Synopsis);
        expect(b.synopsis.read()).toBe(b);
    });

    it('a book holding three others and one of its own answers ITS OWN — the reflexive one', () => {
        const shelf: $Book = $(
            <Book>
                {cover('The Shelf')}
                <TableOfContents />
                {synopsisOf(card('The Algebra') as unknown as $LibraryCard)}
                {synopsisOf(card('The Manifold') as unknown as $LibraryCard)}
                {synopsisOf()}
                {synopsisOf(card('The Team') as unknown as $LibraryCard)}
            </Book>
        );
        expect(shelf.synopsis).toBe(shelf.chapters[4]);
        expect(shelf.synopsis.read()).toBe(shelf);
    });

    it('a book carrying only OTHER books accounts for nothing of itself, and fails validation by name', () => {
        const b: $Book = $(
            <Book>
                {cover('The Shelf')}
                <TableOfContents />
                {synopsisOf(card('The Manifold') as unknown as $LibraryCard)}
            </Book>
        );
        const symbol = Object.getOwnPropertySymbols(b).find(x => x.description === '$Particle.devError');
        expect(symbol ? (b as any)[symbol] : '').toMatch(/synopsis OF ITSELF/);
    });
});

describe('subjecthood is a count, not a class', () => {
    it('a book that catalogues nothing is an ordinary book', () => {
        const b: $Book = $(<Book>{cover('The Manifold')}<TableOfContents />{synopsisOf()}{chapter('The Fold', 'Prose.')}</Book>);
        expect(b.follow().parts()).toEqual([]);
    });

    it('a book that catalogues some IS a subject — no class distinguishes them', () => {
        let manifold: $Book | undefined = undefined;
        const theManifold = $(<LibraryCard name="The Manifold" title="The Manifold" of={() => manifold!} />) as $LibraryCard;
        manifold = $(<Book>{cover('The Manifold')}<TableOfContents />{synopsisOf()}</Book>);

        const shelf: $Book = $(
            <Book>
                {cover('The Shelf')}
                <TableOfContents />
                {synopsisOf()}
                {synopsisOf(theManifold as unknown as $LibraryCard)}
            </Book>
        );
        const ordinary: $Book = $(<Book>{cover('X')}<TableOfContents />{synopsisOf()}</Book>);
        expect(shelf.follow().parts()).toEqual([manifold]);
        expect(ordinary.follow().parts()).toEqual([]);
        expect(shelf.constructor).toBe(ordinary.constructor);
    });

    it('a book FOLLOWS to the books it catalogues, and to nothing that points home', () => {
        let manifold: $Book | undefined = undefined;
        const theManifold = $(<LibraryCard name="The Manifold" title="The Manifold" of={() => manifold!} />) as $LibraryCard;
        manifold = $(<Book>{cover('The Manifold')}<TableOfContents />{synopsisOf()}{chapter('The Fold', 'Prose.')}</Book>);

        const shelf: $Book = $(
            <Book>
                {cover('The Shelf')}
                <TableOfContents />
                {synopsisOf()}
                {chapter('Furniture', 'Prose.')}
                {synopsisOf(theManifold as unknown as $LibraryCard)}
            </Book>
        );
        const followed = shelf.follow().parts();
        expect(followed).toEqual([manifold]);
        expect(followed).not.toContain(shelf);
        expect(shelf.read().parts()).toEqual([manifold]);
    });

    it('the same members answer both interfaces — chapters composed, books catalogued', () => {
        const b: $Book = $(<Book>{cover('The Manifold')}<TableOfContents />{synopsisOf()}{chapter('The Fold', 'Prose.')}</Book>);
        expect(b.parts()).toBe(b.chapters);
        expect(b.canonical).toBe(b.cover);
        expect(b.follow().parts()).toEqual([]);
    });

    it('a synopsis of ANOTHER book reads to that book, and never opens it', () => {
        let manifold: $Book | undefined = undefined;
        const theManifold = $(<LibraryCard name="The Manifold" title="The Manifold" of={() => manifold!} />) as $LibraryCard;
        manifold = $(<Book>{cover('The Manifold')}<TableOfContents />{synopsisOf()}{chapter('The Fold', 'Prose.')}</Book>);

        const shelf: $Book = $(
            <Book>
                {cover('The Shelf')}
                <TableOfContents />
                {synopsisOf()}
                {synopsisOf(theManifold as unknown as $LibraryCard)}
            </Book>
        );
        const entry = shelf.chapters[3] as $Synopsis;
        expect(entry.read()).toBe(manifold);
        expect(entry.read()).not.toBe(shelf);
    });
});
