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
import * as stresses from './Emphasis';

const marks = /\\.|\[[^\]\n]*\]\([^)\s]*\)|`[^`\n]+`|\$[^$\n]+\$|\*\*|__|~~|\*|_|[\p{L}\p{N}'-]+|[^\p{L}\p{N}'*_`[\]()$\\]+|./gu;

const link = /^\[([^\]\n]*)\]\(([^)\s]*)\)$/;
const stress = /^(\*\*|__|\*|_)$/;
const code = /^`([^`\n]+)`$/;
const math = /^\$([^$\n]+)\$$/;
const escaped = /^\\(.)$/;

const written = (part: { copy: string; parts?: () => any[] }): boolean =>
    /[\p{L}\p{N}]/u.test(part.copy) || (part.parts?.() ?? []).some(written);

export class $Sentence extends $Writing<$Word> implements $Composition$<$Word> {
    get words(): $Word[] { return this.parts().filter(word => word.role === 'use'); }

    get letters(): $Letter[] {
        const Letter = $(letters.Letter);
        return [...this.copy].map(g => $(<Letter>{g}</Letter>) as $Letter);
    }

    get ref(): $$Sentence { const Entry = $($$Sentence); return $(<Entry of={this} />) as $$Sentence; }

    parts(): $Word[] {
        const found: $Word[] = [];
        const stand = (word: $Word) => {
            if (word.parent !== this) word.parent = this as never;
            found.push(word);
        };
        for (const written of (this.text.$elements ?? []) as (string | number | $Word)[]) {
            if (typeof written === 'object') { stand(written); continue; }
            for (const piece of this.stressed(String(written).match(marks) ?? [])) {
                if (typeof piece !== 'string') { stand(piece); continue; }
                const made = this.wordFor(piece);
                if (made) stand(made);
            }
        }
        return found;
    }

    stressed(pieces: string[]): (string | $Word)[] {
        const Emphasis = $(stresses.Emphasis);
        const out: (string | $Word)[] = [];
        for (let at = 0; at < pieces.length; at++) {
            const open = pieces[at];
            if (!stress.test(open)) { out.push(open); continue; }
            const shut = pieces.indexOf(open, at + 1);
            if (shut < 0) { out.push(open); continue; }
            const said = pieces.slice(at + 1, shut).join('').trim();
            if (!said) { out.push(open); continue; }
            out.push($(<Emphasis strong={open.length > 1}>{said}</Emphasis>) as $Word);
            at = shut;
        }
        return out;
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

        if (escaped.test(prose)) return $(<Punctuation>{prose}</Punctuation>);

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
