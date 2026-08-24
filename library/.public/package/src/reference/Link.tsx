import React, { type ReactNode } from 'react';
import { styled } from 'styled-components';
import { $ } from '@dna-platform/chemistry';
import { $Theme } from '../writing/Theme';
import { $Phrase } from '../writing/Phrase';

export const Anchor = styled.a<{ $theme: $Theme }>`
    color: ${p => p.$theme.accent};
    text-decoration: underline;
    text-underline-offset: 0.15em;
    text-decoration-thickness: 1px;
`;

export class $Link extends $Phrase {
    $url?: string;

    $anchor = Anchor;

    get url(): string {
        return this.$url ?? this.copy;
    }

    protected anchor(surface: ReactNode, theme: $Theme): ReactNode {
        const Pointing = this.$anchor;
        return (
            <Pointing $theme={theme} href={this.url} data-link={this.url}>
                {surface}
            </Pointing>
        );
    }

    frame(): ReactNode {
        return this.anchor(super.frame(), this.theme);
    }
}

export const Link = $($Link);
