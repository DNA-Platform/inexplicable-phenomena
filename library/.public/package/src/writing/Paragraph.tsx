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

const sentence = /[^.!?]+[.!?]*\s*/g;
const stopped = /[.!?]["')\]]*\s*$/;
const code = /`[^`\n]+`/g;
const target = /\([^)\s]*\)/g;

const written = (part: { copy: string; parts?: () => any[] }): boolean =>
    /[\p{L}\p{N}]/u.test(part.copy) || (part.parts?.() ?? []).some(written);

export class $Paragraph extends $Writing<$Sentence> implements $Composition$<$Sentence> {
    matter(): boolean {
        const written = (this.text?.$elements ?? []) as unknown[];
        let held = false;
        for (const one of written) {
            if (one === null || one === undefined) continue;
            if (typeof one === 'object') {
                held = true;
                if (!(one as { parenthetical?: boolean }).parenthetical) return false;
                continue;
            }
            if (String(one).trim() !== '') return false;
        }
        return held;
    }

    get quoted(): boolean { return this.mark === '>'; }

    get listed(): boolean { return /^([-*+]|\d+[.)])$/.test(this.mark); }

    get set0(): boolean { return this.mark === '$$'; }

    override set(contents: ReactNode, theme: $Theme): ReactNode {
        if (this.matter()) return null;
        if (this.set0) {
            return <div data-display style={{ margin: `${theme.rhythm} 0`, textAlign: 'center', overflowX: 'auto' }}>{contents}</div>;
        }
        if (this.quoted) {
            return (
                <blockquote style={{ margin: `${theme.step(0)} 0`, paddingLeft: theme.step(0), borderLeft: `2px solid ${theme.rule}`, color: theme.faint, fontStyle: 'italic' }}>
                    {contents}
                </blockquote>
            );
        }
        if (this.listed) {
            return (
                <div style={{ display: 'flex', gap: '0.6em', margin: `0 0 ${theme.step(-2)}`, paddingLeft: theme.step(-1) }}>
                    <span aria-hidden style={{ color: theme.faint, flex: '0 0 auto' }}>{/^[0-9]/.test(this.mark) ? this.mark : '·'}</span>
                    <span>{contents}</span>
                </div>
            );
        }
        return <p style={{ margin: `0 0 ${theme.step(0)}` }}>{contents}</p>;
    }

    get sentences(): $Sentence[] { return this.parts(); }
    get words(): $Word[] { return this.sentences.flatMap(s => s.words); }
    get letters(): $Letter[] { return this.words.flatMap(w => w.letters); }

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
