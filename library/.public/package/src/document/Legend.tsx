import React, { type ReactNode } from 'react';
import { styled } from 'styled-components';
import { $ } from '@dna-platform/chemistry';
import { $Theme } from '../writing/Theme';
import { $Paragraph } from '../writing/Paragraph';
import { $Key } from './Key';

export const Filed = styled.dl<{ $theme: $Theme }>`
    font-size: ${p => p.$theme.step(-1)};
    color: ${p => p.$theme.faint};
    margin: ${p => p.$theme.step(0)} 0;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.3em 0.8em;
`;

export const Named = styled.dt<{ $theme: $Theme }>`
    font-family: ${p => p.$theme.mono};
    color: ${p => p.$theme.accent};
`;

export const Says = styled.dd`
    margin: 0;
`;

export class $Legend extends $Paragraph {
    $names: $Key[] = [];

    parenthetical = true;

    $filed = Filed;
    $named = Named;
    $says = Says;

    get keys(): $Key[] { return this.$names; }
    get copy(): string { return this.keys.map(k => k.copy).join(' '); }

    // JOINED TO THE TEMPLATE. A legend's parts are its keys, so it gathers them
    // and sets them, rather than overriding view() and reaching neither.
    override gathered(theme: $Theme): ReactNode {
        const Key = this.$named;
        const Said = this.$says;
        return this.keys.map((key, at) => {
            const Standing = $(key) as never as React.ComponentType;
            return (
                <React.Fragment key={at}>
                    <Key $theme={theme}><Standing /></Key>
                    <Said>{key.read().copy}</Said>
                </React.Fragment>
            );
        });
    }

    override set(contents: ReactNode, theme: $Theme): ReactNode {
        if (this.parenthetical) return null;
        const Listed = this.$filed;
        return <Listed $theme={theme}>{contents}</Listed>;
    }

    valid(): boolean {
        return true;
    }
}

export const Legend = $($Legend);
