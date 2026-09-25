import { $, $check } from '@dna-platform/chemistry';
import { html } from '@/utilities/Html';
import { specify } from '@/utilities/Specification';
import { $Writing, $Annotation, AnnotationSpecification } from './Writing';

export class $Referent extends $Annotation {
    specification = new ReferentSpecification();
    get identifier(): string { return html.copy(this.text).trim(); }

    override defines(writing: $Writing): void {
        writing.id.set(this, this.identifier);
        writing.classes.add(this, 'pa-referent');
    }

    override erase(writing: $Writing): void {
        writing.id.revert(this);
        writing.classes.revert(this);
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
