import React, { type ReactNode } from 'react';
import { styled } from 'styled-components';
import { $ } from '@dna-platform/chemistry';
import { $Theme } from '../writing/Theme';
import { $Referent } from '../reference/Referent';
import { $Reference } from '../reference/Reference';
import * as paths from '../reference/Path';
import { $Phrase } from '../writing/Phrase';
import { $CardCatalogue } from '../library/CardCatalogue';
import * as catalogues from '../library/CardCatalogue';
import type { $Book } from './Book';
import { $Chapter } from './Chapter';
import type { $$Book } from './Book';

export const Faint = styled.span<{ $theme: $Theme }>`
    color: ${p => p.$theme.faint};
`;

export const Pointing = styled.a<{ $theme: $Theme }>`
    color: ${p => p.$theme.accent};
    text-decoration: none;
    border-bottom: 1px solid ${p => p.$theme.rule};
`;

// AN ANNOTATION IS A PHRASE THAT POINTS AT A BOOK, and what it MEANS is the whole
// of the difference between one kind and another. $Author, $Subject and
// $Canonical were byte-identical under name substitution — one class copied twice
// in a sitting — where the design always said they differ BY VALIDATION.
//
// Phrase grade because a name sits inside a sentence rather than being one, and
// parenthetical because it is metadata: present in the writing, absent from the
// reading.
export class $Annotation extends $Phrase implements $Reference<$Book> {
    $for?: $$Book = undefined;

    parenthetical = true;

    $faint = Faint;
    $pointing = Pointing;

    get name(): string { return this.copy; }

    /** The book this annotation stands in. It asks the CHAPTER it is in, which
     *  already knows its book — reaching for $Book directly closes a cycle,
     *  since Book.tsx holds $$Book and the annotations both. */
    get book(): $Book | undefined { return this.standing($Chapter)?.book; }

    // THE CATALOGUE THE SCOPE HOLDS, asked for exactly as the theme is — and it
    // lives HERE rather than on $Writing because an annotation is the only thing
    // that needs it. A member with one caller belongs inside that caller.
    //
    // (And `catalogue` on a referent meant something else entirely — which
    // catalogue it belonged to — struck in sprint 47 with reference equality.)
    get catalogue(): $CardCatalogue {
        return $(catalogues.CardCatalogue).$ as $CardCatalogue;
    }

    // AN ANNOTATION FINDS ITS OWN CARD. Doug: "<Author>The Team</Author> is what
    // we want author to be, so I don't think we need `for` there." The compiler
    // used to insert one into an element a person wrote, precisely because this
    // could not be answered.
    get card(): $$Book | undefined {
        return this.$for ?? this.catalogue?.find('title', this.copy);
    }

    /** What this kind is called when it has to say it stands for nothing. */
    protected get kind(): string { return 'annotation'; }

    // THE FIXED POINT OF THE GATHER. A writing's annotations are its parts';
    // an annotation's are itself. Nothing walks a class name to find these.
    override get annotations(): $Annotation[] { return [this]; }

    read(): $Book {
        if (!this.$for) throw new Error(`The ${this.kind} ${JSON.stringify(this.name)} holds no card, so it stands for nothing.`);
        return this.$for.read();
    }

    then<U extends $Referent>(next: $Reference<U>): $Reference<U> {
        const Path = $(paths.Path);
        return $(<Path first={this} onward={next} />);
    }

    override set(): ReactNode {
        return null;
    }

    named(theme: $Theme): ReactNode {
        const card = this.card;
        if (!card) {
            const Plain = this.$faint;
            return <Plain $theme={theme}>{this.copy}</Plain>;
        }
        const Follows = this.$pointing;
        return (
            <Follows $theme={theme} href={card.name} data-link={card.name}>
                {this.copy}
            </Follows>
        );
    }

    valid(): boolean {
        return super.valid() || this.$for !== undefined;
    }
}

export const Annotation = $($Annotation);
