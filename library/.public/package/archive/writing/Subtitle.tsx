import React, { type ReactNode } from 'react';
import { styled } from 'styled-components';
import { $ } from '@dna-platform/chemistry';
import { $Theme } from './Theme';
import { $Writing } from './Writing';

export const Under = styled.p<{ $theme: $Theme }>`
    font-size: ${p => p.$theme.step(0)};
    color: ${p => p.$theme.faint};
`;

export class $Subtitle extends $Writing {
    $under = Under;

    override set(contents: ReactNode, theme: $Theme): ReactNode {
        const Said = this.$under;
        return <Said $theme={theme}>{contents}</Said>;
    }

    valid(): boolean {
        return super.valid() && this.copy !== '';
    }
}

export const Subtitle = $($Subtitle);
