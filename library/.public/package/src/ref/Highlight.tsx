import { $ } from '@dna-platform/chemistry';
import { $Reference } from './Reference';
import { $Referent } from './Referent';

export class $Highlight<T extends $Referent = $Referent> extends $Reference<T> {
    $first?: number | string;
    $last?: number | string;

    get first(): number { return Number(this.$first ?? 0); }
    get last(): number | undefined { return this.$last === undefined ? undefined : Number(this.$last); }

    marks(copy: string): string {
        return copy.slice(this.first, this.last === undefined ? undefined : this.last + 1);
    }
}

export const Highlight = $($Highlight);
