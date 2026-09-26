import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { $ } from '@dna-platform/chemistry';
import { $Writing, $Section, Section, Heading, $Paragraph, Paragraph, Sentence, Word, $Table, Table } from '@dna-platform/public';
import { $Book, Book, $Chapter, Chapter, Cover, Title } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
const drawn = async (writing: $Writing): Promise<HTMLElement> => {
    const Drawn = $(writing);
    let container: HTMLElement | undefined;
    await act(async () => { container = render(<Drawn />).container; });
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
    return container!;
};
const classes = (writing: $Writing): string[] => [...writing.classes].filter(name => name.startsWith('pa-'));

// A TABLE MARKS ITS ROWS AND CELLS ONCE, IN $BOUND, when the book is whole and nothing has drawn — so the
// marks cost no draw, and a section stands in a book to be bound. Doug, 2026-09-26: "Mark at bound is great."
const bound = (section: React.ReactNode): $Section => built<$Book>(
    <Book>
        <Chapter><Cover /><Title>[The Folio](/the-folio/)</Title></Chapter>
        <Chapter><Title>[A Catalogue](/the-folio/a-catalogue/)</Title>{section}</Chapter>
    </Book>
).text.find($Chapter)[1].text.find($Section)[0];

// A GRID, as the First Folio set its Catalogue in 1623: the plays in rows, two to a row. Doug, 2026-09-26:
// "A table is a way of interpreting a composition, and the attribute can handle annotating the various
// contents as needed"; "$start: number, start = 1 would skip the canonical, and we can make table smart
// enough to typecheck for sections and chapters and set start to 1 if undefined". The field is $start; the
// attribute chemistry writes it as is `start`, as $is is written `is`.
const folio = (table: React.ReactNode = <Table />): React.ReactNode => (
    <Section>
        {table}
        <Heading>Comedies, Histories, and Tragedies</Heading>
        <Paragraph><Word>The Tempest</Word><Word>Twelfth Night</Word></Paragraph>
        <Paragraph><Word>King John</Word><Word>Richard II</Word></Paragraph>
        <Paragraph><Word>Hamlet</Word><Word>Macbeth</Word></Paragraph>
    </Section>
);

describe('a table is a way of interpreting a composition as a grid, marking its rows and cells by authorship', () => {
    it('interprets a section as a grid: its paragraphs the rows, their words the cells, and the heading no row', () => {
        const section = bound(folio());
        expect(section.specify()).toEqual([]);
        expect(classes(section)).toEqual(['pa-table', 'pa-cols-2']);
        const [heading, ...rows] = section.parts;
        expect(classes(heading).filter(name => name.startsWith('pa-row') || name.startsWith('pa-col'))).toEqual([]);
        expect(rows.map(row => classes(row))).toEqual([['pa-row', 'pa-row-start-1'], ['pa-row', 'pa-row-start-2'], ['pa-row', 'pa-row-start-3']]);
        expect(rows[0].parts.map(cell => classes(cell))).toEqual([['pa-col', 'pa-col-start-1'], ['pa-col', 'pa-col-start-2']]);
    });

    it('a paragraph\'s sentences are its rows, every one unless $start says otherwise', () => {
        const rows = (table: React.ReactNode): number => built<$Paragraph>(
            <Paragraph>{table}<Sentence><Word>one</Word></Sentence><Sentence><Word>two</Word></Sentence><Sentence><Word>three</Word></Sentence></Paragraph>
        ).annotations.expressed($Table)?.rows.length ?? 0;
        expect(rows(<Table />)).toBe(3);
        expect(rows(<Table start={1} />)).toBe(2);
    });

    it('a short row\'s last cell spans the columns that remain', () => {
        const section = bound(
            <Section>
                <Table />
                <Heading>h</Heading>
                <Paragraph><Word>a</Word><Word>b</Word></Paragraph>
                <Paragraph><Word>alone</Word></Paragraph>
            </Section>
        );
        expect(classes(section.parts[2].parts[0])).toEqual(['pa-col', 'pa-col-start-1', 'pa-col-span-2']);
    });

    it('a section built alone is never bound: it wears pa-table, and its rows and cells no marks', () => {
        const section = built<$Section>(folio());
        expect(classes(section)).toEqual(['pa-table', 'pa-cols-2']);
        expect(section.parts.slice(1).map(row => classes(row))).toEqual([[], [], []]);
    });

    it('says so when it has not the rows or the columns it says, and when it is said of no composition', () => {
        expect(built<$Section>(folio(<Table rows={2} />)).specify()).toContain('Section: a table has the rows it says, and this one has another number');
        expect(built<$Section>(folio(<Table columns={1} />)).specify()).toContain('Section: a table has the columns it says, and one of its rows has more');
        expect(built<$Section>(folio(<Table rows={3} columns={2} />)).specify()).toEqual([]);
    });

    it('taken out, the next define takes the section\'s classes back; the marks the bind gave its rows and cells stay', () => {
        const section = bound(folio());
        section.annotations.remove(section, section.annotations.find($Table)[0]);
        section.annotations.define();
        expect(classes(section)).toEqual([]);
        expect(classes(section.parts[1])).toEqual(['pa-row', 'pa-row-start-1']);
    });

    it('drawn, the section wears pa-table and its six cells stand inside it in their rows', async () => {
        const page = await drawn(bound(folio()));
        expect(page.querySelector('.pa-table.pa-cols-2')).not.toBeNull();
        expect(page.querySelectorAll('.pa-table .pa-row').length).toBe(3);
        expect(page.querySelectorAll('.pa-table .pa-row .pa-col').length).toBe(6);
    });
});
