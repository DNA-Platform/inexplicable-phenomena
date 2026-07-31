import React, { type ReactNode } from 'react';
import { $, $check, type $Html } from '@dna-platform/chemistry';
import { text } from '../tools/html';
import { $Reference } from '../ref/Reference';

export interface $Writing {
    copy: string;
    index: number;
    parenthetical: boolean;
}

export class $WritingExtensions {
    static copy(writing: { block?: $Html<'block'> }): string {
        return text(writing.block);
    }

    static display(writing: { block?: $Html<'block'> }): ReactNode {
        if (!writing.block) return null;
        return React.createElement($(writing.block) as any);
    }

    static bind(writing: { block?: $Html<'block'>; $ref?: $Reference }, block?: $Html<'block'>): void {
        writing.block = $check(block, 'block');
        const els = (writing.block as any)?.$elements as unknown[] | undefined;
        if (els?.length) {
            const top = els[0] instanceof $Reference ? els[0] : undefined;
            const bottom = !top && els[els.length - 1] instanceof $Reference ? els[els.length - 1] : undefined;
            const written = top ?? bottom;
            if (written) {
                els.splice(els.indexOf(written), 1);
                writing.$ref = written as $Reference;
            }
        }
    }
}
