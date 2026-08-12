import { $ } from '@dna-platform/chemistry';
import { $Sentence } from '../writing/Sentence';
import { $Footer } from './Footer';

export class $Footnote extends $Sentence {
    $for = '';

    get number(): number {
        const footer = this.parent as $Footer;
        return footer.footnotes.indexOf(this) + 1;
    }

    valid(): boolean {
        return super.valid() && this.$for !== '';
    }
}

export const Footnote = $($Footnote);
