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

    // A CHAPTER SURFACES ITS PART, OR NONE, AND THE TABLE GROUPS — Doug, 2026-10-09: "The chapters already have the
    // parts right? So the table having the chapters makes it relatively easy to check which, if any, part a chapter
    // is in. A chapter itself can surface its part, or return undefined. It should be easy to group chapters by part
    // name." And of any normal set of chapters: "Don't assume there is anything normal… You will always be filtering."
    it('is surfaced by its chapter, and the table groups the book\'s chapters by it: the parts in book order, the first chapter\'s annotation standing for each, and a part answering its chapters — whatever the table is written as', () => {
        const book = folio();
        const contents = table(book);
        expect(play(book, 'Hamlet').part).toBe(play(book, 'Hamlet').annotations.expressed($Part));
        expect(play(book, 'Hamlet').part?.name).toBe('Tragedies');
        expect(contents.parts.map(part => part.name)).toEqual(['Comedies', 'Tragedies']);
        expect(contents.parts[1]).toBe(play(book, 'Hamlet').part);
        expect(contents.parts[0].chapters.map(chapter => chapter.title?.name)).toEqual(['The Tempest']);
        expect(book.table!.specify()).toEqual([]);
    });

    it('two chapters saying one name are one part, and either chapter\'s annotation answers them both', () => {
        const book = built<$Book>(
            <Book>
                <Chapter>
                    <Cover />
                    <Title>[The Folio](/the-folio/)</Title>
                </Chapter>
                <Chapter>
                    <Part>Comedies</Part>
                    <Title>[The Tempest](/the-folio/the-tempest/)</Title>
                </Chapter>
                <Chapter>
                    <Part>Comedies</Part>
                    <Title>[Twelfth Night](/the-folio/twelfth-night/)</Title>
                </Chapter>
            </Book>
        );
        const [tempest, night] = book.text.find($Chapter).slice(1).map(chapter => chapter.annotations.expressed($Part)!);
        expect(night.chapters).toEqual(tempest.chapters);
        expect(night.chapters.map(chapter => chapter.title?.name)).toEqual(['The Tempest', 'Twelfth Night']);
    });

    it('is not required: a book with no part has none, and a chapter in no part answers none', () => {
        const book = folio('unparted');
        expect(table(book).parts).toEqual([]);
        expect(play(book, 'Hamlet').part).toBeUndefined();
        expect(book.table!.specify()).toEqual([]);
    });

    it('is refused without a name', () => {
        const book = folio('nameless');
        expect(play(book, 'Hamlet').specify()).toContain('Chapter: a part has a name, and this one has none');
    });

    // NO NORMAL SET — the package assumes nothing about which chapters are in parts; a chapter in no part beside one
    // in a part is a fact a consumer filters by checking, never a refusal of the package's.
    it('assumes nothing: one chapter in a part beside one in none is a fact, the table answering the one part and the chapter none', () => {
        const book = folio('one in none');
        expect(table(book).parts.map(part => part.name)).toEqual(['Comedies']);
        expect(play(book, 'Hamlet').part).toBeUndefined();
        expect(book.table!.specify()).toEqual([]);
        expect(book.specify().filter(said => said.includes('part'))).toEqual([]);
    });
});
