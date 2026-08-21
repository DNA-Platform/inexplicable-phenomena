import { $ } from '@dna-platform/chemistry';
import { $Sentence } from '../writing/Sentence';
import { $Footer } from './Footer';
import React, { type ReactNode } from 'react';
import { $Theme } from '../writing/Theme';

export class $Footnote extends $Sentence {
    override set(contents: ReactNode, theme: $Theme): ReactNode {
        return <li style={{ fontSize: theme.step(-1), color: theme.faint, marginBottom: '0.45em', lineHeight: 1.5 }}>{contents}</li>;
    }

    $for = '';

    get number(): number {
        const footer = this.parent as $Footer;
        return footer.footnotes.indexOf(this) + 1;
    }

    valid(): boolean {
        return super.valid() && this.$for !== '';
    }
}

export const Footnote = $($Footnote);
