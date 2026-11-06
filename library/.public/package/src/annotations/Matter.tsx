import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Annotation, AnnotationSpecification } from './Annotation';

export class $Matter extends $Annotation {
    specification = new MatterSpecification();

    override defines(writing: $Writing): void { writing.classes.add(this, 'pa-matter'); }
    override erase(writing: $Writing): void { writing.classes.revert(this); }
}

export class MatterSpecification extends AnnotationSpecification {
    @specify('a matter holds what its writing is about')
    $holdsWhatItIsAbout(writing: $Writing): void {
        $check(writing.annotations.find($Matter).every(matter => html.copy(matter.text).trim() !== ''),
            'a matter holds what its writing is about, and this one holds nothing');
    }
}

export const Matter = $($Matter);
