import { ReactNode } from 'react';
import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { Article as article } from '@/encyclopedia/Article';
import { Output as output } from '@/encyclopedia/Output';
import { $Type, TypedSpecification, $Writing } from '@/writing/Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $Composition$, $Composition } from '@/writing/Composition';
import { Section, $TypeOfSection } from '@/writing/Section';
import { $TypeOfParagraph } from '@/writing/Paragraph';
import { parser } from '@/utilities/Parser';
import { reflection } from '@/utilities/Reflection';
import { $References, References as references } from '@/reference/References';
import { $Reference, $TypeOfReference, ReferenceSpecification, prints } from '@/reference/Reference';
import { $Path } from '@/reference/Path';

export interface $Chapter$ extends $Composition$ {
}

export class $Chapter extends $Composition implements $Composition$, $Chapter$ {
    get sections(): $Composition { return this; }
    get paragraphs(): $Composition { return this.catalogue().comprehend(); }
    get sentences(): $Composition { return this.paragraphs.catalogue().comprehend(); }
    get words(): $Composition { return this.sentences.catalogue().comprehend(); }
    get letters(): $Composition { return this.words.catalogue().comprehend(); }
    get references(): $References | undefined { return (this.block?.$elements ?? []).find((one): one is $References => one instanceof $References); }

    $Chapter(block: $Block) {
        const TypeOfChapter = $(typeOfChapter);
        this.type ??= $(<TypeOfChapter />);
        super.$Composition(block);
    }

    override frame(): ReactNode {
        const Article = $(article);
        const Output = $(output);

        return <Article><Output>{super.frame()}</Output></Article>;
    }

}

export class $$Chapter extends $Reference {
    $$Chapter(block: $Block) {
        const TypeOf$Chapter = $(typeOf$Chapter);
        this.type ??= $(<TypeOf$Chapter />);
        super.$Reference(block);
    }
}

export class $TypeOfChapter extends $Type {
    resolve = false;
    override name = 'Chapter';

    override specifically(writing: $Writing): void {
        if (writing.block && !(writing.block.$elements ?? []).some(references => references instanceof $References)) {
            const References = $(references);
            writing.block.$elements = [...(writing.block.$elements ?? []), $<$References>(<References />)];
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
        const at = elements.findIndex(references => references instanceof $References);
        $check(at >= 0 && at === elements.length - 1,
            'a chapter ends with its references, and this one does not');
    }

    @specify('a chapter is written as sections')
    $writtenAsSections(writing: $Writing): void {
        const inside = ((writing.block?.$elements ?? []) as unknown[])
            .filter((writing): writing is $Writing => writing instanceof $Writing && !writing.parenthetical);
        $check(inside.every(one => reflection.is(one, $TypeOfSection) || reflection.is(one, $TypeOfParagraph)),
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
        const target = (writing.block?.$elements ?? []).find((part): part is $Writing => part instanceof $Writing && !part.parenthetical);
        $check(target === undefined || reflection.is(target, $TypeOfChapter),
            'a reference to a chapter lands on one, and what it holds is not one');
    }
}

export const Chapter = $($Chapter);
export const TypeOfChapter = $($TypeOfChapter);
const typeOfChapter = TypeOfChapter;
export const TypeOf$Chapter = $($TypeOf$Chapter);
const typeOf$Chapter = TypeOf$Chapter;
prints.set('Cr', $($$Chapter));
