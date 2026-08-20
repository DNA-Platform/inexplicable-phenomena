import React, { type ReactNode } from 'react';
import { $, $valid } from '@dna-platform/chemistry';
import { $Theme } from './Theme';
import { $Paragraph } from './Paragraph';

// A title is PARAGRAPH GRADE, because it is the canonical part of its section —
// the special first, at position zero. It carried no level at all while it was
// lifted out into a member of its own, which is why the walk could not place it.
export class $Title extends $Paragraph {
    override emit(contents: ReactNode, theme: $Theme): ReactNode {
        return <h2 style={{ fontSize: theme.step(1), color: theme.ink, fontWeight: 400 }}>{contents}</h2>;
    }

    valid(): boolean {
        return $valid(this.copy !== '', 'a title has words, and this one is empty');
    }
}

export const Title = $($Title);
