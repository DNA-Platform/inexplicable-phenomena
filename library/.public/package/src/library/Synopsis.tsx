import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { $Writing, AnnotationSpecification } from '@/writing/Writing';
import { $Format } from '@/writing/Format';
import { $Chapter } from './Chapter';

export class $Synopsis extends $Format {
    specification = new SynopsisSpecification();
}

export class SynopsisSpecification extends AnnotationSpecification {
    @specify('a synopsis is said of a chapter')
    $saidOfAChapter(writing: $Writing): void {
        $check(writing instanceof $Chapter, 'a synopsis is said of a chapter, and this is not one');
    }
}

export const Synopsis = $($Synopsis);
