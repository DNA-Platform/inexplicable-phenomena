import React, { type ReactNode } from 'react';
import { styled } from 'styled-components';
import { $ } from '@dna-platform/chemistry';
import { $Section } from '../writing/Section';
import { $Footnote } from './Footnote';
import { $Legend } from './Legend';
import * as legends from './Legend';
import { $Key } from './Key';
import * as keys from './Key';
import { $Theme } from '../writing/Theme';

export const Foot = styled.footer<{ $theme: $Theme }>`
    border-top: 1px solid ${p => p.$theme.rule};
    margin-top: ${p => p.$theme.rhythm};
    padding-top: ${p => p.$theme.step(0)};
`;

export const Notes = styled.ol`
    list-style: decimal;
    padding-left: 1.4em;
    margin: 0;
`;

export class $Footer extends $Section {
    $foot = Foot;
    $notes = Notes;

    override set(contents: ReactNode, theme: $Theme): ReactNode {
        const Under = this.$foot;
        const Listed = this.$notes;
        return (
            <Under $theme={theme}>
                <Listed>{contents}</Listed>
            </Under>
        );
    }

    $legend?: $Legend;

    get footnotes(): $Footnote[] {
        return this.sentences.filter((e): e is $Footnote => e instanceof $Footnote);
    }

    get legend(): $Legend {
        if (!this.$legend) {
            const Legend = $(legends.Legend);
            const Key = $(keys.Key);
            const legend: $Legend = $(<Legend />, this);
            legend.$names = this.footnotes.map(e => $(<Key name={e.$name} footnote={e} />) as $Key);
            this.$legend = legend;
        }
        return this.$legend;
    }
}

export const Footer = $($Footer);
