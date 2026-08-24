import { $ } from '@dna-platform/chemistry';
import { $Writing } from './Writing';

// THE COMPOSITION ARM CLOSES ON ITSELF. A letter is a composition of one letter
// and that letter is this one, so the descent stops by pointing at itself rather
// than by running out.
//
// THE REFERENCE ARM DOES NOT CLOSE YET. `ref` answers a reference with something
// that implements no reference interface, and nothing catches it because `ref` is
// a getter. Making $Letter a $Reference<$Letter> costs 40 type errors in one
// cascade — see "The floor's two arms" in the sprint chapter.
export class $Letter extends $Writing<$Letter> {
    parts(): $Letter[] { return [this]; }

    get ref(): $Letter { return this; }

    valid(): boolean {
        return super.valid() && [...this.copy].length === 1;
    }
}

export const Letter = $($Letter);
