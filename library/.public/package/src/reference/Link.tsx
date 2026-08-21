import React, { type ReactNode } from 'react';
import { $, $valid } from '@dna-platform/chemistry';
import { $Theme } from '../writing/Theme';
import { $Word } from '../writing/Word';

export class $Link extends $Word {
    $url?: string;

    get url(): string {
        return this.$url ?? this.copy;
    }

    protected anchor(surface: ReactNode, theme: $Theme): ReactNode {
        return (
            <a
                href={this.url}
                data-link={this.url}
                style={{ color: theme.mark, textDecoration: 'underline', textUnderlineOffset: '0.15em', textDecorationThickness: '1px' }}
            >
                {surface}
            </a>
        );
    }

    frame(): ReactNode {
        return this.anchor(super.frame(), this.theme);
    }

    valid(): boolean {
        return $valid(this.copy !== '', 'a link is a word that points, and this one has nothing to show');
    }
}

export const Link = $($Link);
