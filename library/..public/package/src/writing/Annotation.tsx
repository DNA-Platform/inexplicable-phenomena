import { $ } from '@dna-platform/chemistry';
import { $Writing } from './Writing';

export class $Annotation extends $Writing {
    override $parenthetical?: boolean = true;

    specifically(writing: $Writing): void { }
}

export const Annotation = $($Annotation);
