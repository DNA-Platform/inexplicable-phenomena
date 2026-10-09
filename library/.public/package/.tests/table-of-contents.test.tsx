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
        <Title>[Table of Contents](/a-paper/table-of-contents/)</Title>
        <Section>
            <Heading>Contents</Heading>
            <Paragraph>
                <Content>[The Argument](/a-paper/the-argument/)</Content>
            </Paragraph>
            <Paragraph>
                <Word>
                    <Content>[The Evidence](/a-paper/the-evidence/)</Content>
                </Word>
                and a word that is no entry
            </Paragraph>
        </Section>
        <Section>
            <Heading>The Catalogue</Heading>
            <Paragraph>
                <Content>[The Log](/the-log/)</Content>
            </Paragraph>
        </Section>
    </Chapter>
);

describe('a content is a reference an entry of a table stands, which draws its name as its note', () => {
    it('reads its name and its identifier from the pair the compiler wrote, and is a reference', () => {
        const paragraph = built<$Writing>(
            <Paragraph>
                <Content>[The Argument](/a-paper/the-argument/)</Content>
            </Paragraph>
        );
        const content = paragraph.annotations.find($Content)[0];
        expect(content).toBeInstanceOf($Reference);
        expect(content.name).toBe('The Argument');
        expect(content.identifier).toBe('/a-paper/the-argument/');
    });

    it('drawn, makes the writing it annotates the link, its name inside it in a span wearing pa-content', async () => {
        const page = await drawn(built<$Writing>(
            <Paragraph>
                <Content>[The Argument](/a-paper/the-argument/)</Content>
            </Paragraph>
        ));
        const link = page.querySelector('a[href="/a-paper/the-argument/"]');
        expect(link).not.toBeNull();
        expect(link?.querySelector('span.pa-content')?.textContent).toBe('The Argument');
    });
});

// Doug, 2026-09-26: "can't table of contents just enumerate the chapters, including its own, in its gettable
// property, and just get all of the references? That's much simpler."
const Elsewhere = (): React.ReactNode => (
    <Chapter>
        <Title>[Elsewhere](/a-paper/elsewhere/)</Title>
        <Paragraph>
            <Content>[The Library](/the-library/)</Content>
        </Paragraph>
        <Chapter>
            <Title>[Within](/a-paper/within/)</Title>
            <Paragraph>a chapter in a chapter</Paragraph>
        </Chapter>
    </Chapter>
);

const paper = (): $Book => built<$Book>(
    <Book>
        <Chapter>
            <Cover />
            <Title>[A Paper](/a-paper/)</Title>
        </Chapter>
        <Chapter>
            <Synopsis />
            <Title>[Synopsis](/a-paper/)</Title>
        </Chapter>
        {table()}
        {Elsewhere()}
    </Book>
);

describe('a table of contents has contents: what its book\'s chapters mention, its own among them, in book order', () => {
    it('answers every chapter\'s mention, depth-first, a chapter in a chapter after its host, and is reached from the book as its table', () => {
        const book = paper();
        const contents = book.table?.annotations.expressed($TableOfContents)?.contents ?? [];
        expect(contents.map(reference => reference.identifier))
            .toEqual(['/a-paper/', '/a-paper/', '/a-paper/table-of-contents/', '/a-paper/elsewhere/', '/a-paper/within/']);
        expect(contents[2]).toBe(book.table?.mention);
    });

    it('answers nothing for a table in a chapter built alone, which has no book', () => {
        expect(built<$Chapter>(table()).annotations.expressed($TableOfContents)?.contents).toEqual([]);
    });

    // R7 — the written entries still work: every one within the book's own address is among the contents.
    // A catalogue's rows name other books too, which no chapter of this one mentions.
    it('every written entry within the book\'s address is among them', () => {
        const chapter = (name: string, fragment: string): React.ReactNode => (
            <Chapter>
                <Title>[{name}](/a-paper/{fragment}/)</Title>
                <Paragraph>{name}</Paragraph>
            </Chapter>
        );
        const book = built<$Book>(
            <Book>
                <Chapter>
                    <Cover />
                    <Title>[A Paper](/a-paper/)</Title>
                </Chapter>
                {table()}
                {chapter('The Argument', 'the-argument')}
                {chapter('The Evidence', 'the-evidence')}
            </Book>
        );
        const written = (writing: $Writing): $Content[] =>
            [...writing.annotations.find($Content), ...[...writing.text].flatMap(chemical => chemical instanceof $Writing ? written(chemical) : [])];
        const entries = written(book.table!).map(content => content.identifier);
        const contents = book.table?.annotations.expressed($TableOfContents)?.contents.map(reference => reference.identifier) ?? [];
        expect(entries).toEqual(['/a-paper/the-argument/', '/a-paper/the-evidence/', '/the-log/']);
        for (const entry of entries.filter(identifier => identifier.startsWith('/a-paper/')))
            expect(contents).toContain(entry);
    });

    it('is read when asked, so a chapter added to the book is among them at once', () => {
        const book = paper();
        book.text.add(book,
            <Chapter>
                <Title>[Afterword](/a-paper/afterword/)</Title>
                <Paragraph>added</Paragraph>
            </Chapter>
        );
        const contents = book.table?.annotations.expressed($TableOfContents)?.contents ?? [];
        expect(contents.map(reference => reference.identifier)).toContain('/a-paper/afterword/');
    });
});
