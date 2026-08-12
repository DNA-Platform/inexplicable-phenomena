import React from 'react';
import { $, $check, type $Html } from '@dna-platform/chemistry';
import { $Section } from '../writing/Section';
import { $Title } from '../writing/Title';
import { $Footnote } from './Footnote';
import { $Legend } from './Legend';
import * as legends from './Legend';
import { $Key } from './Key';
import * as keys from './Key';

export class $Footer extends $Section {
    $legend?: $Legend;

    get footnotes(): $Footnote[] {
        return this.elements.filter((e): e is $Footnote => e instanceof $Footnote);
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
