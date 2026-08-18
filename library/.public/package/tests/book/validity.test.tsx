import { describe, it, expect } from 'vitest';
import React, { type ReactElement, type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, Book } from '@/book/Book';
import { Chapter } from '@/book/Chapter';
import { Cover } from '@/book/Cover';
import { Synopsis } from '@/book/Synopsis';
import { TableOfContents } from '@/book/TableOfContents';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Author } from '@/book/Author';
import { Subject } from '@/book/Subject';
import { Canonical } from '@/book/Canonical';
import { $IndexCard, IndexCard } from '@/library/IndexCard';

const card = (): $IndexCard<any> => $(<IndexCard name="/somewhere" />) as $IndexCard<any>;

const section = (heading: string, prose: string, aside = false): ReactNode => (
    <Section parenthetical={aside}><Title>{heading}</Title>{'\n\n' + prose}</Section>
);

const summary = (gist: string): ReactNode => section('Summary', gist, true);

const chapter = (title: string): ReactElement => <Chapter>{section(title, 'Prose.')}{summary('In brief.')}</Chapter>;

const account = (of?: $IndexCard<$Book>): ReactElement => (
    <Synopsis for={of}>{section('Synopsis', 'An account.')}{summary('In brief.')}</Synopsis>
);

const pointing = (name: string, at: () => $Book): $IndexCard<$Book> =>
    $(<IndexCard name={name} of={at} />) as $IndexCard<$Book>;

describe('a book reference is valid when it names somebody or points at them', () => {
    it('holds for an author', () => {
        expect($(<Author>The Team</Author>).valid()).toBe(true);
        expect($(<Author for={card()} />).valid()).toBe(true);
        expect($(<Author />).valid()).toBe(false);
    });

    it('holds for a subject', () => {
        expect($(<Subject>Physics</Subject>).valid()).toBe(true);
        expect($(<Subject for={card()} />).valid()).toBe(true);
        expect($(<Subject />).valid()).toBe(false);
    });

    it('holds for a canonical, which is the one it did not hold for', () => {
        expect($(<Canonical>The Standard Model</Canonical>).valid()).toBe(true);
        expect($(<Canonical for={card()} />).valid()).toBe(true);
        expect($(<Canonical />).valid()).toBe(false);
    });

    it('answers the same way for all three, which is what makes them one rule', () => {
        const matrix = [Author, Subject, Canonical].map(Kind => [
            $(<Kind>A Name</Kind>).valid(),
            $(<Kind for={card()} />).valid(),
            $(<Kind />).valid(),
        ]);
        expect(matrix).toEqual([
            [true, true, false],
            [true, true, false],
            [true, true, false],
        ]);
    });
});

// A LIBRARY IN FOUR BOOKS, wired the way the compiler wires one: the cards are
// thunks, so they point at books that do not exist yet while those books are
// being built — which is the state every book is in when validity is first
// asked of it, at construction.
let team: $Book;
let physics: $Book;
let model: $Book;

const teamCard = pointing('/team', () => team);
const physicsCard = pointing('/physics', () => physics);
const modelCard = pointing('/physics/model', () => model);

const cover = (author?: $IndexCard<$Book>, subject?: $IndexCard<$Book>, canonical?: $IndexCard<$Book>): ReactElement => (
    <Cover>
        <Section>
            <Title>A Book</Title>
            {'\n\nA book about reading. '}
            <Author for={author}>The Team</Author>{' '}
            <Subject for={subject}>Something</Subject>
            {canonical ? <Canonical for={canonical}>A Canonical</Canonical> : null}
        </Section>
    </Cover>
);

// A LIBRARY THREE DEEP, so the climb has somewhere to climb. The root is its own
// subject, which is the whole definition of a library.
let root: $Book;
let shelf: $Book;
let leaf: $Book;

const rootCard = pointing('/', () => root);
const shelfCard = pointing('/shelf', () => shelf);
const leafCard = pointing('/shelf/leaf', () => leaf);

root = $(<Book>{cover(teamCard, rootCard)}<TableOfContents />{account()}{account(shelfCard)}</Book>);
shelf = $(<Book>{cover(teamCard, rootCard)}<TableOfContents />{account()}{account(leafCard)}</Book>);
leaf = $(<Book>{cover(teamCard, shelfCard)}<TableOfContents />{account()}{chapter('A Leaf')}</Book>);

team = $(<Book>{cover(teamCard, physicsCard)}<TableOfContents />{account()}{chapter('Who We Are')}</Book>);
model = $(<Book>{cover(teamCard, physicsCard)}<TableOfContents />{account()}{chapter('Symmetry')}</Book>);
physics = $(<Book>{cover(teamCard, undefined, modelCard)}<TableOfContents />{account()}{account(modelCard)}</Book>);

describe('a link is valid by WHAT IT POINTS AT, and only the build can ask', () => {
    it('the fixture is what it claims to be', () => {
        expect(team.author?.card?.read()).toBe(team);
        expect(physics.read().parts().length).toBe(1);
        expect(model.read().parts().length).toBe(0);
    });

    it('an author must point at a book that authors itself', () => {
        expect(model.valid()).toBe(true);
        const wrong: $Book = $(<Book>{cover(modelCard, physicsCard)}<TableOfContents />{account()}{chapter('Astray')}</Book>);
        expect(wrong.valid()).toBe(false);
    });

    it('a subject must point at a book that catalogues', () => {
        expect(team.valid()).toBe(true);
        const wrong: $Book = $(<Book>{cover(teamCard, modelCard)}<TableOfContents />{account()}{chapter('Astray')}</Book>);
        expect(wrong.valid()).toBe(false);
    });

    it('A SUBJECT IS A CATALOGUE OF BOOKS, and its catalogue answers its canonical', () => {
        expect(physics.read().parts()).toEqual([model]);
        expect(physics.read().canonical).toBe(model);
    });

    it('so the canonical belongs to the SUBJECT, held by definition rather than by a rule', () => {
        expect(physics.read().parts()).toContain(physics.read().canonical);
    });

    it('and a book that catalogues nothing has no canonical to answer', () => {
        expect(model.read().parts()).toEqual([]);
        expect(model.read().canonical).toBeUndefined();
    });

    it('a link carrying no card is not judged, because it names without pointing', () => {
        const named: $Book = $(<Book>{cover()}<TableOfContents />{account()}{chapter('Named')}</Book>);
        expect(named.valid()).toBe(true);
    });

    it('a book is its own library when its subject reads home', () => {
        expect(root.library).toBe(root);
    });

    it('and every other book climbs to it, however far down it sits', () => {
        expect(shelf.library).toBe(root);
        expect(leaf.library).toBe(root);
    });

    it('a book whose subject points nowhere has no library, and says so rather than throwing', () => {
        const loose: $Book = $(<Book>{cover()}<TableOfContents />{account()}{chapter('Loose')}</Book>);
        expect(loose.library).toBeUndefined();
    });

    it('A CARD THAT NEVER POINTED IS NOT JUDGED, and validity answers rather than throwing', () => {
        const nowhere = $(<IndexCard name="/nowhere" />) as $IndexCard<$Book>;
        const loose: $Book = $(<Book>{cover(nowhere, nowhere)}<TableOfContents />{account()}{chapter('Loose')}</Book>);
        expect(() => loose.valid()).not.toThrow();
        expect(loose.valid()).toBe(true);
    });
});
