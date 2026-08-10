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
import { $Location } from '@/reference/Location';
import { $Path } from '@/reference/Path';
import { $Sentence } from '@/writing/Sentence';
import { $$Sentence, $$Chapter } from '@/index';
import { $Row } from '@/book/Row';
import { $Bookmark, Bookmark } from '@/book/Bookmark';
import { $Highlight, Highlight } from '@/reference/Highlight';
import { $Word } from '@/writing/Word';
import { Author } from '@/book/Author';
import { Subject } from '@/book/Subject';

const section = (title: string, prose: string, parenthetical = false): ReactNode => (
    <Section parenthetical={parenthetical}>
        <Title>{title}</Title>
        {'\n\n' + prose}
    </Section>
);

const summary = (gist: string): ReactNode => section('Summary', gist, true);

const chapter = (title: string, prose: string): ReactElement => <Chapter>{section(title, prose)}{summary('In brief.')}</Chapter>;

const cover = (): ReactElement => (
    <Cover>
        <Section>
            <Title>The Algebra of Perspective</Title>
            {'\n\nA book about reading. '}
            <Author>The Team</Author>{' '}<Subject>Demonstration</Subject>
        </Section>
    </Cover>
);

const synopsis = (): ReactElement => <Synopsis>{section('Synopsis', 'One object, many renderings.')}{summary('In brief.')}</Synopsis>;

const book = (): ReactElement => <Book>{cover()}<TableOfContents />{synopsis()}{chapter('Coordinates', 'Reading is a change of coordinates.')}</Book>;

const rejection = (b: any): string | undefined => {
    const s = Object.getOwnPropertySymbols(b).find(x => x.description === '$Particle.devError');
    return s ? b[s] : undefined;
};

describe('referential integrity — at, then, and the reading', () => {
    it('at writes a location standing at the composition — read answers by index, and a missing index throws', () => {
        const b: $Book = $(book());
        const r = b.at(3);
        expect(r).toBeInstanceOf($Location);
        expect(r.$of).toBe(b);
        expect(r.read()).toBe(b.chapters[3]);
        expect(r.valid()).toBe(true);
        expect(b.at(0).read()).toBe(b.cover);
        expect(() => b.at(99).read()).toThrow();
        expect(b.at(99).valid()).toBe(false);
    });

    it('referents are memoryless — a part carries its index and nothing about who read it', () => {
        const b: $Book = $(book());
        const c = b.chapters[3];
        expect(c.index).toBe(3);
        expect('catalogue' in c).toBe(false);
    });

    it('then chains bound references — the walk crosses levels in one find', () => {
        const b: $Book = $(book());
        const section = b.chapters[3].parts()[0];
        const paragraph = section.at(1).read()!;
        const sentence = paragraph.at(1).read()!;
        const r = section.at(1).then(paragraph.at(1)).then(sentence.at(2));
        expect(r).toBeInstanceOf($Path);
        expect((r.read() as $Word).copy).toBe('is');
        expect(r.valid()).toBe(true);
    });

    it('a path trusts its construction — each leg reads at its own ground, and the walk is the guard', () => {
        const one: $Book = $(book());
        const other: $Book = $(book());
        const here = one.chapters[3].parts()[0];
        const there = other.chapters[3].parts()[0];
        const away = there.at(1).read();
        const r = here.at(1).then(away.at(1));
        expect(r.read().copy).toBe(away.at(1).read().copy);
    });

    it('equality left the interface — fresh readings of one place are distinct values, and no member claims otherwise', () => {
        const b: $Book = $(book());
        const s = b.chapters[3].parts()[0];
        const once = s.at(1).read();
        const again = s.at(1).read();
        expect(once).not.toBe(again);
        expect(once.copy).toBe(again.copy);
        expect('equals' in s.at(1)).toBe(false);
    });

    it('a duplicated index reads nothing — single insists on exactly one, and throws', () => {
        const c: $Chapter = $(
            <Chapter>
                <Section index={9}><Title>One</Title>{'\n\nProse stands here.'}</Section>
                <Section index={9} parenthetical><Title>Summary</Title>{'\n\nIn brief.'}</Section>
            </Chapter>
        );
        expect(() => c.at(9).read()).toThrow();
        expect(c.at(9).valid()).toBe(false);
    });

    it('the aspects read lazily at every level — tiling is lossless, and only words claim their letters', () => {
        const b: $Book = $(book());
        const section = b.chapters[3].sections[0];
        const sentence = section.paragraphs[1].sentences[0];
        expect(sentence.letters.map(l => l.copy).join('')).toBe(sentence.copy);
        const claimed = sentence.words.flatMap(w => w.letters);
        expect(claimed.map(l => l.copy).join('')).toBe('Readingisachangeofcoordinates');
        expect(section.words.length).toBe(7);
        expect(section.letters.length).toBeGreaterThan(0);
        expect(b.sentences.length).toBeGreaterThan(0);
        expect(b.letters.length).toBeGreaterThan(0);
    });
});

describe('the two connections — find goes forward, ref comes back', () => {
    it('ref is the reverse connection, specialized per level — and find is its inverse', () => {
        const b: $Book = $(book());
        expect(b.ref).toBeInstanceOf($Cover);
        expect(b.ref).toBe(b.cover);
        expect(b.ref.read()).toBe(b);
        const s = b.chapters[3].sections[0];
        expect(s.ref.read()).toBe(s);
        const sentence = s.paragraphs[1].sentences[0];
        expect(sentence.ref).toBeInstanceOf($$Sentence);
        expect(sentence.ref.read()).toBe(sentence);
    });

    it('a letter is its own reference — the literal floor', () => {
        const b: $Book = $(book());
        const word = b.chapters[3].sections[0].paragraphs[1].sentences[0].at(1).read()!;
        const letter = word.at(1).read()!;
        expect(letter.ref).toBe(letter);
        expect(letter.read()).toBe(letter);
    });

    it('a catalogue is a composition of references — entries dereference to the contents', () => {
        const b: $Book = $(book());
        const entries = b.chapters[3].ref.parts();
        expect(entries.length).toBe(b.chapters[3].parts().length);
        expect(entries.every(e => e instanceof $Location)).toBe(true);
        expect(entries[0].read()).toBe(b.chapters[3].parts()[0]);
    });

    it('a reference for a sentence is also a catalogue for its words — ref then location', () => {
        const b: $Book = $(book());
        const paragraph = b.chapters[3].sections[0].at(1).read()!;
        const sentence = paragraph.at(1).read()!;
        expect((sentence.ref.then(sentence.at(2)).read() as $Word).copy).toBe('is');
    });

    it('follow turns the contents page into its chapters — the literature the drawer holds', () => {
        const b: $Book = $(book());
        const followed = b.tableOfContents.follow();
        const chapters = b.tableOfContents.chapters;
        expect(followed.parts().length).toBe(chapters.length);
        expect(followed.parts().every((c, k) => c === chapters[k])).toBe(true);
        expect(followed.canonical).toBe(b.chapters[3]);
    });

    it('the table of contents IS a catalogue of the numbered chapters — no cover, no synopsis, not itself', () => {
        const b: $Book = $(book());
        const toc = b.tableOfContents;
        const rows = toc.parts();
        expect(rows.every(s => s instanceof $Section && s instanceof $Row)).toBe(true);
        expect(rows.every(r => r.read() !== undefined)).toBe(true);
        expect(rows[0].read()).toBe(b.chapters[3]);
        expect(rows[0].copy).toBe('Coordinates');
        expect(toc.chapters[0]).toBe(b.chapters[3]);
        expect(toc.chapters).not.toContain(b.cover);
        expect(toc.chapters).not.toContain(b.synopsis);
    });

    it('the beautiful path — the table of contents gets the cover, and the cover finds the book', () => {
        const b: $Book = $(book());
        const toc = b.tableOfContents;
        expect(toc.cover).toBe(b.cover);
        expect(toc.cover!.read()).toBe(b);
        expect(toc.read()).toBe(b);
        expect(toc.valid()).toBe(true);
    });
});

describe('the essential questions — complex references, equality across levels, natural chaining', () => {
    it('the sentence of a chapter — a path through the levels', () => {
        const b: $Book = $(book());
        const c = b.chapters[3];
        const section = c.at(1).read()!;
        const paragraph = section.at(1).read()!;
        const r = c.at(1).then(section.at(1)).then(paragraph.at(1));
        expect((r.read() as $Sentence).copy).toBe('Reading is a change of coordinates.');
    });

    it('the paragraph of a book — one level higher, the same composition', () => {
        const b: $Book = $(book());
        const c = b.chapters[3];
        const section = c.at(1).read()!;
        const r = b.at(3).then(c.at(1)).then(section.at(1));
        expect(r.read()).toBeInstanceOf($Paragraph);
        expect((r.read() as $Paragraph).copy).toBe('Reading is a change of coordinates.');
    });

    it('arrivals agree at the held grades — deep and shallow read the very same section', () => {
        const b: $Book = $(book());
        const c = b.chapters[3];
        const section = c.at(1).read();
        const deep = b.at(3).then(c.at(1));
        expect(deep.read()).toBe(section);
    });

    it('the contents page speaks for the book by following — the chapters, then each of their own drawers', () => {
        const b: $Book = $(book());
        const toc = b.tableOfContents;
        const listed = toc.chapters;
        const chapters = toc.follow();
        expect(chapters.parts().every((c, k) => c === listed[k])).toBe(true);
        const sections = chapters.parts().flatMap(c => c.ref.follow().parts());
        expect(sections.every((s, k) => s === listed.flatMap(c => c.sections)[k])).toBe(true);
    });

    it('grouping does not matter to the reading — both associations arrive at the same copy', () => {
        const b: $Book = $(book());
        const c = b.chapters[3];
        const section = c.at(1).read();
        const paragraph = section.at(1).read();
        const left = c.at(1).then(section.at(1)).then(paragraph.at(1));
        const right = c.at(1).then(section.at(1).then(paragraph.at(1)));
        expect(left.read().copy).toBe(right.read().copy);
        const spoken = b.tableOfContents.follow().parts()[0];
        expect(spoken.words[1].copy).toBe(c.words[1].copy);
    });

    it('a bookmark holds a reference — passed as a reference, never a string', () => {
        const b: $Book = $(book());
        const bm: $Bookmark = $(<Bookmark for={b.at(3)}>the chapter on coordinates</Bookmark>);
        expect(bm.read()).toBe(b.chapters[3]);
        const deep: $Bookmark = $(<Bookmark for={b.at(3).then(b.chapters[3].at(1))}>its first section</Bookmark>);
        expect(deep.read()).toBe(b.chapters[3].parts()[0]);
        expect(deep.valid()).toBe(true);
    });

    it('follow goes on following — the returned composition is followable to the next grade', () => {
        const b: $Book = $(book());
        const chapters = b.tableOfContents.follow();
        const sections = chapters.parts().flatMap(c => c.ref.follow().parts());
        expect(sections.length).toBe(b.tableOfContents.chapters.flatMap(c => c.sections).length);
    });

    it('natural chaining — a catalogue of references that are catalogues descends level by level', () => {
        const b: $Book = $(book());
        const chapter = b.tableOfContents.parts()[0].read()!;
        const section = chapter.ref.parts()[0].read()!;
        const paragraph = section.ref.parts()[1].read()!;
        expect(paragraph).toBeInstanceOf($Paragraph);
        expect(paragraph.copy).toBe('Reading is a change of coordinates.');
    });
});

describe('$Book — a composition of chapters, of which cover, synopsis, index, and table of contents are four', () => {
    it('a chapter receives its sections DI-style — authored nested, bound as typed arguments', () => {
        const c: $Chapter = $(<Chapter>{section('Coordinates', 'Every act of reading is a change of coordinates.')}{summary('In brief.')}</Chapter>);
        expect(c).toBeInstanceOf($Chapter);
        expect(c.parts().length).toBe(2);
        expect(c.parts()[0]).toBeInstanceOf($Section);
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
        expect(rejection(b)).toMatch(/exactly one table of contents/);
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

    it('ref answers with its own kind, and reads back to its literal', () => {
        const b: $Book = $(book());
        const c = b.chapters[3];
        expect(c.ref).toBeInstanceOf($$Chapter);
        expect(c.ref.read()).toBe(c);
        expect(b.at(c.index).read()).toBe(c);
    });

    it('at and read are inverses — the written location reads the part it stands for', () => {
        const b: $Book = $(book());
        const c = b.chapters[3];
        expect(b.at(c.index).read()).toBe(c);
        const s = c.sections[0];
        expect(c.at(s.index).read()).toBe(s);
    });

    it('the composition assigns the index with the parts — fresh readings, fresh assignments', () => {
        const s: $Section = $(<Section><Title>Grounded</Title>{'\n\nOne paragraph stands here. It carries two sentences.'}</Section>);
        const p = s.parts()[1];
        expect(p.index).toBe(1);
        const sentence = p.parts()[0];
        expect(sentence.index).toBe(1);
    });

    it('a highlight is the reference a highlighter leaves — first and last letter of its parent', () => {
        const p: $Paragraph = $(<Paragraph>{'The frame turns with every chapter read.'}</Paragraph>);
        const h: $Highlight = $(<Highlight first={4} last={8}>the marked words</Highlight>, p);
        expect(h.first).toBe(4);
        expect(h.last).toBe(8);
        expect(p.copy.slice(h.first, (h.last ?? 0) + 1)).toBe('frame');
    });

    it('the composition is list-like — where filters, select projects, find insists on one', () => {
        const b: $Book = $(book());
        expect(b.at(3).read()).toBe(b.chapters[3]);
        expect(b.where(c => c.parenthetical).length).toBe(1);
        const s = b.chapters[3].sections[0];
        expect(s.at(1).read()?.index).toBe(1);
        expect(s.select(x => x.index)).toEqual(s.parts().map(x => x.index));
    });

    it('where, select, and find answer at every grain of the composition', () => {
        const b: $Book = $(book());
        const chapter = b.chapters[3];
        expect(chapter.where(x => !x.parenthetical).length).toBe(1);
        expect(chapter.parts().find(x => x.parenthetical)).toBe(chapter.summary);
        const section = chapter.sections[0];
        const paragraph = section.at(1).read()!;
        const sentence = paragraph.at(1).read()!;
        expect(sentence.copy).toBe(paragraph.parts()[0].copy);
        expect(paragraph.select(x => x.copy)).toEqual(paragraph.parts().map(x => x.copy));
        const word = sentence.at(1).read()!;
        expect(word.copy).toBe(sentence.parts()[0].copy);
        expect(word.where(c => c.valid()).length).toBe(word.parts().length);
        expect(word.at(1).read()?.copy).toBe([...word.copy][0]);
    });

    it('a bookmark wears its prose and reads its reference — the surface and the standing-for, one sentence', () => {
        const b: $Book = $(book());
        const bm: $Bookmark = $(<Bookmark for={b.at(3)}>the chapter on coordinates</Bookmark>);
        expect(bm.read()).toBe(b.chapters[3]);
        expect(bm.copy).toBe('the chapter on coordinates');
        const blank: $Bookmark = $(<Bookmark>nowhere</Bookmark>);
        expect(blank.valid()).toBe(false);
        expect(() => blank.read()).toThrow(/stands for nothing/);
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
        expect(c.parts().length).toBe(2);
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

    it('a book without a declared table of contents is refused — it does not appear from nowhere', () => {
        const b: $Book = $(<Book>{cover()}{synopsis()}{chapter('Coordinates', 'Prose.')}</Book>);
        expect(rejection(b)).toMatch(/table of contents/);
    });

    it('a declared table of contents is a part of the book, parent assigned', () => {
        const b: $Book = $(book());
        const toc = b.tableOfContents;
        expect(toc).toBeInstanceOf($TableOfContents);
        expect(b.chapters[1]).toBe(toc);
        expect(toc.book).toBe(b);
        expect(toc.index).toBe(1);
        expect(b.tableOfContents).toBe(toc);
    });

    it('the contents lists only the numbered chapters — the cover, the synopsis and itself are apparatus', () => {
        const b: $Book = $(book());
        const toc = b.tableOfContents;
        expect(toc.chapters.length).toBe(1);
        expect(toc.chapters[0]).toBe(b.chapters[3]);
        expect(toc.chapters).not.toContain(toc);
        expect(toc.chapters).not.toContain(b.cover);
        expect(toc.chapters).not.toContain(b.synopsis);
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
        expect(toc.chapters.length).toBe(1);
        expect(toc.chapters).not.toContain(toc);
    });

    it('the composition assigns the index — one-indexed, the special first at zero', () => {
        const b: $Book = $(book());
        expect(b.cover.index).toBe(0);
        expect(b.chapters[1].index).toBe(1);
        expect(b.chapters[2].index).toBe(2);
        expect(b.chapters[3].index).toBe(3);
        const c = b.chapters[3];
        expect(c.parts()[0].index).toBe(1);
        expect(c.parts()[1].index).toBe(2);
        const s = c.parts()[0];
        expect(s.parts()[0].index).toBe(0);
        expect(s.parts()[1].index).toBe(1);
    });

    it('an authored index survives the binding — the composition fills only what was not assigned', () => {
        const c: $Chapter = $(<Chapter>{section('Coordinates', 'Prose.')}<Section index={9} parenthetical><Title>Summary</Title></Section></Chapter>);
        expect(c.parts()[0].index).toBe(1);
        expect(c.parts()[1].index).toBe(9);
    });

    it('every piece of writing carries an assignable index — decimals allowed', () => {
        const c: $Chapter = $(<Chapter>{section('Coordinates', 'Prose.')}{summary('In brief.')}</Chapter>);
        expect(c.index).toBe(0);
        c.index = 1.5;
        expect(c.index).toBe(1.5);
        const s = c.parts()[0];
        s.index = 2.25;
        expect(s.index).toBe(2.25);
    });

    it('every piece of writing carries parenthetical — assignable and authorable', () => {
        const c: $Chapter = $(<Chapter><Section parenthetical><Title>Summary</Title></Section></Chapter>);
        expect(c.parts()[0].parenthetical).toBe(true);
        const p: $Paragraph = $(<Paragraph>Plain prose.</Paragraph>);
        expect(p.parenthetical).toBe(false);
        p.parenthetical = true;
        expect(p.parenthetical).toBe(true);
    });

    it('readings flatten through one contents level — a chapter IS a composition of sections, rows among them', () => {
        const b: $Book = $(book());
        expect(b.sections.length).toBe(6);
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
