import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Annotation, AnnotationSpecification } from './Annotation';

export class $Comment extends $Annotation {
    specification = new CommentSpecification();

    override defines(writing: $Writing): void { writing.classes.add(this, 'pa-comment'); }
    override erase(writing: $Writing): void { writing.classes.revert(this); }
}

export class CommentSpecification extends AnnotationSpecification {
    @specify('a comment holds what was said about its writing')
    $holdsWhatWasSaid(writing: $Writing): void {
        $check(writing.annotations.find($Comment).every(comment => html.copy(comment.text).trim() !== ''),
            'a comment holds what was said about its writing, and this one holds nothing');
    }
}

export const Comment = $($Comment);
