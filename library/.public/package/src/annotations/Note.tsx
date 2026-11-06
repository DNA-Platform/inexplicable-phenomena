import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Annotation, AnnotationSpecification } from './Annotation';

export class $Note extends $Annotation {
    specification = new NoteSpecification();

    override defines(writing: $Writing): void { writing.classes.add(this, 'pa-note'); }
    override erase(writing: $Writing): void { writing.classes.revert(this); }
}

export class NoteSpecification extends AnnotationSpecification {
    @specify('a note holds what was noted of its writing')
    $holdsWhatWasNoted(writing: $Writing): void {
        $check(writing.annotations.find($Note).every(note => html.copy(note.text).trim() !== ''),
            'a note holds what was noted of its writing, and this one holds nothing');
    }
}

export const Note = $($Note);
