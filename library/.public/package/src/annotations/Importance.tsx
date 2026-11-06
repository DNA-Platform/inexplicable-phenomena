import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Annotation, AnnotationSpecification } from './Annotation';

export class $Importance extends $Annotation {
    specification = new ImportanceSpecification();

    override defines(writing: $Writing): void { writing.classes.add(this, 'pa-importance'); }
    override erase(writing: $Writing): void { writing.classes.revert(this); }
}

export class ImportanceSpecification extends AnnotationSpecification {
    @specify('an importance holds why its writing matters to its author')
    $holdsWhyItMatters(writing: $Writing): void {
        $check(writing.annotations.find($Importance).every(importance => html.copy(importance.text).trim() !== ''),
            'an importance holds why its writing matters to its author, and this one holds nothing');
    }
}

export const Importance = $($Importance);
