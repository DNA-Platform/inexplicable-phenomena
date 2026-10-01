import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { $, selection } from '@dna-platform/chemistry';
import { $Writing, $Section, Section, Heading, $Paragraph, Paragraph, Sentence, Word, $Table, Table, Block } from '@dna-platform/public';
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
        expect(classes(section)).toEqual(['pa-table']);
        // THE SECTION KEEPS ITS OWN ELEMENT since Sprint 95's U4 — Doug: "Table should not be replacing the
        // writing's element" — so its Block stands; and since Sprint 97 the Table is a Format lending a layer of
        // its own around it, the styled component that carries the grid — Doug: "These are what styled
        // components look like just with a format wrapper."
        expect(section.is(Block)).toBe(true);
        expect([...section.containers]).toHaveLength(2);
        expect([...section.containers][0]).toBe('div');
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
        expect(classes(section)).toEqual(['pa-table']);
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

    // THE GRID IS THE THEME'S RULE BY THE MARK since Sprint 95's U4, and no rule is made per table — Doug: "Table
    // should not be replacing the writing's element… Why wasn't Table able to operate as an annotation with classes
    // as designed?" The section's own element wears pa-table and is the grid; its columns are implicit, each cell
    // placed by its start class on an automatic grid; the sheet places twelve columns and spans, a wider table
    // being a library's to extend.
    it('drawn in its book, the section\'s own element wears pa-table inside the Table\'s own layer and is the grid by the Table\'s own component, its six cells inside it in their rows, and no rule is made for this table', async () => {
        const page = await drawn(built<$Book>(
            <Book>
                <Chapter><Cover /><Title>[The Folio](/the-folio/)</Title></Chapter>
                <Chapter><Title>[A Catalogue](/the-folio/a-catalogue/)</Title>{folio()}</Chapter>
            </Book>
        ));
        const table = page.querySelector('.pa-table')!;
        expect(table).not.toBeNull();
        expect(table.tagName).toBe('DIV');
        expect(table.classList.contains('pd-section')).toBe(true);
        expect(table.parentElement?.classList.contains('pd-container')).toBe(true);
        const sheet = document.head.innerHTML;
        expect(sheet).toMatch(/\.pa-table\s*\{\s*display:\s*grid;\s*grid-auto-columns:\s*minmax\(0,\s*1fr\)/u);
        expect(sheet).not.toMatch(/grid-template-columns:\s*repeat\(/u);
        expect(sheet).toMatch(/column-gap:\s*var\(--pd-space/u);
        expect(sheet).toMatch(/\.pa-col\s*\{\s*padding-block:\s*calc\(var\(--pd-space/u);
        expect(sheet).toMatch(/\.pa-col-start-12\s*\{\s*grid-column-start:\s*12/u);
        expect(sheet).toMatch(/\.pa-col-span-12\s*\{\s*grid-column-end:\s*span 12/u);
        expect(sheet).not.toMatch(/\.pa-col-start-13\b/u);
        expect(table.getAttribute('columns')).toBeNull();
        expect(page.querySelectorAll('.pa-table .pa-row').length).toBe(3);
        expect(page.querySelectorAll('.pa-table .pa-row .pa-col').length).toBe(6);
    });

    // A LINKED CELL IS A CELL: the anchor a Content or a Means draws around it is no box in the grid, so the cell
    // is placed by its own marks; and a heading in a table, or the link around a mention heading, spans the width.
    it('places a linked cell by its own marks, its anchor no box in the grid, and a heading across the width', async () => {
        await drawn(built<$Book>(
            <Book>
                <Chapter><Cover /><Title>[The Folio](/the-folio/)</Title></Chapter>
                <Chapter><Title>[A Catalogue](/the-folio/a-catalogue/)</Title>{folio()}</Chapter>
            </Book>
        ));
        const sheet = document.head.innerHTML;
        expect(sheet).toMatch(/\.pa-row\s*>\s*\.pa-reference[^{]*\{\s*display:\s*contents/u);
        expect(sheet).toMatch(/\.pa-table\s*>\s*\.pd-heading[^{]*\{\s*grid-column:\s*1\s*\/\s*-1/u);
        expect(sheet).toMatch(/\.pa-table\s*>\s*\.pa-self-reference[^{]*\{\s*grid-column:\s*1\s*\/\s*-1/u);
    });

    // BY-NAME REPLACEMENT — Sprint 97, Doug: "It shouldn't be hard to subclass an annotation, export it with the same
    // name and just draw from the one exported in the library, so it's still Table." A library's Table is a subclass
    // with its own style, used in place; it draws as itself, the base's rules nowhere, and no registry is asked.
    it('a subclass of Table with its own style, used in place of it, draws its own grid and the base\'s nowhere', async () => {
        class $Ledger extends $Table {
            override style = selection.div`
                .pa-table { display: grid; grid-template-columns: 1fr 1fr; column-gap: ${({ theme }) => theme.space}; }
                .pa-row { display: contents; }
            `;
        }
        const Ledger = $($Ledger);
        // SERVED WITH A SHEET OF ITS OWN, since the document's head holds every promise's rules before it.
        const Drawn = $(built<$Book>(
            <Book>
                <Chapter><Cover /><Title>[The Folio](/the-folio/)</Title></Chapter>
                <Chapter><Title>[A Catalogue](/the-folio/a-catalogue/)</Title>{folio(<Ledger />)}</Chapter>
            </Book>
        ));
        const collected = new ServerStyleSheet();
        const html = renderToString(collected.collectStyles(<Drawn />));
        expect(html).toMatch(/class="[^"]*\bpd-section\b[^"]*\bpa-table\b/u);
        expect(html.match(/\bpa-col\b(?!-)/gu)).toHaveLength(6);
        const sheet = collected.getStyleTags();
        expect(sheet).toMatch(/\.pa-table\s*\{\s*display:\s*grid;\s*grid-template-columns:\s*1fr 1fr/u);
        expect(sheet).not.toMatch(/grid-auto-columns:\s*minmax\(0,\s*1fr\)/u);
        expect(sheet).not.toMatch(/\.pa-col-start-12\b/u);
    });
});
