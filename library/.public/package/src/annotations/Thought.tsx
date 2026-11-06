import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Annotation, AnnotationSpecification } from './Annotation';

export class $Thought extends $Annotation {
    specification = new ThoughtSpecification();

    override defines(writing: $Writing): void { writing.classes.add(this, 'pa-thought'); }
    override erase(writing: $Writing): void { writing.classes.revert(this); }
}

export class ThoughtSpecification extends AnnotationSpecification {
    @specify('a thought holds what its writing prompted')
    $holdsWhatItPrompted(writing: $Writing): void {
        $check(writing.annotations.find($Thought).every(thought => html.copy(thought.text).trim() !== ''),
            'a thought holds what its writing prompted, and this one holds nothing');
    }
}

export const Thought = $($Thought);
