import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { type $Composition } from './Composition';
import { $Writing } from './Writing';
import { $Letter, Letter } from './Letter';

export class $Word extends $Writing implements $Composition<$Letter> {
    get canonical(): $Letter { return this.parts()[0]; }
    get letters(): $Letter[] { return this.parts(); }

    where(match: (part: $Letter) => boolean): $Letter[] {
        return this.parts().filter(match);
    }

    select<U>(pick: (part: $Letter) => U): U[] {
        return this.parts().map(pick);
    }

    single(match?: (part: $Letter) => boolean): $Letter | undefined {
        const found = match ? this.parts().filter(match) : this.parts();
        return found.length === 1 ? found[0] : undefined;
    }

    parts(): $Letter[] {
        const letters: $Letter[] = [...this.copy].map(g => $(<Letter>{g}</Letter>));
        return letters.filter(c => c.valid()).map((c, i) => {
            c.index = i + 1;
            if (this.ref) c.ref = this.ref.compose(c.index);
            return c;
        });
    }

    valid(): boolean {
        return super.valid() && /^[\p{L}\p{N}']+$/u.test(this.copy) && /[\p{L}\p{N}]/u.test(this.copy);
    }
}

export const Word = $($Word);
