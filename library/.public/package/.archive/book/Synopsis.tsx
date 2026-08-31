import React, { type ReactNode } from 'react';
import { styled } from 'styled-components';
import { $ } from '@dna-platform/chemistry';
import { $Theme } from '../writing/Theme';
import { $Chapter, $$Chapter } from './Chapter';
import { $Book } from './Book';
import { $$Book } from './Book';

export const Entry = styled.section``;

export const Named = styled.h1<{ $theme: $Theme }>`
    font-size: ${p => p.$theme.step(3)};
    color: ${p => p.$theme.ink};
    font-weight: ${p => p.$theme.weight(3)};
    letter-spacing: ${p => p.$theme.tracking(3)};
    line-height: ${p => p.$theme.leading(3)};
    margin: 0;
`;

export const Under = styled.p<{ $theme: $Theme }>`
    font-size: ${p => p.$theme.step(1)};
    color: ${p => p.$theme.faint};
    margin: ${p => p.$theme.step(-2)} 0 ${p => p.$theme.step(0)};
`;

export const Opens = styled.p<{ $theme: $Theme }>`
    margin-top: ${p => p.$theme.rhythm};
`;

export const Pointing = styled.a<{ $theme: $Theme }>`
    color: ${p => p.$theme.accent};
    text-decoration: none;
    border-bottom: 1px solid ${p => p.$theme.rule};
`;

export const Account = styled.section<{ $theme: $Theme }>`
    font-size: ${p => p.$theme.step(0)};
    color: ${p => p.$theme.faint};
    line-height: 1.65;
`;

export class $Synopsis extends $Chapter {
    $for?: $$Book = undefined;

    get card(): $$Book | undefined { return this.$for; }

    parenthetical = true;

    get standsFor(): boolean {
        const book = this.book as $Book | undefined;
        return this.card !== undefined && !!book && !book.accounts(this);
    }

    $entry = Entry;
    $named = Named;
    $under = Under;
    $opens = Opens;
    $pointing = Pointing;
    $account = Account;

    entry(card: $$Book, contents: ReactNode, theme: $Theme): ReactNode {
        const named = card.title?.copy || card.name;
        const under = card.subtitle?.copy ?? '';
        const Standing = this.$entry;
        const Title = this.$named;
        const Sub = this.$under;
        const Line = this.$opens;
        const Follows = this.$pointing;
        return (
            <Standing data-entry={card.name}>
                <Title $theme={theme}>{named}</Title>
                {under ? <Sub $theme={theme}>{under}</Sub> : null}
                {this.said(card, contents, theme)}
                <Line $theme={theme}>
                    <Follows $theme={theme} href={card.name} data-link={card.name}>
                        {this.opens(named)}
                    </Follows>
                </Line>
            </Standing>
        );
    }

    // AN ENTRY SAYS WHAT ITS CARD SAYS, and that is the whole reason a card
    // carries a synopsis at all: what a reader is shown before deciding to open
    // anything. The chapter's own summary is PARENTHETICAL — it is an account of
    // the book, and an account is not a shelf label — so drawing the contents
    // here showed a heading and nothing under it.
    said(card: $$Book, contents: ReactNode, theme: $Theme): ReactNode {
        const line = card.synopsis;
        if (!line) return contents;
        const Said = this.$account;
        return <Said $theme={theme} data-account>{line}</Said>;
    }

    // THE FRAMEWORK DOES NOT SPEAK ENGLISH. A book that wants another word
    // overrides this, and a book that wants none returns the name alone.
    opens(named: string): string {
        return `Open ${named}`;
    }

    override set(contents: ReactNode, theme: $Theme): ReactNode {
        const card = this.card;
        if (card && this.standsFor) return this.entry(card, contents, theme);
        const Said = this.$account;
        return <Said $theme={theme} data-account>{contents}</Said>;
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
        if (card) return card.title?.copy || card.name;
        return super.copy;
    }
}

export const Synopsis = $($Synopsis);
