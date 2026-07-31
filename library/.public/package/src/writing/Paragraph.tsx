import React, { type ReactNode } from 'react';
import { $, $check, type $Html } from '@dna-platform/chemistry';
import { $Referent } from '../ref/Referent';
import { text, display } from '../tools/html';
import { type $Composition } from './Composition';
import { $Sentence, Sentence } from './Sentence';
import { $Word } from './Word';

export class $Paragraph extends $Referent implements $Composition<$Sentence> {
    block?: $Html<'block'>;

    $index?: number = undefined;
    $parenthetical? = false;

    get copy(): string { return text(this.block); }
    get index(): number { return this.$index ?? 0; }
    set index(value: number) { this.$index = value; }
    get parenthetical(): boolean { return !!this.$parenthetical; }
    set parenthetical(value: boolean) { this.$parenthetical = value; }
    get canonical(): $Sentence { return this.parts[0]; }
    get sentences(): $Sentence[] { return this.parts; }
    get words(): $Word[] { return this.parts.flatMap(s => s.words); }

    get parts(): $Sentence[] {
        const sentences: $Sentence[] = (this.copy.match(/\s*[^.!?]+[.!?]*/g) ?? []).map(s => $(<Sentence>{s.trim()}</Sentence>));
        return sentences.filter(s => s.valid()).map((s, i) => {
            s.index = i + 1;
            if (this.ref) s.ref = this.ref.compose(s.index);
            return s;
        });
    }

    constructor() {
        super();
        this.inline = true;
    }

    $Paragraph(block?: $Html<'block'>) {
        this.block = $check(block, 'block');
    }

    view(): ReactNode {
        return display(this);
    }

    valid(): boolean {
        return super.valid() && /[\p{L}\p{N}]/u.test(this.copy);
    }
}

export const Paragraph = $($Paragraph);
