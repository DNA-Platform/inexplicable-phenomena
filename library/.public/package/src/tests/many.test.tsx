import { describe, it, expect } from 'vitest';
import { $, $Block } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Book, $TypeOfBook, TypeOfBook } from '@/book/Book';
import { $Chapter, TypeOfChapter } from '@/book/Chapter';
import { reflection } from '@/utilities/Reflection';
import { built, chain, specificationOf } from './written';

// Two classes that are books and are related to NOTHING — not to $Book and not
// to each other. Each one's bond names the type, and that is all.
class $Bound extends $Composition {
    $Bound(block: $Block) {
        this.type ??= $(<TypeOfBook />);
        super.$Composition(block);
    }
}

class $Paperback extends $Composition {
    $Paperback(block: $Block) {
        this.type ??= $(<TypeOfBook />);
        super.$Composition(block);
    }
}

const Bound = $($Bound);
const Paperback = $($Paperback);
const Chapter = $($Chapter);
const chapter = (copy: string) => <Chapter>{chain.Section(copy)}</Chapter>;

describe('one type, many implementations, related only through writing', () => {
    it('neither class descends from $Book or from the other', () => {
        const one = built<$Bound>(<Bound>{[chapter('a')]}</Bound>);
        expect(one instanceof $Book).toBe(false);
        expect(one instanceof $Paperback).toBe(false);
    });

    it('and BOTH answer as books, because both carry the type', () => {
        const bound = built<$Bound>(<Bound>{[chapter('a')]}</Bound>);
        const paper = built<$Paperback>(<Paperback>{[chapter('b')]}</Paperback>);
        expect(reflection.is(bound, 'Book')).toBe(true);
        expect(reflection.is(paper, 'Book')).toBe(true);
    });

    it('nothing is built when the reading stands — the writing itself answers', () => {
        const bound = built<$Bound>(<Bound>{[chapter('a'), chapter('b')]}</Bound>);
        expect(bound instanceof $Book).toBe(false);
        expect(reflection.is(bound, 'Book')).toBe(true);
        expect(bound.parts().length).toBe(2);
    });

    it('and the type contract is enforced on all of them alike', () => {
        expect(() => built<$Bound>(<Bound>{[chain.Paragraph('a')]}</Bound>).specify()).toThrow(/a book is written as chapters/);
        expect(() => built<$Paperback>(<Paperback>{[chain.Paragraph('a')]}</Paperback>).specify()).toThrow(/a book is written as chapters/);
    });

    it('and it is the TYPE that holds it — the classes share no base to put it on', () => {
        expect(Object.getPrototypeOf($Bound)).toBe($Composition);
        expect(Object.getPrototypeOf($Paperback)).toBe($Composition);
        expect(specificationOf(new $TypeOfBook()).rules().map((pair: [string, unknown]) => pair[0]))
            .toContain('$writtenAsChapters');
    });
});

class $Preface extends $Writing {
    $Preface(block: $Block) {
        this.type ??= $(<TypeOfChapter />);
        super.$Writing(block);
    }
}

class $Appendix extends $Writing {
    $Appendix(block: $Block) {
        this.type ??= $(<TypeOfChapter />);
        super.$Writing(block);
    }
}

const Preface = $($Preface);
const Appendix = $($Appendix);
const Book = $($Book);

describe('many kinds of chapter are interchangeable, because a book asks the type', () => {
    it('a book composes unrelated chapter classes alongside its own', () => {
        const one = built<$Book>(
            <Book>{[
                chapter('a'),
                <Preface key="p">{chain.Section('b')}</Preface>,
                <Appendix key="x">{chain.Section('c')}</Appendix>
            ]}</Book>);
        expect(one.parts().length).toBe(3);
        expect(one.parts().map(part => part.copy)).toEqual(['Ta', 'Tb', 'Tc']);
    });

    it('and none of them descends from $Chapter', () => {
        expect(Object.getPrototypeOf($Preface)).toBe($Writing);
        expect(Object.getPrototypeOf($Appendix)).toBe($Writing);
    });
});
