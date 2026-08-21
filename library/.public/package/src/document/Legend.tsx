import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Paragraph } from '../writing/Paragraph';
import { $Key } from './Key';

export class $Legend extends $Paragraph {
    $keys: $Key[] = [];

    $parenthetical? = true;

    get keys(): $Key[] { return this.$keys; }
    get copy(): string { return this.keys.map(k => k.copy).join(' '); }

    view(): ReactNode {
        if (this.parenthetical) return null;
        const theme = this.theme;
        return (
            <dl style={{ fontSize: theme.step(-1), color: theme.faint, margin: `${theme.step(0)} 0`, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: `0.3em 0.8em` }}>
                {this.keys.map((key, at) => {
                    const Named = $(key) as any;
                    return (
                        <React.Fragment key={at}>
                            <dt style={{ fontFamily: theme.mono, color: theme.mark }}><Named /></dt>
                            <dd style={{ margin: 0 }}>{key.read().copy}</dd>
                        </React.Fragment>
                    );
                })}
            </dl>
        );
    }

    valid(): boolean {
        return true;
    }
}

export const Legend = $($Legend);
