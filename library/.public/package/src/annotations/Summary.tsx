import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Annotation, AnnotationSpecification } from './Annotation';

export class $Summary extends $Annotation {
    specification = new SummarySpecification();

    override defines(writing: $Writing): void { writing.classes.add(this, 'pa-summary'); }
    override erase(writing: $Writing): void { writing.classes.revert(this); }
}

export class SummarySpecification extends AnnotationSpecification {
    @specify('a summary holds what its writing comes to')
    $holdsWhatItComesTo(writing: $Writing): void {
        $check(writing.annotations.find($Summary).every(summary => html.copy(summary.text).trim() !== ''),
            'a summary holds what its writing comes to, and this one holds nothing');
    }
}

export const Summary = $($Summary);
