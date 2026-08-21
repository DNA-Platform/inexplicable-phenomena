import React, { type ReactNode } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import { text } from '../utilities/html';
import { $Referent } from '../reference/Referent';
import { $Reference$ } from '../reference/Reference';
import { $Catalogue$ } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import { $Composible$ } from '../writing/Composition';
import * as paths from '../reference/Path';
import { $Composition$ } from '../writing/Composition';
import { $Chapter, $$Chapter } from './Chapter';
import { $Title } from '../writing/Title';
import * as titles from '../writing/Title';
import { $Cover } from './Cover';
import { $Section } from '../writing/Section';
import { $Book } from './Book';
import { $IndexCard } from '../library/IndexCard';
import { $Theme } from '../writing/Theme';
import { styled } from 'styled-components';
import '../writing/dressing';


export const Contents = styled.nav`
    padding: ${p => p.theme.step(-1)} 0;
    border-top: 1px solid ${p => p.theme.rule};
    border-bottom: 1px solid ${p => p.theme.rule};
    font-size: ${p => p.theme.step(-1)};

    ol { list-style: none; margin: 0; padding: 0; }
    li { display: flex; gap: 0.6em; padding: 0.3em 0; }
    li > span { color: ${p => p.theme.faint}; min-width: 1.2em; }
`;

export const Heading = styled.h2`
    margin: 0 0 ${p => p.theme.step(-1)};
    font-size: ${p => p.theme.step(1)};
    font-weight: 600;
    letter-spacing: -0.01em;
    color: ${p => p.theme.ink};
`;

export const Row = styled.a<{ $open: boolean }>`
    color: ${p => (p.$open ? p.theme.ink : p.theme.mark)};
    text-decoration: none;
    cursor: pointer;
    border-bottom: ${p => (p.$open ? `1px solid ${p.theme.rule}` : 'none')};

    &:hover { text-decoration: underline; text-underline-offset: 0.15em; }
`;

export class $TableOfContents extends $Chapter implements $Catalogue$<$Chapter> {
    $open?: $Chapter = undefined;

    Contents = Contents;
    Heading = Heading;
    Row = Row;

    get title(): $Title {
        const authored = this.$parts.find(s => !s.parenthetical)?.heading ?? '';
        const Title = $(titles.Title);
        const title: $Title = $(<Title>{authored || 'Table of Contents'}</Title>);
        return title;
    }

    get summary(): $Section | undefined {
        const cover = (this.book as $Book | undefined)?.cover;
        return cover instanceof $Cover ? cover.summary : undefined;
    }

    get cover(): $Cover | undefined {
        const cover = (this.book as $Book | undefined)?.cover;
        return cover instanceof $Cover ? cover : undefined;
    }

    get canonical(): $$Chapter { return $Composible$.canonical(this); }

    get chapters(): $Chapter[] {
        return this.parts().map(r => r.read()).filter((c): c is $Chapter => c !== undefined);
    }

    parts(): $$Chapter[] {
        const book = this.book;
        if (!(book instanceof $Book)) throw new Error(`The table of contents stands under ${String((book as { constructor?: { name?: string } })?.constructor?.name)} instead of a book, with parent ${String((this.parent as { constructor?: { name?: string } })?.constructor?.name)}.`);
        return book.parts()
            .filter(chapter => chapter !== this && !(chapter instanceof $Cover) && !chapter.parenthetical)
            .map(chapter => chapter.ref);
    }

    where(match: (part: $$Chapter) => boolean): $$Chapter[] {
        return $Composible$.where(this, match);
    }

    select<U>(pick: (part: $$Chapter) => U): U[] {
        return $Composible$.select(this, pick);
    }

    selectMany<U>(pick: (part: $$Chapter) => U[]): U[] {
        return $Composible$.selectMany(this, pick);
    }

    single(match: (part: $$Chapter) => boolean): $$Chapter {
        return $Composible$.single(this, match);
    }

    at(position: number): $Location<$$Chapter> {
        return $Composible$.at(this, position);
    }

    follow(): $Composition$<$Chapter> {
        return $Composible$.follow(this);
    }

    read(): $Book {
        if (!this.cover) throw new Error('The table of contents stands outside any book.');
        return this.cover.read();
    }

    then<U extends $Referent>(next: $Reference$<U>): $Reference$<U> {
        const Path = $(paths.Path);
        return $(<Path first={this} onward={next} />);
    }

    $TableOfContents(...writing: unknown[]) {
        try {
            super.$Chapter(...writing);
        } catch (error) {
            if (this.summary) throw error;
        }
    }

    valid(): boolean {
        if (!this.cover) return this.$parts.length === 0;
        return super.valid();
    }

    get open(): $Chapter | undefined {
        const book = this.book as $Book | undefined;
        if (!book) return undefined;
        const reading = book.reading;
        return this.$open && reading.includes(this.$open) ? this.$open : reading[0];
    }

    turn(to: $Chapter): void {
        this.$open = to;
    }

    row(entry: $$Chapter, at: number, theme: $Theme): ReactNode {
        const Turn = this.Row;
        const chapter = entry.of;
        const open = this.open === chapter;
        const held = chapter as $Chapter & { card?: $IndexCard<$Book>; standsFor?: boolean };
        const named = entry.copy;
        return (
            <>
                <Turn
                    theme={theme as never}
                    href={`#${chapter.address}`}
                    data-turn={at}
                    $open={open}
                    aria-current={open ? 'true' : undefined}
                    onClick={event => { event.preventDefault(); this.turn(chapter); }}
                >
                    {named}
                </Turn>
                {held.standsFor && held.card ? (
                    <Turn theme={theme as never} href={held.card.name} data-entry={held.card.name} data-link={held.card.name} $open={false}>
                        {'→'}
                    </Turn>
                ) : null}
            </>
        );
    }

    view(): ReactNode {
        const theme = this.theme;
        const Named = this.Heading;
        const Listed = this.Contents;
        return (
            <>
            <Named theme={theme as never}>{text(this.title.text)}</Named>
            <Listed theme={theme as never} data-contents>
                <ol>
                    {this.parts().map((entry, at) => (
                        <li key={at}>
                            <span>{at + 1}</span>
                            {this.row(entry, at, theme)}
                        </li>
                    ))}
                </ol>
            </Listed>
            </>
        );
    }
}

export const TableOfContents = $($TableOfContents);
