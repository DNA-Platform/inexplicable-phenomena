import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Theme } from '../writing/Theme';
import { $Chapter } from './Chapter';
import { $Book } from './Book';
import { $IndexCard } from '../library/IndexCard';

export class $Synopsis extends $Chapter {
    $parenthetical? = true;

    $for?: $IndexCard<$Book> = undefined;

    get card(): $IndexCard<$Book> | undefined { return this.$for; }

    get standsFor(): boolean {
        const book = this.book as $Book | undefined;
        return this.card !== undefined && !!book && !book.accounts(this);
    }

    entry(card: $IndexCard<$Book>, theme: $Theme): ReactNode {
        const named = card.written('title') || card.name;
        const said = card.written('synopsis');
        const under = card.written('subtitle');
        return (
            <li data-entry={card.name} style={{ listStyle: 'none', borderTop: `1px solid ${theme.rule}`, padding: `${theme.step(0)} 0` }}>
                <a href={card.name} data-link={card.name} style={{ display: 'block', fontSize: theme.step(1), color: theme.mark, textDecoration: 'none', fontWeight: 600, letterSpacing: '-0.01em' }}>
                    {named}
                </a>
                {under ? <div style={{ color: theme.ink, fontSize: theme.step(0), marginTop: '0.15em' }}>{under}</div> : null}
                {said ? <div style={{ color: theme.faint, fontSize: theme.step(-1), marginTop: '0.25em', lineHeight: 1.5 }}>{said}</div> : null}
            </li>
        );
    }

    override set(contents: ReactNode, theme: $Theme): ReactNode {
        const card = this.card;
        if (card && this.standsFor) return this.entry(card, theme);
        return <section data-account style={{ fontSize: theme.step(0), color: theme.faint, lineHeight: 1.65 }}>{contents}</section>;
    }

    read(): $Book {
        return this.$for ? this.$for.read() : super.read();
    }
}

export const Synopsis = $($Synopsis);
