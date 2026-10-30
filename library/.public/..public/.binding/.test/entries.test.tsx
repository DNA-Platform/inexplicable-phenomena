import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { $ } from '@dna-platform/chemistry';
import { $Book, Book, Chapter, Content, Cover, Heading, Paragraph, Parenthetical, Synopsis, TableOfContents, Title, Word } from '@dna-platform/public';
import { Entries } from './projects/.table.tsx.tsx';

// A TABLE OF CONTENTS DRAWN FROM ITS BOOK, loading nothing but the package and the class: a book built
// in memory in the form the compiler writes, its entries read from what its chapters mention. The table
// writes its links too, as every table does since Sprint 99, in a paragraph that is not shown.
const chapter = (name: string, address: string): React.ReactNode => (
    <Chapter>
        <Title>{`[${name}](${address})`}</Title>
        <Paragraph>{name}</Paragraph>
    </Chapter>
);

const written = (
    <Paragraph>
        <Parenthetical />
        <Word>
            <Content>[Some Projects](/some-projects/)</Content>
        </Word>
        <Word>
            <Content>[Synopsis](/some-projects/#synopsis)</Content>
        </Word>
        <Word>
            <Content>[Table of Contents](/some-projects/#table-of-contents)</Content>
        </Word>
        <Word>
            <Content>[The Work](/some-projects/#the-work)</Content>
        </Word>
    </Paragraph>
);

const projects = (): $Book => $(
    <Book>
        <Chapter>
            <Cover />
            <Title>[Some Projects](/some-projects/)</Title>
        </Chapter>
        <Chapter>
            <Synopsis />
            <Title>[Synopsis](/some-projects/#synopsis)</Title>
        </Chapter>
        <Chapter>
            <TableOfContents />
            <Title>[Table of Contents](/some-projects/#table-of-contents)</Title>
            <Entries>
                <Heading>Contents</Heading>
                {written}
            </Entries>
        </Chapter>
        {chapter('The Work', '/some-projects/#the-work')}
    </Book>
) as unknown as $Book;

const drawn = (book: $Book): string => {
    const Drawn = $(book);
    return renderToString(<Drawn />);
};

describe('the test library\'s drawn table of contents', () => {
    // THE WRITTEN LINKS ARE PARENTHETICAL AND SO NOT DRAWN, since Sprint 97's S2: the paragraph that writes them
    // stands hidden and empty, and the compiler counts them from the notation. What a reader sees is drawn.
    it('lists every chapter its book mentions as a link with its name, the links it writes parenthetical and so not drawn', () => {
        const page = drawn(projects());
        expect(page).toMatch(/<nav[^>]*>[\s\S]*<a href="\/some-projects\/#the-work"[^>]*>[\s\S]*The Work/u);
        expect(page).toMatch(/<span class="pd-paragraph pa-parenthetical" hidden=""><\/span>/u);
        const nav = page.match(/<nav[\s\S]*<\/nav>/u)?.[0] ?? '';
        expect(nav).not.toContain('href="/some-projects/#synopsis"');
        expect(nav).not.toContain('href="/some-projects/"');
    });

    it('lists a chapter added to the book at the next draw, with nothing in the table changed', () => {
        const book = projects();
        expect(drawn(book)).not.toContain('/some-projects/#more-work');
        book.text.add(book, chapter('More Work', '/some-projects/#more-work'));
        expect(drawn(book)).toMatch(/<a href="\/some-projects\/#more-work"[^>]*>[\s\S]*More Work/u);
    });
});
