import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { type $Composition$ } from './Composition';
import { type $Referent$ } from '../reference/Referent';
import { type $Reference$ } from '../reference/Reference';
import { type $Catalogue$ } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import { $Composible$ } from '../utilities/Composible';
import { $Path, Path } from '../reference/Path';
import { $Writing, type Level } from './Writing';
import { $Letter } from './Letter';
import * as letters from './Letter';
import { $Word } from './Word';
import * as words from './Word';
import * as punctuation from './Punctuation';

export class $Sentence extends $Writing<$Word> implements $Composition$<$Word> {
    get level(): Level { return 'sentence'; }

    // The words of a sentence are the USED ones. Its syntax is there among its
    // parts — mentioned, standing for itself — and the reading passes over it,
    // the way a book's copy passes over its parenthetical chapters.
    get words(): $Word[] { return this.parts().filter(word => word.role === 'use'); }

    get letters(): $Letter[] {
        const Letter = $(letters.Letter);
        return [...this.copy].map((g, i) => {
            const letter: $Letter = $(<Letter>{g}</Letter>);
            letter.index = i + 1;
            return letter;
        });
    }

    get ref(): $$Sentence { return new $$Sentence(this); }

    // A sentence is divided into its words AND the syntax between them. The
    // words are used; the spaces, commas and stops are mentioned — present in
    // the writing, passed over by the reading, exactly as a book's copy passes
    // over its parenthetical chapters.
    divide(prose: string): string[] {
        return prose.match(/[\p{L}\p{N}']+|[^\p{L}\p{N}']+/gu) ?? [];
    }

    compose(prose: string): $Word {
        const Word = $(words.Word);
        const Punctuation = $(punctuation.Punctuation);
        return /[\p{L}\p{N}]/u.test(prose) ? $(<Word>{prose}</Word>) : $(<Punctuation>{prose}</Punctuation>);
    }

    valid(): boolean {
        return super.valid() && /[\p{L}\p{N}]/u.test(this.copy);
    }
}

export class $$Sentence implements $Catalogue$<$Word>, $Reference$<$Sentence> {
    index = 0;
    parenthetical = false;

    constructor(public of: $Sentence) { }

    get copy(): string { return this.parts().map(r => r.copy).join(' '); }
    get canonical(): $Reference$<$Word> { return $Composible$.canonical(this); }

    parts(): $Reference$<$Word>[] {
        return this.of.parts().map((word, slot) => {
            const reference = this.of.at(word.index);
            reference.index = slot + 1;
            return reference;
        });
    }

    where(match: (reference: $Reference$<$Word>) => boolean): $Reference$<$Word>[] {
        return $Composible$.where(this, match);
    }

    select<U>(pick: (reference: $Reference$<$Word>) => U): U[] {
        return $Composible$.select(this, pick);
    }

    single(match: (reference: $Reference$<$Word>) => boolean): $Reference$<$Word> {
        return $Composible$.single(this, match);
    }

    at(index: number): $Location<$Reference$<$Word>> {
        return $Composible$.at(this, index);
    }

    follow(): $Composition$<$Word> {
        return $Composible$.follow(this);
    }

    read(): $Sentence {
        return this.of;
    }

    valid(): boolean {
        return this.of.valid();
    }

    then<U extends $Referent$>(next: $Reference$<U>): $Reference$<U> {
        const path: $Path<$Sentence, U> = $(<Path first={this} onward={next} />);
        return path;
    }
}

export const Sentence = $($Sentence);
