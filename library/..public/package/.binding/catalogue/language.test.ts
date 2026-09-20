import { describe, expect, it } from 'vitest';
import { bare, form, forms, key, last, name, notation, separator, spelling, spelt, tidy, whole } from './language';

// WHAT THE LANGUAGE PROMISES A WRITER, and every one of these is a promise rather than a check on a
// mechanism. The difference matters here more than anywhere else in the compiler: a parser that is
// subtly wrong does not fail, it MISREADS — it resolves a name to something that exists and is not
// what the writer meant, and every check downstream agrees with it.
//
// Doug, 2026-09-18: "you need to promise to parse all of these things carefully and elegantly. If
// you write brittle code that you don't test very very very well, it will hurt us."
//
// AND THE FORM TABLE CLAIMS TO BE TOTAL BY INSPECTION, which is a claim a test can settle: every
// combination of stars and brackets is enumerated below, not sampled. Eight are the language and the
// other twenty-four must be refused — because the one outcome that must not happen is silence, and
// an annotation that quietly does nothing looks exactly like one that works.

const stars = ['', '*', '**', '***'];
const depths = [2, 3];

describe('the forms', () => {
    it('has eight, and the table is the language', () => {
        expect(forms).toHaveLength(8);
    });

    it('refuses every spelling that is not one of them', () => {
        const refused: string[] = [];
        const allowed: string[] = [];
        for (const brackets of depths)
            for (const prefix of stars)
                for (const postfix of stars)
                    (form(prefix, brackets, postfix) === undefined ? refused : allowed)
                        .push(`${prefix}${'['.repeat(brackets)} X ${']'.repeat(brackets)}${postfix}`);

        expect(allowed).toHaveLength(8);
        expect(refused).toHaveLength(stars.length * stars.length * depths.length - 8);
    });

    it('never lets stars stand on both sides', () => {
        for (const prefix of stars.filter(one => one !== ''))
            for (const postfix of stars.filter(one => one !== ''))
                for (const brackets of depths)
                    expect(form(prefix, brackets, postfix), `${prefix}[[ X ]]${postfix}`).toBeUndefined();
    });

    it('lets three brackets carry no stars at all', () => {
        expect(form('', 3, '')).toEqual({ is: 'mention' });
        for (const one of stars.filter(held => held !== '')) {
            expect(form(one, 3, ''), `${one}[[[ X ]]]`).toBeUndefined();
            expect(form('', 3, one), `[[[ X ]]]${one}`).toBeUndefined();
        }
    });

    it('reads the prefix as facing out and the postfix as facing in', () => {
        expect(form('*', 2, '')).toEqual({ is: 'edge', relation: 'author', end: 'target' });
        expect(form('', 2, '*')).toEqual({ is: 'edge', relation: 'author', end: 'source' });
        expect(form('**', 2, '')).toEqual({ is: 'edge', relation: 'subject', end: 'target' });
        expect(form('', 2, '**')).toEqual({ is: 'edge', relation: 'subject', end: 'source' });
        expect(form('***', 2, '')).toEqual({ is: 'edge', relation: 'topic', end: 'target' });
        expect(form('', 2, '***')).toEqual({ is: 'edge', relation: 'topic', end: 'source' });
    });

    it('spells the answering half of every edge it can name', () => {
        expect(spelt('author', 'target', 'A Book')).toBe('*[[ A Book ]]');
        expect(spelt('author', 'source', 'A Book')).toBe('[[ A Book ]]*');
        expect(spelt('subject', 'source', 'A Book')).toBe('[[ A Book ]]**');
        expect(spelt('topic', 'source', 'A Book')).toBe('[[ A Book ]]***');
    });
});

describe('a name', () => {
    it('is a book when nothing separates it', () => {
        expect(name('A Book')).toEqual({ of: 'book', book: 'A Book' });
    });

    it('is a chapter of this book when it opens with the relative mark', () => {
        expect(name('./ The Sheet')).toEqual({ of: 'chapter', within: true, chapter: 'The Sheet' });
        expect(name('./The Sheet')).toEqual({ of: 'chapter', within: true, chapter: 'The Sheet' });
    });

    it('is a chapter of another book when a separator stands between them', () => {
        expect(name('A Book / The Sheet')).toEqual({ of: 'chapter', book: 'A Book', chapter: 'The Sheet' });
        expect(name('A Book/The Sheet')).toEqual({ of: 'chapter', book: 'A Book', chapter: 'The Sheet' });
    });

    it('does not care how much space a writer left around anything', () => {
        for (const said of ['A Book / The Sheet', 'A Book  /  The Sheet', '  A Book/The Sheet  ', 'A Book\n/\nThe Sheet'])
            expect(name(said), said).toEqual({ of: 'chapter', book: 'A Book', chapter: 'The Sheet' });
    });

    // THE PROMISE THIS LIBRARY IS ACTUALLY GOING TO NEED. Doug: "Importing ALL conversations with
    // AI." Those titles are written by whoever was talking, and they are full of slashes.
    it('lets a title carry a separator when the writer escapes it', () => {
        expect(name('TCP./IP')).toEqual({ of: 'book', book: 'TCP/IP' });
        expect(name('w./ Claude')).toEqual({ of: 'book', book: 'w/ Claude' });
        expect(name('either./or')).toEqual({ of: 'book', book: 'either/or' });
    });

    it('lets an escaped separator stand on either side of a real one', () => {
        expect(name('TCP./IP / The Sheet')).toEqual({ of: 'chapter', book: 'TCP/IP', chapter: 'The Sheet' });
        expect(name('A Book / TCP./IP')).toEqual({ of: 'chapter', book: 'A Book', chapter: 'TCP/IP' });
        expect(name('./ TCP./IP')).toEqual({ of: 'chapter', within: true, chapter: 'TCP/IP' });
    });

    it('splits at the FIRST separator, so a chapter may carry the rest of them', () => {
        expect(name('A Book / one / two')).toEqual({ of: 'chapter', book: 'A Book', chapter: 'one / two' });
    });

    it('lets the escape escape itself', () => {
        expect(name('Either..Or')).toEqual({ of: 'book', book: 'Either.Or' });
    });

    it('leaves an ordinary dot alone', () => {
        expect(name('Chapter 1. The Start')).toEqual({ of: 'book', book: 'Chapter 1 The Start' });
    });

    it('answers something for text nobody should have written', () => {
        expect(name('')).toEqual({ of: 'book', book: '' });
        expect(name('/')).toEqual({ of: 'chapter', book: '', chapter: '' });
        expect(name('./')).toEqual({ of: 'chapter', within: true, chapter: '' });
    });
});

describe('a key', () => {
    it('scopes a chapter by the book it stands in', () => {
        expect(key(name('./ The Sheet'), 'Dougs Library')).toBe(`Dougs Library${separator}The Sheet`);
        expect(key(name('A Book / The Sheet'), 'Dougs Library')).toBe(`A Book${separator}The Sheet`);
        expect(key(name('A Book'), 'Dougs Library')).toBe('A Book');
    });

    it('is written one way however the writer spaced it', () => {
        expect(tidy('A Book/The Sheet')).toBe(`A Book${separator}The Sheet`);
        expect(tidy('  A Book  /  The Sheet ')).toBe(`A Book${separator}The Sheet`);
    });

    it('calls a thing by its last part, which is what it is called where it stands', () => {
        expect(last(`Dougs Library${separator}The Sheet`)).toBe('The Sheet');
        expect(last('Dougs Library')).toBe('Dougs Library');
    });

    it('hands back the whole of a name for asking whether the library holds exactly that', () => {
        expect(whole('TCP./IP')).toBe('TCP/IP');
        expect(whole('  A Book / The Sheet  ')).toBe('A Book / The Sheet');
    });
});

// THE BRACKET IS DISPLAY AND THE PAREN IS THE IDENTIFIER, ON EVERY FORM. Doug, 2026-09-19, on
// finding the paren gone from the table: "No language version ever gave anything one slot. It was
// always assumed." These are the promises that keep it from going missing again.
describe('the words and the name', () => {
    const read = (said: string) => {
        const held = new RegExp(notation.source, 'u').exec(said);

        return held === null ? undefined : spelling(held);
    };

    it('shows the words and asks for the name when both are given', () => {
        expect(read('*[[ Author: Doug ]]( My Library Log )')).toMatchObject({ refers: false, prefix: '*', words: 'Author: Doug', name: 'My Library Log', named: true });
        expect(read('$[ the log ]( My Library Log )')).toMatchObject({ refers: true, words: 'the log', name: 'My Library Log', named: true });
    });

    it('takes the words as the name when no paren is given', () => {
        expect(read('[[ Dougs Library ]]')).toMatchObject({ words: 'Dougs Library', name: 'Dougs Library', named: false });
        expect(read('$[ Dougs Library ]')).toMatchObject({ refers: true, words: 'Dougs Library', name: 'Dougs Library', named: false });
    });

    it('puts the paren before the postfix stars, the way Doug wrote it', () => {
        expect(read('[[ Doug ]]( Dougs Library )**')).toMatchObject({ postfix: '**', words: 'Doug', name: 'Dougs Library', named: true });
    });

    it('leaves a parenthetical remark alone, because the paren must touch the bracket', () => {
        expect(read('[[ Dougs Library ]] (a personal library)')).toMatchObject({ words: 'Dougs Library', name: 'Dougs Library', named: false });
    });

    it('still refuses brackets that do not balance, words or no words', () => {
        expect(read('[[ Doug ]]]( Dougs Library )')).toMatchObject({ balanced: false });
    });

    it('reads an element the same way', () => {
        expect(bare('**[[ Doug ]]( Dougs Library )')).toEqual({ name: 'Dougs Library', words: 'Doug', stars: '**' });
        expect(bare('[[ The Sheet ]]')).toEqual({ name: 'The Sheet', words: 'The Sheet', stars: '' });
        expect(bare('The Sheet')).toEqual({ name: 'The Sheet', words: 'The Sheet', stars: '' });
    });

    it('reads the framework\'s own display form, [words](name), as saying one thing and naming another', () => {
        expect(bare('[Doug](My Library Log)')).toEqual({ name: 'My Library Log', words: 'Doug', stars: '' });
    });

    it('and does not count a reference beside a name as part of it — the box in a title leads away, the name stays', () => {
        expect(bare('[[ My Library Log ]] $[ ]( Dougs Library )')).toEqual({ name: 'My Library Log', words: 'My Library Log', stars: '' });
        expect(bare('$[ ]( The Log ) The Log')).toEqual({ name: 'The Log', words: 'The Log', stars: '' });
    });
});
