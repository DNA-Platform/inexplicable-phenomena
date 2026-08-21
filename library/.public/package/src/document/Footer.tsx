import React, { type ReactNode } from 'react';
import { $, $check, $Html } from '@dna-platform/chemistry';
import { $Section } from '../writing/Section';
import { $Title } from '../writing/Title';
import { $Footnote } from './Footnote';
import { $Legend } from './Legend';
import * as legends from './Legend';
import { $Key } from './Key';
import * as keys from './Key';
import { $Theme } from '../writing/Theme';

export class $Footer extends $Section {
    override set(contents: ReactNode, theme: $Theme): ReactNode {
        return (
            <footer style={{ borderTop: `1px solid ${theme.rule}`, marginTop: theme.rhythm, paddingTop: theme.step(0) }}>
                <ol style={{ listStyle: 'decimal', paddingLeft: '1.4em', margin: 0 }}>{contents}</ol>
            </footer>
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
            legend.$keys = this.footnotes.map(e => $(<Key name={e.$for} footnote={e} />) as $Key);
            this.$legend = legend;
        }
        return this.$legend;
    }
}

export const Footer = $($Footer);
