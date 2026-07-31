import React, { type ReactNode } from 'react';
import { $, type $Html } from '@dna-platform/chemistry';
import { text } from '../tools/html';

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
}
