import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { $ } from '@dna-platform/chemistry';
import { $Writing, $Reference, $Section, Section, Heading, Paragraph, Sentence, Word } from '@dna-platform/public';
import { $Book, Book, $Chapter, Chapter, Title, Cover, Synopsis, $TableOfContents, TableOfContents, $Content, Content } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
const drawn = async (writing: $Writing): Promise<HTMLElement> => {
    const Drawn = $(writing);
    let container: HTMLElement | undefined;
    await act(async () => { container = render(<Drawn />).container; });
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
    return container!;
};

const table = (): React.ReactNode => (
    <Chapter>
        <TableOfContents />
        <Title>[Table of Contents](/a-paper/#table-of-contents)</Title>
        <Section>
            <Heading>Contents</Heading>
            <Paragraph><Content>[The Argument](/a-paper/#the-argument)</Content></Paragraph>
            <Paragraph>
                <Word><Content>[The Evidence](/a-paper/#the-evidence)</Content></Word>
                and a word that is no entry
            </Paragraph>
        </Section>
        <Section>
            <Heading>The Catalogue</Heading>
            <Paragraph><Content>[The Log](/the-log/)</Content></Paragraph>
        </Section>
    </Chapter>
);

describe('a content is a reference an entry of a table stands, which draws its name as its note', () => {
    it('reads its name and its identifier from the pair the compiler wrote, and is a reference', () => {
        const paragraph = built<$Writing>(<Paragraph><Content>[The Argument](/a-paper/#the-argument)</Content></Paragraph>);
        const content = paragraph.annotations.find($Content)[0];
        expect(content).toBeInstanceOf($Reference);
        expect(content.name).toBe('The Argument');
        expect(content.identifier).toBe('/a-paper/#the-argument');
    });

    it('drawn, makes the writing it annotates the link, its name inside it in a span wearing pa-content', async () => {
        const page = await drawn(built<$Writing>(<Paragraph><Content>[The Argument](/a-paper/#the-argument)</Content></Paragraph>));
        const link = page.querySelector('a[href="/a-paper/#the-argument"]');
        expect(link).not.toBeNull();
        expect(link?.querySelector('span.pa-content')?.textContent).toBe('The Argument');
    });
});

// A GRID, as the First Folio set its Catalogue in 1623 — the plays in rows, one entry said of a row and
// one of the chapter itself, at different depths. Doug, 2026-09-26: "Yes, it should definitly read contents on the chapter. Try to think hard
// about a standard implementation where they are buried in the rows of a grid. What order would they
// be on the page? Traverse in that order."
const grid = (): React.ReactNode => (
    <Chapter>
        <TableOfContents />
        <Content>[A Catalogue](/the-folio/#a-catalogue)</Content>
        <Title>[A Catalogue](/the-folio/#a-catalogue)</Title>
        <Section>
            <Heading>Comedies, Histories, and Tragedies</Heading>
            <Paragraph>
                <Word><Content>[The Tempest](/the-folio/#the-tempest)</Content></Word>
                <Word><Content>[Twelfth Night](/the-folio/#twelfth-night)</Content></Word>
            </Paragraph>
            <Paragraph><Content>[The Histories](/the-folio/#the-histories)</Content><Word>King John</Word></Paragraph>
            <Paragraph><Sentence><Word><Content>[Hamlet](/the-folio/#hamlet)</Content></Word></Sentence></Paragraph>
        </Section>
    </Chapter>
);

describe('a table of contents has contents: every content in its table, in the order their names stand on the page', () => {
    it('answers a grid\'s contents cell by cell and row by row, whatever their depth, and one said of a row or the chapter after what it holds', async () => {
        const chapter = built<$Chapter>(grid());
        const found = chapter.annotations.expressed($TableOfContents)?.contents ?? [];
        expect(found.map(content => content.name)).toEqual(['The Tempest', 'Twelfth Night', 'The Histories', 'Hamlet', 'A Catalogue']);
        const page = await drawn(chapter);
        expect([...page.querySelectorAll('span.pa-content')].map(span => span.textContent)).toEqual(found.map(content => content.name));
    });

    it('answers every content its chapter holds, however deep it stands, in document order', () => {
        const chapter = built<$Chapter>(table());
        const found = chapter.annotations.expressed($TableOfContents)?.contents ?? [];
        expect(found.map(content => content.name)).toEqual(['The Argument', 'The Evidence', 'The Log']);
        expect(found.map(content => content.identifier)).toEqual(['/a-paper/#the-argument', '/a-paper/#the-evidence', '/the-log/']);
    });

    it('answers none of another chapter\'s, and is reached from the book as its table', () => {
        const Elsewhere = (): React.ReactNode => (
            <Chapter>
                <Title>[Elsewhere](/a-paper/#elsewhere)</Title>
                <Paragraph><Content>[The Library](/the-library/)</Content></Paragraph>
            </Chapter>
        );
        const book = built<$Book>(
            <Book>
                <Chapter><Cover /><Title>[A Paper](/a-paper/)</Title></Chapter>
                <Chapter><Synopsis /><Title>[Synopsis](/a-paper/#synopsis)</Title></Chapter>
                {table()}
                {Elsewhere()}
            </Book>
        );
        const contents = book.table?.annotations.expressed($TableOfContents)?.contents ?? [];
        expect(contents.map(content => content.name)).toEqual(['The Argument', 'The Evidence', 'The Log']);
    });

    it('is read when asked, so a content added to its table is among them after the next define', () => {
        const chapter = built<$Chapter>(table());
        const section = chapter.text.find($Section)[0];
        section.annotations.add(section, <Content>[The Shelves](/the-library/#the-shelves)</Content>);
        section.annotations.define();
        const found = chapter.annotations.expressed($TableOfContents)?.contents ?? [];
        expect(found.map(content => content.name)).toContain('The Shelves');
    });
});
