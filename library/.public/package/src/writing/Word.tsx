import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { type $Composition$ } from './Composition';
import { type $Referent$ } from '../reference/Referent';
import { type $Reference$ } from '../reference/Reference';
import { type $Catalogue$ } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import { $Composible$ } from '../utilities/Composible';
import { $Path } from '../reference/Path';
import { $Writing } from './Writing';
import { $Letter, Letter } from './Letter';

export class $Word extends $Writing implements $Composition$<$Letter> {
    get canonical(): $Letter { return $Composible$.canonical(this); }
    get letters(): $Letter[] { return this.parts(); }

    get ref(): $$Word { return new $$Word(this); }

    at(index: number): $Location<$Letter> {
        return $Composible$.at(this, index);
    }

    where(match: (part: $Letter) => boolean): $Letter[] {
        return $Composible$.where(this, match);
    }

    select<U>(pick: (part: $Letter) => U): U[] {
        return $Composible$.select(this, pick);
    }

    single(match: (part: $Letter) => boolean): $Letter {
        return $Composible$.single(this, match);
    }

    parts(): $Letter[] {
        const letters: $Letter[] = [...this.copy].map(g => $(<Letter>{g}</Letter>));
        return letters.filter(c => c.valid()).map((c, i) => {
            c.index = i + 1;
            return c;
        });
    }

    valid(): boolean {
        return super.valid() && /^[\p{L}\p{N}']+$/u.test(this.copy) && /[\p{L}\p{N}]/u.test(this.copy);
    }
}

export class $$Word implements $Catalogue$<$Letter>, $Reference$<$Word> {
    index = 0;
    parenthetical = false;

    constructor(public of: $Word) { }

    get copy(): string { return this.parts().map(r => r.copy).join(' '); }
    get canonical(): $Reference$<$Letter> { return $Composible$.canonical(this); }

    parts(): $Reference$<$Letter>[] {
        return this.of.parts().map((letter, slot) => {
            const reference = this.of.at(letter.index);
            reference.index = slot + 1;
            return reference;
        });
    }

    where(match: (reference: $Reference$<$Letter>) => boolean): $Reference$<$Letter>[] {
        return $Composible$.where(this, match);
    }

    select<U>(pick: (reference: $Reference$<$Letter>) => U): U[] {
        return $Composible$.select(this, pick);
    }

    single(match: (reference: $Reference$<$Letter>) => boolean): $Reference$<$Letter> {
        return $Composible$.single(this, match);
    }

    at(index: number): $Location<$Reference$<$Letter>> {
        return $Composible$.at(this, index);
    }

    follow(): $Composition$<$Letter> {
        return $Composible$.follow(this);
    }

    read(): $Word {
        return this.of;
    }

    valid(): boolean {
        return this.of.valid();
    }

    then<U extends $Referent$>(next: $Reference$<U>): $Reference$<U> {
        return new $Path<$Word, U>(this, next);
    }
}

export const Word = $($Word);
