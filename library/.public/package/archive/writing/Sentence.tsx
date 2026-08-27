import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Composition } from './Composition';
import { $Referent } from '../reference/Referent';
import { $Reference } from '../reference/Reference';
import { $Catalogue } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import { Path } from '../reference/Path';
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

export class $Sentence extends $Writing<$Word> implements $Composition<$Word> {
    get words(): $Word[] { return this.parts().filter(word => word.role === 'use'); }

    get letters(): $Letter[] { return this.parts().flatMap(w => w.letters); }

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

    protected written(part: { copy: string; parts?: () => unknown[] }): boolean {
        if (/[\p{L}\p{N}]/u.test(part.copy)) return true;
        // A part that composes ITSELF is the floor, and descending through it
        // would never arrive anywhere.
        return (part.parts?.() ?? []).filter(p => p !== part).some(p => this.written(p as { copy: string }));
    }

    valid(): boolean {
        return super.valid() && this.parts().some(p => this.written(p));
    }
}

export class $$Sentence extends $Word implements $Reference<$Sentence>, $Catalogue<$Word> {
    $of!: $Sentence;

    $role?: Role = 'mention';

    view(): ReactNode { return <>{`“${this.copy}”`}</>; }

    get of(): $Sentence { return this.$of; }
    get copy(): string { return this.of.copy; }
    get canonical(): $$Word { return this.parts()[0]; }

    parts(): $$Word[] {
        const Entry = $($$Word);
        return this.of.parts().map(part => $(<Entry of={part} />) as $$Word);
    }

    where(match: (part: $$Word) => boolean): $$Word[] {
        return this.parts().filter(match);
    }

    select<U>(pick: (part: $$Word) => U): U[] {
        return this.parts().map(pick);
    }

    selectMany<U>(pick: (part: $$Word) => U[]): U[] {
        return this.parts().flatMap(pick);
    }

    single(match: (part: $$Word) => boolean): $$Word {
        const found = this.parts().filter(match);
        if (found.length !== 1) throw new Error(`single expected exactly one part and found ${found.length}.`);
        return found[0];
    }

    at(position: number): $Location<$$Word> {
        return this.located<$$Word>(position);
    }

    read(): $Sentence {
        return this.of;
    }

    follow<U extends $Referent>(next: $Reference<U>): $Reference<U> {
        return $(<Path first={this} onward={next} />);
    }

    valid(): boolean {
        return this.$of !== undefined;
    }
}

export const Sentence = $($Sentence);
