import { describe, it, expect } from 'vitest';
import { $, $Block, cache } from '@dna-platform/chemistry';
import { $Chapter, $TypeOfChapter } from '@/book/Chapter';
import { $Book } from '@/book/Book';
import { Type } from '@/writing/Writing';
import { reflection } from '@/utilities/Reflection';
import { built, chain, drawn } from './written';

class $MyChapter extends $Chapter {
    $MyChapter(block: $Block) { super.$Chapter(block); }
}
class $TypeOfMyChapter extends $TypeOfChapter {
    override name = 'MyChapter';
    constructor() { super(); this[cache](this.name); }
}

class $MyBook extends $Book {
    $MyBook(block: $Block) { super.$Book(block); }
}

const MyChapter = $($MyChapter);
const MyBook = $($MyBook);
$($TypeOfMyChapter);

describe('a subclassed book composes subclassed chapters, dynamically', () => {
    it('MY book stands as a book and its parts stand as chapters', () => {
        const one = built<$Book>(<MyBook>{[<MyChapter key="a">{chain.Section('a')}</MyChapter>]}</MyBook>);
        expect(reflection.stands(one, 'Book')).toBe(true);
        expect(one.parts()[0]).toBeInstanceOf($Chapter);
        expect(reflection.stands(one.parts()[0], 'Chapter')).toBe(true);
    });

    it('and MY book composes MY chapters, two levels on, no generic anywhere', () => {
        const one = built<$MyBook>(<MyBook>{[<MyChapter key="a">{chain.Section('a')}</MyChapter>, <MyChapter key="b">{chain.Section('b')}</MyChapter>]}</MyBook>);
        expect(one.parts().length).toBe(2);
        expect(one.parts().every(part => part instanceof $MyChapter)).toBe(true);
        expect(one.parts()[0].copy).toBe('a');
        expect(one.select(part => part.copy)).toEqual(['a', 'b']);
        expect(one.single(part => part.copy === 'b')).toBeInstanceOf($MyChapter);
    });

    it('and it still answers as everything above it', () => {
        const one = built<$MyBook>(<MyBook>{[<MyChapter key="a">{chain.Section('a')}</MyChapter>]}</MyBook>);
        expect(reflection.stands(one, 'Book')).toBe(true);
    });
});

describe('a writing carrying ONE type reads as every level above it', () => {
    it('stands as the level asked for, through the type it carries', () => {
        const { writing } = drawn(chain.Section('a'), <Type>Chapter</Type>);
        expect(writing.type).toBeInstanceOf($TypeOfChapter);
        expect(reflection.stands(writing, 'Chapter')).toBe(true);
    });

    it('and a second type at one level is refused, however it is ordered', () => {
        const { writing } = drawn(chain.Section('a'), <Type>Chapter</Type>, <Type>Book</Type>);
        expect(() => writing.specify()).toThrow(/typed once/);
    });
});
