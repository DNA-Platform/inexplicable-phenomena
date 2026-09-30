import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { $ } from '@dna-platform/chemistry';
import { $Writing, $Heading, Heading, $Section, Section, $Paragraph, Paragraph, Permissive, Closed, $Theme } from '@dna-platform/public';
import { $Book, Book, Cover, Synopsis, TableOfContents, $Chapter, Chapter, $Title, Title, ChapterSpecification, TitleSpecification, $SelfReference } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
const drawn = async (writing: $Writing): Promise<HTMLElement> => {
    const Drawn = $(writing);
    let container: HTMLElement | undefined;
    await act(async () => { container = render(<Drawn />).container; });
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
    return container!;
};

describe('a chapter is a composition at 6, permissive and closed, whose canonical is its title', () => {
    it('stands its level and pair, and its canonical is its title wherever it stands', () => {
        const chapter = built<$Chapter>(
            <Chapter>
                <Paragraph>first</Paragraph>
                <Title>[The Argument](/a-paper/the-argument/)</Title>
            </Chapter>
        );
        expect(chapter.level).toBe(6);
        expect(chapter.is(Permissive)).toBe(true);
        expect(chapter.is(Closed)).toBe(true);
        expect(chapter.canonical).toBeInstanceOf($Title);
        expect(chapter.canonical).toBe(chapter.parts[1]);
        expect(chapter.specification).toBeInstanceOf(ChapterSpecification);
        expect(chapter.specify()).toEqual([]);
    });

    it('a chapter with no title, or with two, says so when asked', () => {
        const untitled = built<$Chapter>(<Chapter><Paragraph>only</Paragraph></Chapter>);
        expect(untitled.canonical).toBeUndefined();
        expect(untitled.specify()).toContain('Chapter: a chapter has one title as its canonical, and this one does not');
        const twice = built<$Chapter>(<Chapter><Title>[A](/a/a/)</Title><Title>[B](/a/b/)</Title></Chapter>);
        expect(twice.specify()).toContain('Chapter: a chapter has one title as its canonical, and this one does not');
    });

    it('holds only writing', () => {
        const chapter = built<$Chapter>(<Chapter><Title>[A](/a/a/)</Title>words outside any writing</Chapter>);
        expect(chapter.specify()).toContain('Chapter: a closed composition holds only writing, and this one holds something else');
    });
});

// Doug, 2026-09-27: "I like previous of the cover is the cover and next of the last chapter is the last chapter -
// I prefer self-reference to undefined."
describe('a chapter knows the chapter after it and before it among its book\'s, and is its own neighbour at either end', () => {
    const shelf = (): $Book => built<$Book>(
        <Book>
            <Chapter><Cover /><Title>[A Paper](/a-paper/)</Title></Chapter>
            <Chapter><Synopsis /><Title>[Synopsis](/a-paper/)</Title><Paragraph>What it argues.</Paragraph></Chapter>
            <Chapter><TableOfContents /><Title>[Where Things Are](/a-paper/where-things-are/)</Title></Chapter>
            <Chapter><Title>[A](/a-paper/a/)</Title></Chapter>
            <Chapter><Title>[B](/a-paper/b/)</Title></Chapter>
        </Book>
    );

    it('answers the chapter after and the chapter before, in the book\'s order', () => {
        const [cover, synopsis, table, a, b] = shelf().text.find($Chapter);
        expect(a.next).toBe(b);
        expect(a.previous).toBe(table);
        expect(synopsis.previous).toBe(cover);
        expect(synopsis.next).toBe(table);
    });

    it('is its own next at the end of the book, and its own previous at the start', () => {
        const [cover, , , , b] = shelf().text.find($Chapter);
        expect(b.next).toBe(b);
        expect(cover.previous).toBe(cover);
    });

    it('built alone, or within a chapter rather than among the book\'s own, is its own neighbour both ways', () => {
        const alone = built<$Chapter>(<Chapter><Title>[A](/a/a/)</Title></Chapter>);
        expect(alone.next).toBe(alone);
        expect(alone.previous).toBe(alone);
        const book = built<$Book>(
            <Book>
                <Chapter><Cover /><Title>[The Library](/the-library/)</Title></Chapter>
                <Chapter>
                    <Title>[Of the Log](/the-library/of-the-log/)</Title>
                    <Chapter><Title>[Entries](/the-log/entries/)</Title></Chapter>
                </Chapter>
            </Book>
        );
        const [cover, host] = book.text.find($Chapter);
        const [nested] = host.text.find($Chapter);
        expect(host.previous).toBe(cover);
        expect(nested.next).toBe(nested);
        expect(nested.previous).toBe(nested);
    });
});

describe('a title is a sentence that names its chapter, holding the link the compiler gives it', () => {
    it('is a sentence at 3 whose chapter is its parent, and is not a heading', () => {
        const chapter = built<$Chapter>(<Chapter><Title>[The Argument](/a-paper/the-argument/)</Title></Chapter>);
        const title = chapter.canonical!;
        expect(title.level).toBe(3);
        expect(title.chapter).toBe(chapter);
        expect(title).not.toBeInstanceOf($Heading);
        expect(title.specification).toBeInstanceOf(TitleSpecification);
    });

    it('reads its words, means its url, and wears the url\'s fragment as its id', () => {
        const title = built<$Chapter>(<Chapter><Title>[The Argument](/a-paper/the-argument/)</Title></Chapter>).canonical!;
        expect(title.name).toBe('The Argument');
        expect(title.means?.identifier).toBe('/a-paper/the-argument/');
        expect(String(title.id)).toBe('the-argument');
    });

    // Doug, 2026-09-26: "title.means = Reference to chapter; chapter.mention is a get property that returns title.means".
    it('is its chapter\'s title, and what it means is what its chapter mentions', () => {
        const chapter = built<$Chapter>(<Chapter><Title>[The Argument](/a-paper/the-argument/)</Title></Chapter>);
        expect(chapter.title).toBe(chapter.canonical);
        expect(chapter.mention).toBe(chapter.title?.means);
        expect(chapter.mention?.identifier).toBe('/a-paper/the-argument/');
        const untitled = built<$Chapter>(<Chapter><Paragraph>no title</Paragraph></Chapter>);
        expect(untitled.title).toBeUndefined();
        expect(untitled.mention).toBeUndefined();
    });

    it('drawn, is its words as a link to itself, its own element wearing the id', async () => {
        const page = await drawn(built<$Chapter>(<Chapter><Title>[The Argument](/a-paper/the-argument/)</Title></Chapter>));
        const own = page.querySelector('#the-argument')!;
        expect(own).not.toBeNull();
        expect(own.textContent).toContain('The Argument');
        expect(own.closest('a')?.getAttribute('href')).toBe('/a-paper/the-argument/');
        expect(page.textContent).not.toContain('](');
    });

    // A TITLE IS A SELF-REFERENCE, as a heading is, since it links to its own chapter — Sprint 95, U16, on Doug's yes:
    // "a title is a self-reference." So it stands a Self, and the invariant every self-reference has, no underline
    // and the ink, is the title's too, and the Theme carries no rule just for titles.
    it('is a self-reference, standing a Self, so its element and its anchor wear both classes and the Theme needs no rule for it', async () => {
        const title = built<$Chapter>(<Chapter><Title>[The Argument](/a-paper/the-argument/)</Title></Chapter>).title!;
        expect(title.means).toBeInstanceOf($SelfReference);
        expect([...title.classes]).toContain('pa-self-reference');
        const page = await drawn(title);
        expect(page.querySelector('a.pa-self-reference > #the-argument')).not.toBeNull();
    });

    // Doug, 2026-09-26: "Title should use the name to create the fragment with the Identifier utility. The url
    // should be completely arbitrary."
    it('makes its id from its name and never from its url, so a cover\'s title wears its book\'s slug', () => {
        const arbitrary = built<$Chapter>(<Chapter><Title>[The Argument](anything)</Title></Chapter>).canonical!;
        expect(arbitrary.means?.identifier).toBe('anything');
        expect(String(arbitrary.id)).toBe('the-argument');
        const cover = built<$Chapter>(<Chapter><Title>[The Library](/the-library/)</Title></Chapter>).canonical!;
        expect(cover.means?.identifier).toBe('/the-library/');
        expect(String(cover.id)).toBe('the-library');
    });

    // Doug, 2026-09-26: "We should NEVER be reading urls… the title can use its own kebab'd identifier as its id,
    // and all titles can do that, and the compiler has to validate the uniqueness of titles in a book."
    it('keeps its id wherever it is bound, since it reads nothing off its url', () => {
        const book = built<$Book>(
            <Book>
                <Chapter><Cover /><Title>[The Library](/the-library/)</Title></Chapter>
                <Chapter>
                    <Title>[Of the Log](/the-library/of-the-log/)</Title>
                    <Chapter><Title>[Entries](/the-log/entries/)</Title></Chapter>
                </Chapter>
            </Book>
        );
        const [, host] = book.text.find($Chapter);
        expect(String(host.text.find($Chapter)[0].title!.id)).toBe('entries');
        expect(String(host.title!.id)).toBe('of-the-log');
    });

    it('outside a chapter, or written as plain words, says so when asked', () => {
        const alone = built<$Title>(<Title>[A](/a/a/)</Title>);
        expect(alone.chapter).toBeUndefined();
        expect(alone.specify()).toContain('Title: a title stands in a chapter, and this one does not');
        const plain = built<$Chapter>(<Chapter><Title>The Argument</Title></Chapter>);
        expect(plain.specify()).toContain('Chapter / Title 0: a title holds the link the compiler gives it, and this one holds none');
    });
});

// Doug, 2026-09-30: "we can add a chapter get prop to writing… Every writing is a part of a chapter too", and then
// the shape: "Why not have $chapter, chapter and book, and if $chapter is there, chapter returns it, otherwise it
// looks it up, and then book is always the book of the chapter." So $chapter is the one thing ever given; chapter
// answers it, else the parent's, a Chapter answering itself; book is the chapter's, and with no chapter the parent's,
// a Book answering itself. Nothing is told a book, so the two never disagree.
describe('every writing answers the chapter it stands in, given or looked up, and its book is that chapter\'s', () => {
    const shelved = (): $Book => built<$Book>(
        <Book>
            <Chapter>
                <Title>[The Argument](/a-paper/the-argument/)</Title>
                <Section>
                    <Heading>What is claimed</Heading>
                    <Paragraph>A reference names a thing and never a place.</Paragraph>
                </Section>
            </Chapter>
            <Chapter>
                <Title>[The Evidence](/a-paper/the-evidence/)</Title>
            </Chapter>
        </Book>
    );

    it('a paragraph in a section answers the chapter above it, a title its own, and a chapter itself', () => {
        const [argument] = shelved().text.find($Chapter);
        const section = argument.text.find($Section)[0];
        expect(section.chapter).toBe(argument);
        expect(section.text.find($Paragraph)[0].chapter).toBe(argument);
        expect(argument.title!.chapter).toBe(argument);
        expect(argument.chapter).toBe(argument);
    });

    it('a writing given a chapter answers it over the one above, and what stands inside it answers the given one too', () => {
        const book = shelved();
        const [argument, evidence] = book.text.find($Chapter);
        const section = argument.text.find($Section)[0];
        section.$chapter = evidence;
        expect(section.chapter).toBe(evidence);
        expect(section.text.find($Paragraph)[0].chapter).toBe(evidence);
        expect(section.book).toBe(book);
        expect(argument.title!.chapter).toBe(argument);
    });

    it('a chapter\'s book is the book it stands in, and a chapter in a chapter answers its host\'s', () => {
        const book = built<$Book>(
            <Book>
                <Chapter>
                    <Title>[The Log](/libby/the-log/)</Title>
                    <Chapter>
                        <Title>[Entries](/libby/entries/)</Title>
                    </Chapter>
                </Chapter>
            </Book>
        );
        const [host] = book.text.find($Chapter);
        const [guest] = host.text.find($Chapter);
        expect(host.book).toBe(book);
        expect(guest.chapter).toBe(guest);
        expect(guest.book).toBe(book);
        expect(guest.title!.book).toBe(book);
        expect(built<$Chapter>(<Chapter><Title>[A](/a/a/)</Title></Chapter>).book).toBeUndefined();
    });

    it('a book and an annotation said of it stand in no chapter and still answer the book, and a writing built alone answers none', () => {
        const book = shelved();
        const theme = book.annotations.expressed($Theme)!;
        expect(book.chapter).toBeUndefined();
        expect(theme.chapter).toBeUndefined();
        expect(theme.book).toBe(book);
        expect(built<$Paragraph>(<Paragraph>alone</Paragraph>).chapter).toBeUndefined();
    });
});
