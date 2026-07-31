import React, { type ReactNode } from 'react';
import { $, $check, type $Html } from '@dna-platform/chemistry';
import { $Referent } from '../ref/Referent';
import { text, display } from '../tools/html';
import { type $Composition } from './Composition';
import { $Character, Character } from './Character';

export class $Word extends $Referent implements $Composition<$Character> {
    block?: $Html<'block'>;

    $index?: number = undefined;
    $parenthetical? = false;

    get copy(): string { return text(this.block); }
    get index(): number { return this.$index ?? 0; }
    set index(value: number) { this.$index = value; }
    get parenthetical(): boolean { return !!this.$parenthetical; }
    set parenthetical(value: boolean) { this.$parenthetical = value; }
    get canonical(): $Character { return this.parts[0]; }
    get characters(): $Character[] { return this.parts; }

    get parts(): $Character[] {
        const characters: $Character[] = [...this.copy].map(g => $(<Character>{g}</Character>));
        return characters.filter(c => c.valid()).map((c, i) => { c.index = i + 1; return c; });
    }

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

    valid(): boolean {
        return super.valid() && /^[\p{L}\p{N}']+$/u.test(this.copy) && /[\p{L}\p{N}]/u.test(this.copy);
    }
}

export const Word = $($Word);
