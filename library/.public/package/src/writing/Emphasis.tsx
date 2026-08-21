import React, { type ReactNode } from 'react';
import { $, $valid } from '@dna-platform/chemistry';
import { $Theme } from './Theme';
import { $Phrase } from './Phrase';

export class $Emphasis extends $Phrase {
    $strong? = false;

    get strong(): boolean { return !!this.$strong; }

    override set(contents: ReactNode, theme: $Theme): ReactNode {
        return this.strong
            ? <strong style={{ fontWeight: 600, color: theme.ink }}>{contents}</strong>
            : <em style={{ fontStyle: 'italic' }}>{contents}</em>;
    }

    valid(): boolean {
        return $valid(this.copy.trim() !== '', 'a stressed phrase says something, and this one says nothing');
    }
}

export const Emphasis = $($Emphasis);
