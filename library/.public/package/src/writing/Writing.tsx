import React, { type ReactNode } from 'react';
import { $, $check, $Chemical, $Html } from '@dna-platform/chemistry';
import { $Referent } from '../reference/Referent';
import { $Location } from '../reference/Location';
import { $Composible$ } from '../writing/Composition';
import { block, text } from '../utilities/html';
import { $Theme, Composed } from './Theme';
import * as themes from './Theme';

// THE DRAW PATH READS ONCE, and this is forced rather than an optimisation.
//
// `parts()` builds fresh objects on every call AND adopts each one — a write to
// a chemical that has a parent, which diffuses up and re-runs the render that
// asked. Outside a render that is harmless; inside one it never terminates, and
// it exhausts the heap rather than throwing. The law is already filed: a parse
// may not be given a parent while it mutates what it makes.
//
// So the DRAWING holds what it read, keyed on the writing it read from. The
// model is untouched: `parts()` is exactly what it was, and anything asking it
// outside a render still gets a fresh reading.
const held = new WeakMap<object, { of: unknown; parts: unknown[] }>();

const reading = <P extends $Writing>(of: $Writing<P>): P[] => {
    const seen = held.get(of);
    if (seen && seen.of === of.text) return seen.parts as P[];
    const parts = of.parts();
    held.set(of, { of: of.text, parts });
    return parts;
};

// WHAT A COMPOSITION SHOWS, decided once for every composition there is.
//
// Three things lay parts — writing, a document and a book — and each used to
// carry its own copy of this, which is a template nobody shares. It answers
// null for "draw your own text" so the caller keeps the one decision it alone
// can make: what its own writing looks like.
export const shown = <T,>(theme: $Theme, of: Composed, parts: T[], uniform: boolean, page: number): T[] | null => {
    const lay = theme.lay(of, uniform);
    if (lay === 'run') return null;
    return lay === 'one' ? parts.slice(page, page + 1) : parts;
};

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

    /** Which part a composition opens to when the theme lays one at a time. */
    page = 0;

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

    // THE DRAWING, and it is one template every level inherits: ASK the theme
    // how these parts are laid, GATHER what that decides, EMIT the class's own
    // structure around it. A subclass overrides `emit` alone and keeps the rest.
    // EVERY PIECE OF WRITING HAS A THEME — Doug's, 2026-08-20, and the bend in
    // the word is deliberate: writing has a theme in both senses. It is a
    // GETTER rather than a field because a field initializer runs on the
    // template before any scope exists, and because a theme held from bind
    // time could never be swapped for another.
    get theme(): $Theme {
        return $(themes.Theme).$ as $Theme;
    }

    view(): ReactNode {
        return this.emit(this.gathered(this.theme), this.theme);
    }

    // WHETHER THIS IS PLAIN PROSE. Asked of the WRITING rather than of the
    // parsed parts, which is what keeps it off the parse: a chemical written
    // among the prose is the only thing that makes a run not a run, and that
    // is one scan of what the block was handed. A level whose parts differ by
    // construction says so itself.
    uniform(): boolean {
        const written = (this.text?.$elements ?? []) as unknown[];
        return !written.some(one => one !== null && typeof one === 'object');
    }

    gathered(theme: $Theme): ReactNode {
        const laid = shown(theme, this, reading(this), this.uniform(), this.page);
        if (laid === null) return React.createElement($(this.text) as any);
        return laid.map((part, at) => React.createElement($(part) as any, { key: at }));
    }

    emit(contents: ReactNode, theme: $Theme): ReactNode {
        return contents;
    }

    valid(): boolean {
        return true;
    }
}

export const Writing = $($Writing);
