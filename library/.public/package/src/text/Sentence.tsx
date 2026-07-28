import React, { type ReactNode } from 'react';
import { $, $check, type $Html } from '@dna-platform/chemistry';
import { $Referent } from '../ref/Referent';
import { text, display } from '../tools/html';
import { type $Composition } from './Composition';
import { $Character, Character } from './Character';
import { $Word, Word } from './Word';

export class $Sentence extends $Referent implements $Composition<$Word> {
    block?: $Html<'block'>;

    get copy(): string { return text(this.block); }
    get canonical(): $Word { return this.parts[0]; }
    get words(): $Word[] { return this.parts; }
    get characters(): $Character[] { return [...this.copy].map(g => $<$Character>(<Character>{g}</Character>)); }

    get parts(): $Word[] {
        return (this.copy.match(/[\p{L}\p{N}']+/gu) ?? []).filter(w => $Word.valid(w)).map(w => $<$Word>(<Word>{w}</Word>));
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

    static valid(copy: string): boolean {
        return /[\p{L}\p{N}]/u.test(copy);
    }
}

export const Sentence = $($Sentence);
