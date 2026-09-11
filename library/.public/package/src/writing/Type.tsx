import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { html } from '@/utilities/Html';
import { $Writing } from './Writing';
import { $Annotation$, $Annotation } from './Annotation';
import { reflection } from '@/utilities/Reflection';

export interface $Type$ extends $Annotation$ { }

export class $Type extends $Annotation implements $Type$ {
    override parenthetical = true;
    name: string = this.constructor.name.replace(/^_*\$?/u, '').replace(/\d+$/u, '').replace(/^TypeOf/u, '');

    $Type(block: $Block) {
        super.$Writing($check(block, $Block, '!'));
        const said = html.text(this._block).trim();
        if (said !== '') this.name = said;
    }

    makes(tokens: (string | $Writing)[]): $Writing[] { return []; }

    // DI, DECLARED BY THE KIND AND RUN LATE. The composition root calls every
    // $register once each module has resolved, and src/index.ts is emitted — see
    // register.ts. `reflection` must ask `instanceof` against these three and
    // cannot import what imports it, so they are handed over rather than fetched.
    static $register(): void {
        reflection.knows({ writing: $Writing, annotation: $Annotation, type: $Type });
    }
}

export const Type = $($Type);
