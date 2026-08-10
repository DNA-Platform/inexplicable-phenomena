import React, { type ReactNode } from 'react';
import { $, $check, $Chemical, type $Html } from '@dna-platform/chemistry';
import { type $Referent$ } from '../reference/Referent';
import { $Location } from '../reference/Location';
import { $Composible$ } from '../utilities/Composible';
import { block, gathered, text } from '../utilities/html';

// The six levels of writing. A level composes the level below it; a letter
// composes nothing. Declared per class and never assigned.
export type Level = 'letter' | 'word' | 'sentence' | 'paragraph' | 'section' | 'document';

// Writing is used or mentioned. Used writing means what it says; mentioned
// writing is present and stands for itself — a comma, a space, a quoted word.
// What is used is what is read, the way a book's copy reads its numbered
// chapters and passes over the parenthetical ones.
export type Role = 'use' | 'mention';

const levels: Level[] = ['letter', 'word', 'sentence', 'paragraph', 'section', 'document'];

export const beneath = (level: Level | undefined): Level | undefined => {
    const at = level ? levels.indexOf(level) : -1;
    return at > 0 ? levels[at - 1] : undefined;
};

// Writing at a level, composing the writing one level below it. A letter
// composes nothing and takes the default.
export class $Writing<P extends $Writing = $Writing<any>> extends $Chemical implements $Referent$ {
    text!: $Html<'block'>;

    $index?: number = undefined;
    $parenthetical? = false;
    $role?: Role = undefined;

    get level(): Level | undefined { return undefined; }
    get role(): Role { return this.$role ?? 'use'; }

    get copy(): string { return text(this.text); }
    get elements(): $Chemical[] { return this.text.$elements ?? []; }
    get index(): number { return this.$index ?? 0; }
    set index(value: number) { this.$index = value; }
    get parenthetical(): boolean { return !!this.$parenthetical; }
    set parenthetical(value: boolean) { this.$parenthetical = value; }

    constructor() {
        super();
        this.inline = true;
    }

    // The framework hands a bond constructor the whole ordered sequence — inline
    // runs grouped into blocks, and block-level parts as arguments of their own.
    // Taking only the first is what made a written part, and every argument
    // after it, disappear. One block alone is left exactly as it arrives.
    $Writing(...writing: unknown[]) {
        const first = writing[0];
        this.text = $check((block(first) ? first : undefined) as $Html<'block'>, 'block');
        if (writing.length > 1 || (writing.length === 1 && !block(first))) {
            this.text.$elements = gathered(writing);
        }
    }

    // The parse, at every level. Walk the writing in order: a part written at
    // the level below stands as a part where it was written, and the prose
    // between written parts is divided as this level divides prose. Mixing is
    // the point — a figure between two paragraphs leaves the paragraphs alone.
    //
    // A written part is recognised by two facts, and both are needed: it is AT
    // the level below (its kind), and it is not inline (its standing). An
    // author's name is a sentence, but it sits INSIDE a sentence, so its level
    // alone would make it a part of the paragraph holding it.
    parts(): P[] {
        // Mentioned writing is not parsed. It stands for itself, so there is
        // nothing beneath it to find — the parse stops where the mention starts.
        if (this.role === 'mention') return [];
        const below = beneath(this.level);
        if (!below) return [];
        const found: P[] = [];
        let run: unknown[] = [];
        const divided = () => {
            if (!run.length) return;
            const prose = run.map(part => text(part)).join('');
            for (const piece of this.divide(prose)) {
                const made = this.compose(piece);
                if (made && made.valid()) found.push(made);
            }
            run = [];
        };
        for (const element of this.elements) {
            const writing = element as unknown as $Writing;
            if (writing instanceof $Writing && writing.level === below && !writing.inline) {
                divided();
                found.push(writing as P);
            } else {
                run.push(element);
            }
        }
        divided();
        return found.map((part, slot) => {
            part.index = slot + this.first;
            return part;
        });
    }

    // How this level divides a run of prose into the writing below it. PROXY.
    divide(prose: string): string[] {
        return prose ? [prose] : [];
    }

    // One piece of divided prose, as writing of the level below. PROXY.
    compose(prose: string): P | undefined {
        return undefined;
    }

    // Where this level starts counting. A section's first paragraph is its
    // canonical and wears 0; every other level counts from 1.
    get first(): number { return 1; }

    get canonical(): P { return $Composible$.canonical(this); }

    at(index: number): $Location<P> {
        return $Composible$.at(this, index);
    }

    where(match: (part: P) => boolean): P[] {
        return $Composible$.where(this, match);
    }

    select<U>(pick: (part: P) => U): U[] {
        return $Composible$.select(this, pick);
    }

    single(match: (part: P) => boolean): P {
        return $Composible$.single(this, match);
    }

    view(): ReactNode {
        return React.createElement($(this.text) as any);
    }

    valid(): boolean {
        return true;
    }
}

export const Writing = $($Writing);
