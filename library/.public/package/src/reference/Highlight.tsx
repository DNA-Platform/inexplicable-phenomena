import { $ } from '@dna-platform/chemistry';
import { $Sentence } from '../writing/Sentence';

export class $Highlight extends $Sentence {
    $first?: number | string;
    $last?: number | string;

    get first(): number { return Number(this.$first ?? 0); }
    get last(): number | undefined { return this.$last === undefined ? undefined : Number(this.$last); }
}

export const Highlight = $($Highlight);
