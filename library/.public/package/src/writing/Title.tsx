import React, { type ReactNode } from 'react';
import { $, $valid } from '@dna-platform/chemistry';
import { $Theme } from './Theme';
import { $Paragraph } from './Paragraph';

export class $Title extends $Paragraph {
    get heading(): string {
        const colon = this.copy.indexOf(':');
        return colon < 0 ? this.copy : this.copy.slice(0, colon).trim();
    }

    get rest(): string {
        const colon = this.copy.indexOf(':');
        return colon < 0 ? '' : this.copy.slice(colon + 1).trim();
    }
    get opening(): boolean {
        const section = this.parent as { parent?: unknown } | undefined;
        const held = section?.parent as { constructor?: { name?: string } } | undefined;
        let at: unknown = held;
        for (let step = 0; at && step < 8; step++) {
            if ((at as { isCover?: boolean }).isCover) return true;
            const up = (at as { parent?: unknown }).parent;
            if (up === at) return false;
            at = up;
        }
        return false;
    }

    override set(contents: ReactNode, theme: $Theme): ReactNode {
        const opening = this.opening;
        const rest = this.rest;
        const size = opening ? theme.step(3) : theme.step(1);
        const body = rest ? this.heading : contents;
        const head = opening
            ? <h1 style={{ fontSize: size, color: theme.ink, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15, margin: 0 }}>{body}</h1>
            : <h2 style={{ fontSize: size, color: theme.ink, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.25, margin: `0 0 ${theme.step(-1)}` }}>{body}</h2>;
        if (!rest) return head;
        return (
            <>
                {head}
                <p data-subtitle style={{ fontSize: opening ? theme.step(1) : theme.step(0), color: theme.faint, fontWeight: 400, margin: `${theme.step(-2)} 0 ${theme.step(0)}` }}>{rest}</p>
            </>
        );
    }

    valid(): boolean {
        return $valid(this.copy !== '', 'a title has words, and this one is empty');
    }
}

export const Title = $($Title);
