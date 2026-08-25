import React, { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Referent } from './Referent';
import { $Reference } from './Reference';
import { $Chapter } from '../book/Chapter';
import { $Book } from '../book/Book';
import { $Section, Section } from '../writing/Section';
import { Summary } from '../writing/Summary';
import { Title } from '../writing/Title';
import { Subtitle } from '../writing/Subtitle';

/** A card is a CHAPTER — one grade below the book it stands for, which is what
 *  every reference form in this library already is. It carries a title and an
 *  account of the thing, because that is what fits on a card. */
export class $IndexCard<T extends $Book = $Book> extends $Chapter implements $Reference<T> {
    $name = '';

    $of?: () => T = undefined;

    $subject?: $IndexCard<T> = undefined;

    $author?: $IndexCard<T> = undefined;

    /** WRITING INPUTS. A card's identity is its name; what it SAYS is writing,
     *  and the writing is where a title and a subtitle live — which is why
     *  neither is a string on this class. */
    $title = '';

    $subtitle = '';

    $synopsis = '';

    get name(): string { return this.$name; }

    get synopsis(): string { return this.$synopsis; }

    get subject(): $IndexCard<T> | undefined { return this.$subject; }

    get author(): $IndexCard<T> | undefined { return this.$author; }

    get library(): $IndexCard<T> | undefined {
        const seen = new Set<$IndexCard<T>>();
        let at: $IndexCard<T> | undefined = this;
        while (at && !seen.has(at)) {
            seen.add(at);
            const of: $IndexCard<T> | undefined = at.subject;
            if (!of) return undefined;
            if (of === at) return at;
            at = of;
        }
        return undefined;
    }

    /** What a catalogue files this card under. */
    filed(): [string, string][] {
        return this.name ? [['title', this.name]] : [];
    }

    override read(): T {
        const of = this.$of?.();
        if (!of) throw new Error(`The card for ${JSON.stringify(this.name)} stands for nothing — it never pointed.`);
        return of;
    }

    /** A CARD WRITES ITSELF. Given no writing it declares a heading and an
     *  account, which is a chapter's minimum and a card's whole surface. */
    override view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>{this.$title || this.$name}</Title>
                    {this.$subtitle ? <Subtitle>{this.$subtitle}</Subtitle> : null}
                </Section>
                <Summary>
                    <Title>{'Summary'}</Title>
                    {this.$synopsis || this.$title || this.$name}
                </Summary>
            </>
        );
    }

    override valid(): boolean {
        return this.name !== '';
    }
}

export const IndexCard = $($IndexCard);
