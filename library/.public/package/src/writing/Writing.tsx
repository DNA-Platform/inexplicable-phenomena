import React, { type ReactNode } from 'react';
import { $, $check, $Chemical, $Html } from '@dna-platform/chemistry';
import { $Referent } from '../reference/Referent';
import { $Location } from '../reference/Location';
import { $Composible$ } from '../writing/Composition';
import { block, text } from '../utilities/html';

export type Role = 'use' | 'mention';

// WRITING, and every level reads its OWN contents.
//
// There was one generic parse here, taking `accepts`, `divide` and `compose` as
// callbacks — one shape imposed on every level. But a section divides by
// markdown blocks, a sentence by the marks it is written in, a word by its
// graphemes: three
// different parses wearing one interface. And the interface is what forced this
// base to reason about levels it may not import, which is where a stringly
// `level`, an ordered list of them and an ordinal comparison all came from.
//
// Each level writes its own `parts()` now. Nothing here decides for a subclass,
// and what is left below is the answer for a LEAF — a letter, a subtitle, a
// tagline — which composes nothing and always did.
export class $Writing<P extends $Writing = $Writing<any>> extends $Referent {
    text!: $Html<'block'>;

    $parenthetical? = false;
    $role?: Role = undefined;

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

    // A LEAF COMPOSES NOTHING. Anything that does composes it its own way and
    // says so by writing `parts()`.
    parts(): P[] {
        return [];
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

    selectMany<U>(pick: (part: P) => U[]): U[] {
        return $Composible$.selectMany(this, pick);
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
