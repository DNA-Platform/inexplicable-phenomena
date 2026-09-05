import { describe, it, expect } from 'vitest';
import { $ } from '@dna-platform/chemistry';
import { $Writing, Writing, $Type } from '@/writing/Writing';
import { TypeOfParagraph, $TypeOfParagraph } from '@/writing/Paragraph';
import { TypeOfSection } from '@/writing/Section';
import { Specification, specify } from '@/utilities/Specification';

// A CONSUMER KIND, DEFINED ENTIRELY HERE. A list is a kind of writing that is not
// one of the seven — it says something more about a paragraph rather than
// standing at a level of its own. Nothing in the framework is touched.
class ListSpecification extends Specification<$Writing> {
    @specify('a list is written in lines')
    $writtenInLines(writing: $Writing): void {
        const lines = (writing._block.$elements ?? []).filter(part => typeof part === 'string');
        if (!lines.some(line => String(line).includes('\n')))
            throw new Error('a list is written in lines, and this one is written on one');
    }
}

class $TypeOfList extends $Type {
    override name = 'List';
    protected override specification: Specification<$Writing> = new ListSpecification();
}
const TypeOfList = $($TypeOfList);

const built = <T,>(node: React.ReactNode): T => $(node as never) as T;

describe('a piece of writing carries one of the seven, and as many other kinds as it likes', () => {
    it('a paragraph that is also a list stands at the paragraph level', () => {
        const list = built<$Writing>(<Writing><TypeOfParagraph /><TypeOfList />{'a\nb'}</Writing>);
        expect(list.type()).toBeInstanceOf($TypeOfParagraph);
    });

    // FOUND BY ITS KIND FROM OUTSIDE, AND BY ITS ANNOTATIONS FROM WITHIN. searchFor
    // answers which of my parts is a paragraph, because a kind is what type() says;
    // the other kinds a piece of writing carries are among its annotations.
    it('AND IT IS ALSO A LIST, WHICH IS AMONG ITS ANNOTATIONS', () => {
        const list = built<$Writing>(<Writing><TypeOfParagraph /><TypeOfList />{'a\nb'}</Writing>);
        expect(list.annotations().some(one => one instanceof $TypeOfList)).toBe(true);
        const holding = built<$Writing>(
            <Writing><TypeOfSection /><Writing><TypeOfParagraph /><TypeOfList />{'a\nb'}</Writing></Writing>);
        expect(holding.searchFor($TypeOfParagraph)).toHaveLength(1);
    });

    it('and both kinds carry rules, and both of them run', () => {
        const lines = built<$Writing>(<Writing><TypeOfParagraph /><TypeOfList />{'a\nb'}</Writing>);
        expect(() => lines.specify()).not.toThrow();
        const flat = built<$Writing>(<Writing><TypeOfParagraph /><TypeOfList />{'a b'}</Writing>);
        expect(() => flat.specify()).toThrow(/a list is written in lines/);
    });

    it('AND TWO OF THE SEVEN ARE REFUSED — a piece of writing is one kind of writing', () => {
        const two = built<$Writing>(<Writing><TypeOfParagraph /><TypeOfSection />a</Writing>);
        expect(() => two.type()).toThrow(/writing is one kind of writing/);
    });

    it('and a kind can be swapped by writing a different one in', () => {
        const paragraph = built<$Writing>(<Writing><TypeOfParagraph />a</Writing>);
        const section = built<$Writing>(<Writing><TypeOfSection />a</Writing>);
        expect(paragraph.type().name).toBe('Paragraph');
        expect(section.type().name).toBe('Section');
    });
});
