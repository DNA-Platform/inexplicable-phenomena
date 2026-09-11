import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Ref$, $Ref, $TypeOfRef, RefSpecification } from './Ref';
import { $Entry, $TypeOfEntry } from './Entry';
import { folded } from './Fold';

export interface $Citation$ extends $Ref$ {
    key(): string;
    keys(): string[];
    entries(): ($Entry | undefined)[];
    numbers(): (number | undefined)[];
}

export class $Citation extends $Ref implements $Citation$ {
    key(): string { return (this.url() ?? '').replace(/^#/u, ''); }
    keys(): string[] { return this.link() === undefined ? html.text(this._block).split(',').map(key => key.trim()).filter(key => key !== '') : [this.key()]; }

    entries(): ($Entry | undefined)[] {
        return this.keys().map(key => {
            const found = this.book?.scratchpad.find<$Writing>(folded(key));
            return reflection.is<$Entry>(found, $TypeOfEntry) ? found : undefined;
        });
    }

    numbers(): (number | undefined)[] {
        return this.entries().map(entry => {
            if (entry === undefined) return undefined;
            const holding = reflection.holding(entry) ?? entry;
            const at = reflection.within<$Entry>(holding, $TypeOfEntry).findIndex(one => one.key() === entry.key());
            return at < 0 ? undefined : at + 1;
        });
    }

    override written(): string {
        const numbers = this.numbers();
        return numbers.length === 0 || numbers.some(number => number === undefined) ? super.written() : this.marks(numbers as number[]);
    }

    protected marks(numbers: number[]): string { return `[${numbers.join(', ')}]`; }

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
