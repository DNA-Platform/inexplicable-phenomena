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
        // The numbered chapters: not the canonical, not parenthetical, not
        // the contents itself — one law, by what a chapter is.
        const Entry = $($$Chapter);
        return book.parts()
            .filter(chapter => chapter !== this && !(chapter instanceof $Cover) && !chapter.parenthetical)
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
            // A table of contents pulls itself together from its book — its
            // summary is the cover's, its rows are the chapters'. Standing
            // outside a book it has nothing to pull together yet.
        }
    }

    valid(): boolean {
        if (!this.cover) return this.$parts.length === 0;
        return super.valid();
    }

    row(row: $$Chapter): ReactNode {
        return row.copy;
    }

    view(): ReactNode {
        return (
            <div className="table-of-contents">
                <div className="contents-title">{text(this.title.text)}</div>
                <ol>
                    {this.parts().map((r, at) => <li key={at}>{this.row(r)}</li>)}
                </ol>
            </div>
        );
    }
}

export const TableOfContents = $($TableOfContents);
