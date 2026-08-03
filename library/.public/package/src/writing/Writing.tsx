import React, { type ReactNode } from 'react';
import { $, $check, $Chemical, type $Html } from '@dna-platform/chemistry';
import { type $Referent } from '../reference/Referent';
import { text } from '../utilities/html';

export class $Writing extends $Chemical implements $Referent {
    text!: $Html<'block'>;

    $index?: number = undefined;
    $parenthetical? = false;

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

    $Writing(text: $Html<'block'>) {
        this.text = $check(text, 'block');
    }

    view(): ReactNode {
        return React.createElement($(this.text) as any);
    }

    valid(): boolean {
        return true;
    }
}

export const Writing = $($Writing);
