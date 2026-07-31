import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React, { type ReactElement, type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Paragraph, Paragraph } from '@/writing/Paragraph';
import { $Section, Section } from '@/writing/Section';
import { $Chapter, Chapter } from '@/book/Chapter';
import { $Cover, Cover } from '@/book/Cover';
import { $Synopsis, Synopsis } from '@/book/Synopsis';
import { $TableOfContents, TableOfContents } from '@/book/TableOfContents';
import { $Book, Book } from '@/book/Book';
import { Title } from '@/writing/Title';
import { $Reference, Reference } from '@/ref/Reference';
import { $Link, Link } from '@/ref/Link';
import { $Bookmark, Bookmark } from '@/book/Bookmark';
import { $Highlight, Highlight } from '@/ref/Highlight';

const section = (title: string, prose: string, parenthetical = false): ReactNode => (
    <Section parenthetical={parenthetical}>
        <Title>{title}</Title>
        {'\n\n' + prose}
    </Section>
);

const summary = (gist: string): ReactNode => section('Summary', gist, true);

const chapter = (title: string, prose: string): ReactElement => <Chapter>{section(title, prose)}{summary('In brief.')}</Chapter>;

const cover = (): ReactElement => <Cover>{section('The Algebra of Perspective', 'A book about reading.')}</Cover>;

const synopsis = (): ReactElement => <Synopsis>{section('Synopsis', 'One object, many renderings.')}{summary('In brief.')}</Synopsis>;

const book = (): ReactElement => <Book>{cover()}{synopsis()}{chapter('Coordinates', 'Reading is a change of coordinates.')}</Book>;

const rejection = (b: any): string | undefined => {
    const s = Object.getOwnPropertySymbols(b).find(x => x.description === '$Particle.devError');
    return s ? b[s] : undefined;
};

describe('$Book — a composition of chapters, of which cover, synopsis, index, and table of contents are four', () => {
    it('a chapter receives its sections DI-style — authored nested, bound as typed arguments', () => {
        const c: $Chapter = $(<Chapter>{section('Coordinates', 'Every act of reading is a change of coordinates.')}{summary('In brief.')}</Chapter>);
        expect(c).toBeInstanceOf($Chapter);
        expect(c.parts.length).toBe(2);
        expect(c.parts[0]).toBeInstanceOf($Section);
        expect(c.title?.copy).toBe('Coordinates');
    });

    it('a book receives its chapters DI-style; cover and synopsis are chapters among them', () => {
        const b: $Book = $(book());
        expect(b).toBeInstanceOf($Book);
        expect(b.chapters.length).toBe(4);
        expect(b.cover).toBeInstanceOf($Cover);
        expect(b.synopsis).toBeInstanceOf($Synopsis);
    });

    it('the cover is the canonical, and it sits at position zero', () => {
        const b: $Book = $(book());
        expect(b.canonical).toBe(b.chapters[0]);
        expect(b.canonical).toBeInstanceOf($Cover);
        expect(b.title?.copy).toBe('The Algebra of Perspective');
    });

    it('a cover away from position zero is rejected at binding', () => {
        const b: $Book = $(<Book>{synopsis()}{cover()}{chapter('Coordinates', 'Prose.')}</Book>);
        expect(rejection(b)).toMatch(/position zero/);
    });

    it('a book without a cover is rejected at binding', () => {
        const b: $Book = $(<Book>{synopsis()}{chapter('Coordinates', 'Prose.')}</Book>);
        expect(rejection(b)).toMatch(/cover/);
    });

    it('a book without a synopsis is rejected at binding', () => {
        const b: $Book = $(<Book>{cover()}{chapter('Coordinates', 'Prose.')}</Book>);
        expect(rejection(b)).toMatch(/synopsis/);
    });

    it('a second cover is rejected at binding — exactly one', () => {
        const b: $Book = $(<Book>{cover()}{synopsis()}{cover()}</Book>);
        expect(rejection(b)).toMatch(/exactly one cover/);
    });

    it('a second table of contents is rejected at binding — at most one', () => {
        const b: $Book = $(
            <Book>
                {cover()}
                <TableOfContents />
                <TableOfContents />
                {synopsis()}
            </Book>
        );
        expect(rejection(b)).toMatch(/at most one table of contents/);
    });

    it('a chapter knows its book — the parent, one channel, things point up', () => {
        const b: $Book = $(book());
        expect(b.chapters[2].book).toBe(b);
        expect(b.cover.book).toBe(b);
        expect(b.tableOfContents.book).toBe(b);
    });

    it('the book holds its own synopsis as readable writing', () => {
        const b: $Book = $(book());
        expect(b.synopsis.copy).toContain('One object, many renderings.');
    });

    it('a chapter without a summary is rejected at binding', () => {
        const c: $Chapter = $(<Chapter>{section('Coordinates', 'Prose.')}</Chapter>);
        expect(rejection(c)).toMatch(/summary/);
    });

    it('a cover without a title is rejected at binding', () => {
        const cv: $Cover = $(<Cover>{null}</Cover>);
        expect(rejection(cv)).toMatch(/title/);
    });

    it('each level states its law as valid — an accruing instance specification, super all the way up', () => {
        const b: $Book = $(book());
        expect(b.valid()).toBe(true);
        expect(b.cover.valid()).toBe(true);
        expect(b.chapters[2].valid()).toBe(true);
        expect(b.tableOfContents.valid()).toBe(true);
        const rejected: $Chapter = $(<Chapter>{section('Coordinates', 'Prose.')}</Chapter>);
        expect(rejected.valid()).toBe(false);
    });

    it('the summary of a chapter is its parenthetical section; the canonical is not it', () => {
        const c: $Chapter = $(<Chapter>{section('Coordinates', 'Prose.')}{summary('In brief: coordinates.')}</Chapter>);
        expect(c.summary).toBeInstanceOf($Section);
        expect(c.summary!.copy).toContain('In brief: coordinates.');
        expect(c.canonical.parenthetical).toBe(false);
        expect(c.title?.copy).toBe('Coordinates');
    });

    it('a title has a subtitle — the colon is the standard way, both optional', () => {
        const c: $Chapter = $(<Chapter>{section('The Algebra of Perspective: A Study in Reading', 'Prose.')}{summary('In brief.')}</Chapter>);
        expect(c.title?.copy).toBe('The Algebra of Perspective');
        expect(c.subtitle?.copy).toBe('A Study in Reading');
        const plain: $Chapter = $(<Chapter>{section('Coordinates', 'Prose.')}{summary('In brief.')}</Chapter>);
        expect(plain.subtitle).toBeUndefined();
    });

    it('a summary has a tagline — the first sentence, an ellipsis when more follows', () => {
        const c: $Chapter = $(<Chapter>{section('Coordinates', 'Prose.')}{summary('Reading is coordinates. There is more to say.')}</Chapter>);
        expect(c.tagline?.copy).toBe('Reading is coordinates…');
        const short: $Chapter = $(<Chapter>{section('Coordinates', 'Prose.')}{summary('One sentence only.')}</Chapter>);
        expect(short.tagline?.copy).toBe('One sentence only.');
        const b: $Book = $(book());
        expect(b.tableOfContents.tagline?.copy).toBe('A book about reading.');
    });

    it('every referent carries a ref — a link can stand in for a chapter now', () => {
        const b: $Book = $(book());
        const c = b.chapters[3];
        expect(c.ref).toBeUndefined();
        const link: $Link = $(<Link for="/books/algebra">The Algebra of Perspective</Link>);
        c.ref = link;
        expect(c.ref).toBe(link);
        expect(c.ref).toBeInstanceOf($Reference);
    });

    it('a reference is a sentence that stands for something — compose and select are inverses', () => {
        const b: $Book = $(book());
        b.ref = $(<Link for="/books/algebra">The Algebra of Perspective</Link>) as $Link;
        const c = b.chapters[3];
        expect(c.ref?.$for).toBe('/books/algebra#3');
        expect(c.ref?.copy).toBe('The Algebra of Perspective');
        expect(b.single(x => x.index === 3)).toBe(c);
        const s = c.sections[0];
        expect(s.ref?.$for).toBe('/books/algebra#3.1');
    });

    it('the composition assigns the reference with the parts', () => {
        const s: $Section = $(<Section><Title>Grounded</Title>{'\n\nOne paragraph stands here. It carries two sentences.'}</Section>);
        s.ref = $(<Link for="/books/algebra#3.2">The Frame</Link>) as $Link;
        const p = s.parts[1];
        expect(p.$ref?.$for).toBe('/books/algebra#3.2.1');
        expect(p.parts[0].$ref?.$for).toBe('/books/algebra#3.2.1.1');
    });

    it('a reference written into the block is stripped and assigned', () => {
        const s: $Section = $(<Section><Title>Marked</Title>{'\n\nProse of the section stands alone. '}<Reference for="#9.9">a mark in the writing</Reference></Section>);
        expect(s.$ref?.$for).toBe('#9.9');
        expect(s.copy).not.toContain('a mark in the writing');
    });

    it('the holder of the referential context overwrites the reference written in the block', () => {
        const holder: $Section = $(<Section><Title>Holder</Title>{'\n\nContext lives here.'}</Section>);
        holder.ref = $(<Link for="/held">Holder</Link>) as $Link;
        const inner: $Section = $(<Section><Title>Inner</Title>{'\n\nProse stands here. '}<Reference for="#permalink">m</Reference></Section>, holder);
        expect(inner.$ref?.$for).toBe('#permalink');
        expect(inner.ref?.$for).toBe('/held#0');
    });

    it('a highlight is the reference a highlighter leaves — first and last character of its parent', () => {
        const p: $Paragraph = $(<Paragraph>{'The frame turns with every chapter read.'}</Paragraph>);
        const h: $Highlight = $(<Highlight first={4} last={8}>the marked words</Highlight>, p);
        expect(h).toBeInstanceOf($Reference);
        expect(h.first).toBe(4);
        expect(h.last).toBe(8);
        expect(p.copy.slice(h.first, (h.last ?? 0) + 1)).toBe('frame');
    });

    it('the composition is list-like — where filters, select projects, single insists on one', () => {
        const b: $Book = $(book());
        expect(b.single(c => c.index === 3)).toBe(b.chapters[3]);
        expect(b.single()).toBeUndefined();
        expect(b.where(c => c.parenthetical).length).toBe(0);
        const s = b.chapters[3].sections[0];
        expect(s.single(x => x.index === 1)?.index).toBe(1);
        expect(s.select(x => x.index)).toEqual(s.parts.map(x => x.index));
    });

    it('where, select, and single answer at every grain of the composition', () => {
        const b: $Book = $(book());
        const chapter = b.chapters[3];
        expect(chapter.where(x => !x.parenthetical).length).toBe(1);
        expect(chapter.single(x => x.parenthetical)).toBe(chapter.summary);
        const paragraph = chapter.sections[0].single(x => x.index === 1)!;
        const sentence = paragraph.single(x => x.index === 1)!;
        expect(sentence.copy).toBe(paragraph.parts[0].copy);
        expect(paragraph.select(x => x.copy)).toEqual(paragraph.parts.map(x => x.copy));
        const word = sentence.single(x => x.index === 1)!;
        expect(word.copy).toBe(sentence.parts[0].copy);
        expect(word.where(c => c.valid()).length).toBe(word.parts.length);
        expect(word.single(c => c.index === 1)?.copy).toBe([...word.copy][0]);
    });

    it('a bookmark resolves to a part of its book — associated because it is rendered inside it', () => {
        const b: $Book = $(book());
        const bm: $Bookmark = $(<Bookmark for="#3">the chapter on coordinates</Bookmark>, b);
        expect(bm.lookup()).toBe(b.chapters[3]);
        expect(bm.copy).toBe('the chapter on coordinates');
    });

    it('references derive lazily — an ungrounded book gives its chapters no ref', () => {
        const b: $Book = $(book());
        expect(b.chapters[3].ref).toBeUndefined();
    });

    it('writing a chapter is writing a view — the sections are declared in the writing', () => {
        class $Written extends $Chapter {
            view(): ReactNode {
                return (
                    <>
                        <Section>
                            <Title>The Written Chapter: A Test</Title>
                            {'\n\nProse written in the view, as writing should be.'}
                        </Section>
                        <Section parenthetical>
                            <Title>Summary</Title>
                            {'\n\nWritten, marked, hidden.'}
                        </Section>
                    </>
                );
            }
        }
        const c: $Chapter = $(React.createElement($($Written) as any));
        expect(c).toBeInstanceOf($Written);
        expect(c.parts.length).toBe(2);
        expect(c.title?.copy).toBe('The Written Chapter');
        expect(c.subtitle?.copy).toBe('A Test');
        expect(c.summary?.copy).toContain('Written, marked, hidden.');
        expect(c.valid()).toBe(true);
    });

    it('the summary of a cover is its title — the canonical, a reading', () => {
        const cv: $Cover = $(cover());
        expect(cv.summary).toBe(cv.canonical);
        expect(cv.summary.copy).toContain('The Algebra of Perspective');
    });

    it('the default view of a chapter does not include its summary', () => {
        const c: $Chapter = $(<Chapter>{section('Coordinates', 'Reading is a change of coordinates.')}{summary('In brief: hidden.')}</Chapter>);
        const C = $(c as any);
        const { container } = render(<C />);
        expect(container.textContent).toContain('change of coordinates');
        expect(container.textContent).not.toContain('In brief: hidden.');
    });

    it('with no authored table of contents, the bond constructor renders one into the chapters — a part of the book, parent assigned', () => {
        const b: $Book = $(book());
        const toc = b.tableOfContents;
        expect(toc).toBeInstanceOf($TableOfContents);
        expect(b.chapters[1]).toBe(toc);
        expect(toc.book).toBe(b);
        expect(toc.index).toBe(1);
        expect(b.tableOfContents).toBe(toc);
    });

    it('the contents lists only the chapters — the cover is the running head, itself is the title', () => {
        const b: $Book = $(book());
        const toc = b.tableOfContents;
        expect(toc.chapters.length).toBe(2);
        expect(toc.chapters[0]).toBe(b.synopsis);
        expect(toc.chapters).not.toContain(toc);
        expect(toc.chapters).not.toContain(b.cover);
        expect(toc.title.copy).toBe('Table of Contents');
    });

    it('an authored table of contents is the one the book reads — a chapter among chapters', () => {
        const b: $Book = $(
            <Book>
                {cover()}
                <TableOfContents />
                {synopsis()}
                {chapter('Coordinates', 'Prose.')}
            </Book>
        );
        const toc = b.tableOfContents;
        expect(b.chapters).toContain(toc);
        expect(b.tableOfContents).toBe(toc);
        expect(toc.chapters.length).toBe(2);
        expect(toc.chapters).not.toContain(toc);
    });

    it('the composition assigns the index — one-indexed, the special first at zero', () => {
        const b: $Book = $(book());
        expect(b.cover.index).toBe(0);
        expect(b.chapters[1].index).toBe(1);
        expect(b.chapters[2].index).toBe(2);
        expect(b.chapters[3].index).toBe(3);
        const c = b.chapters[3];
        expect(c.parts[0].index).toBe(1);
        expect(c.parts[1].index).toBe(2);
        const s = c.parts[0];
        expect(s.parts[0].index).toBe(0);
        expect(s.parts[1].index).toBe(1);
    });

    it('an authored index survives the binding — the composition fills only what was not assigned', () => {
        const c: $Chapter = $(<Chapter>{section('Coordinates', 'Prose.')}<Section index={9} parenthetical><Title>Summary</Title></Section></Chapter>);
        expect(c.parts[0].index).toBe(1);
        expect(c.parts[1].index).toBe(9);
    });

    it('every piece of writing carries an assignable index — decimals allowed', () => {
        const c: $Chapter = $(<Chapter>{section('Coordinates', 'Prose.')}{summary('In brief.')}</Chapter>);
        expect(c.index).toBe(0);
        c.index = 1.5;
        expect(c.index).toBe(1.5);
        const s = c.parts[0];
        s.index = 2.25;
        expect(s.index).toBe(2.25);
    });

    it('every piece of writing carries parenthetical — assignable and authorable', () => {
        const c: $Chapter = $(<Chapter><Section parenthetical><Title>Summary</Title></Section></Chapter>);
        expect(c.parts[0].parenthetical).toBe(true);
        const p: $Paragraph = $(<Paragraph>Plain prose.</Paragraph>);
        expect(p.parenthetical).toBe(false);
        p.parenthetical = true;
        expect(p.parenthetical).toBe(true);
    });

    it('readings flatten through one parts level — sections, paragraphs, words', () => {
        const b: $Book = $(book());
        expect(b.sections.length).toBe(5);
        expect(b.paragraphs.length).toBeGreaterThan(0);
        expect(b.words.length).toBeGreaterThan(0);
    });

    it('a book renders itself through its table of contents — the title of the contents is its own reference', () => {
        const b: $Book = $(book());
        const B = $(b as any);
        const { container } = render(<B />);
        const toc = container.querySelector('.table-of-contents');
        expect(toc).not.toBeNull();
        expect(toc!.textContent).toContain('Table of Contents');
        expect(toc!.textContent).toContain('Coordinates');
        expect(toc!.textContent).not.toContain('The Algebra of Perspective');
    });

    it('a rejection renders as the exception view — the error is part of the view', () => {
        const b: $Book = $(<Book>{cover()}{chapter('Coordinates', 'Prose.')}</Book>);
        const B = $(b as any);
        const { container } = render(<B />);
        expect(container.textContent).toContain('Bond Constructor Failed');
        expect(container.textContent).toContain('synopsis');
    });

    it('a book renders whole — its chapters in order, summaries parenthetical and unseen', () => {
        const b: $Book = $(book());
        const B = $(b as any);
        const { container } = render(<B />);
        expect(container.textContent).toContain('The Algebra of Perspective');
        expect(container.textContent).toContain('change of coordinates');
        expect(container.textContent).not.toContain('In brief.');
    });
});
