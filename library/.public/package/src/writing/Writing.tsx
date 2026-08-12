import React, { type ReactNode } from 'react';
import { $, $check, $Chemical, $Html } from '@dna-platform/chemistry';
import { $Referent$ } from '../reference/Referent';
import { $Location } from '../reference/Location';
import { $Composible$ } from '../utilities/Composible';
import { block, text } from '../utilities/html';

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

// THE PARSE, as one walk, written once and reused wherever a block must be read.
//
// Take a block and the levels it accepts, and treat each element by its level:
// too high and it cannot stand here, so it throws; too low and it is text, so
// its copy joins the prose around it; at an accepted level and it IS a part,
// exactly the object that was written. The prose between written parts is
// divided and composed as that level divides prose.
//
// Mixing is the point — a figure between two paragraphs leaves the paragraphs
// alone, and both are read in the order they were written.
export function parse<P extends $Writing>(
    elements: $Chemical[],
    accepts: Level[],
    divide: (prose: string) => string[],
    compose: (piece: string) => P | undefined,
    within?: $Writing,
): P[] {
    if (!accepts.length) return [];
    const ceiling = Math.max(...accepts.map(level => levels.indexOf(level)));
    const found: P[] = [];
    let run: unknown[] = [];
    const divided = () => {
        if (!run.length) return;
        const prose = run.map(part => text(part)).join('');
        run = [];
        // THE PARSE DOES NOT JUDGE WHAT IT COMPOSES. An empty piece is not a
        // piece, so nothing composed here is debris — and a part that will not
        // validate is a VALIDATION FAILURE, which the framework already catches,
        // keeps on the instance and draws where it stands. Dropping it silently
        // made the parts shorter than the writing and told nobody.
        // An EMPTY piece is not a piece. A whitespace one IS: a space between two
        // words is syntax — mentioned, present in the writing, passed over by the
        // reading — and dropping it squeezes the spaces out of what the letters
        // give back. Only the empty string is debris.
        for (const piece of divide(prose)) {
            if (!piece) continue;
            const made = compose(piece);
            if (!made) continue;
            // The lineage a composed part needs to be reached THROUGH. Safe only
            // because nothing is written to it any more: a write to a parented
            // chemical diffuses up its whole ancestry and re-runs the reading
            // that made it, which is the loop filed as solutions/16.
            // A composed part arrives as ITS OWN parent, so an absence test never
            // fires — the lineage is threaded by naming what holds it outright.
            if (within && made.parent !== within) made.parent = within as never;
            found.push(made);
        }
    };
    for (const element of elements) {
        const part = element as unknown as $Writing;
        const at = part instanceof $Writing ? levels.indexOf(part.level as Level) : -1;
        if (at > ceiling) {
            throw new Error(
                `A ${part.level} cannot stand among ${accepts.join(' or ')} — it is written at a level above them.`
            );
        }
        // LEVEL ALONE DECIDES. `inline` used to carry the standing test too, and
        // it meant only what chemistry means by it: this arrives inside the block.
        // Everything below a document does, so it can no longer tell a part that
        // stands from prose around it — what tells them apart is the level.
        if (at >= 0 && accepts.includes(part.level as Level)) {
            divided();
            found.push(part as P);
        } else {
            run.push(element);
        }
    }
    divided();
    return found;
}

// Writing at a level, composing the writing one level below it. A letter
// composes nothing and takes the default.
export class $Writing<P extends $Writing = $Writing<any>> extends $Chemical implements $Referent$ {
    text!: $Html<'block'>;

    $parenthetical? = false;
    $role?: Role = undefined;

    get level(): Level | undefined { return undefined; }

    // MENTIONING PROPAGATES BY LINEAGE, not by assignment. A part is mentioned
    // if what holds it is — a quoted word keeps its letters, and quoting does not
    // dissolve them. It used to be WRITTEN onto every composed part, and a write
    // to a parented chemical wakes its whole ancestry, which is the loop this
    // sprint had to remove before a parse could carry a parent at all.
    get role(): Role {
        if (this.$role) return this.$role;
        const held = this.parent;
        return held instanceof $Writing ? held.role : 'use';
    }

    get copy(): string { return text(this.text); }
    get elements(): $Chemical[] { return this.text.$elements ?? []; }
    get parenthetical(): boolean { return !!this.$parenthetical; }
    set parenthetical(value: boolean) { this.$parenthetical = value; }

    constructor() {
        super();
        this.inline = true;
    }

    // Everything below a document is inline, so the framework groups the whole
    // of a writing's own writing into ONE block and hands it over as one thing.
    // There is no sequence left to flatten — which is why `gathered` is gone.
    $Writing(...writing: unknown[]) {
        const first = writing[0];
        this.text = $check((block(first) ? first : undefined) as $Html<'block'>, 'block');
        if (writing.length > 1 || (writing.length === 1 && !block(first))) {
            throw new Error(
                `Writing arrives as one block. ${writing.length} arguments reached this bond, ` +
                `which means something written inside it is not inline and stood apart from the prose.`
            );
        }
    }

    // The levels this one accepts as parts of itself. The level below, by
    // default — a section widens it, because a section may hold sections.
    get accepts(): Level[] {
        const below = beneath(this.level);
        return below ? [below] : [];
    }

    // THE PARSE WRITES NOTHING. Not a number, not a role — so what it composes
    // may carry a parent, and a scope can reach through it into prose.
    parts(): P[] {
        return parse<P>(this.elements, this.accepts, p => this.divide(p), p => this.compose(p), this);
    }

    // How this level divides a run of prose into the writing below it. PROXY.
    divide(prose: string): string[] {
        return prose ? [prose] : [];
    }

    // One piece of divided prose, as writing of the level below. PROXY.
    compose(prose: string): P | undefined {
        return undefined;
    }

    get canonical(): P { return $Composible$.canonical(this); }

    at(position: number): $Location<P> {
        return $Composible$.at(this, position);
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
