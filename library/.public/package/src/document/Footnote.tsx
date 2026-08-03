import { $ } from '@dna-platform/chemistry';
import { $Sentence } from '../writing/Sentence';
import { type $Footer } from './Footer';

export class $Footnote extends $Sentence {
    $for = '';

    get number(): number {
        const footer = this.parent as $Footer;
        const mine = footer.legend.keys.map(k => k.name);
        return footer.document.keys.filter(k => mine.includes(k)).indexOf(this.$for) + 1;
    }

    valid(): boolean {
        return super.valid() && this.$for !== '';
    }
}

export const Footnote = $($Footnote);
