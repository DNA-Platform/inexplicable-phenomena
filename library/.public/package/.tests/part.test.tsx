import { describe, it, expect } from 'vitest';
import { $ } from '@dna-platform/chemistry';
import { $Section, Section, Heading, Paragraph } from '@dna-platform/public';
import { $Book, Book, $Chapter, Chapter, Cover, Title, Synopsis, $TableOfContents, TableOfContents, Content, $Part, Part } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;

// THE FIRST FOLIO'S CATALOGUE OF 1623 SET ITS PLAYS IN PARTS — Comedies, Histories, Tragedies — and a play
// stands in one of them. Doug, 2026-10-09: "A chapter shouldn't require a part. But maybe if a book chapter has
// one, all chapters in the book must have one"; "Part should be in .public, in the folder with TableOfContents…
// it needs to interface with table of contents to provide, in some way, an annotation-based object model for the
// structure of the book." So a chapter says its part at its head, with the part's name as its words, and the
// part is the section of the table of contents headed with that name.
type Folio = 'parted' | 'unparted' | 'one in none' | 'misfiled' | 'naming no section';
const folio = (shape: Folio = 'parted'): $Book => {
    const tempest = shape === 'unparted' ? undefined : <Part>Comedies</Part>;
    const hamlet = shape === 'unparted' || shape === 'one in none' ? undefined
        : shape === 'misfiled' ? <Part>Comedies</Part>
            : shape === 'naming no section' ? <Part>Histories</Part>
                : <Part>Tragedies</Part>;
    return built<$Book>(
        <Book>
            <Chapter>
                <Cover />
                <Title>[The Folio](/the-folio/)</Title>
            </Chapter>
            <Chapter>
                <Synopsis />
                <Title>[Synopsis](/the-folio/synopsis/)</Title>
            </Chapter>
            <Chapter>
                <TableOfContents />
                <Title>[Contents](/the-folio/contents/)</Title>
                <Section>
                    <Heading>Comedies</Heading>
                    <Paragraph>
                        <Content>[The Tempest](/the-folio/the-tempest/)</Content>
                    </Paragraph>
                </Section>
                <Section>
                    <Heading>Tragedies</Heading>
                    <Paragraph>
                        <Content>[Hamlet](/the-folio/hamlet/)</Content>
                    </Paragraph>
                </Section>
            </Chapter>
            <Chapter>
                {tempest}
                <Title>[The Tempest](/the-folio/the-tempest/)</Title>
            </Chapter>
            <Chapter>
                {hamlet}
                <Title>[Hamlet](/the-folio/hamlet/)</Title>
            </Chapter>
        </Book>
    );
};
const table = (book: $Book): $TableOfContents => book.table!.annotations.expressed($TableOfContents)!;
const play = (book: $Book, name: string): $Chapter => book.text.find($Chapter).find(chapter => chapter.title?.name === name)!;

describe('a part is a section of the table of contents that a chapter says it is in', () => {
    it('reads its name from its words and its section from the table, and marks its chapter', () => {
        const book = folio();
        const part = play(book, 'The Tempest').annotations.expressed($Part)!;
        expect(part.name).toBe('Comedies');
        expect(part.section?.canonical?.name).toBe('Comedies');
        expect([...play(book, 'The Tempest').classes]).toContain('pa-part');
        expect(play(book, 'The Tempest').specify()).toEqual([]);
    });

    it('is answered by the table of contents: its parts in table order, the part of a chapter, the chapters of a part', () => {
        const book = folio();
        const contents = table(book);
        expect(contents.parts.map(section => section.canonical?.name)).toEqual(['Comedies', 'Tragedies']);
        expect(contents.partOf(play(book, 'Hamlet'))?.canonical?.name).toBe('Tragedies');
        expect(contents.chaptersOf(contents.parts[0]).map(chapter => chapter.title?.name)).toEqual(['The Tempest']);
        expect(book.table!.specify()).toEqual([]);
    });

    it('is not required: a book with no part has none, and its table says nothing of parts', () => {
        const book = folio('unparted');
        expect(table(book).parts).toEqual([]);
        expect(table(book).partOf(play(book, 'Hamlet'))).toBeUndefined();
        expect(book.table!.specify()).toEqual([]);
    });

    it('is refused when it names a section the table has not', () => {
        const book = folio('naming no section');
        expect(play(book, 'Hamlet').specify()).toContain('Chapter: a part names a section of its book\'s table of contents, and "Histories" heads none');
    });

    it('is refused by the table when one chapter has a part and another has none', () => {
        const book = folio('one in none');
        expect(book.table!.specify()).toContain('Chapter: a table of contents whose book has a part lists every chapter in one, and "Hamlet" is in none');
    });

    it('is refused by the table when a chapter is listed under a section that is not its part', () => {
        const book = folio('misfiled');
        expect(book.table!.specify()).toContain('Chapter: a chapter in a part is listed under its part\'s section, and "Hamlet" is not under "Comedies"');
    });
});
