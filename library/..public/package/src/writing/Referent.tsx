import { $, $check, $Chemical } from '@dna-platform/chemistry';
import { html } from '@/utilities/Html';
import { $Writing, $Annotation } from './Writing';

export class $Referent extends $Annotation {
    identifier = '';

    $Referent(...chemicals: $Chemical[]) {
        this.$Annotation(...chemicals);
        this.identifier = html.copy(this.contents).trim();
    }

    override defines(writing: $Writing): void {
        if (writing.id !== this.identifier) writing.id = this.identifier;
        writing.classes.add('pa-referent');
    }

    override erase(writing: $Writing): void {
        if (writing.id === this.identifier) writing.id = undefined;
        writing.classes.delete('pa-referent');
    }

    override specifies(writing: $Writing): void {
        $check(this.identifier !== '',
            'a referent is the id its writing answers to, and this one holds none');
        $check(writing.annotations.containsOne($Referent),
            'a writing is mentioned once, and this one is mentioned more than once');
    }
}

export const Referent = $($Referent);
