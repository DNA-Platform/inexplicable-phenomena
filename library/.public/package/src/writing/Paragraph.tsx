import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { type $Composition } from './Composition';
import { $Writing } from './Writing';
import { $Sentence, Sentence } from './Sentence';
import { $Word } from './Word';

export class $Paragraph extends $Writing implements $Composition<$Sentence> {
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

    valid(): boolean {
        return super.valid() && /[\p{L}\p{N}]/u.test(this.copy);
    }
}

export const Paragraph = $($Paragraph);
