import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { $Writing, $Annotation, AnnotationSpecification } from '@/writing/Writing';
import { $Author, $About } from './Cover';

export class $Biography extends $Annotation {
    override defines(writing: $Writing): void { writing.classes.add(this, 'pa-biography'); }
    override erase(writing: $Writing): void { writing.classes.revert(this); }
}

export class $Autobiography extends $Biography {
    specification = new AutobiographySpecification();

    override defines(writing: $Writing): void {
        super.defines(writing);
        writing.classes.add(this, 'pa-autobiography');
    }
}

export class AutobiographySpecification extends AnnotationSpecification {
    @specify('an autobiography is by what it is about')
    $byWhatItIsAbout(writing: $Writing): void {
        const author = writing.annotations.expressed($Author);
        const about = writing.annotations.expressed($About);
        $check(author?.reference !== undefined && author.reference.identifier === about?.reference?.identifier,
            'an autobiography is by what it is about, and this one is not');
    }
}

export const Biography = $($Biography);
export const Autobiography = $($Autobiography);
