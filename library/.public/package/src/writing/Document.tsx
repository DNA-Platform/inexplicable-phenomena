import { $, $check, $Html, cache } from '@dna-platform/chemistry';
import { $Type, TypedSpecification, $Writing } from './Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $Composition$ } from './Composition';
import { $Section, Section } from './Section';
import { $Paragraph } from './Paragraph';
import { $$ } from '@/utilities/Lib';
import { parser } from '@/utilities/Parser';

export class $Document extends $Writing implements $Composition$<$Section> {
    parts(): $Section[] {
        const from = this.bound ? this.inside! : this;
        return parser.parse(from,
            token => $$(token)($Section) ? $$(token, $Section) : undefined,
            held => [$(<Section>{parser.elements(held)}</Section>) as $Section]);
    }

    $Document(block: $Html<'block'>) {
        super.$Writing(block);
        this.type = $(<TypeOfDocument />) as $TypeOfDocument;
    }

    where(match: (part: $Section) => boolean): $Section[] { return this.parts().filter(match); }
    select<U>(pick: (part: $Section) => U): U[] { return this.parts().map(pick); }
    selectMany<U>(pick: (part: $Section) => U[]): U[] { return this.parts().flatMap(pick); }
    single(match: (part: $Section) => boolean): $Section {
        const found = this.parts().filter(match);
        if (found.length !== 1) throw new Error(`single expected exactly one part and found ${found.length}.`);
        return found[0];
    }
}

export class $TypeOfDocument extends $Type {
    resolve = false;
    override code = 'D';

    override get canonicalForm(): typeof $Writing { return $Document; }

    constructor() {
        super();
        this[cache]('Document');
    }

    protected override specification: Specification<$Writing> = new DocumentSpecification();
}

class DocumentSpecification extends TypedSpecification<$Writing> {
    @specify('a document is written as sections')
    $writtenAsSections(writing: $Writing): void {
        const inside = ((writing.block?.$elements ?? []) as unknown[])
            .filter((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(inside.every(one => $$(one)($Section) || $$(one)($Paragraph)),
            'a document is written as sections, or as a title and paragraphs, and something in this one is neither');
    }
}

export const Document = $($Document);
export const TypeOfDocument = $($TypeOfDocument);
