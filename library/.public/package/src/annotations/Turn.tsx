import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Annotation, AnnotationSpecification } from './Annotation';

export class $Turn extends $Annotation {
    specification = new TurnSpecification();

    override defines(writing: $Writing): void { writing.classes.add(this, 'pa-turn'); }
    override erase(writing: $Writing): void { writing.classes.revert(this); }
}

export class TurnSpecification extends AnnotationSpecification {
    @specify('a turn holds what the subject turns to at its writing')
    $holdsWhatItTurnsTo(writing: $Writing): void {
        $check(writing.annotations.find($Turn).every(turn => html.copy(turn.text).trim() !== ''),
            'a turn holds what the subject turns to at its writing, and this one holds nothing');
    }
}

export const Turn = $($Turn);
