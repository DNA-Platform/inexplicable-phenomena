import { describe, it, expect } from 'vitest';
import React, { type ReactElement, type ReactNode } from 'react';
import { render } from '@testing-library/react';
import { $ } from '@dna-platform/chemistry';
import { $Theme } from '@/writing/Theme';
import * as themes from '@/writing/Theme';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Chapter } from '@/book/Chapter';
import { Cover } from '@/book/Cover';
import { Synopsis } from '@/book/Synopsis';
import { $Book, Book } from '@/book/Book';
import { Author } from '@/book/Author';
import { Subject } from '@/book/Subject';
import { TableOfContents } from '@/book/TableOfContents';

// THE STOP CONDITION. One book, two themes, and the difference between them is
// STRUCTURAL rather than cosmetic — one lays its chapters out one after another
// and the other shows one at a time.
//
// A palette swap would prove the theme carries values, which was never in
// doubt. This proves it reaches what a book IS — and no stylesheet can produce
// it, which is what makes it unfakeable.

// A theme that paginates. It names no class: it answers about the parts it is
// handed, and a book is the only composition whose parts are not uniform AND
// which stands at the top of a reading.
class $Paged extends $Theme {
    override lay(of: themes.Composed, uniform: boolean): themes.Lay {
        return uniform ? 'run' : 'one';
    }
}

const Paged = $($Paged);

const section = (title: string, prose: string, parenthetical = false): ReactNode => (
    <Section parenthetical={parenthetical}>
        <Title>{title}</Title>
        {'\n\n' + prose}
    </Section>
);

const summary = (gist: string): ReactNode => section('Summary', gist, true);

const chapter = (title: string, prose: string): ReactElement => (
    <Chapter>{section(title, prose)}{summary('In brief.')}</Chapter>
);

const built = (): $Book => $(
    <Book>
        <Cover>
            <Section>
                <Title>A Book That Turns</Title>
                {'\n\nAbout reading. '}<Author>The Team</Author>{' '}<Subject>Demonstration</Subject>
            </Section>
        </Cover>
        <TableOfContents />
        <Synopsis>{section('Synopsis', 'One book, two themes.')}{summary('In brief.')}</Synopsis>
        {chapter('Coordinates', 'Reading is a change of coordinates.')}
        {chapter('Transport', 'A reader carries a place with them.')}
    </Book>
) as $Book;

// THE SCOPE IS THE BOOK'S OWN COMPONENT. Registering on a DERIVED Book and
// nesting the instance inside it re-runs the bond constructor with a book as
// its child, which a book correctly refuses — found by driving this promise.
// WHAT STANDS ON THE PAGE, as against what the contents merely LISTS. The
// contents names every chapter, so reading the whole body cannot tell a chapter
// that is open from one that is only reachable.
const standing = (c: HTMLElement): string =>
    [...c.querySelectorAll('[data-chapter]')].map(e => e.textContent ?? '').join(' ');

const drawn = (b: $Book, Theme?: unknown) => {
    const B = $(b as never) as any;
    if (Theme) $(B, themes.Theme)(Theme as never);
    return render(<B />).container;
};

describe('one book, two themes, and the second one PAGINATES', () => {
    it('a book opens at its title page, one chapter standing', () => {
        const container = drawn(built());
        expect(standing(container)).toContain('A Book That Turns');
        expect(container.querySelectorAll('[data-chapter]').length).toBe(1);
    });

    it('and only ONE chapter stands — the book, the chapters and the prose unmodified', () => {
        const container = drawn(built(), Paged);
        const stood = standing(container);
        expect(stood).toContain('A Book That Turns');
        expect(stood).not.toContain('A reader carries a place');
    });

    // THE MODEL IS TAKEN BEFORE AND AFTER ONE DRAWING rather than across two,
    // because a second full render costs more than the claim needs and the
    // claim is that DRAWING does not move the model.
    it('the model is IDENTICAL before and after a drawing — a theme changes the reading, never the book', () => {
        const b = built();
        const was = { chapters: b.chapters.length, words: b.words.length, letters: b.letters.length, copy: b.copy };
        drawn(b, Paged);
        expect(b.chapters.length).toBe(was.chapters);
        expect(b.words.length).toBe(was.words);
        expect(b.letters.length).toBe(was.letters);
        expect(b.copy).toBe(was.copy);
    });

    it('and turning the page shows the OTHER chapter, with nothing else changed', () => {
        const b = built();
        b.contents.turn(b.reading[1]);
        const stood = standing(drawn(b, Paged));
        expect(stood).toContain('Coordinates');
        expect(stood).not.toContain('A Book That Turns');
    });
});

describe('the paginating theme NAMES NO CLASS', () => {
    it('answers about the parts it was handed and nothing else', () => {
        const paged = $(<Paged />) as $Theme;
        expect(paged.lay({ parts: () => [], parenthetical: false }, true)).toBe('run');
        expect(paged.lay({ parts: () => [], parenthetical: false }, false)).toBe('one');
    });

    it('and inherits every value it did not touch', () => {
        const paged = $(<Paged />) as $Theme;
        const base = $(<themes.Theme />) as $Theme;
        expect(paged.ink).toBe(base.ink);
        expect(paged.measure).toBe(base.measure);
        expect(paged.rhythm).toBe(base.rhythm);
    });
});
