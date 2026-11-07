import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Annotation, AnnotationSpecification } from './Annotation';

export class $Revision extends $Annotation {
    specification = new RevisionSpecification();

    override defines(writing: $Writing): void { writing.classes.add(this, 'pa-revision'); }
    override erase(writing: $Writing): void { writing.classes.revert(this); }
}

export class RevisionSpecification extends AnnotationSpecification {
    @specify('a revision holds what its writing replaces or changes, and where the earlier form stands')
    $holdsWhatItReplacesOrChanges(writing: $Writing): void {
        $check(writing.annotations.find($Revision).every(revision => html.copy(revision.text).trim() !== ''),
            'a revision holds what its writing replaces or changes, and where the earlier form stands, and this one holds nothing');
    }
}

export const Revision = $($Revision);
