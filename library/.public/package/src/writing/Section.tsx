import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { $Type, TypedSpecification, $Writing } from './Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $Composition$, $Composition } from './Composition';
import { $Paragraph, Paragraph } from './Paragraph';
import { $TypeOfTitle } from './Title';
import { $$ } from '@/utilities/Lib';
import { parser } from '@/utilities/Parser';
import { $Reference, $TypeOfReference, ReferenceSpecification, prints, type $Reference$ } from '@/reference/Reference';
import { $Path } from '@/reference/Path';

export class $Section extends $Composition<$Paragraph> implements $Composition$<$Paragraph> {

    $Section(block: $Block) {
        super.$Composition(block);
        this._type = $(<TypeOfSection />);
    }

    protected override reduce(held: (string | $Writing)[]): $Paragraph[] {
        const divided = /\n[^\S\n]*\n/u;
        const chunks: (string | $Writing)[][] = [[]];
        for (const token of held) {
            if (typeof token !== 'string' || !divided.test(token)) {
                chunks[chunks.length - 1].push(token);
                continue;
            }
            token.split(divided).forEach((piece, at) => {
                if (at > 0) chunks.push([]);
                if (piece !== '') chunks[chunks.length - 1].push(piece);
            });
        }
        return chunks
            .filter(chunk => chunk.some(token => typeof token !== 'string' || token.trim() !== ''))
            .map(chunk => $(<Paragraph>{parser.elements(chunk)}</Paragraph>) as $Paragraph);
    }
}

export class $$Section extends $Reference implements $Reference$<$Section> {
    $$Section(block: $Block) {
        super.$Reference(block);
        this._type = $(<TypeOf$Section />);
    }

    override async read(): Promise<$Section> {
        return $$(await super.read(), $Section);
    }
}

export class $TypeOfSection extends $Type {
    resolve = false;

    override get shell(): typeof $Writing { return $Section; }
    override flows = false;
    override nests = true;
    override code = 'Sn';
    override get writtenAs(): new () => $Writing { return $Paragraph; }

    override get canonicalForm(): typeof $Writing { return $Section; }

    constructor() {
        super();
        this[cache]('Section');
    }

    protected override specification: Specification<$Writing> = new SectionSpecification();
}

export class $TypeOf$Section extends $TypeOfReference {
    override get canonicalForm(): typeof $Writing { return $$Section; }

    constructor() {
        super();
        this[cache]('$Section');
    }

    protected override specification: Specification<$Writing> = new $SectionSpecification();
}

export class SectionSpecification extends TypedSpecification<$Writing> {
    @specify('a section is written as paragraphs')
    $writtenAsParagraphs(writing: $Writing): void {
        const inside = ((writing.block?.$elements ?? []) as unknown[])
            .filter((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(inside.every(one => $$(one)($Paragraph) || $$(one)($Section)), 'a section is written as paragraphs, and something in this one is not one');
    }

    @specify('a section opens with its title')
    $opensWithTitle(writing: $Writing): void {
        const inside = ((writing.block?.$elements ?? []) as unknown[])
            .filter((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(inside.length > 0 && inside[0].type instanceof $TypeOfTitle,
            'a section opens with its title, and this one opens without one');
    }
}

export class $SectionSpecification extends ReferenceSpecification {
    @specify('a reference to a section lands on one')
    $landsOnIt(writing: $Writing): void {
        const path = (writing.block?.$elements ?? []).find((one): one is $Path => one instanceof $Path);
        const step = path?.copy.split('/').pop();
        $check(!!step && step.startsWith('Sn:'),
            'a reference to a section lands on one, and this path lands on something else');
        const held = (writing.block?.$elements ?? []).find((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(held === undefined || $$(held)($Section),
            'a reference to a section lands on one, and what it holds is not one');
    }
}

export const Section = $($Section);
export const TypeOfSection = $($TypeOfSection);
export const TypeOf$Section = $($TypeOf$Section);
prints.set('Sn', $$Section);
