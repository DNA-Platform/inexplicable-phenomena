import { $ } from '@dna-platform/chemistry';
import { $Denote } from './Denote';
import { $Footer } from './Footer';
import { $Bibliography } from './Bibliography';
import { $Citation } from './Citation';

export class $Cite extends $Denote {
    get footer(): $Footer {
        const found = this.document.bibliography;
        if (!found) throw new Error(`Cite ${this.key}: the document has no bibliography.`);
        return found;
    }

    get bibliography(): $Bibliography {
        return this.footer as $Bibliography;
    }

    get citation(): $Citation {
        return this.footnote as $Citation;
    }

    valid(): boolean {
        return super.valid() && this.footer instanceof $Bibliography && this.footnote instanceof $Citation;
    }
}

export const Cite = $($Cite);
