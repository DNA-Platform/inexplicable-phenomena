import { describe, it, expect } from 'vitest';
import { $, $Block, cache } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Chapter, $TypeOfChapter, TypeOfChapter } from '@/book/Chapter';
import { $Book } from '@/book/Book';
import { reflection } from '@/utilities/Reflection';
import { built, chain, specificationOf } from './written';

// A chapter implementation that reuses NOTHING from $Chapter.
class $Preface extends $Writing {
    $Preface(block: $Block) {
        this.type ??= $(<TypeOfChapter />);
        super.$Writing(block);
    }
}

class CoverSpecification extends Specification<$Writing> {
    $opens(writing: $Writing): void { }
}

// THE TYPE says a cover is a chapter. It says it ONCE, in the type hierarchy,
// and no class has to agree.
class $TypeOfMadeCover extends $TypeOfChapter {
    override name = 'MadeCover';
    constructor() { super(); this[cache](this.name); }
    protected override specification: Specification<$Writing> = new CoverSpecification();
}

// THE CANONICAL cover, anchored in the framework's own chapter.
class $MadeCover extends $Chapter {
    $MadeCover(block: $Block) {
        this.type ??= $(<TypeOfMadeCover />);
        super.$Chapter(block);
    }
}

// A cover that reuses PREFACE's implementation instead. Same type, different base.
class $CoverOfPreface extends $Preface {
    $CoverOfPreface(block: $Block) {
        this.type ??= $(<TypeOfMadeCover />);
        super.$Preface(block);
    }
}

const TypeOfMadeCover = $($TypeOfMadeCover);
const Preface = $($Preface);
const MadeCover = $($MadeCover);
const CoverOfPreface = $($CoverOfPreface);
const Chapter = $($Chapter);
const Book = $($Book);

const inside = (copy: string) => chain.Section(copy);

describe('a cover crosses the class hierarchy without leaving its type', () => {
    it('the two cover implementations share NO ancestor but $Writing', () => {
        expect(Object.getPrototypeOf($MadeCover)).toBe($Chapter);
        expect(Object.getPrototypeOf($CoverOfPreface)).toBe($Preface);
        expect(new $CoverOfPreface() instanceof $Chapter).toBe(false);
        expect(new $CoverOfPreface() instanceof $Book).toBe(false);
    });

    it('and BOTH are covers', () => {
        const anchored = built<$MadeCover>(<MadeCover>{[inside('a')]}</MadeCover>);
        const crossed = built<$CoverOfPreface>(<CoverOfPreface>{[inside('b')]}</CoverOfPreface>);
        expect(reflection.stands(anchored, 'MadeCover')).toBe(true);
        expect(reflection.stands(crossed, 'MadeCover')).toBe(true);
    });

    it('and BOTH are chapters, because the TYPE says so', () => {
        const crossed = built<$CoverOfPreface>(<CoverOfPreface>{[inside('b')]}</CoverOfPreface>);
        expect(crossed instanceof $Chapter).toBe(false);
        expect(reflection.stands(crossed, 'Chapter')).toBe(true);
    });

    it('so a book composes covers, prefaces and its own chapters together', () => {
        const one = built<$Book>(
            <Book>{[
                <MadeCover key="c">{inside('a')}</MadeCover>,
                <CoverOfPreface key="x">{inside('b')}</CoverOfPreface>,
                <Preface key="p">{inside('c')}</Preface>,
                <Chapter key="h">{inside('d')}</Chapter>
            ]}</Book>);
        expect(one.parts().length).toBe(4);
        expect(one.parts().map(part => part.copy)).toEqual(['a', 'b', 'c', 'd']);
    });

    it('and the cover contract runs on both, from the type neither class shares', () => {
        const spec = specificationOf(new $TypeOfMadeCover());
        expect(spec.rules().map((pair: [string, unknown]) => pair[0])).toContain('$opens');
        expect(spec.check(built<$CoverOfPreface>(<CoverOfPreface>{[inside('b')]}</CoverOfPreface>))).toContain('$opens');
    });
});
