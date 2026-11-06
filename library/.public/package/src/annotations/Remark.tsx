import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Annotation, AnnotationSpecification } from './Annotation';

export class $Remark extends $Annotation {
    specification = new RemarkSpecification();

    override defines(writing: $Writing): void { writing.classes.add(this, 'pa-remark'); }
    override erase(writing: $Writing): void { writing.classes.revert(this); }
}

export class RemarkSpecification extends AnnotationSpecification {
    @specify('a remark holds what is asserted of its writing')
    $holdsWhatIsAsserted(writing: $Writing): void {
        $check(writing.annotations.find($Remark).every(remark => html.copy(remark.text).trim() !== ''),
            'a remark holds what is asserted of its writing, and this one holds nothing');
    }
}

export const Remark = $($Remark);
