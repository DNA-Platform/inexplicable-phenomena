import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { type $Composition } from './Composition';
import { type $Reference } from '../reference/Reference';
import { same } from '../utilities/reference';
import { type $Catalogue } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import { Composible } from '../utilities/Composible';
import { $Path } from '../reference/Path';
import { $Writing } from './Writing';
import { $Letter, Letter } from './Letter';

export class $Word extends $Writing implements $Composition<$Letter> {
    get canonical(): $Letter { return Composible.canonical(this); }
    get letters(): $Letter[] { return this.contents(); }

    get ref(): $$Word { return new $$Word(this); }

    set ref(reference: $Reference | undefined) { this.location = reference; }

    at(index: number): $Location<$Letter> {
        return Composible.at(this, index);
    }

    where(match: (part: $Letter) => boolean): $Letter[] {
        return Composible.where(this, match);
    }

    select<U>(pick: (part: $Letter) => U): U[] {
        return Composible.select(this, pick);
    }

    contents(): $Letter[] {
        const letters: $Letter[] = [...this.copy].map(g => $(<Letter>{g}</Letter>));
        return letters.filter(c => c.valid()).map((c, i) => {
            c.index = i + 1;
            c.ref = this.at(c.index);
            return c;
        });
    }

    valid(): boolean {
        return super.valid() && /^[\p{L}\p{N}']+$/u.test(this.copy) && /[\p{L}\p{N}]/u.test(this.copy) && (this.location === undefined || this.location.read() instanceof $Word);
    }
}

export class $$Word implements $Catalogue<$Letter>, $Reference<$Word> {
    index = 0;
    parenthetical = false;

    constructor(public of: $Word) { }

    get copy(): string { return this.contents().map(r => r.copy).join(' '); }
    get canonical(): $Reference<$Letter> { return Composible.canonical(this); }

    contents(): $Reference<$Letter>[] {
        return this.of.contents().map((letter, slot) => {
            const reference = this.of.at(letter.index);
            reference.index = slot + 1;
            return reference;
        });
    }

    where(match: (reference: $Reference<$Letter>) => boolean): $Reference<$Letter>[] {
        return Composible.where(this, match);
    }

    select<U>(pick: (reference: $Reference<$Letter>) => U): U[] {
        return Composible.select(this, pick);
    }

    at(index: number): $Location<$Reference<$Letter>> {
        return Composible.at(this, index);
    }

    follow(): $Composition<$Letter> {
        return Composible.follow(this);
    }

    read(): $Word {
        return this.of;
    }

    valid(): boolean {
        return this.of.valid();
    }

    equals(ref: $Reference<$Word>): boolean {
        const found = ref.read();
        return this.of === found || same(this.of, found);
    }

    then<U>(next: $Reference<U>): $Reference<U> {
        return new $Path<$Word, U>(this, next);
    }
}

export const Word = $($Word);
