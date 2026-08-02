import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { type $Composition } from './Composition';
import { type $Reference, same } from '../reference/Reference';
import { type $Catalogue } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import { Composible } from '../utilities/Composible';
import { $Path } from '../reference/Path';
import { $Writing } from './Writing';
import { $Letter, Letter } from './Letter';
import { $Word, Word } from './Word';

export class $Sentence extends $Writing implements $Composition<$Word> {
    get canonical(): $Word { return Composible.canonical(this); }
    get words(): $Word[] { return this.contents(); }

    get ref(): $$Sentence { return new $$Sentence(this); }

    get letters(): $Letter[] {
        return [...this.copy].map((g, i) => {
            const letter: $Letter = $(<Letter>{g}</Letter>);
            letter.index = i + 1;
            return letter;
        });
    }

    at(index: number): $Location<$Word> {
        return Composible.at(this, index);
    }

    where(match: (part: $Word) => boolean): $Word[] {
        return Composible.where(this, match);
    }

    select<U>(pick: (part: $Word) => U): U[] {
        return Composible.select(this, pick);
    }

    contents(): $Word[] {
        const words: $Word[] = (this.copy.match(/[\p{L}\p{N}']+/gu) ?? []).map(w => $(<Word>{w}</Word>));
        return words.filter(w => w.valid()).map((w, i) => {
            w.index = i + 1;
            w.place = this.at(w.index);
            return w;
        });
    }

    valid(): boolean {
        return super.valid() && /[\p{L}\p{N}]/u.test(this.copy);
    }
}

export class $$Sentence implements $Catalogue<$Word>, $Reference<$Sentence> {
    index = 0;
    parenthetical = false;

    constructor(public of: $Sentence) { }

    get copy(): string { return this.contents().map(r => r.copy).join(' '); }
    get canonical(): $Reference<$Word> { return Composible.canonical(this); }
    get letters(): $Reference<$Letter>[] { return Composible.extend(this.contents(), w => w.ref); }

    contents(): $Reference<$Word>[] {
        return this.of.contents().map((word, slot) => {
            const reference = this.of.at(word.index);
            reference.index = slot + 1;
            return reference;
        });
    }

    where(match: (reference: $Reference<$Word>) => boolean): $Reference<$Word>[] {
        return Composible.where(this, match);
    }

    select<U>(pick: (reference: $Reference<$Word>) => U): U[] {
        return Composible.select(this, pick);
    }

    at(index: number): $Location<$Reference<$Word>> {
        return Composible.at(this, index);
    }

    follow(): $Composition<$Word> {
        return Composible.follow(this);
    }

    find(): $Sentence {
        return this.of;
    }

    valid(): boolean {
        return this.of.valid();
    }

    equals(ref: $Reference<$Sentence>): boolean {
        const found = ref.find();
        return this.of === found || same(this.of, found);
    }

    then<U>(next: $Reference<U>): $Reference<U> {
        return new $Path<$Sentence, U>(this, next);
    }
}

export const Sentence = $($Sentence);
