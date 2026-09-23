import { $, $Chemical } from '@dna-platform/chemistry';
import { html } from '@/utilities/Html';
import { $Writing, $Annotation } from './Writing';

export class $Reference extends $Annotation {
    identifier = '';

    $Reference(...chemicals: $Chemical[]) {
        this.$Annotation(...chemicals);
        this.identifier = html.copy(this.contents).trim();
    }

    override defines(writing: $Writing): void { writing.classes.add('pa-reference'); }
    override erase(writing: $Writing): void { writing.classes.delete('pa-reference'); }
}

export const Reference = $($Reference);
