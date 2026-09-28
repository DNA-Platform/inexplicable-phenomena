import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { $Writing, $Annotation, AnnotationSpecification } from '@/writing/Writing';
import { $Chapter } from '@/libraries/Chapter';

// A FILE'S CONTENTS, APPENDED TO ITS CHAPTER BY THE BINDER, UNINTERPRETED. For every file that
// accompanies a chapter — the chapter's name, a character, an identifier and a type — the binder
// writes one of these into the book's module and hands it to the chapter as an annotation: its text
// the file's contents, or an image's address; `identifier` and `type` as the file spelled them.
// Nothing reads it but a Figure, and nothing enforces that one does. Doug, 2026-09-28: "What if we
// be neutral and just call the annotation Append. Like an appendix, but by action… And then it's
// just text that has been appended to the chapter."
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
