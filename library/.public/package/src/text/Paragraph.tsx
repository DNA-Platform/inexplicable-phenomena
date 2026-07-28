import React, { type ReactNode } from 'react';
import { $, $check, type $Html } from '@dna-platform/chemistry';
import { $Referent } from '../ref/Referent';
import { text, display } from '../tools/html';
import { type $Composition } from './Composition';
import { $Sentence, Sentence } from './Sentence';
import { $Word } from './Word';

export class $Paragraph extends $Referent implements $Composition<$Sentence> {
    block?: $Html<'block'>;

    get copy(): string { return text(this.block); }
    get canonical(): $Sentence { return this.parts[0]; }
    get sentences(): $Sentence[] { return this.parts; }
    get words(): $Word[] { return this.parts.flatMap(s => s.words); }

    get parts(): $Sentence[] {
        return (this.copy.match(/\s*[^.!?]+[.!?]*/g) ?? [])
            .map(s => s.trim()).filter(s => $Sentence.valid(s))
            .map(s => $<$Sentence>(<Sentence>{s}</Sentence>));
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

    static valid(copy: string): boolean {
        return /[\p{L}\p{N}]/u.test(copy);
    }
}

export const Paragraph = $($Paragraph);
