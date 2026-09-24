import { $, $check, $Chemical } from '@dna-platform/chemistry';
import { html } from '@/utilities/Html';
import { specify } from '@/utilities/Specification';
import { $Writing, $Annotation, AnnotationSpecification } from './Writing';

export class $Referent extends $Annotation {
    specification = new ReferentSpecification();
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
}

export class ReferentSpecification extends AnnotationSpecification {
    @specify('a referent holds the id its writing answers to')
    $holdsAnId(writing: $Writing): void {
        $check(writing.annotations.expressed($Referent)?.identifier !== '',
            'a referent is the id its writing answers to, and this one holds none');
    }

    @specify('a writing is mentioned once')
    $mentionedOnce(writing: $Writing): void {
        $check(writing.annotations.containsOne($Referent),
            'a writing is mentioned once, and this one is mentioned more than once');
    }
}

export const Referent = $($Referent);
