import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { $ } from '@dna-platform/chemistry';
import { $Book, Book, Chapter, Cover, TableOfContents, Title } from '@dna-platform/public';
import { $RunningHead, RunningHead } from './the-library/1-the-shelves.tsx.tsx';

// THE TEST LIBRARY'S RUNNING HEAD, loading nothing but the package and the class — R4 of Sprint 83.
// Doug: "Most things should be tested loading the least amount." A book is built in memory in the
// form the compiler writes, and the same chapter stands in two books under two names.
const TheArgument = () => (
    <Chapter>
        <Title>[The Argument](/a-paper/the-argument/)</Title>
        <RunningHead />
    </Chapter>
);

const drawn = (title: string, address: string): string => {
    const book = $(
        <Book>
            <Chapter><Cover /><Title>{`[${title}](${address})`}</Title></Chapter>
            <Chapter><TableOfContents /><Title>{`[Table of Contents](${address}table-of-contents/)`}</Title></Chapter>
            {TheArgument()}
        </Book>
    ) as unknown as $Book;
    const Drawn = $(book);
    return renderToString(<Drawn />);
};

describe('the test library\'s running head', () => {
    it('standing in a book, draws the book\'s title and a link to the book\'s table', () => {
        expect(drawn('A Paper', '/a-paper/')).toMatch(
            /<span class="pd-word">A Paper(?:<span class="pd-annotation">[^<]*<\/span>)*<\/span>: <a href="\/a-paper\/table-of-contents\/"[^>]*><span[^>]*>Table of Contents/u);
    });

    it('the same chapter in a renamed book follows the new name, with nothing in the chapter changed', () => {
        const renamed = drawn('A Short Paper', '/a-short-paper/');
        expect(renamed).toMatch(
            /<span class="pd-word">A Short Paper(?:<span class="pd-annotation">[^<]*<\/span>)*<\/span>: <a href="\/a-short-paper\/table-of-contents\/"/u);
        expect(renamed).not.toMatch(/<span class="pd-word">A Paper</u);
    });

    it('standing in no book, answers none and draws no line', () => {
        const head = $(<RunningHead />) as unknown as $RunningHead;
        expect(head.$book).toBeUndefined();
        const Drawn = $(head);
        expect(renderToString(<Drawn />)).not.toMatch(/:|href/u);
    });
});
