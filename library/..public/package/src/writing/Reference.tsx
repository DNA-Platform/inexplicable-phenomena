import { $, $check, $Chemical } from '@dna-platform/chemistry';
import { html } from '@/utilities/Html';
import { specify } from '@/utilities/Specification';
import { $Writing, $Annotation, AnnotationSpecification } from './Writing';

export class $Reference extends $Annotation {
    specification = new ReferenceSpecification();
    identifier = '';

    $Reference(...chemicals: $Chemical[]) {
        this.$Annotation(...chemicals);
        this.identifier = html.copy(this.contents).trim();
    }

    override defines(writing: $Writing): void { writing.classes.add('pa-reference'); }
    override erase(writing: $Writing): void { writing.classes.delete('pa-reference'); }
}

export class ReferenceSpecification extends AnnotationSpecification {
    @specify('a reference holds the address its writing means')
    $holdsAnAddress(writing: $Writing): void {
        $check(writing.annotations.expressed($Reference)?.identifier !== '',
            'a reference is the address its writing means, and this one holds none');
    }
}

export const Reference = $($Reference);
