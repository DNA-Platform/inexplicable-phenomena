import { $, $check, $Chemical } from '@dna-platform/chemistry';
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

    override specifies(): void {
        $check(this.identifier !== '',
            'a reference is the address its writing means, and this one holds none');
    }
}

export const Reference = $($Reference);
