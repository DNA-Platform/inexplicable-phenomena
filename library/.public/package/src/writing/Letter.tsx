import { $check } from '@dna-platform/chemistry';
import { $Type } from '@/notation/Type';

export class $Letter extends $Type<$Letter> {
    resolve = false;

    constructor() {
        super();
        this.cache('Letter');
    }

    // THE FLOOR. A letter composes itself, and a descent through it terminates.
    override parts(): $Letter[] {
        return [this];
    }

    override specify(): void {
        super.specify();
        $check([...this.copy].length === 1, 'a letter is one grapheme, and this one is not');
    }
}
