import { describe, it, expect } from 'vitest';
import { $, $Block, cache } from '@dna-platform/chemistry';
import { $Composition$ } from '@/writing/Composition';
import { $Document, $TypeOfDocument } from '@/writing/Document';
import { $File } from '@/writing/File';
import { $Writing, Type } from '@/writing/Writing';
import { $Chapter, $TypeOfChapter } from '@/book/Chapter';
import { $Book } from '@/book/Book';
import { $$ } from '@/utilities/Lib';
import { built, chain, drawn } from './written';

class $MyChapter extends $Chapter {
    $MyChapter(block: $Block) { super.$Chapter(block); }
}
class $TypeOfMyChapter extends $TypeOfDocument {
    override get canonicalForm(): typeof $Writing { return $MyChapter; }
    constructor() { super(); this[cache]('MyChapter'); }
}

class $MyBook extends $Book implements $Composition$<$MyChapter> {

    override parts(): $MyChapter[] {
        return super.parts().filter(one => one instanceof $MyChapter) as $MyChapter[];
    }

    override where(match: (part: $MyChapter) => boolean): $MyChapter[] { return this.parts().filter(match); }
    override select<U>(pick: (part: $MyChapter) => U): U[] { return this.parts().map(pick); }
    override selectMany<U>(pick: (part: $MyChapter) => U[]): U[] { return this.parts().flatMap(pick); }
    override single(match: (part: $MyChapter) => boolean): $MyChapter {
        const found = this.parts().filter(match);
        if (found.length !== 1)
            throw new Error(`single expected exactly one part and found ${found.length}.`);
        return found[0];
    }

    $MyBook(block: $Block) { super.$Book(block); }
}

const MyChapter = $($MyChapter);
const MyBook = $($MyBook);
$($TypeOfMyChapter);

describe('a composition narrows all the way down', () => {
    it('$Book is a composition of $Chapter though $File composes $Document', () => {
        const one = built<$Book>(<MyBook>{[<MyChapter key="a">{chain.Section('a')}</MyChapter>]}</MyBook>);
        expect($$(one)($File)).toBe(true);
        expect(one.parts()[0]).toBeInstanceOf($Chapter);
        expect($$(one.parts()[0])($Document)).toBe(true);
    });

    it('and MY book is a composition of MY chapters, two levels on', () => {
        const one = built<$MyBook>(<MyBook>{[<MyChapter key="a">{chain.Section('a')}</MyChapter>, <MyChapter key="b">{chain.Section('b')}</MyChapter>]}</MyBook>);
        expect(one.parts().length).toBe(2);
        expect(one.parts().every(part => part instanceof $MyChapter)).toBe(true);
        expect(one.parts()[0].copy).toBe('a');
        expect(one.select(part => part.copy)).toEqual(['a', 'b']);
        expect(one.single(part => part.copy === 'b')).toBeInstanceOf($MyChapter);
    });

    it('and it still answers as everything above it', () => {
        const one = built<$MyBook>(<MyBook>{[<MyChapter key="a">{chain.Section('a')}</MyChapter>]}</MyBook>);
        expect($$(one)($Book)).toBe(true);
        expect($$(one)($File)).toBe(true);
    });
});

describe('a writing carrying ONE type reads as every level above it', () => {
    it('reads as the level asked for, through the type it carries', () => {
        const { writing } = drawn(chain.Section('a'), <Type>Chapter</Type>);
        expect(writing.type).toBeInstanceOf($TypeOfChapter);
        expect($$(writing)($Document)).toBe(true);
        expect($$(writing, $Document)).toBeInstanceOf($Document);
    });

    it('and a second type at one level is refused, however it is ordered', () => {
        const { writing } = drawn(chain.Section('a'), <Type>Chapter</Type>, <Type>Document</Type>);
        expect(() => writing.specify()).toThrow(/typed once/);
    });
});
