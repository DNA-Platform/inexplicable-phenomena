import { ReactNode } from 'react';
import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { Output } from '@/encyclopedia/Output';
import { $Type, TypedSpecification, $Writing, Dress } from './Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $Composition$, $Composition } from './Composition';
import { $Section, Section } from './Section';
import { $Paragraph } from './Paragraph';
import { $Sentence } from './Sentence';
import { $Word } from './Word';
import { $Letter } from './Letter';
import { $$ } from '@/utilities/Lib';
import { $References, $References$, References } from '@/reference/References';
import { parser } from '@/utilities/Parser';
import { $Reference, $TypeOfReference, ReferenceSpecification, prints, type $Reference$ } from '@/reference/Reference';
import { $Path } from '@/reference/Path';

export class $Document extends $Composition<$Section> implements $Composition$<$Section> {
    get sections(): $Composition<$Section> { return this; }
    get paragraphs(): $Composition<$Paragraph> { return this.catalogue().comprehend(); }
    get sentences(): $Composition<$Sentence> { return this.paragraphs.catalogue().comprehend(); }
    get words(): $Composition<$Word> { return this.sentences.catalogue().comprehend(); }
    get letters(): $Composition<$Letter> { return this.words.catalogue().comprehend(); }
    get references(): $References$ | undefined { return (this.block?.$elements ?? []).find((one): one is $References => one instanceof $References); }

    $Document(block: $Block) {
        super.$Composition(block);
        this._type = $(<TypeOfDocument />);
    }

    override get dress(): Dress { return Output; }


    protected override reduce(held: (string | $Writing)[]): $Section[] {
        return [$(<Section>{parser.elements(held)}</Section>) as $Section];
    }
}

export class $$Document extends $Reference implements $Reference$<$Document> {
    $$Document(block: $Block) {
        super.$Reference(block);
        this._type = $(<TypeOf$Document />);
    }

    override async read(): Promise<$Document> {
        return $$(await super.read(), $Document);
    }
}

export class $TypeOfDocument extends $Type {
    override flows = false;

    override get shell(): typeof $Writing { return $Document; }
    resolve = false;
    override code = 'Dt';
    override get writtenAs(): new () => $Writing { return $Section; }

    override get canonicalForm(): typeof $Writing { return $Document; }

    override specifically(writing: $Writing): void {
        if (writing.block && !(writing.block.$elements ?? []).some(one => one instanceof $References))
            writing.block.$elements = [...(writing.block.$elements ?? []), $<$References>(<References />)];
        super.specifically(writing);
    }

    constructor() {
        super();
        this[cache]('Document');
    }

    protected override specification: Specification<$Writing> = new DocumentSpecification();
}

export class $TypeOf$Document extends $TypeOfReference {
    override get canonicalForm(): typeof $Writing { return $$Document; }

    constructor() {
        super();
        this[cache]('$Document');
    }

    protected override specification: Specification<$Writing> = new $DocumentSpecification();
}

export class DocumentSpecification extends TypedSpecification<$Writing> {
    @specify('a document ends with its references')
    $endsWithReferences(writing: $Writing): void {
        const elements = (writing.block?.$elements ?? []);
        const at = elements.findIndex(one => one instanceof $References);
        $check(at >= 0 && at === elements.length - 1,
            'a document ends with its references, and this one does not');
    }


    @specify('a document is written as sections')
    $writtenAsSections(writing: $Writing): void {
        const inside = ((writing.block?.$elements ?? []) as unknown[])
            .filter((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(inside.every(one => $$(one)($Section) || $$(one)($Paragraph)),
            'a document is written as sections, or as a title and paragraphs, and something in this one is neither');
    }
}

export class $DocumentSpecification extends ReferenceSpecification {
    @specify('a reference to a document lands on one')
    $landsOnIt(writing: $Writing): void {
        const path = (writing.block?.$elements ?? []).find((one): one is $Path => one instanceof $Path);
        const step = path?.copy.split('/').pop();
        $check(!!step && step.startsWith('Dt:'),
            'a reference to a document lands on one, and this path lands on something else');
        const held = (writing.block?.$elements ?? []).find((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(held === undefined || $$(held)($Document),
            'a reference to a document lands on one, and what it holds is not one');
    }
}

export const Document = $($Document);
export const TypeOfDocument = $($TypeOfDocument);
export const TypeOf$Document = $($TypeOf$Document);
prints.set('Dt', $$Document);
