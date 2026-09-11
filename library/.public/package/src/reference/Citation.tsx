import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Ref$, $Ref, $TypeOfRef, RefSpecification } from './Ref';
import { $Entry } from './Entry';

export interface $Citation$ extends $Ref$ {
    key(): string;
    entry(): $Entry | undefined;
    number(): number | undefined;
}

export class $Citation extends $Ref implements $Citation$ {
    key(): string { return (this.url() ?? '').replace(/^#/u, ''); }
    entry(): $Entry | undefined { return this.book?.references()?.entries().find(entry => entry.key() === this.key()); }
    number(): number | undefined { return this.entry()?.number(); }

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
