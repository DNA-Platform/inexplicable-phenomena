import React, { type ReactNode } from 'react';
import { $, $check, type $Html } from '@dna-platform/chemistry';
import { $Referent } from '../ref/Referent';
import { text, display } from '../tools/html';
import { type $Composition } from './Composition';
import { $Character, Character } from './Character';
import { $Word, Word } from './Word';

export class $Sentence extends $Referent implements $Composition<$Word> {
    block?: $Html<'block'>;

    $index?: number = undefined;
    $parenthetical? = false;

    get copy(): string { return text(this.block); }
    get index(): number { return this.$index ?? 0; }
    set index(value: number) { this.$index = value; }
    get parenthetical(): boolean { return !!this.$parenthetical; }
    set parenthetical(value: boolean) { this.$parenthetical = value; }
    get canonical(): $Word { return this.parts[0]; }
    get words(): $Word[] { return this.parts; }
    get characters(): $Character[] { return [...this.copy].map(g => $(<Character>{g}</Character>)); }

    get parts(): $Word[] {
        const words: $Word[] = (this.copy.match(/[\p{L}\p{N}']+/gu) ?? []).map(w => $(<Word>{w}</Word>));
        return words.filter(w => w.valid()).map((w, i) => {
            w.index = i + 1;
            if (this.ref) w.ref = this.ref.compose(w.index);
            return w;
        });
    }

    constructor() {
        super();
        this.inline = true;
    }

    $Sentence(block?: $Html<'block'>) {
        this.block = $check(block, 'block');
    }

    view(): ReactNode {
        return display(this);
    }

    valid(): boolean {
        return super.valid() && /[\p{L}\p{N}]/u.test(this.copy);
    }
}

export const Sentence = $($Sentence);
