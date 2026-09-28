import { $ } from '@dna-platform/chemistry';
import { $Writing, $Annotation } from '@/writing/Writing';

export class $Numbered extends $Annotation {
    override defines(writing: $Writing): void {
        writing.classes.add(this, 'pa-numbered');
    }

    override erase(writing: $Writing): void {
        writing.classes.revert(this);
    }
}

export const Numbered = $($Numbered);
