import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Annotation, AnnotationSpecification } from './Annotation';

export class $Archive extends $Annotation {
    specification = new ArchiveSpecification();

    override defines(writing: $Writing): void { writing.classes.add(this, 'pa-archive'); }
    override erase(writing: $Writing): void { writing.classes.revert(this); }
}

export class ArchiveSpecification extends AnnotationSpecification {
    @specify('an archive holds a direction its writing took that the work left behind')
    $holdsADirectionLeftBehind(writing: $Writing): void {
        $check(writing.annotations.find($Archive).every(archive => html.copy(archive.text).trim() !== ''),
            'an archive holds a direction its writing took that the work left behind, and this one holds nothing');
    }
}

export const Archive = $($Archive);
