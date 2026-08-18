import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Composition$ } from './Composition';
import { $Referent } from '../reference/Referent';
import { $Reference$ } from '../reference/Reference';
import { $Catalogue$ } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import { $Composible$ } from '../writing/Composition';
import { $Path, Path } from '../reference/Path';
import { $Writing, Role } from './Writing';
import { $Letter } from './Letter';
import * as letters from './Letter';
import { $Word, $$Word } from './Word';
import * as words from './Word';
import * as punctuation from './Punctuation';
import * as links from '../reference/Link';
import * as formulas from './Formula';
import * as snippets from './Snippet';

// The marks a sentence is written in. A composite is ONE mark — the whole of a
// link, a code span, a formula, an escape — so nothing inside one ever reaches
// the word parse.
const marks = /\\.|\[[^\]\n]*\]\([^)\s]*\)|`[^`\n]+`|\$[^$\n]+\$|\*\*|__|~~|\*|_|[\p{L}\p{N}'-]+|[^\p{L}\p{N}'*_`[\]()$\\]+|./gu;

const link = /^\[([^\]\n]*)\]\(([^)\s]*)\)$/;
const code = /^`([^`\n]+)`$/;
const math = /^\$([^$\n]+)\$$/;
const escaped = /^\\(.)$/;

// SOMETHING IS WRITTEN IN IT — asked of what it HOLDS rather than of what it
// READS. A parenthetical part is passed over by the reading, so a paragraph
// carrying only an author or a subject reads as nothing and is not empty: the
// author is written there. This became visible the day written elements stopped
// dissolving into text, which is the model gaining them rather than changing.
const written = (part: { copy: string; parts?: () => any[] }): boolean =>
    /[\p{L}\p{N}]/u.test(part.copy) || (part.parts?.() ?? []).some(written);

export class $Sentence extends $Writing<$Word> implements $Composition$<$Word> {

    // The words of a sentence are the USED ones. Its syntax is there among its
    // parts — mentioned, standing for itself — and the reading passes over it,
    // the way a book's copy passes over its parenthetical chapters.
    get words(): $Word[] { return this.parts().filter(word => word.role === 'use'); }

    get letters(): $Letter[] {
        const Letter = $(letters.Letter);
        return [...this.copy].map(g => $(<Letter>{g}</Letter>) as $Letter);
    }

    get ref(): $$Sentence { const Entry = $($$Sentence); return $(<Entry of={this} />) as $$Sentence; }

    // A sentence is divided into its words AND the syntax between them. The
    // words are used; the spaces, commas and stops are mentioned — present in
    // the writing, passed over by the reading, exactly as a book's copy passes
    // over its parenthetical chapters.
    // Composite tokens are pulled out WHOLE, before anything is split into words
    // — a link's target must never reach the word parse, or `https` and `com`
    // are counted as prose, and mathematics must keep its underscores. Order
    // matters: escape, link, code span, math, then the emphasis marks, then
    // words, then everything else.
    // A SENTENCE READS ITS OWN CONTENTS: prose and written elements, in
    // written order. A word written here IS one of this sentence's words —
    // whatever kind of word it is — which is the whole of being able to write
    // one. Every mark a sentence finds is a finished word, so an element between
    // two of them stands on its own rather than joining either.
    parts(): $Word[] {
        const found: $Word[] = [];
        const stand = (word: $Word) => {
            if (word.parent !== this) word.parent = this as never;
            found.push(word);
        };
        for (const written of (this.text.$elements ?? []) as (string | number | $Word)[]) {
            if (typeof written === 'object') { stand(written); continue; }
            for (const mark of String(written).match(marks) ?? []) {
                const made = this.wordFor(mark);
                if (made) stand(made);
            }
        }
        return found;
    }

    wordFor(prose: string): $Word {
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
        return super.valid() && this.parts().some(written);
    }
}

export class $$Sentence extends $Word implements $Reference$<$Sentence>, $Catalogue$<$Word> {
    $of!: $Sentence;

    $role?: Role = 'mention';

    view(): ReactNode { return <>{`“${this.copy}”`}</>; }

    get of(): $Sentence { return this.$of; }
    get copy(): string { return this.of.copy; }
    get canonical(): $$Word { return $Composible$.canonical(this); }

    parts(): $$Word[] {
        const Entry = $($$Word);
        return this.of.parts().map(part => $(<Entry of={part} />) as $$Word);
    }

    where(match: (part: $$Word) => boolean): $$Word[] {
        return $Composible$.where(this, match);
    }

    select<U>(pick: (part: $$Word) => U): U[] {
        return $Composible$.select(this, pick);
    }

    selectMany<U>(pick: (part: $$Word) => U[]): U[] {
        return $Composible$.selectMany(this, pick);
    }

    single(match: (part: $$Word) => boolean): $$Word {
        return $Composible$.single(this, match);
    }

    at(position: number): $Location<$$Word> {
        return $Composible$.at(this, position);
    }

    follow(): $Composition$<$Word> {
        return $Composible$.follow(this as never);
    }

    read(): $Sentence {
        return this.of;
    }

    then<U extends $Referent>(next: $Reference$<U>): $Reference$<U> {
        return $(<Path first={this} onward={next} />);
    }

    valid(): boolean {
        return this.$of !== undefined;
    }
}

export const Sentence = $($Sentence);
