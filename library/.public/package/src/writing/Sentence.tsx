import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { type $Composition } from './Composition';
import { $Writing } from './Writing';
import { $Character, Character } from './Character';
import { $Word, Word } from './Word';

export class $Sentence extends $Writing implements $Composition<$Word> {
    get canonical(): $Word { return this.parts[0]; }
    get words(): $Word[] { return this.parts; }
    get characters(): $Character[] { return [...this.copy].map(g => $(<Character>{g}</Character>)); }

    get parts(): $Word[] {
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
