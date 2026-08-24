import React, { type ReactNode } from 'react';
import { styled } from 'styled-components';
import { $, $valid } from '@dna-platform/chemistry';
import katex from 'katex';
import { $Theme } from './Theme';
import { $Phrase } from './Phrase';
import { type Role } from './Writing';

export const Unset = styled.span<{ $theme: $Theme }>`
    font-family: ${p => p.$theme.mono};
    color: ${p => p.$theme.faint};
`;

export const Set = styled.span``;

export class $Formula extends $Phrase {
    $unset = Unset;
    $set = Set;

    get role(): Role { return 'mention'; }

    typeset(): string {
        try {
            return katex.renderToString(this.copy, { throwOnError: false, output: 'html' });
        } catch {
            return '';
        }
    }

    override set(contents: ReactNode, theme: $Theme): ReactNode {
        const set = this.typeset();
        if (!set) {
            const Plain = this.$unset;
            return <Plain $theme={theme}>{contents}</Plain>;
        }
        const Written = this.$set;
        return <Written data-formula="inline" dangerouslySetInnerHTML={{ __html: set }} />;
    }

    valid(): boolean {
        return $valid(this.copy.trim() !== '', 'a formula is what it sets, and this one sets nothing');
    }
}

export const Formula = $($Formula);
