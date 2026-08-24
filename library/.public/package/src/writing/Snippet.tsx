import React, { type ReactNode } from 'react';
import { styled } from 'styled-components';
import { $, $valid } from '@dna-platform/chemistry';
import { $Phrase } from './Phrase';
import { type Role } from './Writing';
import { $Theme } from './Theme';

export const Inline = styled.code<{ $theme: $Theme }>`
    font-family: ${p => p.$theme.mono};
    font-size: 0.88em;
    background: ${p => p.$theme.rule};
    border-radius: 3px;
    padding: 0.1em 0.35em;
`;

export class $Snippet extends $Phrase {
    $inline = Inline;

    override set(contents: ReactNode, theme: $Theme): ReactNode {
        const Set = this.$inline;
        return <Set $theme={theme}>{contents}</Set>;
    }

    get role(): Role { return 'mention'; }

    valid(): boolean {
        return $valid(this.copy.trim() !== '', 'code inside a sentence is the source it carries, and this one carries none');
    }
}

export const Snippet = $($Snippet);
