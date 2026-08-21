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

export class $TableOfContents extends $Chapter implements $Catalogue$<$Chapter> {
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
        const Entry = $($$Chapter);
        const shelved = new Set<unknown>(book.entries);
        return book.parts()
            .filter(chapter => chapter !== this && !(chapter instanceof $Cover) && !chapter.parenthetical && !shelved.has(chapter))
            .map(chapter => $(<Entry of={chapter} />) as $$Chapter);
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

    turns(entry: $$Chapter): number {
        const book = this.book as $Book | undefined;
        if (!book) return 0;
        const at = book.reading.indexOf(entry.of);
        return at < 0 ? 0 : at;
    }

    row(entry: $$Chapter, at: number, theme: $Theme): ReactNode {
        const book = this.book as $Book | undefined;
        const to = this.turns(entry);
        const open = !!book && book.page === to;
        return (
            <a
                href={`#${entry.of.address}`}
                data-turn={to}
                aria-current={open ? 'true' : undefined}
                onClick={event => { event.preventDefault(); if (book) book.page = to; }}
                style={{
                    color: open ? theme.ink : theme.mark,
                    textDecoration: 'none',
                    borderBottom: open ? `1px solid ${theme.rule}` : 'none',
                    cursor: 'pointer',
                }}
            >
                {entry.copy}
            </a>
        );
    }

    view(): ReactNode {
        const theme = this.theme;
        return (
            <nav style={{ fontSize: theme.step(-1), borderTop: `1px solid ${theme.rule}`, borderBottom: `1px solid ${theme.rule}`, padding: `${theme.step(-1)} 0` }}>
                <ol style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: `0 ${theme.step(1)}`, margin: 0, padding: 0 }}>
                    {this.parts().map((entry, at) => (
                        <li key={at} style={{ display: 'flex', gap: '0.5em' }}>
                            <span style={{ color: theme.faint }}>{at + 1}</span>
                            {this.row(entry, at, theme)}
                        </li>
                    ))}
                </ol>
            </nav>
        );
    }
}

export const TableOfContents = $($TableOfContents);
