import { ReactNode } from 'react';
import { $, $check, $Html, cache } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Phrase, $TypeOfPhrase, PhraseSpecification } from '@/writing/Phrase';
import { $Path } from './Path';
import { parser } from '@/utilities/Parser';

export interface $Reference$ {
    get path(): $Path | undefined;
}

export class $Reference extends $Phrase implements $Reference$ {
    $active = false;

    override get canonical(): boolean { return false; }

    get path(): $Path | undefined { return (this.block?.$elements ?? []).find((one): one is $Path => one instanceof $Path); }

    $Reference(block: $Html<'block'>) {
        super.$Phrase(block);
        this.type = $(<TypeOfReference />) as $TypeOfReference;
    }

    override view(): ReactNode {
        const said = ((this.block?.$elements ?? []) as unknown[])
            .filter((one): one is string | $Writing => typeof one === 'string' || (one instanceof $Writing && !one.parenthetical));
        return <a href={this.path?.copy} onClick={() => { this.$active = true; }}>{parser.elements(said)}</a>;
    }
}

export class $TypeOfReference extends $TypeOfPhrase {
    override get canonicalForm(): typeof $Writing { return $Reference; }

    constructor() {
        super();
        this[cache]('Reference');
    }

    protected override specification: Specification<$Writing> = new ReferenceSpecification();
}

export class ReferenceSpecification extends PhraseSpecification {
    @specify('a reference carries a path')
    $carriesPath(writing: $Writing): void {
        $check((writing.block?.$elements ?? []).some(one => one instanceof $Path),
            'a reference carries a path, and this one carries none');
    }
}

export const Reference = $($Reference);
export const TypeOfReference = $($TypeOfReference);
