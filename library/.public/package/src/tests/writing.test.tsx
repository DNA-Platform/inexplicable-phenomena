import { describe, it, expect } from 'vitest';
import { $, $Chemical } from '@dna-platform/chemistry';
import { $Writing, Writing, $Type } from '@/writing/Writing';
import { Reference } from '@/reference/Reference';
import { TypeOfLetter, $TypeOfLetter } from '@/writing/Letter';
import { TypeOfWord } from '@/writing/Word';
import { TypeOfSentence } from '@/writing/Sentence';
import { TypeOfParagraph } from '@/writing/Paragraph';
import { TypeOfSection } from '@/writing/Section';
import { TypeOfHeading } from '@/writing/Heading';
import { Path } from '@/reference/Path';
import { TypeOfChapter, $TypeOfChapter } from '@/book/Chapter';
import { TypeOfBook, $TypeOfBook } from '@/book/Book';
import { reflection } from '@/utilities/Reflection';
import { render } from '@testing-library/react';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;

describe('a piece of writing says what kind of writing it is', () => {
    it('and the kind is the type written into it', () => {
        const chapter = built<$Writing>(<Writing><TypeOfChapter />a</Writing>);
        expect(chapter.type()).toBeInstanceOf($TypeOfChapter);
    });

    it('and writing with no kind written into it answers nothing', () => {
        expect(built<$Writing>(<Writing>a</Writing>).type()).toBeUndefined();
    });

    it('AND IT IS REFUSED WHEN IT IS ASKED TO SPECIFY', () => {
        expect(() => built<$Writing>(<Writing>a</Writing>).specify()).not.toThrow();
        const typed = built<$Writing>(<Writing><TypeOfChapter />a</Writing>);
        expect(() => typed.specify()).not.toThrow();
    });
});

describe('the seven stand in order, and a type knows what it composes', () => {
    it('each names the one beneath it, and the letter names none', () => {
        const beneath = (Kind: React.ComponentType) => (built<$Type>(<Kind />)).below();
        expect(beneath(TypeOfBook)).toBe($TypeOfChapter);
        expect(beneath(TypeOfLetter)).toBeUndefined();
    });

    it('a chapter is beneath a book, and a book is not beneath a chapter', () => {
        const book = built<$Type>(<TypeOfBook />);
        const chapter = built<$Type>(<TypeOfChapter />);
        expect(reflection.beneath(book, chapter)).toBe(true);
        expect(reflection.beneath(chapter, book)).toBe(false);
    });

    it('AND IT REACHES ALL THE WAY DOWN — a letter is beneath a book', () => {
        expect(reflection.beneath(built<$Type>(<TypeOfBook />), built<$Type>(<TypeOfLetter />))).toBe(true);
    });

    it('and a kind is at or below itself', () => {
        expect(reflection.beneath(built<$Type>(<TypeOfSentence />), built<$Type>(<TypeOfSentence />))).toBe(true);
    });
});

describe('a piece of writing composes the kind beneath it, or its own', () => {
    it('a section holding a heading and a paragraph specifies clean', () => {
        const section = built<$Writing>(
            <Writing><TypeOfSection /><Writing><TypeOfHeading />a</Writing><Writing><TypeOfParagraph />b</Writing></Writing>);
        expect(() => section.specify()).not.toThrow();
    });

    it('AND A SENTENCE HOLDING A CHAPTER FAILS', () => {
        const sentence = built<$Writing>(
            <Writing><TypeOfSentence /><Writing><TypeOfChapter />a</Writing></Writing>);
        expect(() => sentence.specify()).toThrow(/composes the kind beneath it, or its own/);
    });

    it('and a word holding letters specifies clean', () => {
        const word = built<$Writing>(
            <Writing><TypeOfWord /><Writing><TypeOfLetter />a</Writing></Writing>);
        expect(() => word.specify()).not.toThrow();
    });
});

describe('a piece of writing says something', () => {
    it('copy is something', () => {
        const written = built<$Writing>(<Writing><TypeOfSentence />a</Writing>);
        expect(() => written.specify()).not.toThrow();
    });

    it('AND WRITING THAT IS NOTHING BUT ITS OWN TYPE IS REFUSED', () => {
        const empty = built<$Writing>(<Writing><TypeOfSentence /></Writing>);
        expect(() => empty.specify()).toThrow(/says something/);
    });

    it('and an empty string is not something', () => {
        const blank = built<$Writing>(<Writing><TypeOfSentence />{''}</Writing>);
        expect(() => blank.specify()).toThrow(/says something/);
    });
});

// A TYPE IS AN ANNOTATION THAT ALSO RESOLVES. An annotation carries specifically and
// can weigh in without being a full type with a name to stand for; a type is the
// heavier thing. There is no type of a type — asking a type what kind it is answers
// nothing, and reflection is what tells you it is one.
describe('an annotation weighs in; a type also resolves', () => {
    it('a type written into a piece of writing is among its annotations', () => {
        const chapter = built<$Writing>(<Writing><TypeOfChapter />a</Writing>);
        expect(chapter.annotations()).toHaveLength(1);
        expect(chapter.types()).toHaveLength(1);
    });

    it('AND A TYPE CARRIES NO KIND OF ITS OWN', () => {
        expect(built<$Type>(<TypeOfBook />).type()).toBeUndefined();
    });

    it('and the type it holds is not one of the things it composes', () => {
        const chapter = built<$Writing>(<Writing><TypeOfChapter />a</Writing>);
        expect(() => chapter.specify()).not.toThrow();
    });
});

describe('every piece of writing is in a book', () => {
    it('and writing that is held by nothing is its own book', () => {
        const alone = built<$Writing>(<Writing><TypeOfBook />a</Writing>);
        expect(alone.book()).toBe(alone);
    });
});

describe('the frame carries the names of every kind the writing stands as', () => {
    const drawn = (node: React.ReactNode) => {
        class $Page extends $Chemical { view(): React.ReactNode { return node; } }
        const Page = $($Page);
        return render(<Page />).container;
    };

    it('a chapter is labelled a chapter', () => {
        const host = drawn(<Writing><TypeOfChapter />a</Writing>);
        const labelled = host.querySelector('.pd-chapter');
        expect(labelled).not.toBeNull();
        expect(labelled!.className.split(' ')).toEqual(['pd-chapter']);
    });

    // ONLY A TYPE LABELS. An annotation says something about the writing without
    // saying what kind of writing it is, so it adds no name — a reference written
    // into a section leaves the section labelled a section and nothing more.
    it('AND AN ANNOTATION THAT IS NOT A TYPE LABELS NOTHING', () => {
        const host = drawn(<Writing><TypeOfSection /><Reference />a</Writing>);
        const labelled = host.querySelector('.pd-section');
        expect(labelled).not.toBeNull();
        expect(labelled!.className.split(' ')).toEqual(['pd-section']);
    });

    it('AND A PATH SHOWS ITS URL, WEARING NO ANCHOR', () => {
        const host = drawn(<Writing><TypeOfSection />hello<Path>https://example.com/thing</Path></Writing>);
        expect(host.textContent).toBe('hellohttps://example.com/thing');
        expect(host.querySelector('.pd-section a')).toBeNull();
    });

    it('AND A TYPE LEAVES NOTHING IN THE DRAWING — not even an empty container', () => {
        const host = drawn(<Writing><TypeOfSentence />hello</Writing>);
        expect(host.querySelector('.pd-sentence')!.innerHTML).toBe('hello');
    });

    it('AND THE COPY IS STILL THERE', () => {
        expect(drawn(<Writing><TypeOfSentence />hello</Writing>).textContent).toContain('hello');
    });
});
