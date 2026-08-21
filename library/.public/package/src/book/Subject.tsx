import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Theme } from '../writing/Theme';
import { $Referent } from '../reference/Referent';
import { $Reference$ } from '../reference/Reference';
import * as paths from '../reference/Path';
import { $Phrase } from '../writing/Phrase';
import { $Book } from './Book';
import { $IndexCard } from '../library/IndexCard';

export class $Subject extends $Phrase implements $Reference$<$Book> {
    $for?: $IndexCard<$Book> = undefined;

    $parenthetical? = true;

    get name(): string { return this.copy; }

    get card(): $IndexCard<$Book> | undefined { return this.$for; }

    read(): $Book {
        if (!this.$for) throw new Error(`The subject ${JSON.stringify(this.name)} holds no card, so it stands for nothing.`);
        return this.$for.read();
    }

    then<U extends $Referent>(next: $Reference$<U>): $Reference$<U> {
        const Path = $(paths.Path);
        return $(<Path first={this} onward={next} />);
    }

    override set(): ReactNode {
        return null;
    }

    named(theme: $Theme): ReactNode {
        const card = this.card;
        if (!card) return <span style={{ color: theme.faint }}>{this.copy}</span>;
        return (
            <a
                href={card.name}
                data-link={card.name}
                style={{ color: theme.mark, textDecoration: 'none', borderBottom: `1px solid ${theme.rule}` }}
            >
                {this.copy}
            </a>
        );
    }

    valid(): boolean {
        return super.valid() || this.$for !== undefined;
    }
}

export const Subject = $($Subject);
