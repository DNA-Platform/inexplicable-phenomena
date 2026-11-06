import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Annotation, AnnotationSpecification } from './Annotation';

export class $Idea extends $Annotation {
    specification = new IdeaSpecification();

    override defines(writing: $Writing): void { writing.classes.add(this, 'pa-idea'); }
    override erase(writing: $Writing): void { writing.classes.revert(this); }
}

export class IdeaSpecification extends AnnotationSpecification {
    @specify('an idea holds what might be made of its writing')
    $holdsWhatMightBeMade(writing: $Writing): void {
        $check(writing.annotations.find($Idea).every(idea => html.copy(idea.text).trim() !== ''),
            'an idea holds what might be made of its writing, and this one holds nothing');
    }
}

export const Idea = $($Idea);
