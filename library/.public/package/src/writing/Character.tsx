import { type ReactNode } from 'react';
import { $, $check, type $Html } from '@dna-platform/chemistry';
import { $Referent } from '../ref/Referent';
import { type $Writing, $WritingExtensions } from './Writing';

export class $Character extends $Referent implements $Writing {
    block?: $Html<'block'>;

    $index?: number = undefined;
    $parenthetical? = false;

    get copy(): string { return $WritingExtensions.copy(this); }
    get index(): number { return this.$index ?? 0; }
    set index(value: number) { this.$index = value; }
    get parenthetical(): boolean { return !!this.$parenthetical; }
    set parenthetical(value: boolean) { this.$parenthetical = value; }

    constructor() {
        super();
        this.inline = true;
    }

    $Character(block?: $Html<'block'>) {
        this.block = $check(block, 'block');
    }

    view(): ReactNode {
        return $WritingExtensions.display(this);
    }

    valid(): boolean {
        return super.valid() && [...this.copy].length === 1;
    }
}

export const Character = $($Character);
