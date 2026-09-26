import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { $, styled } from '@dna-platform/chemistry';
import { $Writing, $Section, Section, Heading, Paragraph, $Reference } from '@dna-platform/public';
import { $Chapter, Chapter, Title, $Cover, Cover, Synopsis, TableOfContents, $Author, Author, $Subject, Subject, $About, About } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
const drawn = async (writing: $Writing): Promise<HTMLElement> => {
    const Drawn = $(writing);
    let container: HTMLElement | undefined;
    await act(async () => { container = render(<Drawn />).container; });
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
    return container!;
};

const paper = (): React.ReactNode => (
    <Chapter>
        <Cover />
        <Title>[A Paper](/a-paper/)</Title>
        <Author>[A Persona](/a-persona/)</Author>
        <Subject>[The Library](/the-library/)</Subject>
        <About>[A Paper](/a-paper/)</About>
    </Chapter>
);

describe('a cover is a format said of a chapter, drawing it inside a header', () => {
    it('draws its chapter inside a header, and takes the layer back when it goes', async () => {
        const chapter = built<$Chapter>(paper());
        expect(chapter.specify()).toEqual([]);
        const page = await drawn(chapter);
        expect(page.firstElementChild?.tagName).toBe('HEADER');
        chapter.annotations.remove(chapter, chapter.annotations.find($Cover)[0]);
        chapter.annotations.define();
        expect([...chapter.containers]).toEqual(['span']);
    });

    it('a table of contents draws its chapter inside a nav, and a synopsis adds no layer', async () => {
        const table = await drawn(built<$Chapter>(<Chapter><TableOfContents /><Title>[Table of Contents](/a-paper/#table-of-contents)</Title></Chapter>));
        expect(table.firstElementChild?.tagName).toBe('NAV');
        const synopsis = built<$Chapter>(<Chapter><Synopsis /><Title>[Synopsis](/a-paper/#synopsis)</Title></Chapter>);
        expect([...synopsis.containers]).toEqual(['span']);
        expect(synopsis.specify()).toEqual([]);
    });

    // Doug, 2026-09-26: "Have cover and table wear pa-cover and pa-synopsis from their annotations", and
    // of the table, "It can also put a pa-table-of-contents on the writing."
    it('each marks its chapter with its own class and none of the others\'', () => {
        const classes = (chapter: $Chapter): string[] => [...new Set(chapter.classes)].filter(name => name.startsWith('pa-'));
        expect(classes(built<$Chapter>(paper()))).toEqual(['pa-cover']);
        expect(classes(built<$Chapter>(<Chapter><Synopsis /><Title>[Synopsis](/a-paper/#synopsis)</Title></Chapter>))).toEqual(['pa-synopsis']);
        expect(classes(built<$Chapter>(<Chapter><TableOfContents /><Title>[Table of Contents](/a-paper/#table-of-contents)</Title></Chapter>))).toEqual(['pa-table-of-contents']);
        expect(classes(built<$Chapter>(<Chapter><Title>[The Argument](/a-paper/#the-argument)</Title></Chapter>))).toEqual([]);
    });

    it('draws the class on the chapter\'s own element, inside its layer, and takes both back when it goes', async () => {
        const chapter = built<$Chapter>(paper());
        const page = await drawn(chapter);
        expect(page.querySelector('header > .pa-cover')).not.toBeNull();
        chapter.annotations.remove(chapter, chapter.annotations.find($Cover)[0]);
        chapter.annotations.define();
        expect([...chapter.classes]).not.toContain('pa-cover');
        expect([...chapter.containers]).toEqual(['span']);
    });

    it('each is said of a chapter, and on a section says so', () => {
        const section = built<$Section>(<Section><Heading>h</Heading><Cover /><Synopsis /><TableOfContents /></Section>);
        const failures = section.specify();
        expect(failures).toContain('Section: a cover is said of a chapter, and this is not one');
        expect(failures).toContain('Section: a synopsis is said of a chapter, and this is not one');
        expect(failures).toContain('Section: a table of contents is said of a chapter, and this is not one');
    });

    it('carries its author and its subject, and says which is missing', () => {
        const bare = built<$Chapter>(<Chapter><Cover /><Title>[A Paper](/a-paper/)</Title></Chapter>);
        expect(bare.specify()).toContain('Chapter: a cover carries its author, and this one carries none');
        expect(bare.specify()).toContain('Chapter: a cover carries its subject, and this one carries none');
    });

    it('a library\'s own cover draws its own element and is still a cover', async () => {
        class $Masthead extends $Cover {
            style = styled.header`
                border-bottom: 1px solid silver;
            `;
        }
        const Masthead = $($Masthead);
        const chapter = built<$Chapter>(
            <Chapter>
                <Masthead />
                <Title>[A Paper](/a-paper/)</Title>
                <Author>[A Persona](/a-persona/)</Author>
                <Subject>[The Library](/the-library/)</Subject>
            </Chapter>
        );
        expect(chapter.is($Cover)).toBe(true);
        expect(chapter.specify()).toEqual([]);
        const page = await drawn(chapter);
        expect(page.firstElementChild?.tagName).toBe('HEADER');
        expect([...chapter.classes]).toContain('pa-cover');
    });
});

describe('author, subject and about are annotations of a cover, each standing a reference made from its url', () => {
    it('an author answers its words, and a reference to its url standing among its own annotations', () => {
        const author = built<$Chapter>(paper()).annotations.expressed($Author)!;
        expect(author.name).toBe('A Persona');
        expect(author.reference).toBeInstanceOf($Reference);
        expect(author.reference?.identifier).toBe('/a-persona/');
        expect(author.annotations.find($Reference).length).toBe(1);
    });

    it('a subject and an about answer the same way', () => {
        const chapter = built<$Chapter>(paper());
        expect(chapter.annotations.expressed($Subject)?.name).toBe('The Library');
        expect(chapter.annotations.expressed($Subject)?.reference?.identifier).toBe('/the-library/');
        expect(chapter.annotations.expressed($About)?.reference?.identifier).toBe('/a-paper/');
    });

    it('each is said of a cover, and on the synopsis says so', () => {
        const synopsis = built<$Chapter>(
            <Chapter>
                <Synopsis />
                <Title>[Synopsis](/a-paper/#synopsis)</Title>
                <Author>[A Persona](/a-persona/)</Author>
                <Subject>[The Library](/the-library/)</Subject>
                <About>[A Paper](/a-paper/)</About>
            </Chapter>
        );
        const failures = synopsis.specify();
        expect(failures).toContain('Chapter: an author is said of a cover, and this is not one');
        expect(failures).toContain('Chapter: a subject is said of a cover, and this is not one');
        expect(failures).toContain('Chapter: about is said of a cover, and this is not one');
    });

    it('about names its own book: its url is its title\'s', () => {
        const elsewhere = built<$Chapter>(
            <Chapter>
                <Cover />
                <Title>[A Paper](/a-paper/)</Title>
                <Author>[A Persona](/a-persona/)</Author>
                <Subject>[The Library](/the-library/)</Subject>
                <About>[The Library](/the-library/)</About>
            </Chapter>
        );
        expect(elsewhere.specify()).toContain('Chapter: about names its own book, and this one names another');
    });

    it('a library\'s own author, under another name, answers the same', () => {
        class $Byline extends $Author { }
        const Byline = $($Byline);
        const chapter = built<$Chapter>(
            <Chapter>
                <Cover />
                <Title>[A Paper](/a-paper/)</Title>
                <Byline>[A Persona](/a-persona/)</Byline>
                <Subject>[The Library](/the-library/)</Subject>
            </Chapter>
        );
        expect(chapter.annotations.expressed($Author)?.name).toBe('A Persona');
        expect(chapter.specify()).toEqual([]);
    });
});
