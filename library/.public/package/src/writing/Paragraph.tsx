import React, { type ReactNode } from 'react';
import { $, $valid, $Chemical } from '@dna-platform/chemistry';
import { $Composition$ } from './Composition';
import { $Referent } from '../reference/Referent';
import { $Reference$ } from '../reference/Reference';
import { $Catalogue$ } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import { $Composible$ } from '../writing/Composition';
import { $Path, Path } from '../reference/Path';
import { $Theme } from './Theme';
import { $Writing, Role } from './Writing';
import { $Letter } from './Letter';
import { $Sentence, $$Sentence } from './Sentence';
import * as sentences from './Sentence';
import { $Word } from './Word';


// A sentence runs to its stop AND THE WHITESPACE THAT FOLLOWS IT. Nothing is
// thrown out by a parse, and the separator belongs to the sentence it ends.
const sentence = /[^.!?]+[.!?]*\s*/g;
const stopped = /[.!?]["')\]]*\s*$/;
const code = /`[^`\n]+`/g;
const target = /\([^)\s]*\)/g;

// SOMETHING IS WRITTEN IN IT — asked of what it HOLDS rather than of what it
// READS. A parenthetical part is passed over by the reading, so a paragraph
// carrying only an author or a subject reads as nothing and is not empty: the
// author is written there. This became visible the day written elements stopped
// dissolving into text, which is the model gaining them rather than changing.
const written = (part: { copy: string; parts?: () => any[] }): boolean =>
    /[\p{L}\p{N}]/u.test(part.copy) || (part.parts?.() ?? []).some(written);

export class $Paragraph extends $Writing<$Sentence> implements $Composition$<$Sentence> {
    // A PARAGRAPH IS THE CANONICAL BLOCK, and it draws as one. Found by driving:
    // once a section drew its parts, nothing separated one paragraph from the
    // next and a cover's prose, author and subject ran into one line.
    override emit(contents: ReactNode, theme: $Theme): ReactNode {
        return <p style={{ margin: `0 0 ${theme.step(0)}` }}>{contents}</p>;
    }


    get sentences(): $Sentence[] { return this.parts(); }
    get words(): $Word[] { return this.sentences.flatMap(s => s.words); }
    get letters(): $Letter[] { return this.words.flatMap(w => w.letters); }

    get ref(): $$Paragraph { const Entry = $($$Paragraph); return $(<Entry of={this} />) as $$Paragraph; }


    // A PARAGRAPH READS ITS OWN CONTENTS, accumulating until a stop closes a
    // sentence. "Blah blah " carries no stop, so an element written after it
    // JOINS that sentence rather than starting another — which is why writing a
    // word into the middle of a sentence gives one sentence.
    //
    // THE NEW SENTENCE IS HANDED THE LITERAL CONTENTS OF ITS SPAN: the prose and
    // the written elements, in written order, straight to its bond constructor.
    // Nothing is flattened to text, which is the whole defect this replaces.
    parts(): $Sentence[] {
        const Sentence = $(sentences.Sentence);
        const found: $Sentence[] = [];
        let held: (string | $Chemical)[] = [];

        const close = () => {
            if (!held.length) return;
            const made = $(<Sentence />, ...held) as $Sentence;
            if (made.parent !== this) made.parent = this as never;
            found.push(made);
            held = [];
        };

        for (const written of (this.text.$elements ?? []) as (string | number | $Chemical)[]) {
            if (typeof written === 'object') {
                if (written instanceof $Sentence) { close(); found.push(written); continue; }
                held.push(written);
                continue;
            }
            for (const piece of this.stops(String(written))) {
                held.push(piece);
                if (stopped.test(piece)) close();
            }
        }
        close();
        return found;
    }

    // Where a paragraph's sentences end, LOSING NOTHING — the whitespace after a
    // stop goes to the sentence whose stop it follows, and is picked up among
    // that sentence's own parts. A stop inside a code span or a link's target is
    // not the end of a sentence.
    stops(prose: string): string[] {
        const holds: string[] = [];
        const kept = prose
            .replace(code, m => ` ${holds.push(m) - 1} `)
            .replace(target, m => ` ${holds.push(m) - 1} `);
        const restore = (piece: string) => piece.replace(/ (\d+) /g, (_, i) => holds[Number(i)]);
        return (kept.match(sentence) ?? []).map(restore);
    }


    $mark? = '';

    get mark(): string { return this.$mark ?? ''; }

    valid(): boolean {
        const base = super.valid();
        const said = $valid(this.parts().some(written), 'a paragraph has something written in it, and nothing is written in this one');
        return base && said;
    }
}

export class $$Paragraph extends $Sentence implements $Reference$<$Paragraph>, $Catalogue$<$Sentence> {
    $of!: $Paragraph;

    $role?: Role = 'mention';

    view(): ReactNode { return <>{`“${this.copy}”`}</>; }

    get of(): $Paragraph { return this.$of; }
    get copy(): string { return this.of.copy; }
    get canonical(): $$Sentence { return $Composible$.canonical(this); }

    parts(): $$Sentence[] {
        const Entry = $($$Sentence);
        return this.of.parts().map(part => $(<Entry of={part} />) as $$Sentence);
    }

    where(match: (part: $$Sentence) => boolean): $$Sentence[] {
        return $Composible$.where(this, match);
    }

    select<U>(pick: (part: $$Sentence) => U): U[] {
        return $Composible$.select(this, pick);
    }

    selectMany<U>(pick: (part: $$Sentence) => U[]): U[] {
        return $Composible$.selectMany(this, pick);
    }

    single(match: (part: $$Sentence) => boolean): $$Sentence {
        return $Composible$.single(this, match);
    }

    at(position: number): $Location<$$Sentence> {
        return $Composible$.at(this, position);
    }

    follow(): $Composition$<$Sentence> {
        return $Composible$.follow(this as never);
    }

    read(): $Paragraph {
        return this.of;
    }

    then<U extends $Referent>(next: $Reference$<U>): $Reference$<U> {
        return $(<Path first={this} onward={next} />);
    }

    valid(): boolean {
        return this.$of !== undefined;
    }
}

export const Paragraph = $($Paragraph);
