import React from 'react';
import { $, $valid } from '@dna-platform/chemistry';
import { $Composition$ } from './Composition';
import { $Referent$ } from '../reference/Referent';
import { $Reference$ } from '../reference/Reference';
import { $Catalogue$ } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import { $Composible$ } from '../utilities/Composible';
import { $Path, Path } from '../reference/Path';
import { $Writing, Level } from './Writing';
import { $Letter } from './Letter';
import * as letters from './Letter';

export class $Word extends $Writing<$Letter> implements $Composition$<$Letter> {
    get level(): Level { return 'word'; }
    get letters(): $Letter[] { return this.parts(); }

    get ref(): $$Word { return new $$Word(this); }

    // A word is divided into its graphemes, one letter each.
    divide(prose: string): string[] {
        return [...prose];
    }

    compose(prose: string): $Letter {
        const Letter = $(letters.Letter);
        return $(<Letter>{prose}</Letter>);
    }

    // A word is one unbroken run carrying at least one letter or number. It used
    // to admit letters, numbers and apostrophes ONLY, so `33A3a-112and-skjdfh`
    // was invalid and vanished through the parse's old filter — the word laws
    // must admit what a person actually writes, not a tidier subset of it.
    valid(): boolean {
        // Every condition is asked, so every failing one is heard. Short-circuit
        // with && before a $valid call and the second reason is swallowed.
        const base = super.valid();
        const whole = $valid(!/\s/.test(this.copy), 'a word is one unbroken run, and this one carries whitespace');
        const said = $valid(/[\p{L}\p{N}]/u.test(this.copy), 'a word has at least one letter or number, and this one has none');
        return base && whole && said;
    }
}

export class $$Word implements $Catalogue$<$Letter>, $Reference$<$Word> {
    parenthetical = false;

    constructor(public of: $Word) { }

    get copy(): string { return this.parts().map(r => r.copy).join(' '); }
    get canonical(): $Reference$<$Letter> { return $Composible$.canonical(this); }

    parts(): $Reference$<$Letter>[] {
        return this.of.parts().map((_, position) => this.of.at(position));
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

    at(position: number): $Location<$Reference$<$Letter>> {
        return $Composible$.at(this, position);
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
        const path: $Path<$Word, U> = $(<Path first={this} onward={next} />);
        return path;
    }
}

export const Word = $($Word);
