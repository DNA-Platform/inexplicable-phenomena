import { type ReactNode } from 'react';
import { $, $check, type $Html } from '@dna-platform/chemistry';
import { $Referent } from '../ref/Referent';
import { text, display } from '../tools/html';
import { type $Writing } from './Composition';

export class $Character extends $Referent implements $Writing {
    block?: $Html<'block'>;

    get copy(): string { return text(this.block); }

    constructor() {
        super();
        this.inline = true;
    }

    $Character(block?: $Html<'block'>) {
        this.block = $check(block, 'block');
    }

    view(): ReactNode {
        return display(this);
    }

    static valid(copy: string): boolean {
        return [...copy].length === 1;
    }
}

export const Character = $($Character);
