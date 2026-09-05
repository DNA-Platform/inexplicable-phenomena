import { describe, it, expect } from 'vitest';
import { $, $Block } from '@dna-platform/chemistry';
import { $Writing$, $Writing, Writing, $Type } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Chapter, $Chapter$, TypeOfChapter, $TypeOfChapter, ChapterSpecification } from '@/book/Chapter';
import { TypeOfBook } from '@/book/Book';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';

// A CONSUMER KIND, DEFINED ENTIRELY HERE, following the one rule: the class extends
// $Writing and the hierarchy is carried in the others. A cover is a kind of chapter,
// so its interface, its type and its specification all say so — and its class does not.
interface $Cover$ extends $Chapter$ { }
interface $Title$ extends $Writing$ { }

class CoverSpecification extends ChapterSpecification {
    @specify('a cover carries its title')
    $carriesTitle(writing: $Writing): void {
        if (writing.searchFor($TypeOfTitle).length === 0)
            throw new Error('a cover carries its title, and this one carries none');
    }
}

class $TypeOfCover extends $TypeOfChapter {
    protected override specification: Specification<$Writing> = new CoverSpecification();
    override name = 'Cover';
}

class $TypeOfTitle extends $Type {
    override name = 'Title';
}

class $Cover extends $Composition implements $Cover$ {
    $Cover(block: $Block) {
        super.$Composition(block);
        if (this.searchFor($TypeOfCover).length > 0) return;
        this._block.$elements = [...(this._block.$elements ?? []), $(<TypeOfCoverKind />) as $Writing];
    }
}

class $Title extends $Writing implements $Title$ {
    $Title(block: $Block) {
        super.$Writing(block);
        if (this.searchFor($TypeOfTitle).length > 0) return;
        this._block.$elements = [...(this._block.$elements ?? []), $(<TypeOfTitleKind />) as $Writing];
    }
}

const TypeOfCoverKind = $($TypeOfCover);
const TypeOfTitleKind = $($TypeOfTitle);
const Cover = $($Cover);
const Title = $($Title);
const built = <T,>(node: React.ReactNode): T => $(node as never) as T;

describe('EXPERIMENT — the class is flat and the hierarchy is carried in the others', () => {
    it('the kind stands as what its TYPE says it is — a cover is a chapter', () => {
        const cover = built<$Cover>(<Cover><Title>a</Title></Cover>);
        expect(cover.type()).toBeInstanceOf($TypeOfCover);
        expect(cover.type()).toBeInstanceOf($TypeOfChapter);
    });

    it('AND THE CLASS NEVER EXTENDS THE KIND ABOVE IT — a cover is a composition, not a chapter', () => {
        expect(Object.getPrototypeOf($Cover)).toBe($Composition);
        expect($Cover.prototype).not.toBeInstanceOf($Chapter);
    });

    it('AND ITS RULES RUN, BECAUSE THEY LIVE ON ITS TYPE', () => {
        expect(() => built<$Cover>(<Cover>a</Cover>).specify()).toThrow(/a cover carries its title/);
    });

    it('and the chapter rules it inherits run too, through the specification', () => {
        expect(() => built<$Cover>(<Cover><Title>a</Title></Cover>).specify()).not.toThrow();
    });

    it('AND A BOOK COMPOSES IT, because its type is a type of chapter', () => {
        const book = built<$Writing>(<Writing><TypeOfBook /><Cover><Title>a</Title></Cover></Writing>);
        expect(book.searchFor($TypeOfChapter)).toHaveLength(1);
    });

    it('and a title is annotative, because its type is a type of annotation', () => {
        expect(reflection.composition(built<$Title>(<Title>a</Title>).type())).toBe(false);
        expect(built<$Cover>(<Cover><Title>a</Title></Cover>).searchFor($TypeOfTitle)).toHaveLength(1);
    });
});
