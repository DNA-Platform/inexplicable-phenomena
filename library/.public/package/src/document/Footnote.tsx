import { $ } from '@dna-platform/chemistry';
import { $Sentence } from '../writing/Sentence';

export class $Footnote extends $Sentence {
    $for?: string;

    get key(): string {
        return this.$for ?? '';
    }

    valid(): boolean {
        return super.valid() && this.key !== '';
    }
}

export const Footnote = $($Footnote);
