import { describe, it, expect } from 'vitest';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import React, { type ReactElement, type ReactNode } from 'react';
import { render, act } from '@testing-library/react';
import { $ } from '@dna-platform/chemistry';
import { $Theme } from '@/writing/Theme';
import { Section } from '@/writing/Section';
import { Summary } from '@/writing/Summary';
import { Title } from '@/writing/Title';
import { $Chapter, Chapter } from '@/book/Chapter';
import { Cover } from '@/book/Cover';
import { Synopsis } from '@/book/Synopsis';
import { $Book, Book } from '@/book/Book';
import { Author } from '@/book/Author';
import { Subject } from '@/book/Subject';
import { TableOfContents } from '@/book/TableOfContents';
import { $$Book, Card } from '@/book/Book';

// A BOOK IS IN CHARGE OF THE LAYOUT AND THE READING ENVIRONMENT — Doug's, and a
// reversal of a draft that had put this on the cover. Four methods answer it:
// what the reading sits in, which chapters stand, how one is placed, and the
// running head.
//
// The promises below are written so each FAILS if a book ignored its own
// methods and drew a fixed arrangement instead.

const section = (title: string, prose: string, parenthetical = false): ReactNode => {
    const Kind = parenthetical ? Summary : Section;
    return (
    <Kind>
        <Title>{title}</Title>
        {'\n\n' + prose}
    </Kind>
);
};

const summary = (gist: string): ReactNode => section('Summary', gist, true);

const chapter = (title: string, prose: string): ReactElement => (
    <Chapter>{section(title, prose)}{summary('In brief.')}</Chapter>
);

const built = (As: any = Book): $Book => $(
    <As>
        <Cover>
            <Section>
                <Title>A Book That Turns</Title>
                {'\n\nAbout reading. '}<Author>The Team</Author>{' '}<Subject>Demonstration</Subject>
            </Section>
        </Cover>
        <TableOfContents />
        <Synopsis>{section('Synopsis', 'One book, two layouts.')}{summary('In brief.')}</Synopsis>
        {chapter('Coordinates', 'Reading is a change of coordinates.')}
        {chapter('Transport', 'A reader carries a place with them.')}
    </As>
) as $Book;

const drawn = (b: $Book): HTMLElement => {
    const B = $(b as never) as any;
    return render(<B />).container;
};

// A book that answers all three differently. It names no chapter class and
// touches no chapter — only the book's own arrangement moves.
class $Slipcase extends $Book {
    override environment(contents: ReactNode, theme: $Theme): ReactNode {
        return <main data-slipcase style={{ maxWidth: theme.measure }}>{contents}</main>;
    }

    override stands(): $Chapter[] {
        return this.reading.slice().reverse();
    }

    override place(chapter: $Chapter, at: number, theme: $Theme): ReactNode {
        const Standing = $(chapter) as any;
        return <li key={at} data-placed={at}><Standing /></li>;
    }
}

const Slipcase = $($Slipcase);

// A book that answers NOTHING of its own — the case a subclass must survive.
class $Plain extends $Book {}

const Plain = $($Plain);

describe('a book draws itself, and the base draws a reading that is on record', () => {
    // Re-record with `RECORD=1 npx vitest run tests/book/binding.test.tsx`, and
    // only after looking at what moved. A red here is a question, not a failure:
    // did somebody mean to move the reading?
    it('draws the reading that is on record, byte for byte', () => {
        const at = join(__dirname, 'book.baseline.html');
        const html = drawn(built()).innerHTML;
        if (process.env.RECORD) writeFileSync(at, html, 'utf-8');
        expect(html).toBe(readFileSync(at, 'utf-8'));
    });

    it('and its view draws something — a book is not a pass-through', () => {
        const container = drawn(built());
        expect(container.innerHTML.trim().length).toBeGreaterThan(0);
        expect(container.querySelector('article')).not.toBeNull();
    });
});

describe('A BOOK IS READ A CHAPTER AT A TIME', () => {
    // EXACTLY ONE, ON EVERY PAGE, WITHOUT EXCEPTION. Doug had to say this
    // EXACTLY ONE CHAPTER STANDS, whatever a book is opened at. Doug had to say
    // this more times than he should have, so the promise is written to be
    // unmistakable — and THERE IS NO PAGE: a book asks its catalogue which
    // chapter is open, and the catalogue holds a chapter rather than a number.
    it('exactly one chapter stands, wherever a book is opened', () => {
        const held = built();
        for (const chapter of held.reading) {
            held.contents.turn(chapter);
            expect(held.stands().length).toBe(1);
            expect(held.stands()[0]).toBe(chapter);
        }
        for (const at of [0, held.reading.length - 1]) {
            const b = built();
            b.contents.turn(b.reading[at]);
            expect(drawn(b).querySelectorAll('[data-chapter]').length).toBe(1);
        }
    });

    // A SYNOPSIS IS PARENTHETICAL — Doug, 2026-08-21: "it will be in the
    // canonical subject catalogue, so having it be invisible in the book is not
    // such a problem." Its job is to represent the book where the book is not,
    // and it already does that as an entry on its subject's shelf.
    it('a book s own account is not drawn in the book, and is not listed in its contents', () => {
        const b = built();
        const container = drawn(b);
        expect(b.synopsis.parenthetical).toBe(true);
        expect(container.textContent).not.toContain('One book, two layouts.');
        b.contents.turn(b.contents);
        expect(drawn(b).querySelector('[data-contents]')!.textContent).not.toContain('Synopsis');
    });

    // ONE PAGE PER CHAPTER, AND THE CONTENTS IS A CHAPTER — Doug, 2026-08-21:
    // "the cover is a chapter, it is its own page." So is the contents, and it
    // is reached rather than carried on every page.
    it('the contents is a chapter with a page of its own, not a bar on every page', () => {
        const b = built();
        expect(drawn(b).querySelector('[data-contents]')).toBeNull();
        b.contents.turn(b.contents);
        expect(drawn(b).querySelector('[data-contents]')).not.toBeNull();
    });

    it('and a reader can always move — previous and next', () => {
        const b = built();
        b.contents.turn(b.reading[Math.min(1, b.reading.length - 1)]);
        const turning = drawn(b).querySelector('[data-turning]');
        expect(turning).not.toBeNull();
        expect(turning!.textContent).toContain('previous');
        expect(turning!.textContent).toContain('next');
    });

    it('the running head goes to the contents rather than to the cover', () => {
        const b = built();
        b.contents.turn(b.reading[Math.min(2, b.reading.length - 1)]);
        expect(drawn(b).querySelector('[data-running]')!.getAttribute('href')).toBe('#contents');
    });

    it('a book opens at its title page', () => {
        const text = drawn(built()).textContent ?? '';
        expect(text).toContain('A Book That Turns');
        expect(text).not.toContain('Reading is a change of coordinates.');
    });

    it('and turning to another shows that one and no other', () => {
        const b = built();
        b.contents.turn(b.reading[Math.min(3, b.reading.length - 1)]);
        const text = drawn(b).textContent ?? '';
        expect(text).toContain('A reader carries a place with them.');
        expect(text).not.toContain('Reading is a change of coordinates.');
    });

    it('a page past the end shows the last chapter rather than nothing', () => {
        const b = built();
        b.contents.turn(b.reading[Math.min(99, b.reading.length - 1)]);
        expect(drawn(b).textContent ?? '').toContain('A reader carries a place with them.');
    });
});

describe('WHERE THE READER IS IS REACTIVE, and declared once', () => {
    it('a write repaints — turning a page shows the turn', () => {
        const b = built();
        const B = $(b as never) as any;
        const { container } = render(<B />);
        expect(container.textContent).toContain('A Book That Turns');
        act(() => { b.contents.turn(b.reading[2]); });
        expect(container.textContent).toContain('Reading is a change of coordinates.');
    });

    it('and it is declared on ONE class', () => {
        const writing = readFileSync(join(__dirname, '../../archive/writing/Writing.tsx'), 'utf-8');
        const book = readFileSync(join(__dirname, '../../archive/book/Book.tsx'), 'utf-8');
        const referent = readFileSync(join(__dirname, '../../archive/reference/Referent.tsx'), 'utf-8');
        expect(writing).not.toMatch(/^\s{4}\$?page\s*=/m);
        expect(book).not.toMatch(/^\s{4}\$?page\s*=/m);
        expect(referent).not.toMatch(/page/);
    });
});

describe('a book answers what the reading sits in', () => {
    it('so the container changes and nothing else does', () => {
        const container = drawn(built(Slipcase));
        expect(container.querySelector('[data-slipcase]')).not.toBeNull();
        expect(container.querySelector('article')).toBeNull();
    });
});

describe('a book answers which chapters stand, and where', () => {
    it('so a scroll is one override away, and no chapter class knows', () => {
        const container = drawn(built(Slipcase));
        expect(container.querySelectorAll('[data-placed]').length).toBe(4);
        const text = container.textContent ?? '';
        expect(text.indexOf('A reader carries a place')).toBeLessThan(text.indexOf('Reading is a change'));
    });
});

describe('a book that answers nothing falls to the base, and does not throw', () => {
    it('draws the same reading as a plain book', () => {
        expect(drawn(built(Plain)).innerHTML).toBe(drawn(built()).innerHTML);
    });
});

describe('a cover is a title page', () => {
    it('and its author and subject stand on ONE byline, not as two paragraphs', () => {
        const byline = drawn(built()).querySelector('[data-byline]');
        expect(byline).not.toBeNull();
        expect(byline?.textContent).toContain('The Team');
        expect(byline?.textContent).toContain('Demonstration');
    });
});

describe('a chapter carries its own address', () => {
    it('and the anchor drawn is the one a reference that resolves there produces', () => {
        const b = built();
        b.contents.turn(b.reading[Math.min(3, b.reading.length - 1)]);
        const placed = drawn(b).querySelector('[data-chapter]');
        expect(placed?.getAttribute('id')).toBe(b.reading[3].address);
    });

    it('a chapter with no title has no address, and the page still draws', () => {
        const untitled = $(<Chapter>{section('', 'Prose with no heading over it.')}{summary('In brief.')}</Chapter>);
        expect((untitled as $Chapter).address).toBe('');
        expect(drawn(built()).textContent).toContain('A Book That Turns');
    });
});

// FOUND THE FIRST TIME AN APPLICATION RENDERED A BOOK, which is also the first
// time $Book.valid() had ever been asked there. A catalogue decided what it held
// by DEREFERENCING its entries, so a subject catalogued nothing until its books
// were fetched — and a book naming that subject was valid or invalid depending
// on what else happened to be loaded.
describe('a catalogue answers what it holds without opening a volume', () => {
    const unpointed = (name: string) => $(<Card name={name} />) as $$Book;

    const subject = (): $Book => $(
        <Book>
            <Cover>
                <Section>
                    <Title>A Subject</Title>
                    {'\n\nIt holds books. '}<Author>The Team</Author>{' '}<Subject>Demonstration</Subject>
                </Section>
            </Cover>
            <TableOfContents />
            <Synopsis>{section('Synopsis', 'A subject, and the books it holds.')}{summary('In brief.')}</Synopsis>
            <Synopsis for={unpointed('/held/one')}>{section('First Held Book', 'Somebody else s book, standing here.')}{summary('In brief.')}</Synopsis>
            <Synopsis for={unpointed('/held/two')}>{section('Second Held Book', 'Another one, also absent.')}{summary('In brief.')}</Synopsis>
        </Book>
    ) as $Book;

    it('counts the books it catalogues while none of them is present', () => {
        expect(subject().entries.length).toBe(2);
    });

    it('and is therefore a subject before its shelf is fetched', () => {
        expect(subject().valid()).toBe(true);
    });

    it('a book that catalogues nothing still counts nothing', () => {
        expect(built().entries.length).toBe(0);
    });
});

describe('the model does not move when the layout does', () => {
    it('two books, two layouts, one corpus', () => {
        const a = built();
        const b = built(Slipcase);
        drawn(a);
        drawn(b);
        expect(b.chapters.length).toBe(a.chapters.length);
        expect(b.words.length).toBe(a.words.length);
        expect(b.letters.length).toBe(a.letters.length);
        expect(b.copy).toBe(a.copy);
    });
});
