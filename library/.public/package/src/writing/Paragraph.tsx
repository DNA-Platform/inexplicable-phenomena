import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { $Type, TypedSpecification, $Writing } from './Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $Composition$, $Composition } from './Composition';
import { ReactNode } from 'react';
import { Sentence } from './Sentence';
import { parser } from '@/utilities/Parser';
import { Prose } from '@/encyclopedia/Prose';
import { $Reference, $TypeOfReference, ReferenceSpecification, prints } from '@/reference/Reference';
import { $Path } from '@/reference/Path';
import { reflection } from '@/utilities/Reflection';

export class $Paragraph extends $Composition implements $Composition$ {

    $Paragraph(block: $Block) {
        const Asked = $(TypeOfParagraph);
        this.type ??= $(<Asked />);
        super.$Composition(block);
    }

    override frame(): ReactNode {
        return <Prose>{super.frame()}</Prose>;
    }
}

export class $$Paragraph extends $Reference {
    $$Paragraph(block: $Block) {
        const Asked = $(TypeOf$Paragraph);
        this.type ??= $(<Asked />);
        super.$Reference(block);
    }
}

export class $TypeOfParagraph extends $Type {
    resolve = false;
    override name = 'Paragraph';

    constructor() {
        super();
        this[cache](this.name);
    }

    protected override specification: Specification<$Writing> = new ParagraphSpecification();
}

export class $TypeOf$Paragraph extends $TypeOfReference {
    override name = '$Paragraph';

    constructor() {
        super();
        this[cache](this.name);
    }

    protected override specification: Specification<$Writing> = new $ParagraphSpecification();
}

export class ParagraphSpecification extends TypedSpecification<$Writing> {
    protected patterns = {
        divided: /\n[^\S\n]*\n/u
    };

    @specify('a paragraph is unbroken by a blank line')
    $noBlankLine(writing: $Writing): void {
        $check(!this.patterns.divided.test(writing.copy), 'a paragraph is unbroken by a blank line, and this one carries one');
    }
    @specify('a paragraph is written as sentences')
    $writtenAsSentences(writing: $Writing): void {
        const inside = ((writing.block?.$elements ?? []) as unknown[])
            .filter((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(inside.every(one => reflection.stands(one, 'Sentence') || reflection.stands(one, 'Paragraph')),
            'a paragraph is written as sentences, and something in this one is not one');
    }
}

export class $ParagraphSpecification extends ReferenceSpecification {
    @specify('a reference to a paragraph lands on one')
    $landsOnIt(writing: $Writing): void {
        const path = (writing.block?.$elements ?? []).find((one): one is $Path => one instanceof $Path);
        const step = path?.copy.split('/').pop();
        $check(!!step && step.startsWith('Ph:'),
            'a reference to a paragraph lands on one, and this path lands on something else');
        const held = (writing.block?.$elements ?? []).find((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(held === undefined || reflection.stands(held, 'Paragraph'),
            'a reference to a paragraph lands on one, and what it holds is not one');
    }
}

export const Paragraph = $($Paragraph);
parser.makes.set('Paragraph', held => {
    const Asked = $(Paragraph);
    return [$(<Asked>{parser.elements(held)}</Asked>) as $Writing];
});
export const TypeOfParagraph = $($TypeOfParagraph);
export const TypeOf$Paragraph = $($TypeOf$Paragraph);
prints.set('Ph', $($$Paragraph));
