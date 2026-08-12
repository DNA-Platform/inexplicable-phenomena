import React from 'react';
import { $ } from '@dna-platform/chemistry';
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
import { $Word } from './Word';
import * as words from './Word';
import * as punctuation from './Punctuation';
import * as links from '../reference/Link';
import * as formulas from './Formula';
import * as snippets from './Snippet';

// The marks a sentence is written in. A composite is one token — the whole of a
// link, a code span, a formula, an escape — so nothing inside one ever reaches
// the word parse.
const token = /\\.|\[[^\]\n]*\]\([^)\s]*\)|`[^`\n]+`|\$[^$\n]+\$|\*\*|__|~~|\*|_|[\p{L}\p{N}'-]+|[^\p{L}\p{N}'*_`[\]()$\\]+|./gu;

const link = /^\[([^\]\n]*)\]\(([^)\s]*)\)$/;
const code = /^`([^`\n]+)`$/;
const math = /^\$([^$\n]+)\$$/;
const escaped = /^\\(.)$/;

export class $Sentence extends $Writing<$Word> implements $Composition$<$Word> {
    get level(): Level { return 'sentence'; }

    // The words of a sentence are the USED ones. Its syntax is there among its
    // parts — mentioned, standing for itself — and the reading passes over it,
    // the way a book's copy passes over its parenthetical chapters.
    get words(): $Word[] { return this.parts().filter(word => word.role === 'use'); }

    get letters(): $Letter[] {
        const Letter = $(letters.Letter);
        return [...this.copy].map(g => $(<Letter>{g}</Letter>) as $Letter);
    }

    get ref(): $$Sentence { return new $$Sentence(this); }

    // A sentence is divided into its words AND the syntax between them. The
    // words are used; the spaces, commas and stops are mentioned — present in
    // the writing, passed over by the reading, exactly as a book's copy passes
    // over its parenthetical chapters.
    // Composite tokens are pulled out WHOLE, before anything is split into words
    // — a link's target must never reach the word parse, or `https` and `com`
    // are counted as prose, and mathematics must keep its underscores. Order
    // matters: escape, link, code span, math, then the emphasis marks, then
    // words, then everything else.
    divide(prose: string): string[] {
        return prose.match(token) ?? [];
    }

    compose(prose: string): $Word {
        const Word = $(words.Word);
        const Punctuation = $(punctuation.Punctuation);

        const asLink = link.exec(prose);
        if (asLink) {
            const Link = $(links.Link);
            return $(<Link url={asLink[2]}>{asLink[1]}</Link>);
        }

        const asMath = math.exec(prose);
        if (asMath) { const Formula = $(formulas.Formula); return $(<Formula>{asMath[1]}</Formula>); }

        const asCode = code.exec(prose);
        if (asCode) { const Snippet = $(snippets.Snippet); return $(<Snippet>{asCode[1]}</Snippet>); }

        // An escape and the mark it escapes are ONE mentioned part. Splitting
        // them would put a mark in the writing that the author wrote in order
        // to prevent one.
        if (escaped.test(prose)) return $(<Punctuation>{prose}</Punctuation>);

        // Everything else forks the way it always did: letters make a word, and
        // a mark stands for itself. An unpaired asterisk lands here, which is
        // why it needs no case — pairing is a fact about two marks, never a
        // property of one.
        return /[\p{L}\p{N}]/u.test(prose) ? $(<Word>{prose}</Word>) : $(<Punctuation>{prose}</Punctuation>);
    }

    valid(): boolean {
        return super.valid() && /[\p{L}\p{N}]/u.test(this.copy);
    }
}

export class $$Sentence implements $Catalogue$<$Word>, $Reference$<$Sentence> {
    parenthetical = false;

    constructor(public of: $Sentence) { }

    get copy(): string { return this.parts().map(r => r.copy).join(' '); }
    get canonical(): $Reference$<$Word> { return $Composible$.canonical(this); }

    parts(): $Reference$<$Word>[] {
        return this.of.parts().map((_, position) => this.of.at(position));
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

    at(position: number): $Location<$Reference$<$Word>> {
        return $Composible$.at(this, position);
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
