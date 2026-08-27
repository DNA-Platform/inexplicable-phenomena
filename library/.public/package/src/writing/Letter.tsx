import { $check } from '@dna-platform/chemistry';
import { $Type } from '@/notation/Type';
import { $Composition$ } from './Composition';
import { $Writing, $Written } from './Writing';

export class $Letter extends $Type<$Letter> implements $Composition$<$Letter> {
    resolve = false;
    override parts(): $Letter[] { return [this]; }

    $Letter(...writing: $Written[]) {
        super.$Writing(...writing);
    }

    constructor() {
        super();
        this.cache('Letter');
    }

    override specify(): void {
        super.specify();
        $check([...this.copy].length === 1, 'a letter is one grapheme, and this one is not');
    }
}
