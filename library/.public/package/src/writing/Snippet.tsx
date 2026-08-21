import { $, $valid } from '@dna-platform/chemistry';
import { $Phrase } from './Phrase';
import { type Role } from './Writing';
import React, { type ReactNode } from 'react';
import { $Theme } from './Theme';

export class $Snippet extends $Phrase {
    override set(contents: ReactNode, theme: $Theme): ReactNode {
        return <code style={{ fontFamily: theme.mono, fontSize: '0.88em', background: theme.rule, borderRadius: '3px', padding: '0.1em 0.35em' }}>{contents}</code>;
    }

    get role(): Role { return 'mention'; }

    valid(): boolean {
        return $valid(this.copy.trim() !== '', 'code inside a sentence is the source it carries, and this one carries none');
    }
}

export const Snippet = $($Snippet);
