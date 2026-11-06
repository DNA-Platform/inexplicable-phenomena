import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Annotation, AnnotationSpecification } from './Annotation';

export class $Question extends $Annotation {
    specification = new QuestionSpecification();

    override defines(writing: $Writing): void { writing.classes.add(this, 'pa-question'); }
    override erase(writing: $Writing): void { writing.classes.revert(this); }
}

export class QuestionSpecification extends AnnotationSpecification {
    @specify('a question holds what its writing leaves open')
    $holdsWhatItLeavesOpen(writing: $Writing): void {
        $check(writing.annotations.find($Question).every(question => html.copy(question.text).trim() !== ''),
            'a question holds what its writing leaves open, and this one holds nothing');
    }
}

export const Question = $($Question);
