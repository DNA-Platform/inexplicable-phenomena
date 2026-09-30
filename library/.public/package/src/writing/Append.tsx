import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { $Writing, $Annotation, AnnotationSpecification } from './Writing';
import { $Chapter } from '@/libraries/Chapter';

export class $Append extends $Annotation {
    specification = new AppendSpecification();
    $identifier = '';
    $type = '';

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pa-append');
    }
}

export class AppendSpecification extends AnnotationSpecification {
    @specify('an append is said of a chapter')
    $saidOfAChapter(writing: $Writing): void {
        $check(writing instanceof $Chapter, 'an append is said of a chapter, and this is not one');
    }
}

export const Append = $($Append);
