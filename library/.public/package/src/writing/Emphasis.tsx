import React, { type ReactNode } from 'react';
import { styled } from 'styled-components';
import { $, $valid } from '@dna-platform/chemistry';
import { $Theme } from './Theme';
import { $Phrase } from './Phrase';

export const Strong = styled.strong<{ $theme: $Theme }>`
    font-weight: ${p => p.$theme.weight(1)};
    color: ${p => p.$theme.ink};
`;

export const Stressed = styled.em`
    font-style: italic;
`;

export class $Emphasis extends $Phrase {
    $strong? = false;

    $bold = Strong;
    $italic = Stressed;

    get strong(): boolean { return !!this.$strong; }

    override set(contents: ReactNode, theme: $Theme): ReactNode {
        if (this.strong) {
            const Said = this.$bold;
            return <Said $theme={theme}>{contents}</Said>;
        }
        const Said = this.$italic;
        return <Said>{contents}</Said>;
    }

    valid(): boolean {
        return $valid(this.copy.trim() !== '', 'a stressed phrase says something, and this one says nothing');
    }
}

export const Emphasis = $($Emphasis);
