import { $, $check, selection } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { $Writing, AnnotationSpecification } from '@/writing/Writing';
import { $Format } from '@/writing/Format';
import { $Author, $About } from './Cover';

export class $Biography extends $Format {
    style = selection.div`
        .pa-biography .pd-title { font-variant: small-caps; }
    `;

    override defines(writing: $Writing): void {
        super.defines(writing);
        writing.classes.add(this, 'pa-biography');
    }

    override erase(writing: $Writing): void {
        super.erase(writing);
        writing.classes.revert(this);
    }
}

export class $Autobiography extends $Biography {
    specification = new AutobiographySpecification();
    override style = selection.div`
        .pa-biography .pd-title { font-variant: small-caps; }
        .pa-autobiography .pd-title { font-style: italic; }
    `;

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
        $check(author?.means !== undefined && author.means.identifier === about?.means?.identifier,
            'an autobiography is by what it is about, and this one is not');
    }
}

export const Biography = $($Biography);
export const Autobiography = $($Autobiography);
