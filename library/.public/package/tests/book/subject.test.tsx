import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React, { type ReactElement, type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Chapter } from '@/book/Chapter';
import { Cover } from '@/book/Cover';
import { Synopsis } from '@/book/Synopsis';
import { $Book, Book } from '@/book/Book';
import { Author } from '@/book/Author';
import { $Subject, Subject } from '@/book/Subject';
import { $Canonical, Canonical } from '@/book/Canonical';
import { TableOfContents } from '@/book/TableOfContents';
import { $LibraryCard, LibraryCard } from '@/../app/src/sections/book/library/the-team/librarycard';

const section = (title: string, prose: string, parenthetical = false): ReactNode => (
    <Section parenthetical={parenthetical}>
        <Title>{title}</Title>
        {'\n\n' + prose}
    </Section>
);

const summary = (gist: string): ReactNode => section('Summary', gist, true);

const chapter = (title: string, prose: string): ReactElement => <Chapter>{section(title, prose)}{summary('In brief.')}</Chapter>;

const synopsis = (): ReactElement => <Synopsis>{section('Synopsis', 'One object, many renderings.')}{summary('In brief.')}</Synopsis>;

const declared = (title: string, of?: $LibraryCard, canonical?: $LibraryCard): $Book => $(
    <Book>
        <Cover>
            <Section>
                <Title>{title}</Title>
                {'\n\nA book about reading. '}
                <Author>The Team</Author>{' '}
                {of ? <Subject for={of}>Demonstration</Subject> : <Subject>Demonstration</Subject>}
                {canonical ? <Canonical for={canonical}>The Team</Canonical> : null}
            </Section>
        </Cover>
        <TableOfContents />
        {synopsis()}
        {chapter('Coordinates', 'Reading is a change of coordinates.')}
    </Book>
);

const shown = (node: ReactElement): string => render(node).container.textContent ?? '';

const rejection = (b: any): string | undefined => {
    const s = Object.getOwnPropertySymbols(b).find(x => x.description === '$Particle.devError');
    return s ? b[s] : undefined;
};

const canonicalOf = (b: $Book): $Canonical | undefined =>
    b.cover.sections.flatMap(s => s.elements).find(e => e instanceof $Canonical) as $Canonical | undefined;

describe('$Subject — a book reference that holds a library card', () => {
    it('reads to the subject book through the card it holds', () => {
        let shelfBook: $Book | undefined = undefined;
        const theShelf: $LibraryCard = $(<LibraryCard name="The Shelf" of={() => shelfBook!} title="The Shelf" />);
        shelfBook = declared('The Shelf', theShelf);
        const member = declared('The Algebra of Perspective', theShelf);

        expect(member.subject!.read()).toBe(shelfBook);
    });

    it('prints the name it was written with — the writer chooses the representational form', () => {
        const theShelf: $LibraryCard = $(<LibraryCard name="The Shelf" title="The Shelf" />);
        const member = declared('The Algebra of Perspective', theShelf);
        const S = $(member.subject!) as any;

        expect(member.subject!.name).toBe('Demonstration');
        expect(shown(<S />)).toBe('Demonstration');
    });

    it('still renders its name when it holds no card', () => {
        const orphan: $Subject = $(<Subject>Demonstration</Subject>);
        const S = $(orphan) as any;

        expect(orphan.valid()).toBe(true);
        expect(shown(<S />)).toBe('Demonstration');
    });

    it('throws when it holds no card, and names whose', () => {
        const orphan: $Subject = $(<Subject>Demonstration</Subject>);

        expect(() => orphan.read()).toThrow(/Demonstration/);
        expect(() => orphan.read()).toThrow(/stands for nothing/);
    });

    it('is not valid when it carries neither a name nor a card', () => {
        const empty: $Subject = $(<Subject>{'   '}</Subject>);

        expect(empty.valid()).toBe(false);
    });
});

describe('the cover carries three, and the book receives them', () => {
    it('answers title, author and subject through the cover', () => {
        const b = declared('The Algebra of Perspective');

        expect(b.title?.copy).toBe('The Algebra of Perspective');
        expect(b.author?.name).toBe('The Team');
        expect(b.subject?.name).toBe('Demonstration');
        expect(b.valid()).toBe(true);
    });

    it('a book whose cover names no subject does not bind, and the error says so', () => {
        const plain: $Book = $(
            <Book>
                <Cover>
                    <Section>
                        <Title>The Algebra of Perspective</Title>
                        {'\n\nA book about reading. '}<Author>The Team</Author>
                    </Section>
                </Cover>
                <TableOfContents />
                {synopsis()}
                {chapter('Coordinates', 'Prose.')}
            </Book>
        );

        expect(rejection(plain)).toMatch(/subject/);
    });
});

describe('$Canonical — one, declared, reciprocal', () => {
    it('reads to the canonical book when the canonical has this subject in its subject', () => {
        let shelfBook: $Book | undefined = undefined;
        let teamBook: $Book | undefined = undefined;
        const theShelf: $LibraryCard = $(<LibraryCard name="The Shelf" of={() => shelfBook!} title="The Shelf" />);
        const theTeam: $LibraryCard = $(<LibraryCard name="The Team" of={() => teamBook!} title="The Team" />);
        theShelf.$subject = theShelf;
        theTeam.$subject = theShelf;
        shelfBook = declared('The Shelf', theShelf, theTeam);
        teamBook = declared('The Team', theShelf);

        expect(canonicalOf(shelfBook)!.read()).toBe(teamBook);
        expect(canonicalOf(shelfBook)!.valid()).toBe(true);
    });

    // The canonical's twelve-hop reciprocity check LEFT THE FRAMEWORK: a
    // canonical is a reference and reciprocity is a library's law, not a
    // reference's. Doug: do not confuse what the framework needs with what
    // books need.
    it('a cover declaring two canonicals does not bind — exactly one', () => {
        const theTeam: $LibraryCard = $(<LibraryCard name="The Team" title="The Team" />);
        const b: $Book = $(
            <Book>
                <Cover>
                    <Section>
                        <Title>The Shelf</Title>
                        {'\n\nProse. '}
                        <Author>The Team</Author>{' '}<Subject>Demonstration</Subject>{' '}
                        <Canonical for={theTeam}>The Team</Canonical>{' '}<Canonical for={theTeam}>The Team</Canonical>
                    </Section>
                </Cover>
                <TableOfContents />
                {synopsis()}
            </Book>
        );

        expect(rejection(b)).toMatch(/exactly one canonical/);
    });
});
