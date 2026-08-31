import { describe, it, expect } from 'vitest';
import { $, $Block, cache } from '@dna-platform/chemistry';
import { Specification } from '@/notation/Specification';
import { $Writing } from '@/writing/Writing';
import { $Document } from '@/writing/Document';
import { $Book } from '@/book/Book';
import { $Chapter, $TypeOfChapter, TypeOfChapter } from '@/book/Chapter';
import { $$ } from '@/utilities/Lib';
import { built, chain, specificationOf } from './written';

// A chapter implementation that reuses NOTHING from $Chapter.
class $Preface extends $Writing {
    $Preface(block: $Block) {
        super.$Writing(block);
        this.type = $(<TypeOfChapter />) as $TypeOfChapter;
    }
}

class CoverSpecification extends Specification<$Writing> {
    $opens(writing: $Writing): void { }
}

// THE TYPE says a cover is a chapter. It says it ONCE, in the type hierarchy,
// and no class has to agree.
class $TypeOfCover extends $TypeOfChapter {
    override get canonicalForm(): typeof $Writing { return $Cover; }
    constructor() { super(); this[cache]('Cover'); }
    protected override specification: Specification<$Writing> = new CoverSpecification();
}

// THE CANONICAL cover, anchored in the framework's own chapter.
class $Cover extends $Chapter {
    $Cover(block: $Block) {
        super.$Chapter(block);
        this.type = $(<TypeOfCover />) as $TypeOfCover;
    }
}

// A cover that reuses PREFACE's implementation instead. Same type, different base.
class $CoverOfPreface extends $Preface {
    $CoverOfPreface(block: $Block) {
        super.$Preface(block);
        this.type = $(<TypeOfCover />) as $TypeOfCover;
    }
}

const TypeOfCover = $($TypeOfCover);
const Preface = $($Preface);
const Cover = $($Cover);
const CoverOfPreface = $($CoverOfPreface);
const Chapter = $($Chapter);
const Book = $($Book);

const inside = (copy: string) => chain.Section(copy);

describe('a cover crosses the class hierarchy without leaving its type', () => {
    it('the two cover implementations share NO ancestor but $Writing', () => {
        expect(Object.getPrototypeOf($Cover)).toBe($Chapter);
        expect(Object.getPrototypeOf($CoverOfPreface)).toBe($Preface);
        expect(new $CoverOfPreface() instanceof $Chapter).toBe(false);
        expect(new $CoverOfPreface() instanceof $Document).toBe(false);
    });

    it('and BOTH are covers', () => {
        const anchored = built<$Cover>(<Cover>{[inside('a')]}</Cover>);
        const crossed = built<$CoverOfPreface>(<CoverOfPreface>{[inside('b')]}</CoverOfPreface>);
        expect($$(anchored)($Cover)).toBe(true);
        expect($$(crossed)($Cover)).toBe(true);
    });

    it('and BOTH are chapters, because the TYPE says so and the canonical anchors it', () => {
        const crossed = built<$CoverOfPreface>(<CoverOfPreface>{[inside('b')]}</CoverOfPreface>);
        expect(crossed instanceof $Chapter).toBe(false);
        expect($$(crossed)($Chapter)).toBe(true);
    });

    it('so a book composes covers, prefaces and its own chapters together', () => {
        const one = built<$Book>(
            <Book>{[
                <Cover key="c">{inside('a')}</Cover>,
                <CoverOfPreface key="x">{inside('b')}</CoverOfPreface>,
                <Preface key="p">{inside('c')}</Preface>,
                <Chapter key="h">{inside('d')}</Chapter>
            ]}</Book>);
        expect(one.parts().length).toBe(4);
        expect(one.parts().map(part => part.copy)).toEqual(['a', 'b', 'c', 'd']);
    });

    it('and the cover contract runs on both, from the type neither class shares', () => {
        const spec = specificationOf(new $TypeOfCover());
        expect(spec.rules().map((pair: [string, unknown]) => pair[0])).toContain('$opens');
        expect(spec.check(built<$CoverOfPreface>(<CoverOfPreface>{[inside('b')]}</CoverOfPreface>))).toContain('$opens');
    });
});
