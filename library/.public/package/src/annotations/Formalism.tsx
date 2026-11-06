import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Annotation, AnnotationSpecification } from './Annotation';

export class $Formalism extends $Annotation {
    specification = new FormalismSpecification();

    override defines(writing: $Writing): void { writing.classes.add(this, 'pa-formalism'); }
    override erase(writing: $Writing): void { writing.classes.revert(this); }
}

export class FormalismSpecification extends AnnotationSpecification {
    @specify('a formalism holds the definition, notation or construction its writing introduces')
    $holdsWhatItIntroduces(writing: $Writing): void {
        $check(writing.annotations.find($Formalism).every(formalism => html.copy(formalism.text).trim() !== ''),
            'a formalism holds the definition, notation or construction its writing introduces, and this one holds nothing');
    }
}

export const Formalism = $($Formalism);
