import { $ } from '@dna-platform/chemistry';
import { $Footnote } from './Footnote';
import { type $Bibliography } from './Bibliography';

export class $Citation extends $Footnote {
    get number(): number {
        const bibliography = this.parent as $Bibliography;
        const keys = bibliography.citations.map(c => c.$for).sort();
        return keys.indexOf(this.$for) + 1;
    }
}

export const Citation = $($Citation);
