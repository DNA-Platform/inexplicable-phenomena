import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Figure } from './Figure';

export class $Break extends $Figure {
    $parenthetical? = true;

    drawn(): ReactNode {
        return <hr />;
    }

    valid(): boolean {
        return true;
    }
}

export const Break = $($Break);
