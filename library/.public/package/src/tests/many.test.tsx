import { describe, it, expect } from 'vitest';
import { $, $Block } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $File } from '@/writing/File';
import { $Book, $TypeOfBook, TypeOfBook } from '@/book/Book';
import { $Chapter, $TypeOfChapter, TypeOfChapter } from '@/book/Chapter';
import { $$ } from '@/utilities/Lib';
import { built, chain, shown } from './written';

// Two classes that are books and are related to NOTHING — not to $Book, not to
// $File, not to each other. Each one's bond names the type, and that is all.
class $Bound extends $Writing {
    $Bound(block: $Block) {
        super.$Writing(block);
        this.type = $(<TypeOfBook />) as $TypeOfBook;
    }
}

class $Paperback extends $Writing {
    $Paperback(block: $Block) {
        super.$Writing(block);
        this.type = $(<TypeOfBook />) as $TypeOfBook;
    }
}

const Bound = $($Bound);
const Paperback = $($Paperback);
const Chapter = $($Chapter);
const chapter = (copy: string) => <Chapter>{chain.Section(copy)}</Chapter>;

describe('one type, many implementations, related only through writing', () => {
    it('neither class descends from $Book, from $File, or from the other', () => {
        const one = built<$Bound>(<Bound>{[chapter('a')]}</Bound>);
        expect(one instanceof $Book).toBe(false);
        expect(one instanceof $File).toBe(false);
        expect(one instanceof $Paperback).toBe(false);
    });

    it('and BOTH answer as books, because both carry the type', () => {
        const bound = built<$Bound>(<Bound>{[chapter('a')]}</Bound>);
        const paper = built<$Paperback>(<Paperback>{[chapter('b')]}</Paperback>);
        expect($$(bound)($Book)).toBe(true);
        expect($$(paper)($Book)).toBe(true);
    });

    it('the CANONICAL form is what the reading builds when it has to make one', () => {
        const bound = built<$Bound>(<Bound>{[chapter('a'), chapter('b')]}</Bound>);
        const asBook = $$(bound, $Book);
        expect(asBook).toBeInstanceOf($Book);
        expect(asBook.parts().length).toBe(2);
    });

    // QUARANTINED 2026-08-30 — this test HANGS the reaction system rather than
    // failing. Rendering an INVALID writing whose block holds CHEMICAL children
    // loops synchronously until the worker is killed; the same test with STRING
    // children (see sentence/paragraph/word/letter) draws its message and passes.
    // It is skipped, not deleted: it asserts real behaviour and returns when the
    // defect is fixed. See Solutions — the hang that ate the machine.
    it('and the type contract is enforced on all of them alike', () => {
        expect(() => built<$Bound>(<Bound>{[chain.Paragraph('a')]}</Bound>).specify()).toThrow(/a file is written as documents/);
        expect(() => built<$Paperback>(<Paperback>{[chain.Paragraph('a')]}</Paperback>).specify()).toThrow(/a file is written as documents/);
    });

    it('and it is the TYPE that holds it — the classes share no base to put it on', () => {
        expect(Object.getPrototypeOf($Bound)).toBe($Writing);
        expect(Object.getPrototypeOf($Paperback)).toBe($Writing);
        expect(new $TypeOfBook().getSpecification().rules().map((pair: [string, unknown]) => pair[0]))
            .toContain('$documents');
    });
});

class $Preface extends $Writing {
    $Preface(block: $Block) {
        super.$Writing(block);
        this.type = $(<TypeOfChapter />) as $TypeOfChapter;
    }
}

class $Appendix extends $Writing {
    $Appendix(block: $Block) {
        super.$Writing(block);
        this.type = $(<TypeOfChapter />) as $TypeOfChapter;
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
        expect(one.parts().map(part => part.copy)).toEqual(['a', 'b', 'c']);
    });

    it('and none of them descends from $Chapter', () => {
        expect(Object.getPrototypeOf($Preface)).toBe($Writing);
        expect(Object.getPrototypeOf($Appendix)).toBe($Writing);
    });
});
