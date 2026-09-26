import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { $ } from '@dna-platform/chemistry';
import { $Writing, $Heading, Paragraph, Permissive, Closed } from '@dna-platform/public';
import { $Book, Book, Cover, $Chapter, Chapter, $Title, Title, ChapterSpecification, TitleSpecification } from '@dna-platform/public';

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
                <Title>[The Argument](/a-paper/#the-argument)</Title>
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
        const twice = built<$Chapter>(<Chapter><Title>[A](/a/#a)</Title><Title>[B](/a/#b)</Title></Chapter>);
        expect(twice.specify()).toContain('Chapter: a chapter has one title as its canonical, and this one does not');
    });

    it('holds only writing', () => {
        const chapter = built<$Chapter>(<Chapter><Title>[A](/a/#a)</Title>words outside any writing</Chapter>);
        expect(chapter.specify()).toContain('Chapter: a closed composition holds only writing, and this one holds something else');
    });
});

describe('a title is a sentence that names its chapter, holding the link the compiler gives it', () => {
    it('is a sentence at 3 whose chapter is its parent, and is not a heading', () => {
        const chapter = built<$Chapter>(<Chapter><Title>[The Argument](/a-paper/#the-argument)</Title></Chapter>);
        const title = chapter.canonical!;
        expect(title.level).toBe(3);
        expect(title.chapter).toBe(chapter);
        expect(title).not.toBeInstanceOf($Heading);
        expect(title.specification).toBeInstanceOf(TitleSpecification);
    });

    it('reads its words, means its url, and wears the url\'s fragment as its id', () => {
        const title = built<$Chapter>(<Chapter><Title>[The Argument](/a-paper/#the-argument)</Title></Chapter>).canonical!;
        expect(title.name).toBe('The Argument');
        expect(title.means?.identifier).toBe('/a-paper/#the-argument');
        expect(String(title.id)).toBe('the-argument');
    });

    // Doug, 2026-09-26: "title.means = Reference to chapter; chapter.mention is a get property that returns title.means".
    it('is its chapter\'s title, and what it means is what its chapter mentions', () => {
        const chapter = built<$Chapter>(<Chapter><Title>[The Argument](/a-paper/#the-argument)</Title></Chapter>);
        expect(chapter.title).toBe(chapter.canonical);
        expect(chapter.mention).toBe(chapter.title?.means);
        expect(chapter.mention?.identifier).toBe('/a-paper/#the-argument');
        const untitled = built<$Chapter>(<Chapter><Paragraph>no title</Paragraph></Chapter>);
        expect(untitled.title).toBeUndefined();
        expect(untitled.mention).toBeUndefined();
    });

    it('drawn, is its words as a link to itself, its own element wearing the id', async () => {
        const page = await drawn(built<$Chapter>(<Chapter><Title>[The Argument](/a-paper/#the-argument)</Title></Chapter>));
        const own = page.querySelector('#the-argument')!;
        expect(own).not.toBeNull();
        expect(own.textContent).toContain('The Argument');
        expect(own.closest('a')?.getAttribute('href')).toBe('/a-paper/#the-argument');
        expect(page.textContent).not.toContain('](');
    });

    it('a cover\'s title, whose url has no fragment, wears no id', () => {
        const title = built<$Chapter>(<Chapter><Title>[The Library](/the-library/)</Title></Chapter>).canonical!;
        expect(title.means?.identifier).toBe('/the-library/');
        expect(String(title.id)).toBe('');
    });

    // A synopsis chapter drawn inside a catalogue's chapter links home and must not wear its id there: a title
    // whose book is not the one it is bound in takes its Referent back in $Bound.
    it('bound in another book, takes its id back and keeps its link; bound at home, keeps both', () => {
        const book = built<$Book>(
            <Book>
                <Chapter><Cover /><Title>[The Library](/the-library/)</Title></Chapter>
                <Chapter>
                    <Title>[Of the Log](/the-library/#of-the-log)</Title>
                    <Chapter><Title>[Synopsis](/the-log/#synopsis)</Title></Chapter>
                </Chapter>
            </Book>
        );
        const [, host] = book.text.find($Chapter);
        const abroad = host.text.find($Chapter)[0].title!;
        expect(abroad.means?.identifier).toBe('/the-log/#synopsis');
        expect(String(abroad.id)).toBe('');
        expect(String(host.title!.id)).toBe('of-the-log');
    });

    it('outside a chapter, or written as plain words, says so when asked', () => {
        const alone = built<$Title>(<Title>[A](/a/#a)</Title>);
        expect(alone.chapter).toBeUndefined();
        expect(alone.specify()).toContain('Title: a title stands in a chapter, and this one does not');
        const plain = built<$Chapter>(<Chapter><Title>The Argument</Title></Chapter>);
        expect(plain.specify()).toContain('Chapter / Title 0: a title holds the link the compiler gives it, and this one holds none');
    });
});
