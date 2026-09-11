import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Ref$, $Ref, $TypeOfRef, RefSpecification } from './Ref';
import { $References, $TypeOfReferences } from './References';
import { $Entry } from './Entry';

export interface $Citation$ extends $Ref$ {
    key(): string;
    entry(): $Entry | undefined;
    number(): number | undefined;
}

export class $Citation extends $Ref implements $Citation$ {
    protected keyed = /^[\w-]+$/u;

    key(): string {
        const copy = html.text(this._block).trim();
        return this.keyed.test(copy) ? copy : (this.url() ?? '').replace(/^#/u, '');
    }

    entry(): $Entry | undefined {
        const key = this.key();
        for (const chapter of this.book?.chapters ?? []) {
            const held = chapter.document?.held();
            if (held !== undefined && reflection.is<$References>(held, $TypeOfReferences))
                return held.entries().find(entry => entry.key() === key);
        }
        return undefined;
    }

    number(): number | undefined { return this.entry()?.number(); }

    override url(): string | undefined {
        const copy = html.text(this._block).trim();
        return this.keyed.test(copy) ? `#${copy}` : super.url();
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
