import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { createGlobalStyle } from 'styled-components';
import { $ } from '@dna-platform/chemistry';
import { $Writing, $Annotation, $Section, Section, Heading, Paragraph } from '@dna-platform/public';
import { $Book, Book, Cover, Author, Subject, Synopsis, TableOfContents, $Chapter, Chapter, Title, $Paginated, Paginated, PaginatedSpecification } from '@dna-platform/public';

Element.prototype.scrollIntoView = () => {};

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
const drawn = async (writing: $Writing): Promise<HTMLElement> => {
    const Drawn = $(writing);
    let container: HTMLElement | undefined;
    await act(async () => { container = render(<Drawn />).container; });
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
    return container!;
};
const shelf = (pagination: React.ReactNode = <Paginated />, bookmark?: string): $Book => built<$Book>(
    <Book bookmark={bookmark}>
        {pagination}
        <Chapter><Cover /><Title>[A Paper](/a-paper/)</Title><Author>[A Persona](/a-persona/)</Author><Subject>[The Library](/the-library/)</Subject></Chapter>
        <Chapter><Synopsis /><Title>[Synopsis](/a-paper/)</Title><Paragraph>What it argues.</Paragraph></Chapter>
        <Chapter><TableOfContents /><Title>[Where Things Are](/a-paper/where-things-are/)</Title></Chapter>
        <Chapter><Title>[A](/a-paper/a/)</Title><Paragraph>the words of A</Paragraph></Chapter>
        <Chapter><Title>[B](/a-paper/b/)</Title><Paragraph>the words of B</Paragraph></Chapter>
    </Book>
);
const classes = (book: $Book): string[][] => book.text.find($Chapter).map(chapter => [...chapter.classes]);
const opened = (book: $Book): $Chapter[] => book.text.find($Chapter).filter(chapter => [...chapter.classes].includes('pa-open'));
const paged = (book: $Book): $Chapter[] => book.text.find($Chapter).filter(chapter => [...chapter.classes].includes('pa-page'));

// Doug, 2026-09-27, on Paginated: "I rely on you to make the most performant, elegant implementation of this
// possible as an example of what is possible"; and "Paginated is just one annotation that serves as an example,
// and might also be inherited from perhaps? That makes it less important than simply the ability to customize."
describe('a paginated book shows one chapter at a time, the one its bookmark names, and the cover when it names none', () => {
    it('bound, every chapter is a page, the book is paginated, and the cover is the open page when no bookmark is set', () => {
        const book = shelf();
        expect(book.is($Paginated)).toBe(true);
        expect([...book.classes]).toContain('pa-paginated');
        expect(paged(book)).toHaveLength(5);
        expect(opened(book).map(chapter => chapter.title?.name)).toEqual(['A Paper']);
        expect(book.specify()).toEqual([]);
    });

    it('given a bookmark, that chapter alone is the open page once the book has drawn', async () => {
        const book = shelf(<Paginated />, '/a-paper/a/');
        await drawn(book);
        expect(opened(book)).toEqual([book.bookmark]);
        expect(book.bookmark?.title?.name).toBe('A');
    });

    it('the bookmark moved, the old page loses the mark and the new one gains it, and exactly two chapters\' classes change', () => {
        const book = shelf(<Paginated />, '/a-paper/a/');
        book.annotations.define();
        const before = classes(book);
        book.$bookmark = '/a-paper/b/';
        book.annotations.define();
        const after = classes(book);
        const changed = before.filter((was, index) => was.join(' ') !== after[index].join(' '));
        expect(changed).toHaveLength(2);
        expect(opened(book).map(chapter => chapter.title?.name)).toEqual(['B']);
        expect(paged(book)).toHaveLength(5);
    });

    it('the bookmark set where it stands, no chapter\'s classes change', () => {
        const book = shelf(<Paginated />, '/a-paper/a/');
        book.annotations.define();
        const before = classes(book);
        book.$bookmark = '/a-paper/a/';
        book.annotations.define();
        expect(classes(book)).toEqual(before);
    });

    // What the note's style does with these marks — a page not open under the book's mark not displayed, and an
    // unpaginated book untouched — is seen in Chrome, in the compiler's regression; happy-dom carries no stylesheet.
    it('drawn, the book\'s element wears its mark, every chapter\'s wears the page mark, and the open chapter\'s alone the class the note\'s style keys on', async () => {
        const page = await drawn(shelf(<Paginated />, '/a-paper/a/'));
        expect(page.querySelector('.pa-paginated')).not.toBeNull();
        expect(page.querySelectorAll('.pa-page')).toHaveLength(5);
        const open = page.querySelectorAll('.pa-open');
        expect(open).toHaveLength(1);
        expect(open[0].textContent).toContain('the words of A');
        expect(open[0].classList.contains('pa-page')).toBe(true);
    });

    it('a class under it may say which chapters are its pages and give its own style, and is still paginated', () => {
        class $Tab extends $Annotation { }
        const Tab = $($Tab);
        class $Tabbed extends $Paginated {
            override style = createGlobalStyle`
                .pa-paginated .pa-page:not(.pa-open) {
                    visibility: hidden;
                }
            `;
            override get pages(): $Chapter[] { return super.pages.filter(page => page.is($Tab)); }
        }
        const Tabbed = $($Tabbed);
        const book = built<$Book>(
            <Book bookmark="/a-paper/b/">
                <Tabbed />
                <Chapter><Cover /><Title>[A Paper](/a-paper/)</Title></Chapter>
                <Chapter><Tab /><Title>[A](/a-paper/a/)</Title></Chapter>
                <Chapter><Tab /><Title>[B](/a-paper/b/)</Title></Chapter>
                <Chapter><Title>[Colophon](/a-paper/colophon/)</Title></Chapter>
            </Book>
        );
        book.annotations.define();
        expect(book.is($Paginated)).toBe(true);
        expect(book.annotations.expressed($Paginated)).toBeInstanceOf($Tabbed);
        expect(paged(book).map(chapter => chapter.title?.name)).toEqual(['A', 'B']);
        expect(opened(book).map(chapter => chapter.title?.name)).toEqual(['B']);
    });

    it('said of a section, says so when asked', () => {
        const section = built<$Section>(<Section><Paginated /><Heading>h</Heading></Section>);
        expect(section.annotations.expressed($Paginated)?.specification).toBeInstanceOf(PaginatedSpecification);
        expect(section.specify()).toContain('Section: paginated is said of a book, and this is not one');
    });

    it('taken out of expression, the book\'s mark goes and the pages\' marks stay', () => {
        class $Unpaginated extends $Annotation {
            override defines(writing: $Writing): void {
                for (const annotation of writing.annotations.after(this))
                    if (annotation instanceof $Paginated)
                        writing.annotations.express(annotation, false);
            }
        }
        const Unpaginated = $($Unpaginated);
        const book = shelf(<Paginated />, '/a-paper/a/');
        book.annotations.define();
        book.$is = Unpaginated;
        book.annotations.define();
        expect(book.is($Paginated)).toBe(false);
        expect([...book.classes]).not.toContain('pa-paginated');
        expect(paged(book)).toHaveLength(5);
        expect(opened(book)).toHaveLength(1);
    });
});
