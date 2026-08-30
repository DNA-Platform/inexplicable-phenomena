import { describe, it, expect } from 'vitest';
import { $Section } from '@/writing/Section';
import { $Word } from '@/writing/Word';
import { $Book } from '@/book/Book';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { built, chain, section, word, letter, Word } from './written';

const Chapter = $($Chapter);
const Book = $($Book);
const chapter = (copy: string) => <Chapter>{chain.Section(copy)}</Chapter>;

describe('the parse numbers what it composes', () => {
    it('parts carry their position, in written order', () => {
        const one = built<$Section>(section(chain.Paragraph('a'), chain.Paragraph('b'), chain.Paragraph('c')));
        expect(one.parts().map(part => part.index)).toEqual([0, 1, 2]);
        expect(one.parts().map(part => part.copy)).toEqual(['a', 'b', 'c']);
    });

    it('and a part divided out of prose is numbered the same way', () => {
        const one = built<$Word>(<Word>hi</Word>);
        expect(one.parts().map(part => part.index)).toEqual([0, 1]);
    });

    it('a composition that was never composed answers zero', () => {
        expect(built<$Section>(section(chain.Paragraph('a'))).index).toBe(0);
    });

    it('the numbering is FRESH each parse, never stale', () => {
        const one = built<$Book>(<Book>{[chapter('a'), chapter('b')]}</Book>);
        expect(one.parts().map(part => part.index)).toEqual([0, 1]);
        expect(one.parts().map(part => part.index)).toEqual([0, 1]);
    });

    it('and a part read through a DIFFERENT composition is numbered by that one', () => {
        const inner = built<$Section>(section(chain.Paragraph('x'), chain.Paragraph('y')));
        expect(inner.parts()[1].index).toBe(1);
    });
});
