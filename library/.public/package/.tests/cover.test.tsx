import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { $, selection } from '@dna-platform/chemistry';
import { $Writing, $Section, Section, Heading, $Paragraph, Paragraph, $Reference } from '@dna-platform/public';
import { $Book, Book, $Chapter, Chapter, Title, $Cover, Cover, $Synopsis, Synopsis, TableOfContents, $Author, Author, $Subject, Subject, $About, About } from '@dna-platform/public';

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

// Doug, 2026-09-26: "synopsis.means - this can be a reference to the book that it is a synopsis of and we agreed that
// synopsis will support the ()[] syntax handed to it from the compiler, or get its book". And, ruling that .public
// never reads a url: "the title should create a reference and expose that… so the synopsis can create one and add it
// to its attributes"; "the synopsis attribute can take another synopsis component and populate everything under the
// title"; "the chapter is kept out of the Synopsis annotation's text, so that even in theory, it is not on the page.
// It is used for parts to inject and express in its parent chapter"; "we want the title of a synopsis chapter to go
// to the book it is a synopsis of" — which the compiler writes into a synopsis chapter's title, as these fixtures do.
describe('a synopsis means the book it is a synopsis of', () => {
    const LogSynopsis = (): React.ReactNode => (
        <Chapter><Synopsis /><Title>[Synopsis](/the-log/)</Title><Paragraph>The one book here that is by what it is about.</Paragraph></Chapter>
    );
    const ofTheLog = (): React.ReactNode => <Chapter><Title>[Of the Log](/the-library/of-the-log/)</Title><Synopsis>{LogSynopsis()}</Synopsis></Chapter>;

    it('means the book written inside it, read of itself as it is built', () => {
        const written = built<$Chapter>(<Chapter><Synopsis>[The Log](/the-log/)</Synopsis><Title>[Of the Log](/the-library/of-the-log/)</Title></Chapter>);
        expect(written.annotations.expressed($Synopsis)?.means?.identifier).toBe('/the-log/');
        expect(written.annotations.expressed($Synopsis)?.name).toBe('The Log');
    });

    it('written empty, means what its chapter\'s title means, which is the book', () => {
        const chapter = built<$Chapter>(LogSynopsis());
        expect(chapter.annotations.expressed($Synopsis)?.means).toBe(chapter.mention);
        expect(chapter.annotations.expressed($Synopsis)?.means?.identifier).toBe('/the-log/');
    });

    it('handed a synopsis chapter, keeps it off the page, gives its own chapter that chapter\'s parts under its own title, and means what that chapter means', () => {
        const chapter = built<$Chapter>(ofTheLog());
        const synopsis = chapter.annotations.expressed($Synopsis)!;
        expect(synopsis.means?.identifier).toBe('/the-log/');
        expect([...synopsis.text]).toEqual([]);
        expect(chapter.parts).toHaveLength(2);
        expect(chapter.parts[1]).toBeInstanceOf($Paragraph);
        expect(chapter.parts[1].parent).toBe(chapter);
        expect(chapter.specify()).toEqual([]);
    });

    it('bound, sends its chapter\'s title to what it means, and the book finds the synopsis of itself by what the book means', () => {
        const book = built<$Book>(
            <Book>
                <Chapter><Cover /><Title>[The Library](/the-library/)</Title><Author>[The Log](/the-log/)</Author><Subject>[The Library](/the-library/)</Subject></Chapter>
                <Chapter><Synopsis /><Title>[Synopsis](/the-library/)</Title></Chapter>
                {ofTheLog()}
            </Book>
        );
        const [, own, host] = book.text.find($Chapter);
        expect(book.synopsis).toBe(own);
        expect(own.title?.means?.identifier).toBe('/the-library/');
        expect(host.title?.means?.identifier).toBe('/the-log/');
        expect(String(host.title?.id)).toBe('of-the-log');
    });

    it('taken out, the next define takes the parts back, and its chapter has its title alone', () => {
        const chapter = built<$Chapter>(ofTheLog());
        chapter.annotations.remove(chapter, chapter.annotations.expressed($Synopsis)!);
        chapter.annotations.define();
        expect(chapter.parts).toHaveLength(1);
    });

    // Doug, 2026-09-27: "A synopsis always has a chapter. Add it to the specification. How about the reference? Validate."
    it('said of a section, or meaning nothing, says so when asked', () => {
        expect(built<$Section>(<Section><Synopsis /><Heading>h</Heading></Section>).specify()).toContain('Section: a synopsis is said of a chapter, and this is not one');
        expect(built<$Chapter>(<Chapter><Synopsis /><Title>plain words</Title></Chapter>).specify()).toContain('Chapter: a synopsis means the book it is a synopsis of, and this one means nothing');
        expect(built<$Chapter>(LogSynopsis()).specify()).toEqual([]);
    });

    it('drawn, is its name as a link to the book it means, and still adds no layer to its chapter', async () => {
        const chapter = built<$Chapter>(<Chapter><Synopsis>[The Log](/the-log/)</Synopsis><Title>[Of the Log](/the-library/of-the-log/)</Title></Chapter>);
        const page = await drawn(chapter);
        expect(page.querySelector('a[href="/the-log/"]')?.textContent).toContain('The Log');
        expect([...chapter.containers]).toEqual(['div']);
    });

    it('drawn with a synopsis chapter, shows that chapter\'s words under its own title and never that chapter\'s title', async () => {
        const page = await drawn(built<$Chapter>(ofTheLog()));
        expect(page.textContent).toContain('The one book here that is by what it is about.');
        expect(page.querySelector('#of-the-log')).not.toBeNull();
        expect(page.querySelector('#synopsis')).toBeNull();
    });
});

describe('a cover is a format said of a chapter, drawing it inside a header', () => {
    it('draws its chapter inside a header, and takes the layer back when it goes', async () => {
        const chapter = built<$Chapter>(paper());
        expect(chapter.specify()).toEqual([]);
        const page = await drawn(chapter);
        expect(page.firstElementChild?.tagName).toBe('HEADER');
        chapter.annotations.remove(chapter, chapter.annotations.find($Cover)[0]);
        chapter.annotations.define();
        expect([...chapter.containers]).toEqual(['div']);
    });

    it('a table of contents draws its chapter inside a nav, and a synopsis adds no layer', async () => {
        const table = await drawn(built<$Chapter>(<Chapter><TableOfContents /><Title>[Table of Contents](/a-paper/table-of-contents/)</Title></Chapter>));
        expect(table.firstElementChild?.tagName).toBe('NAV');
        const synopsis = built<$Chapter>(<Chapter><Synopsis /><Title>[Synopsis](/a-paper/)</Title></Chapter>);
        expect([...synopsis.containers]).toEqual(['div']);
        expect(synopsis.specify()).toEqual([]);
    });

    // Doug, 2026-09-26: "Have cover and table wear pa-cover and pa-synopsis from their annotations", and
    // of the table, "It can also put a pa-table-of-contents on the writing."
    it('each marks its chapter with its own class and none of the others\'', () => {
        const classes = (chapter: $Chapter): string[] => [...new Set(chapter.classes)].filter(name => name.startsWith('pa-'));
        expect(classes(built<$Chapter>(paper()))).toEqual(['pa-cover']);
        expect(classes(built<$Chapter>(<Chapter><Synopsis /><Title>[Synopsis](/a-paper/)</Title></Chapter>))).toEqual(['pa-synopsis']);
        expect(classes(built<$Chapter>(<Chapter><TableOfContents /><Title>[Table of Contents](/a-paper/table-of-contents/)</Title></Chapter>))).toEqual(['pa-table-of-contents']);
        expect(classes(built<$Chapter>(<Chapter><Title>[The Argument](/a-paper/the-argument/)</Title></Chapter>))).toEqual([]);
    });

    it('draws the class on the chapter\'s own element, inside its layer, and takes both back when it goes', async () => {
        const chapter = built<$Chapter>(paper());
        const page = await drawn(chapter);
        expect(page.querySelector('header > .pa-cover')).not.toBeNull();
        chapter.annotations.remove(chapter, chapter.annotations.find($Cover)[0]);
        chapter.annotations.define();
        expect([...chapter.classes]).not.toContain('pa-cover');
        expect([...chapter.containers]).toEqual(['div']);
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
            style = selection.header`
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
        expect(author.means).toBeInstanceOf($Reference);
        expect(author.means?.identifier).toBe('/a-persona/');
        expect(author.annotations.find($Reference).length).toBe(1);
    });

    it('a subject and an about answer the same way', () => {
        const chapter = built<$Chapter>(paper());
        expect(chapter.annotations.expressed($Subject)?.name).toBe('The Library');
        expect(chapter.annotations.expressed($Subject)?.means?.identifier).toBe('/the-library/');
        expect(chapter.annotations.expressed($About)?.means?.identifier).toBe('/a-paper/');
    });

    it('each is said of a cover, and on the synopsis says so', () => {
        const synopsis = built<$Chapter>(
            <Chapter>
                <Synopsis />
                <Title>[Synopsis](/a-paper/)</Title>
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
