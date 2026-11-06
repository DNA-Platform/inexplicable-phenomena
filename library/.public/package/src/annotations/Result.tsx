import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Annotation, AnnotationSpecification } from './Annotation';

export class $Result extends $Annotation {
    specification = new ResultSpecification();

    override defines(writing: $Writing): void { writing.classes.add(this, 'pa-result'); }
    override erase(writing: $Writing): void { writing.classes.revert(this); }
}

export class ResultSpecification extends AnnotationSpecification {
    @specify('a result holds what its writing states, reaches or circles')
    $holdsWhatItReaches(writing: $Writing): void {
        $check(writing.annotations.find($Result).every(result => html.copy(result.text).trim() !== ''),
            'a result holds what its writing states, reaches or circles, and this one holds nothing');
    }
}

export const Result = $($Result);
