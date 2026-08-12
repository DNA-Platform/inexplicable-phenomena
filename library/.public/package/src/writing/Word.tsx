import React, { type ReactNode } from 'react';
import { $, $valid } from '@dna-platform/chemistry';
import { $Composition$ } from './Composition';
import { $Referent } from '../reference/Referent';
import { $Reference$ } from '../reference/Reference';
import { $Catalogue$ } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import { $Composible$ } from '../writing/Composition';
import { $Path, Path } from '../reference/Path';
import { $Writing, Level, Role } from './Writing';
import { $Letter } from './Letter';
import * as letters from './Letter';

export class $Word extends $Writing<$Letter> implements $Composition$<$Letter> {
    get level(): Level { return 'word'; }
    get letters(): $Letter[] { return this.parts(); }

    get ref(): $$Word { const Entry = $($$Word); return $(<Entry of={this} />) as $$Word; }

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

export class $$Word extends $Letter implements $Reference$<$Word> {
    $of!: $Word;

    $role?: Role = 'mention';

    view(): ReactNode { return <>{`“${this.copy}”`}</>; }

    get of(): $Word { return this.$of; }
    get copy(): string { return this.of.copy; }
    read(): $Word {
        return this.of;
    }

    then<U extends $Referent>(next: $Reference$<U>): $Reference$<U> {
        return $(<Path first={this} onward={next} />);
    }

    valid(): boolean {
        return this.$of !== undefined;
    }
}

export const Word = $($Word);
