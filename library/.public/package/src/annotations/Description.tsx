import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Annotation, AnnotationSpecification } from './Annotation';

export class $Description extends $Annotation {
    specification = new DescriptionSpecification();

    override defines(writing: $Writing): void { writing.classes.add(this, 'pa-description'); }
    override erase(writing: $Writing): void { writing.classes.revert(this); }
}

export class DescriptionSpecification extends AnnotationSpecification {
    @specify('a description holds what its writing is')
    $holdsWhatItIs(writing: $Writing): void {
        $check(writing.annotations.find($Description).every(description => html.copy(description.text).trim() !== ''),
            'a description holds what its writing is, and this one holds nothing');
    }
}

export const Description = $($Description);
