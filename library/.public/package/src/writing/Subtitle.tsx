import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Theme } from './Theme';
import { $Writing } from './Writing';

export class $Subtitle extends $Writing {
    override emit(contents: ReactNode, theme: $Theme): ReactNode {
        return <p style={{ fontSize: theme.step(0), color: theme.faint }}>{contents}</p>;
    }

    valid(): boolean {
        return super.valid() && this.copy !== '';
    }
}

export const Subtitle = $($Subtitle);
