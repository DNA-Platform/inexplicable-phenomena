import { type ReactNode } from 'react';
import { $, $check, type $Html } from '@dna-platform/chemistry';
import { $Referent } from '../ref/Referent';
import { text, display } from '../tools/html';
import { type $Writing } from './Writing';

export class $Tagline extends $Referent implements $Writing {
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

    $Tagline(block?: $Html<'block'>) {
        this.block = $check(block, 'block');
    }

    view(): ReactNode {
        return display(this);
    }

    valid(): boolean {
        return super.valid() && this.copy !== '';
    }
}

export const Tagline = $($Tagline);
