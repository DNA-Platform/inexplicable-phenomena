import { ReactNode } from 'react';
import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { Article } from '@/encyclopedia/Article';
import { Output } from '@/encyclopedia/Output';
import { $Type, TypedSpecification, $Writing } from '@/writing/Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $Composition$, $Composition } from '@/writing/Composition';
import { Section } from '@/writing/Section';
import { parser } from '@/utilities/Parser';
import { reflection } from '@/utilities/Reflection';
import { $References, References } from '@/reference/References';
import { $Reference, $TypeOfReference, ReferenceSpecification, prints } from '@/reference/Reference';
import { $Path } from '@/reference/Path';

export class $Chapter extends $Composition implements $Composition$ {
    get sections(): $Composition { return this; }
    get paragraphs(): $Composition { return this.catalogue().comprehend(); }
    get sentences(): $Composition { return this.paragraphs.catalogue().comprehend(); }
    get words(): $Composition { return this.sentences.catalogue().comprehend(); }
    get letters(): $Composition { return this.words.catalogue().comprehend(); }
    get references(): $References | undefined { return (this.block?.$elements ?? []).find((one): one is $References => one instanceof $References); }

    $Chapter(block: $Block) {
        const Asked = $(TypeOfChapter);
        this.type ??= $(<Asked />);
        super.$Composition(block);
    }

    override frame(): ReactNode {
        return <Article><Output>{super.frame()}</Output></Article>;
    }

}

export class $$Chapter extends $Reference {
    $$Chapter(block: $Block) {
        const Asked = $(TypeOf$Chapter);
        this.type ??= $(<Asked />);
        super.$Reference(block);
    }
}

export class $TypeOfChapter extends $Type {
    resolve = false;
    override name = 'Chapter';

    override specifically(writing: $Writing): void {
        if (writing.block && !(writing.block.$elements ?? []).some(one => one instanceof $References)) {
            const Asked = $(References);
            writing.block.$elements = [...(writing.block.$elements ?? []), $<$References>(<Asked />)];
        }
        super.specifically(writing);
    }

    constructor() {
        super();
        this[cache](this.name);
    }

    protected override specification: Specification<$Writing> = new ChapterSpecification();
}

export class $TypeOf$Chapter extends $TypeOfReference {
    override name = '$Chapter';

    constructor() {
        super();
        this[cache](this.name);
    }

    protected override specification: Specification<$Writing> = new $ChapterSpecification();
}

export class ChapterSpecification extends TypedSpecification<$Writing> {
    @specify('a chapter ends with its references')
    $endsWithReferences(writing: $Writing): void {
        const elements = (writing.block?.$elements ?? []);
        const at = elements.findIndex(one => one instanceof $References);
        $check(at >= 0 && at === elements.length - 1,
            'a chapter ends with its references, and this one does not');
    }

    @specify('a chapter is written as sections')
    $writtenAsSections(writing: $Writing): void {
        const inside = ((writing.block?.$elements ?? []) as unknown[])
            .filter((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(inside.every(one => reflection.stands(one, 'Section') || reflection.stands(one, 'Paragraph')),
            'a chapter is written as sections, or as a title and paragraphs, and something in this one is neither');
    }
}

export class $ChapterSpecification extends ReferenceSpecification {
    @specify('a reference to a chapter lands on one')
    $landsOnIt(writing: $Writing): void {
        const path = (writing.block?.$elements ?? []).find((one): one is $Path => one instanceof $Path);
        const step = path?.copy.split('/').pop();
        $check(!!step && step.startsWith('Cr:'),
            'a reference to a chapter lands on one, and this path lands on something else');
        const held = (writing.block?.$elements ?? []).find((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(held === undefined || reflection.stands(held, 'Chapter'),
            'a reference to a chapter lands on one, and what it holds is not one');
    }
}

export const Chapter = $($Chapter);
export const TypeOfChapter = $($TypeOfChapter);
export const TypeOf$Chapter = $($TypeOf$Chapter);
prints.set('Cr', $($$Chapter));
