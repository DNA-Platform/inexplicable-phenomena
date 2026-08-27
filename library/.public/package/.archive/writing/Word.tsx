import React, { type ReactNode } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import { $Composition } from './Composition';
import { $Referent } from '../reference/Referent';
import { $Reference } from '../reference/Reference';
import { Path } from '../reference/Path';
import { $Writing, Role } from './Writing';
import { $Letter } from './Letter';
import * as letters from './Letter';

export class $Word extends $Writing<$Letter> implements $Composition<$Letter> {
    get letters(): $Letter[] { return this.parts(); }

    get ref(): $$Word { const Entry = $($$Word); return $(<Entry of={this} />) as $$Word; }

    parts(): $Letter[] {
        const found: $Letter[] = [];
        const stand = (part: $Letter) => {
            if (part.parent !== this) part.parent = this as never;
            found.push(part);
        };
        for (const written of (this.text.$elements ?? []) as (string | number | $Letter)[]) {
            if (typeof written === 'object') { stand(written); continue; }
            for (const grapheme of [...String(written)]) {
                const made = this.letterFor(grapheme);
                if (made) stand(made);
            }
        }
        return found;
    }

    letterFor(prose: string): $Letter {
        const Letter = $(letters.Letter);
        return $(<Letter>{prose}</Letter>);
    }

    protected whole(): boolean {
        return $check(!/\s/.test(this.copy), 'a word is one unbroken stretch, and this one carries whitespace');
    }

    protected said(): boolean {
        return $check(/[\p{L}\p{N}]/u.test(this.copy), 'a word has at least one letter or number, and this one has none');
    }

    valid(): boolean {
        const base = super.valid();
        const whole = this.whole();
        const said = this.said();
        return base && whole && said;
    }
}

export class $$Word extends $Letter implements $Reference<$Word> {
    $of!: $Word;

    $role?: Role = 'mention';

    view(): ReactNode { return <>{`“${this.copy}”`}</>; }

    get of(): $Word { return this.$of; }
    get copy(): string { return this.of.copy; }
    read(): $Word {
        return this.of;
    }

    follow<U extends $Referent>(next: $Reference<U>): $Reference<U> {
        return $(<Path first={this} onward={next} />);
    }

    valid(): boolean {
        return this.$of !== undefined;
    }
}

export const Word = $($Word);
