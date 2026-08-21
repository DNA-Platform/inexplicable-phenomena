import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Theme } from '../writing/Theme';
import { $Chapter, $$Chapter } from './Chapter';
import { $Book } from './Book';
import { $IndexCard } from '../library/IndexCard';

export class $Synopsis extends $Chapter {
    $parenthetical? = true;

    $for?: $IndexCard<$Book> = undefined;

    get card(): $IndexCard<$Book> | undefined { return this.$for; }

    override get parenthetical(): boolean {
        return !this.standsFor;
    }

    override set parenthetical(value: boolean) {
        this.$parenthetical = value;
    }

    get standsFor(): boolean {
        const book = this.book as $Book | undefined;
        return this.card !== undefined && !!book && !book.accounts(this);
    }

    entry(card: $IndexCard<$Book>, contents: ReactNode, theme: $Theme): ReactNode {
        const named = card.written('title') || card.name;
        const under = card.written('subtitle');
        return (
            <section data-entry={card.name}>
                <h1 style={{ fontSize: theme.step(3), color: theme.ink, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15, margin: 0 }}>{named}</h1>
                {under ? <p style={{ fontSize: theme.step(1), color: theme.faint, margin: `${theme.step(-2)} 0 ${theme.step(0)}` }}>{under}</p> : null}
                {contents}
                <p style={{ marginTop: theme.rhythm }}>
                    <a href={card.name} data-link={card.name} style={{ color: theme.mark, textDecoration: 'none', borderBottom: `1px solid ${theme.rule}` }}>
                        {'Open ' + named}
                    </a>
                </p>
            </section>
        );
    }

    override set(contents: ReactNode, theme: $Theme): ReactNode {
        const card = this.card;
        if (card && this.standsFor) return this.entry(card, contents, theme);
        return <section data-account style={{ fontSize: theme.step(0), color: theme.faint, lineHeight: 1.65 }}>{contents}</section>;
    }

    override get ref(): $$Synopsis {
        const Entry = $($$Synopsis);
        return $(<Entry of={this} />) as $$Synopsis;
    }

    read(): $Book {
        return this.$for ? this.$for.read() : super.read();
    }
}

export class $$Synopsis extends $$Chapter {
    override get copy(): string {
        const of = this.of as $Synopsis;
        const card = of?.card;
        if (card) return card.written('title') || card.name;
        return super.copy;
    }
}

export const Synopsis = $($Synopsis);
