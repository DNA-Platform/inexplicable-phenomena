import { $ } from '@dna-platform/chemistry';
import { $Sentence } from '../writing/Sentence';
import React, { type ReactNode } from 'react';
import { $Theme } from '../writing/Theme';

export class $Highlight extends $Sentence {
    override set(contents: ReactNode, theme: $Theme): ReactNode {
        return <mark style={{ background: theme.rule, color: theme.ink, padding: '0 0.15em' }}>{contents}</mark>;
    }

    $first?: number | string;
    $last?: number | string;

    get first(): number { return Number(this.$first ?? 0); }
    get last(): number | undefined { return this.$last === undefined ? undefined : Number(this.$last); }
}

export const Highlight = $($Highlight);
