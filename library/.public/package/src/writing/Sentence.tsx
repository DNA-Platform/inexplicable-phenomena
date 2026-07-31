import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { type $Composition } from './Composition';
import { $Writing } from './Writing';
import { $Letter, Letter } from './Letter';
import { $Word, Word } from './Word';

export class $Sentence extends $Writing implements $Composition<$Word> {
    get canonical(): $Word { return this.parts()[0]; }
    get words(): $Word[] { return this.parts(); }
    get letters(): $Letter[] { return [...this.copy].map(g => $(<Letter>{g}</Letter>)); }

    where(match: (part: $Word) => boolean): $Word[] {
        return this.parts().filter(match);
    }

    select<U>(pick: (part: $Word) => U): U[] {
        return this.parts().map(pick);
    }

    single(match?: (part: $Word) => boolean): $Word | undefined {
        const found = match ? this.parts().filter(match) : this.parts();
        return found.length === 1 ? found[0] : undefined;
    }

    parts(): $Word[] {
        const words: $Word[] = (this.copy.match(/[\p{L}\p{N}']+/gu) ?? []).map(w => $(<Word>{w}</Word>));
        return words.filter(w => w.valid()).map((w, i) => {
            w.index = i + 1;
            if (this.ref) w.ref = this.ref.compose(w.index);
            return w;
        });
    }

    valid(): boolean {
        return super.valid() && /[\p{L}\p{N}]/u.test(this.copy);
    }
}

export const Sentence = $($Sentence);
