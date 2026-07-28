import React, { type ReactNode } from 'react';
import { $, $check, type $Html } from '@dna-platform/chemistry';
import { $Referent } from '../ref/Referent';
import { text, display } from '../tools/html';
import { type $Composition } from './Composition';
import { $Character, Character } from './Character';

export class $Word extends $Referent implements $Composition<$Character> {
    block?: $Html<'block'>;

    get copy(): string { return text(this.block); }
    get parts(): $Character[] { return [...this.copy].filter(g => $Character.valid(g)).map(g => $<$Character>(<Character>{g}</Character>)); }
    get canonical(): $Character { return this.parts[0]; }
    get characters(): $Character[] { return this.parts; }

    constructor() {
        super();
        this.inline = true;
    }

    $Word(block?: $Html<'block'>) {
        this.block = $check(block, 'block');
    }

    view(): ReactNode {
        return display(this);
    }

    static valid(copy: string): boolean {
        return /^[\p{L}\p{N}']+$/u.test(copy) && /[\p{L}\p{N}]/u.test(copy);
    }
}

export const Word = $($Word);
