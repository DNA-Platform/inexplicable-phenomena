import React, { type ReactNode } from 'react';
import { $, $check, $Html } from '@dna-platform/chemistry';
import { $Referent } from '../reference/Referent';
import type { $Annotation } from '../book/Annotation';
import { $Location } from '../reference/Location';
import * as locations from '../reference/Location';
import { block, text } from '../utilities/html';
import { $Theme, Composed } from './Theme';
import * as themes from './Theme';

export const notation = /\*\*|__|~~|\*[^\s*]|_[^\s_]|\$[^$\n]+\$|`[^`\n]+`|\[[^\]\n]*\]\([^)\s]*\)/;

export type Role = 'use' | 'mention';

export class $Writing<P extends $Writing = $Writing<any>> extends $Referent {
    text!: $Html<'block'>;

    // NOT A PROP. It is set as part of the COMPONENT rather than the view, and
    // a plain property is reactive by default — the `$` was never what made it
    // live, it was what made it settable from JSX.
    parenthetical = false;

    $role?: Role = undefined;

    get role(): Role {
        if (this.$role) return this.$role;
        const held = this.parent;
        return held instanceof $Writing ? held.role : 'use';
    }

    get copy(): string { return text(this.text); }

    // The reading, held against the writing it was read from. A `_` name is
    // inert to the substrate, which is what keeps a cache out of the reactivity.
    _read?: { of: unknown; parts: unknown[] };

    protected reading(): P[] {
        if (this._read && this._read.of === this.text) return this._read.parts as P[];
        const parts = this.parts();
        this._read = { of: this.text, parts };
        return parts;
    }

    protected shown<T>(theme: $Theme, of: Composed, parts: T[], uniform: boolean): T[] | null {
        const lay = theme.lay(of, uniform);
        if (lay === 'run') return null;
        return lay === 'one' ? parts.slice(0, 1) : parts;
    }

    constructor() {
        super();
        this.inline = true;
    }

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

    parts(): P[] {
        return [];
    }

    // THE NEAREST ANCESTOR OF A KIND. Bounded by a self-parent guard rather than
    // by a magic number, and used wherever a writing asks what it stands in.
    protected standing<T>(kind: new (...args: never[]) => T): T | undefined {
        let scope: unknown = this.parent;
        while (scope && !(scope instanceof kind)) {
            const parent = (scope as { parent?: unknown }).parent;
            scope = parent === scope ? undefined : parent;
        }
        return scope as T | undefined;
    }

    get canonical(): P { return this.parts()[0]; }

    // ANNOTATIONS ARE A MEMBER OF WRITING, not a special case of a cover. A cover
    // used to find its author with words.find(w => w instanceof $Author); this is
    // that, generalised to every level and without naming a class.
    //
    // The gather is POLYMORPHIC: a writing's annotations are its parts', and an
    // annotation's are itself. A LETTER HAS NONE, and the reason is structural
    // rather than a rule — an annotation is phrasal and a letter cannot contain a
    // phrase — so the floor's self-composition is skipped rather than guarded.
    //
    // Overridable, which is how lifting evolves without the mechanism changing.
    get annotations(): $Annotation[] {
        return this.parts()
            .filter(part => (part as unknown) !== (this as unknown))
            .flatMap(part => part.annotations);
    }

    protected located<T extends $Referent>(position: number): $Location<T> {
        const Location = $(locations.Location);
        return $(<Location i={position} of={this as never} />);
    }

    at(position: number): $Location<P> {
        return this.located<P>(position);
    }

    where(match: (part: P) => boolean): P[] {
        return this.parts().filter(match);
    }

    select<U>(pick: (part: P) => U): U[] {
        return this.parts().map(pick);
    }

    selectMany<U>(pick: (part: P) => U[]): U[] {
        return this.parts().flatMap(pick);
    }

    single(match: (part: P) => boolean): P {
        const found = this.parts().filter(match);
        if (found.length !== 1) throw new Error(`single expected exactly one part and found ${found.length}.`);
        return found[0];
    }

    get theme(): $Theme {
        return $(themes.Theme).$ as $Theme;
    }

    view(): ReactNode {
        return this.set(this.gathered(this.theme), this.theme);
    }

    protected uniform(): boolean {
        const written = (this.text?.$elements ?? []) as unknown[];
        if (written.some(one => one !== null && typeof one === 'object')) return false;
        return !notation.test(this.copy);
    }

    gathered(theme: $Theme): ReactNode {
        const laid = this.shown(theme, this, this.reading(), this.uniform());
        if (laid === null) return React.createElement($(this.text) as any);
        return laid.map((part, at) => React.createElement($(part) as any, { key: at }));
    }

    set(contents: ReactNode, theme: $Theme): ReactNode {
        return contents;
    }

    valid(): boolean {
        return super.valid();
    }
}

export const Writing = $($Writing);
