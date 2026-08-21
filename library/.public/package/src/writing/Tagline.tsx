import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Theme } from './Theme';
import { $Writing } from './Writing';

export class $Tagline extends $Writing {
    override set(contents: ReactNode, theme: $Theme): ReactNode {
        return <p style={{ fontSize: theme.step(-1), color: theme.faint, fontStyle: 'italic' }}>{contents}</p>;
    }

    valid(): boolean {
        return super.valid() && this.copy !== '';
    }
}

export const Tagline = $($Tagline);
