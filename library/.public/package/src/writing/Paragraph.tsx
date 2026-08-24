import React, { type ReactNode } from 'react';
import { $, $valid, $Chemical } from '@dna-platform/chemistry';
import { $Composition } from './Composition';
import { $Referent } from '../reference/Referent';
import { $Reference } from '../reference/Reference';
import { $Catalogue } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import { Path } from '../reference/Path';
import { $Theme } from './Theme';
import { $Writing, Role } from './Writing';
import { $Letter } from './Letter';
import { $Sentence, $$Sentence } from './Sentence';
import * as sentences from './Sentence';
import { $Word } from './Word';
import { styled } from 'styled-components';

const sentence = /[^.!?]+[.!?]*\s*/g;
const stopped = /[.!?]["')\]]*\s*$/;
const code = /`[^`\n]+`/g;
const target = /\([^)\s]*\)/g;


export const Prose = styled.p<{ $theme: $Theme }>`
    margin: 0 0 ${p => p.$theme.step(0)};
`;

export const Quotation = styled.blockquote<{ $theme: $Theme }>`
    margin: ${p => p.$theme.step(0)} 0;
    padding-left: ${p => p.$theme.step(0)};
    border-left: 2px solid ${p => p.$theme.rule};
    color: ${p => p.$theme.faint};
    font-style: italic;
`;

export const Item = styled.div<{ $theme: $Theme }>`
    display: flex;
    gap: 0.6em;
    margin: 0 0 ${p => p.$theme.step(-2)};
    padding-left: ${p => p.$theme.step(-1)};

    span:first-child { color: ${p => p.$theme.faint}; flex: 0 0 auto; }
`;

export const Displayed = styled.div<{ $theme: $Theme }>`
    margin: ${p => p.$theme.rhythm} 0;
    text-align: center;
    overflow-x: auto;
`;

export class $Paragraph extends $Writing<$Sentence> implements $Composition<$Sentence> {
    $prose = Prose;
    $quotation = Quotation;
    $item = Item;
    $displayed = Displayed;

    get quoted(): boolean { return this.mark === '>'; }

    get listed(): boolean { return /^([-*+]|\d+[.)])$/.test(this.mark); }

    // Display mathematics — mathematics set on its own line rather than inline.
    // It was `set0`, which is not a word and is the one name in the package a
    // reader could not guess.
    get displayed(): boolean { return this.mark === '$$'; }

    override set(contents: ReactNode, theme: $Theme): ReactNode {
        // A paragraph of nothing but parenthetical objects draws nothing. This
        // is computed here rather than being a public predicate: it has one
        // caller and it is this line.
        const written = (this.text?.$elements ?? []) as unknown[];
        let held = false;
        let only = true;
        for (const one of written) {
            if (one === null || one === undefined) continue;
            if (typeof one === 'object') {
                held = true;
                if (!(one as { parenthetical?: boolean }).parenthetical) { only = false; break; }
                continue;
            }
            if (String(one).trim() !== '') { only = false; break; }
        }
        if (held && only) return null;
        if (this.displayed) {
            const Shown = this.$displayed;
            return <Shown $theme={theme} data-display>{contents}</Shown>;
        }
        if (this.quoted) {
            const Quoted = this.$quotation;
            return <Quoted $theme={theme}>{contents}</Quoted>;
        }
        if (this.listed) {
            const Listed = this.$item;
            return (
                <Listed $theme={theme}>
                    <span aria-hidden>{/^[0-9]/.test(this.mark) ? this.mark : '·'}</span>
                    <span>{contents}</span>
                </Listed>
            );
        }
        const Said = this.$prose;
        return <Said $theme={theme}>{contents}</Said>;
    }

    get sentences(): $Sentence[] { return this.parts(); }
    get words(): $Word[] { return this.sentences.flatMap(s => s.words); }
    get letters(): $Letter[] { return this.sentences.flatMap(s => s.letters); }

    get ref(): $$Paragraph { const Entry = $($$Paragraph); return $(<Entry of={this} />) as $$Paragraph; }

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

    protected written(part: { copy: string; parts?: () => unknown[] }): boolean {
        if (/[\p{L}\p{N}]/u.test(part.copy)) return true;
        // A part that composes ITSELF is the floor, and descending through it
        // would never arrive anywhere.
        return (part.parts?.() ?? []).filter(p => p !== part).some(p => this.written(p as { copy: string }));
    }

    valid(): boolean {
        const base = super.valid();
        const said = $valid(this.parts().some(p => this.written(p)), 'a paragraph has something written in it, and nothing is written in this one');
        return base && said;
    }
}

export class $$Paragraph extends $Sentence implements $Reference<$Paragraph>, $Catalogue<$Sentence> {
    $of!: $Paragraph;

    $role?: Role = 'mention';

    view(): ReactNode { return <>{`“${this.copy}”`}</>; }

    get of(): $Paragraph { return this.$of; }
    get copy(): string { return this.of.copy; }
    get canonical(): $$Sentence { return this.parts()[0]; }

    parts(): $$Sentence[] {
        const Entry = $($$Sentence);
        return this.of.parts().map(part => $(<Entry of={part} />) as $$Sentence);
    }

    where(match: (part: $$Sentence) => boolean): $$Sentence[] {
        return this.parts().filter(match);
    }

    select<U>(pick: (part: $$Sentence) => U): U[] {
        return this.parts().map(pick);
    }

    selectMany<U>(pick: (part: $$Sentence) => U[]): U[] {
        return this.parts().flatMap(pick);
    }

    single(match: (part: $$Sentence) => boolean): $$Sentence {
        const found = this.parts().filter(match);
        if (found.length !== 1) throw new Error(`single expected exactly one part and found ${found.length}.`);
        return found[0];
    }

    at(position: number): $Location<$$Sentence> {
        return this.located<$$Sentence>(position);
    }

    read(): $Paragraph {
        return this.of;
    }

    then<U extends $Referent>(next: $Reference<U>): $Reference<U> {
        return $(<Path first={this} onward={next} />);
    }

    valid(): boolean {
        return this.$of !== undefined;
    }
}

export const Paragraph = $($Paragraph);
