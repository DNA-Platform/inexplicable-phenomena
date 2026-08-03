import { $ } from '@dna-platform/chemistry';
import { $Sentence } from '../writing/Sentence';

export class $Footnote extends $Sentence {
    get key(): string {
        const colon = this.copy.indexOf(':');
        return colon < 0 ? '' : this.copy.slice(0, colon).trim();
    }

    get note(): string {
        const colon = this.copy.indexOf(':');
        return colon < 0 ? this.copy : this.copy.slice(colon + 1).trim();
    }

    valid(): boolean {
        return super.valid() && this.key !== '';
    }
}

export const Footnote = $($Footnote);
