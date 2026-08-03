import React from 'react';
import { $, $check, type $Html } from '@dna-platform/chemistry';
import { $Section } from '../writing/Section';
import { $Title } from '../writing/Title';
import { $Footnote } from './Footnote';
import { $Legend, Legend } from './Legend';
import { $Key } from './Key';

export class $Footer extends $Section {
    $legend?: $Legend;

    get footnotes(): $Footnote[] {
        return this.elements.filter((e): e is $Footnote => e instanceof $Footnote);
    }

    get legend(): $Legend {
        if (!this.$legend) {
            const legend: $Legend = $(<Legend />, this);
            legend.$keys = this.footnotes.map(e => new $Key(e.$for, e));
            this.$legend = legend;
        }
        return this.$legend;
    }

    $Footer(text: $Html<'block'>) {
        this.text = $check(text, 'block');
        const first = this.elements[0];
        this.title = (first instanceof $Title ? first.text : first) as $Html<'block'>;
    }
}

export const Footer = $($Footer);
