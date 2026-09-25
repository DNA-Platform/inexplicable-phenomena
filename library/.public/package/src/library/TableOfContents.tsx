import { ElementType } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { $Writing, AnnotationSpecification } from '@/writing/Writing';
import { $Format } from '@/writing/Format';
import { $Chapter } from './Chapter';

export class $TableOfContents extends $Format {
    specification = new TableOfContentsSpecification();
    style: ElementType = 'nav';
}

export class TableOfContentsSpecification extends AnnotationSpecification {
    @specify('a table of contents is said of a chapter')
    $saidOfAChapter(writing: $Writing): void {
        $check(writing instanceof $Chapter, 'a table of contents is said of a chapter, and this is not one');
    }
}

export const TableOfContents = $($TableOfContents);
