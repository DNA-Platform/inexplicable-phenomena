import { $, $check } from '@dna-platform/chemistry';
import { html } from '@/utilities/Html';
import { specify } from '@/utilities/Specification';
import { $Writing, $Annotation, AnnotationSpecification } from '@/writing/Writing';
import { $Chapter } from './Chapter';

export class $Part extends $Annotation {
    specification = new PartSpecification();
    get name(): string { return html.copy(this.text).trim(); }

    override defines(writing: $Writing): void {
        writing.classes.add(this, 'pa-part');
    }

    override erase(writing: $Writing): void {
        writing.classes.revert(this);
    }
}

export class PartSpecification extends AnnotationSpecification {
    @specify('a part is said of a chapter')
    $saidOfAChapter(writing: $Writing): void {
        $check(writing instanceof $Chapter, 'a part is said of a chapter, and this is not one');
    }

    @specify('a part has a name')
    $hasAName(writing: $Writing): void {
        $check(writing.annotations.expressed($Part)?.name !== '', 'a part has a name, and this one has none');
    }
}

export const Part = $($Part);
