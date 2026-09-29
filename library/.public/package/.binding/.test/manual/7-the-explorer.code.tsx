import { $ } from '@dna-platform/chemistry';
import { $Annotation, $Writing } from '@dna-platform/public';

export class $Appendix extends $Annotation {
    override defines(writing: $Writing): void {
        writing.classes.add(this, 'pa-appendix');
    }

    override erase(writing: $Writing): void {
        writing.classes.revert(this);
    }
}

export const Appendix = $($Appendix);
