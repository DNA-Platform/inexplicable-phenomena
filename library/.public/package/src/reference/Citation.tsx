import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Ref$, $Ref, $TypeOfRef, RefSpecification } from './Ref';
import { $Entry, $TypeOfEntry } from './Entry';
import { folded } from './Fold';

export interface $Citation$ extends $Ref$ {
    key(): string;
    entry(): $Entry | undefined;
    number(): number | undefined;
}

export class $Citation extends $Ref implements $Citation$ {
    key(): string { return (this.url() ?? '').replace(/^#/u, ''); }

    entry(): $Entry | undefined {
        const found = this.book?.scratchpad.find<$Writing>(folded(this.key()));
        return reflection.is<$Entry>(found, $TypeOfEntry) ? found : undefined;
    }

    number(): number | undefined {
        const entry = this.entry();
        if (entry === undefined) return undefined;
        const holding = reflection.holding(entry) ?? entry;
        const at = reflection.within<$Entry>(holding, $TypeOfEntry).findIndex(one => one.key() === this.key());
        return at < 0 ? undefined : at + 1;
    }

    override written(): string {
        const number = this.number();
        return number === undefined ? super.written() : String(number);
    }

    $Citation(block: $Block) {
        super.$Ref(this.addType(block, $TypeOfCitation));
    }
}

export class $TypeOfCitation extends $TypeOfRef {
    protected override specification: Specification<$Writing> = new CitationSpecification();
}

export class CitationSpecification extends RefSpecification {
}

export const Citation = $($Citation);
export const TypeOfCitation = $($TypeOfCitation);
