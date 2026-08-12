import React, { type ReactNode } from 'react';
import { $, $valid } from '@dna-platform/chemistry';
import { $Figure } from './Figure';

export class $Code extends $Figure {
    $source? = '';
    $language? = '';

    $parenthetical? = true;

    get source(): string { return this.$source ?? ''; }

    get language(): string { return this.$language || 'text'; }

    drawn(): ReactNode {
        return this.source ? <pre className={`code ${this.language}`}>{this.source}</pre> : null;
    }

    valid(): boolean {
        return $valid(this.source !== '', 'code is the source it carries, and this block carries none');
    }
}

export const Code = $($Code);
