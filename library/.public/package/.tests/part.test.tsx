import { describe, it, expect } from 'vitest';
import { $ } from '@dna-platform/chemistry';
import { Section, Heading, Paragraph } from '@dna-platform/public';
import { $Book, Book, $Chapter, Chapter, Cover, Title, Synopsis, $TableOfContents, TableOfContents, Content, $Part, Part } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;

// THE FIRST FOLIO OF 1623 SET ITS PLAYS IN PARTS — Comedies, Histories, Tragedies — and a play stands in one of
// them. Doug, 2026-10-09: "It is a grouping of chapters. It has no place"; "A chapter shouldn't require a part. But
// maybe if a book chapter has one, all chapters in the book must have one"; "Part does NOT confer a specific TSX
// form… An object model doesn't control how it's consumed… The table of contents implementer should always have
// the option of implementing by hand." So a chapter says its part at its head with the part's name as its words,
// the table of contents answers the grouping, and how the table is written — sections, lists, by hand — is the
// implementer's and never the part's.
type Folio = 'parted' | 'unparted' | 'one in none' | 'nameless';
const folio = (shape: Folio = 'parted'): $Book => {
    const tempest = shape === 'unparted' ? undefined : <Part>Comedies</Part>;
    const hamlet = shape === 'unparted' || shape === 'one in none' ? undefined
        : shape === 'nameless' ? <Part />
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
                    <Heading>The plays</Heading>
                    <Paragraph>
                        <Content>[The Tempest](/the-folio/the-tempest/)</Content>
                    </Paragraph>
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

describe('a part is a grouping of chapters a chapter says it is in, and it has no place', () => {
    it('reads its name from its words and marks its chapter', () => {
        const book = folio();
        expect(play(book, 'The Tempest').annotations.expressed($Part)!.name).toBe('Comedies');
        expect([...play(book, 'The Tempest').classes]).toContain('pa-part');
        expect(play(book, 'The Tempest').specify()).toEqual([]);
    });

    it('is answered by the table of contents as a grouping: the parts in book order, the part of a chapter, the chapters of a part — whatever the table is written as', () => {
        const book = folio();
        const contents = table(book);
        expect(contents.parts).toEqual(['Comedies', 'Tragedies']);
        expect(contents.partOf(play(book, 'Hamlet'))).toBe('Tragedies');
        expect(contents.chaptersOf('Comedies').map(chapter => chapter.title?.name)).toEqual(['The Tempest']);
        expect(contents.chaptersOf('Histories')).toEqual([]);
        expect(book.table!.specify()).toEqual([]);
    });

    it('is not required: a book with no part has none', () => {
        const book = folio('unparted');
        expect(table(book).parts).toEqual([]);
        expect(table(book).partOf(play(book, 'Hamlet'))).toBeUndefined();
        expect(book.table!.specify()).toEqual([]);
    });

    it('is refused without a name', () => {
        const book = folio('nameless');
        expect(play(book, 'Hamlet').specify()).toContain('Chapter: a part has a name, and this one has none');
    });

    it('is refused by the table when one chapter has a part and another has none', () => {
        const book = folio('one in none');
        expect(book.table!.specify()).toContain('Chapter: a table of contents whose book has a part lists every chapter in one, and "Hamlet" is in none');
    });
});
