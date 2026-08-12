import React, { type ReactNode } from 'react';
import { $, $valid } from '@dna-platform/chemistry';
import { $Figure } from './Figure';

export class $Plate extends $Figure {
    $source? = '';

    get source(): string { return this.$source ?? ''; }

    drawn(): ReactNode {
        return this.source ? <img src={this.source} alt={this.caption.copy} /> : null;
    }

    valid(): boolean {
        return $valid(this.source !== '', 'a plate is the picture it shows, and this one shows nothing');
    }
}

export const Plate = $($Plate);
