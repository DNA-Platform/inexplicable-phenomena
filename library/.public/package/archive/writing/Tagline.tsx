import React, { type ReactNode } from 'react';
import { styled } from 'styled-components';
import { $ } from '@dna-platform/chemistry';
import { $Theme } from './Theme';
import { $Writing } from './Writing';

export const Line = styled.p<{ $theme: $Theme }>`
    font-size: ${p => p.$theme.step(-1)};
    color: ${p => p.$theme.faint};
    font-style: italic;
`;

export class $Tagline extends $Writing {
    $line = Line;

    override set(contents: ReactNode, theme: $Theme): ReactNode {
        const Said = this.$line;
        return <Said $theme={theme}>{contents}</Said>;
    }

    valid(): boolean {
        return super.valid() && this.copy !== '';
    }
}

export const Tagline = $($Tagline);
