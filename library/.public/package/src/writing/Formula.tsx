import React, { type ReactNode } from 'react';
import { $, $valid } from '@dna-platform/chemistry';
import katex from 'katex';
import { $Theme } from './Theme';
import { $Phrase } from './Phrase';
import { type Role } from './Writing';

export class $Formula extends $Phrase {
    $display? = false;

    get display(): boolean { return !!this.$display; }

    get role(): Role { return 'mention'; }

    typeset(): string {
        try {
            return katex.renderToString(this.copy, { displayMode: this.display, throwOnError: false, output: 'html' });
        } catch {
            return '';
        }
    }

    override set(contents: ReactNode, theme: $Theme): ReactNode {
        const set = this.typeset();
        if (!set) {
            return <span style={{ fontFamily: theme.mono, color: theme.faint }}>{contents}</span>;
        }
        const style = this.display
            ? { display: 'block', margin: `${theme.rhythm} 0`, textAlign: 'center' as const, overflowX: 'auto' as const }
            : {};
        return <span data-formula={this.display ? 'display' : 'inline'} style={style} dangerouslySetInnerHTML={{ __html: set }} />;
    }

    valid(): boolean {
        return $valid(this.copy.trim() !== '', 'a formula is what it sets, and this one sets nothing');
    }
}

export const Formula = $($Formula);
