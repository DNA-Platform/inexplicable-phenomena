import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Annotation, AnnotationSpecification } from './Annotation';

export class $Reaction extends $Annotation {
    specification = new ReactionSpecification();

    override defines(writing: $Writing): void { writing.classes.add(this, 'pa-reaction'); }
    override erase(writing: $Writing): void { writing.classes.revert(this); }
}

export class ReactionSpecification extends AnnotationSpecification {
    @specify('a reaction holds how its writing struck its reader')
    $holdsHowItStruck(writing: $Writing): void {
        $check(writing.annotations.find($Reaction).every(reaction => html.copy(reaction.text).trim() !== ''),
            'a reaction holds how its writing struck its reader, and this one holds nothing');
    }
}

export const Reaction = $($Reaction);
