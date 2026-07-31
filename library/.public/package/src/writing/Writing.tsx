import React, { type ReactNode } from 'react';
import { $, $check, type $Html } from '@dna-platform/chemistry';
import { $Referent } from '../reference/Referent';
import { text } from '../tools/html';

export class $Writing extends $Referent {
    block?: $Html<'block'>;

    $index?: number = undefined;
    $parenthetical? = false;

    get copy(): string { return text(this.block); }
    get index(): number { return this.$index ?? 0; }
    set index(value: number) { this.$index = value; }
    get parenthetical(): boolean { return !!this.$parenthetical; }
    set parenthetical(value: boolean) { this.$parenthetical = value; }

    constructor() {
        super();
        this.inline = true;
    }

    $Writing(block?: $Html<'block'>) {
        this.block = $check(block, 'block');
    }

    view(): ReactNode {
        if (!this.block) return null;
        return React.createElement($(this.block) as any);
    }
}

export const Writing = $($Writing);
