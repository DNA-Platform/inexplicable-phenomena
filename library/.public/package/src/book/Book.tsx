import { ReactNode } from 'react';
import { $, $Block, $check, cache } from '@dna-platform/chemistry';
import { Body } from '@/encyclopedia/Body';
import { $Composition$, $Composition } from '@/writing/Composition';
import { Dress } from '@/writing/Writing';
import { $Writing } from '@/writing/Writing';
import { $File, $TypeOfFile, FileSpecification } from '@/writing/File';
import { $Document } from '@/writing/Document';
import { Specification, specify } from '@/utilities/Specification';
import { $$ } from '@/utilities/Lib';
import { $Section } from '@/writing/Section';
import { $Paragraph } from '@/writing/Paragraph';
import { $Sentence } from '@/writing/Sentence';
import { $Word } from '@/writing/Word';
import { $Letter } from '@/writing/Letter';
import { $Chapter } from './Chapter';
import { $Synopsis } from './Synopsis';
import { $TableOfContents } from './TableOfContents';
import { $Reference, $TypeOfReference, ReferenceSpecification, prints, type $Reference$ } from '@/reference/Reference';
import { $Path } from '@/reference/Path';
import { $Index, Index } from './Index';
import { $References, References } from '@/reference/References';

export class $Book extends $Composition<$Chapter> implements $Composition$<$Chapter> {
    get chapters(): $Composition$<$Chapter> { return this; }
    get cover(): $Chapter { return this.parts()[0]; }
    get synopsis(): $Synopsis | undefined { const parts: $Writing[] = this.parts(); return parts.find((one): one is $Synopsis => one instanceof $Synopsis); }
    get tableOfContents(): $TableOfContents | undefined { const parts: $Writing[] = this.parts(); return parts.find((one): one is $TableOfContents => one instanceof $TableOfContents); }
    get sections(): $Composition<$Section> { return this.catalogue().comprehend(); }
    get paragraphs(): $Composition<$Paragraph> { return this.sections.catalogue().comprehend(); }
    get sentences(): $Composition<$Sentence> { return this.paragraphs.catalogue().comprehend(); }
    get words(): $Composition<$Word> { return this.sentences.catalogue().comprehend(); }
    get letters(): $Composition<$Letter> { return this.words.catalogue().comprehend(); }

    override book(): $Book { return this; }

    override parts(): $Chapter[] { return super.parts() as $Chapter[]; }

    $Book(block: $Block) {
        super.$Composition(block);
        this._type = $(<TypeOfBook />);
    }

    override where(match: (part: $Chapter) => boolean): $Chapter[] { return this.parts().filter(match); }
    override select<U>(pick: (part: $Chapter) => U): U[] { return this.parts().map(pick); }
    override selectMany<U>(pick: (part: $Chapter) => U[]): U[] { return this.parts().flatMap(pick); }
    override single(match: (part: $Chapter) => boolean): $Chapter {
        const found = this.parts().filter(match);
        if (found.length !== 1) throw new Error(`single expected exactly one part and found ${found.length}.`);
        return found[0];
    }

    override concatenate(...more: $Composition$<$Chapter>[]): $Composition<$Chapter> {
        return super.concatenate(...more) as $Composition<$Chapter>;
    }

    override get dress(): Dress { return Body; }
}

export class $$Book extends $Reference implements $Reference$<$Book> {
    $$Book(block: $Block) {
        super.$Reference(block);
        this._type = $(<TypeOf$Book />);
    }

    override async read(): Promise<$Book> {
        return $$(await super.read(), $Book);
    }
}

export class $TypeOfBook extends $TypeOfFile {
    override code = 'Bk';
    override get writtenAs(): new () => $Writing { return $Chapter; }

    override get canonicalForm(): typeof $Writing { return $Book; }

    override specifically(writing: $Writing): void {
        if (writing.block && !(writing.block.$elements ?? []).some(one => one instanceof $Index)) {
            const index = $<$Index>(<Index />, $<$References>(<References />));
            writing.block.$elements = [...(writing.block.$elements ?? []), index];
        }
        super.specifically(writing);
    }

    constructor() {
        super();
        this[cache]('Book');
    }

    protected override specification: Specification<$Writing> = new BookSpecification();
}

export class $TypeOf$Book extends $TypeOfReference {
    override get canonicalForm(): typeof $Writing { return $$Book; }

    constructor() {
        super();
        this[cache]('$Book');
    }

    protected override specification: Specification<$Writing> = new $BookSpecification();
}

export class BookSpecification extends FileSpecification {
    @specify('a book ends with its index')
    $endsWithIndex(writing: $Writing): void {
        const elements = (writing.block?.$elements ?? []);
        const at = elements.findIndex(one => one instanceof $Index);
        $check(at >= 0 && at === elements.length - 1,
            'a book ends with its index, and this one does not');
    }

    @specify('a book is written as chapters')
    $writtenAsChapters(writing: $Writing): void {
        const inside = ((writing.block?.$elements ?? []) as unknown[])
            .filter((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(inside.every(one => $$(one)($Chapter) || $$(one)($Document)),
            'a book is written as chapters, and something in this one could never be one');
    }
}

export class $BookSpecification extends ReferenceSpecification {
    @specify('a reference to a book lands on one')
    $landsOnIt(writing: $Writing): void {
        const path = (writing.block?.$elements ?? []).find((one): one is $Path => one instanceof $Path);
        const step = path?.copy.split('/').pop();
        $check(!!step && step.startsWith('Bk:'),
            'a reference to a book lands on one, and this path lands on something else');
        const held = (writing.block?.$elements ?? []).find((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(held === undefined || $$(held)($Book),
            'a reference to a book lands on one, and what it holds is not one');
    }
}

export const Book = $($Book);
export const TypeOfBook = $($TypeOfBook);
export const TypeOf$Book = $($TypeOf$Book);
prints.set('Bk', $$Book);
