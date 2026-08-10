import React, { type ReactNode } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import { text } from '../utilities/html';
import { type $Referent$ } from '../reference/Referent';
import { type $Reference$ } from '../reference/Reference';
import { type $Catalogue$ } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import { $Composible$ } from '../utilities/Composible';
import { $Path, Path } from '../reference/Path';
import { type $Composition$ } from '../writing/Composition';
import { $Chapter } from './Chapter';
import { $Row, Row } from './Row';
import { $Title, Title } from '../writing/Title';
import { $Cover } from './Cover';
import { $Section } from '../writing/Section';
import { $Book } from './Book';
import { type $LibraryCard } from '../library/LibraryCard';

export class $TableOfContents extends $Chapter implements $Catalogue$<$Chapter> {
    $cards: $LibraryCard[] = [];

    // The contents belongs to a book, but the parent one hop up is whatever
    // interpreted it last — on screen, that can be the thing drawing it. The
    // book is found by climbing to the nearest $Book, the canonical's own walk.
    get book(): $Book {
        let up: unknown = this.parent;
        let hops = 0;
        while (up && !(up instanceof $Book) && hops < 8) {
            const next = (up as { parent?: unknown }).parent;
            if (next === up) break;
            up = next;
            hops++;
        }
        return up as $Book;
    }
    get title(): $Title {
        const authored = this.$parts.find(s => !s.parenthetical)?.heading ?? '';
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

    get canonical(): $Row { return $Composible$.canonical(this); }

    get chapters(): $Chapter[] {
        return this.parts().map(r => r.read()).filter((c): c is $Chapter => c !== undefined);
    }

    parts(): $Row[] {
        const book = this.book;
        if (!(book instanceof $Book)) throw new Error(`The table of contents stands under ${String((book as { constructor?: { name?: string } })?.constructor?.name)} instead of a book, with parent ${String((this.parent as { constructor?: { name?: string } })?.constructor?.name)}.`);
        // The numbered chapters: not the canonical, not parenthetical, not
        // the contents itself — one law, by what a chapter is.
        return this.book.parts()
            .filter(c => c !== this && !(c instanceof $Cover) && !c.parenthetical)
            .map(c => {
                const row: $Row = $(<Row path={this.book.at(c.index)} />);
                row.index = c.index;
                return row;
            });
    }

    where(match: (part: $Row) => boolean): $Row[] {
        return $Composible$.where(this, match);
    }

    select<U>(pick: (part: $Row) => U): U[] {
        return $Composible$.select(this, pick);
    }

    single(match: (part: $Row) => boolean): $Row {
        return $Composible$.single(this, match);
    }

    at(index: number): $Location<$Row> {
        return $Composible$.at(this, index);
    }

    follow(): $Composition$<$Chapter> {
        return $Composible$.follow(this);
    }

    read(): $Book {
        if (!this.cover) throw new Error('The table of contents stands outside any book.');
        return this.cover.read();
    }

    then<U extends $Referent$>(next: $Reference$<U>): $Reference$<U> {
        const path: $Path<$Book, U> = $(<Path first={this} onward={next} />);
        return path;
    }

    $TableOfContents(...sections: $Section[]) {
        try {
            super.$Chapter(...sections);
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

    row(row: $Row): ReactNode {
        return <li key={row.index}>{row.copy} {row.index}</li>;
    }

    view(): ReactNode {
        const inferred = this.$cards.filter(card => !this.book.chapters.some(c => c.title?.copy === card.title));
        return (
            <div className="table-of-contents">
                <div className="contents-title">{text(this.title.text)}</div>
                <ol>
                    {this.parts().map(r => this.row(r))}
                    {inferred.map(card => <li key={card.title}>{card.title}</li>)}
                </ol>
            </div>
        );
    }
}

export const TableOfContents = $($TableOfContents);
