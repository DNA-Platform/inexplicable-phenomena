import React, { type ReactNode } from 'react';
import { $, $check, $Chemical, $Html } from '@dna-platform/chemistry';
import { $Referent } from '../reference/Referent';
import { $Location } from '../reference/Location';
import { $Composible$ } from '../writing/Composition';
import { block, text } from '../utilities/html';
import { $Theme, Composed } from './Theme';
import * as themes from './Theme';

const held = new WeakMap<object, { of: unknown; parts: unknown[] }>();

const reading = <P extends $Writing>(of: $Writing<P>): P[] => {
    const seen = held.get(of);
    if (seen && seen.of === of.text) return seen.parts as P[];
    const parts = of.parts();
    held.set(of, { of: of.text, parts });
    return parts;
};

export const shown = <T,>(theme: $Theme, of: Composed, parts: T[], uniform: boolean, page: number): T[] | null => {
    const lay = theme.lay(of, uniform);
    if (lay === 'run') return null;
    return lay === 'one' ? parts.slice(page, page + 1) : parts;
};

export const notation = /\*\*|__|~~|\*[^\s*]|_[^\s_]|\$[^$\n]+\$|`[^`\n]+`|\[[^\]\n]*\]\([^)\s]*\)/;

export type Role = 'use' | 'mention';

export class $Writing<P extends $Writing = $Writing<any>> extends $Referent {
    text!: $Html<'block'>;

    $parenthetical? = false;
    $role?: Role = undefined;

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

    get theme(): $Theme {
        return $(themes.Theme).$ as $Theme;
    }

    view(): ReactNode {
        return this.set(this.gathered(this.theme), this.theme);
    }

    uniform(): boolean {
        const written = (this.text?.$elements ?? []) as unknown[];
        if (written.some(one => one !== null && typeof one === 'object')) return false;
        return !notation.test(this.copy);
    }

    gathered(theme: $Theme): ReactNode {
        const laid = shown(theme, this, reading(this), this.uniform(), 0);
        if (laid === null) return React.createElement($(this.text) as any);
        return laid.map((part, at) => React.createElement($(part) as any, { key: at }));
    }

    set(contents: ReactNode, theme: $Theme): ReactNode {
        return contents;
    }

    valid(): boolean {
        return true;
    }
}

export const Writing = $($Writing);
