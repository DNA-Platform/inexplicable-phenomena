import { describe, it, expect } from 'vitest';
import { $ } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Book, Book } from '@/book/Book';
import { Chapter } from '@/book/Chapter';
import { Cover } from '@/book/Cover';
import { Synopsis } from '@/book/Synopsis';
import { TableOfContents } from '@/book/TableOfContents';
import { Title } from '@/book/Title';
import { Author } from '@/book/Author';
import { Subject } from '@/book/Subject';
import { Reference } from '@/reference/Reference';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;

const cover = () => (
    <Cover>
        <Title>Chemistry<Reference>#Bk:0</Reference></Title>
        <Author>Doug</Author>
        <Subject>Science</Subject>
    </Cover>
);

describe('a book carries its furniture, and each stands in its place', () => {
    const book = () => built<$Book>(
        <Book>
            {cover()}
            <Synopsis>A book about chemistry.</Synopsis>
            <TableOfContents>One.</TableOfContents>
            <Chapter>One.</Chapter>
        </Book>);

    it('and the book answers each of them', () => {
        const held = book();
        held.specify();
        expect(held.cover()).toBeDefined();
        expect(held.synopsis()).toBeDefined();
        expect(held.tableOfContents()).toBeDefined();
        expect(held.index()).toBeDefined();
    });

    it('AND THE BOOK MAKES ITS OWN INDEX, AT ITS BINDING', () => {
        expect(book().index()).toBeDefined();
    });

    it('a book in that order specifies clean', () => {
        expect(() => book().specify()).not.toThrow();
    });

    it('AND A BOOK THAT OPENS WITH SOMETHING ELSE IS REFUSED', () => {
        const held = built<$Book>(
            <Book>
                <Chapter>One.</Chapter>
                {cover()}
            </Book>);
        expect(() => held.specify()).toThrow(/opens with its cover/);
    });

    it('AND A SYNOPSIS THAT DOES NOT STAND SECOND IS REFUSED', () => {
        const held = built<$Book>(
            <Book>
                {cover()}
                <Chapter>One.</Chapter>
                <Synopsis>A book about chemistry.</Synopsis>
            </Book>);
        expect(() => held.specify()).toThrow(/synopsis second/);
    });

    it('AND A TABLE OF CONTENTS THAT DOES NOT STAND THIRD IS REFUSED', () => {
        const held = built<$Book>(
            <Book>
                {cover()}
                <Synopsis>A book about chemistry.</Synopsis>
                <Chapter>One.</Chapter>
                <TableOfContents>One.</TableOfContents>
            </Book>);
        expect(() => held.specify()).toThrow(/table of contents third/);
    });
});

describe('a title is a section that means the book', () => {
    it('and a title with no meaning is refused', () => {
        const held = built<$Writing>(<Title>Chemistry</Title>);
        expect(() => held.specify()).toThrow(/means the book/);
    });

    it('AND ONE THAT MEANS SOMETHING STANDS', () => {
        const held = built<$Writing>(<Title>Chemistry<Reference>#Bk:0</Reference></Title>);
        expect(() => held.specify()).not.toThrow();
    });
});
