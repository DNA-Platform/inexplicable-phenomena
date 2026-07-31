import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { type $Composition } from './Composition';
import { $Writing } from './Writing';
import { $Character, Character } from './Character';

export class $Word extends $Writing implements $Composition<$Character> {
    get canonical(): $Character { return this.parts[0]; }
    get characters(): $Character[] { return this.parts; }

    where(match: (part: $Character) => boolean): $Character[] {
        return this.parts.filter(match);
    }

    select<U>(pick: (part: $Character) => U): U[] {
        return this.parts.map(pick);
    }

    single(match?: (part: $Character) => boolean): $Character | undefined {
        const found = match ? this.parts.filter(match) : this.parts;
        return found.length === 1 ? found[0] : undefined;
    }

    get parts(): $Character[] {
        const characters: $Character[] = [...this.copy].map(g => $(<Character>{g}</Character>));
        return characters.filter(c => c.valid()).map((c, i) => {
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
