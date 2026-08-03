import { $ } from '@dna-platform/chemistry';
import { $Sentence } from '../writing/Sentence';

export class $Footnote extends $Sentence {
    $label?: string;

    get label(): string {
        return this.$label ?? '';
    }

    valid(): boolean {
        return super.valid() && this.label !== '';
    }
}

export const Footnote = $($Footnote);
