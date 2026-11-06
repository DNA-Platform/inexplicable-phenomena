import { $ } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Annotation } from './Annotation';
import { $Parenthetical } from './Parenthetical';

export class $Narrative extends $Annotation {
    override defines(writing: $Writing): void {
        for (const annotation of writing.annotations.after(this))
            if (annotation instanceof $Parenthetical)
                writing.annotations.express(annotation, false);
    }
}

export const Narrative = $($Narrative);
