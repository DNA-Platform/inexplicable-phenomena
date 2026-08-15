import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Figure } from '@dna-platform/lib';

// A RESOURCE of the chapter symmetry, attached by the double dash. Writing code
// is specifying semantics: it is lifted and compiled, and never composed.
export class $Table extends $Figure {
    $rows: { name: string; kind: string }[] = [];

    get rows(): { name: string; kind: string }[] { return this.$rows; }

    drawn(): ReactNode {
        return (
            <ul>
                {this.rows.map(r => <li key={r.name}>{r.name + ' — ' + r.kind}</li>)}
            </ul>
        );
    }
}

export const Table = $($Table);
