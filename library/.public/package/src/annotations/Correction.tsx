import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Annotation, AnnotationSpecification } from './Annotation';

export class $Correction extends $Annotation {
    specification = new CorrectionSpecification();

    override defines(writing: $Writing): void { writing.classes.add(this, 'pa-correction'); }
    override erase(writing: $Writing): void { writing.classes.revert(this); }
}

export class CorrectionSpecification extends AnnotationSpecification {
    @specify('a correction holds what was wrong before its writing and what is right')
    $holdsWhatIsRight(writing: $Writing): void {
        $check(writing.annotations.find($Correction).every(correction => html.copy(correction.text).trim() !== ''),
            'a correction holds what was wrong before its writing and what is right, and this one holds nothing');
    }
}

export const Correction = $($Correction);
