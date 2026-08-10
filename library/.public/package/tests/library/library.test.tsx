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
import { Subject } from '@/book/Subject';
import { TableOfContents } from '@/book/TableOfContents';
import { type $LibraryCard, $LibraryCard$, LibraryCard } from '@/library/LibraryCard';

const section = (title: string, prose: string, parenthetical = false): ReactNode => (
    <Section parenthetical={parenthetical}>
        <Title>{title}</Title>
        {'\n\n' + prose}
    </Section>
);

const summary = (gist: string): ReactNode => section('Summary', gist, true);

const chapter = (title: string, prose: string): ReactElement => <Chapter>{section(title, prose)}{summary('In brief.')}</Chapter>;

const synopsis = (): ReactElement => <Synopsis>{section('Synopsis', 'One object, many renderings.')}{summary('In brief.')}</Synopsis>;

const declared = (title: string, of: $LibraryCard, ...more: ReactElement[]): $Book => $(
    <Book>
        <Cover>
            <Section>
                <Title>{title}</Title>
                {'\n\nA book about reading. '}
                <Author>The Team</Author>{' '}<Subject for={of}>Demonstration</Subject>
            </Section>
        </Cover>
        <TableOfContents />
        {synopsis()}
        {more}
    </Book>
);

describe('the library — computed recursively, terminating at the self-cataloguing subject', () => {
    it('every book arrives at the same library — the card of the subject that is its own subject', () => {
        let shelfBook: $Book | undefined = undefined;
        const theShelf: $LibraryCard$ = $(<LibraryCard name="The Shelf" of={() => shelfBook!} title="The Shelf" />);
        const theAlgebra: $LibraryCard$ = $(<LibraryCard name="The Algebra of Perspective" title="The Algebra of Perspective" />);
        theShelf.$subject = theShelf;
        theAlgebra.$subject = theShelf;
        shelfBook = declared('The Shelf', theShelf);
        const member = declared('The Algebra of Perspective', theShelf);

        expect(member.library).toBe(theShelf);
        expect(shelfBook.library).toBe(theShelf);
    });

    it('the self-cataloguing subject answers its own card', () => {
        let shelfBook: $Book | undefined = undefined;
        const theShelf: $LibraryCard$ = $(<LibraryCard name="The Shelf" of={() => shelfBook!} title="The Shelf" />);
        theShelf.$subject = theShelf;
        shelfBook = declared('The Shelf', theShelf);

        expect(shelfBook.library).toBe(theShelf);
        expect(theShelf.library).toBe(theShelf);
    });

    it('the card reflects the library — one truth, not two', () => {
        const theShelf: $LibraryCard$ = $(<LibraryCard name="The Shelf" title="The Shelf" />);
        const theAlgebra: $LibraryCard$ = $(<LibraryCard name="The Algebra of Perspective" title="The Algebra of Perspective" />);
        theShelf.$subject = theShelf;
        theAlgebra.$subject = theShelf;
        const member = declared('The Algebra of Perspective', theShelf);

        expect(theAlgebra.library).toBe(theShelf);
        expect(member.library).toBe(theAlgebra.library);
    });

    it('a card with no subject computes no library', () => {
        const stray: $LibraryCard$ = $(<LibraryCard name="Stray" title="Stray" />);

        expect(stray.library).toBeUndefined();
    });

    it('the recursion climbs a chain of subjects to the summit', () => {
        const theShelf: $LibraryCard$ = $(<LibraryCard name="The Shelf" title="The Shelf" />);
        const middle: $LibraryCard$ = $(<LibraryCard name="A Middle Subject" title="A Middle Subject" />);
        const leaf: $LibraryCard$ = $(<LibraryCard name="A Leaf" title="A Leaf" />);
        theShelf.$subject = theShelf;
        middle.$subject = theShelf;
        leaf.$subject = middle;

        expect(leaf.library).toBe(theShelf);
    });
});

describe('the table of contents, extended with the subject\'s books', () => {
    it('carries an entry for each member card, beside the rows it derives', () => {
        const theShelf: $LibraryCard$ = $(<LibraryCard name="The Shelf" title="The Shelf" />);
        const theAlgebra: $LibraryCard$ = $(<LibraryCard name="The Algebra of Perspective" title="The Algebra of Perspective" />);
        const theTeam: $LibraryCard$ = $(<LibraryCard name="The Team" title="The Team" />);
        theShelf.$subject = theShelf;
        const shelfBook = declared('The Shelf', theShelf);
        shelfBook.tableOfContents.$cards = [theAlgebra, theTeam];

        const B = $(shelfBook as any);
        const { container } = render(<B />);
        const contents = container.querySelector('.table-of-contents')!;

        expect(contents.textContent).toContain('The Algebra of Perspective');
        expect(contents.textContent).toContain('The Team');
        expect(contents.querySelectorAll('li').length).toBe(2);
    });

    it('an authored chapter overrides the inferred entry — inferred only if absent', () => {
        const theShelf: $LibraryCard$ = $(<LibraryCard name="The Shelf" title="The Shelf" />);
        const theAlgebra: $LibraryCard$ = $(<LibraryCard name="The Algebra of Perspective" title="The Algebra of Perspective" />);
        const theTeam: $LibraryCard$ = $(<LibraryCard name="The Team" title="The Team" />);
        theShelf.$subject = theShelf;
        const shelfBook = declared('The Shelf', theShelf, chapter('The Team', 'The authored account, standing in for the inferred entry.'));
        shelfBook.tableOfContents.$cards = [theAlgebra, theTeam];

        const B = $(shelfBook as any);
        const { container } = render(<B />);
        const contents = container.querySelector('.table-of-contents')!;

        expect(contents.querySelectorAll('li').length).toBe(2);
        expect(contents.textContent).toContain('The Algebra of Perspective');
    });

    it('a card left out of the extension does not appear — declaring is what admits a book', () => {
        const theShelf: $LibraryCard$ = $(<LibraryCard name="The Shelf" title="The Shelf" />);
        const theAlgebra: $LibraryCard$ = $(<LibraryCard name="The Algebra of Perspective" title="The Algebra of Perspective" />);
        const stray: $LibraryCard$ = $(<LibraryCard name="A Stray Book" title="A Stray Book" />);
        theShelf.$subject = theShelf;
        theAlgebra.$subject = theShelf;
        const shelfBook = declared('The Shelf', theShelf);
        shelfBook.tableOfContents.$cards = [theAlgebra, stray].filter(c => c.subject === theShelf);

        const B = $(shelfBook as any);
        const { container } = render(<B />);
        const contents = container.querySelector('.table-of-contents')!;

        expect(contents.textContent).toContain('The Algebra of Perspective');
        expect(contents.textContent).not.toContain('A Stray Book');
    });
});
