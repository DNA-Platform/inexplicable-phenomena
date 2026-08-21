import React, { type ReactNode } from 'react';
import { $, $valid } from '@dna-platform/chemistry';
import { $Figure } from './Figure';

export class $Code extends $Figure {
    $language? = '';
    $source? = '';

    $parenthetical? = true;

    get language(): string { return this.$language || 'text'; }

    get source(): string { return this.$source ?? ''; }

    drawn(): ReactNode {
        if (!this.source) return null;
        const theme = this.theme;
        return (
            <pre
                data-language={this.language}
                style={{
                    fontFamily: theme.mono,
                    fontSize: theme.step(-1),
                    lineHeight: 1.55,
                    background: theme.ground === '#ffffff' ? '#f6f7f9' : theme.rule,
                    border: `1px solid ${theme.rule}`,
                    borderRadius: '4px',
                    padding: `${theme.step(-1)} ${theme.step(0)}`,
                    overflowX: 'auto',
                    margin: 0,
                }}
            >
                <code>{this.source}</code>
            </pre>
        );
    }

    valid(): boolean {
        return $valid(this.source !== '', 'code is the source it carries, and this block carries none');
    }
}

export const Code = $($Code);
