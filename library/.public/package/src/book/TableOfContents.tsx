import React, { type ReactNode } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import { text } from '../utilities/html';
import { type $Referent } from '../reference/Referent';
import { type $Reference } from '../reference/Reference';
import { type $Catalogue } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import { Composible } from '../utilities/Composible';
import { $Path } from '../reference/Path';
import { type $Composition } from '../writing/Composition';
import { $Chapter } from './Chapter';
import { $Row } from './Row';
import { $Title, Title } from '../writing/Title';
import { $Cover } from './Cover';
import { $Section } from '../writing/Section';
import { type $Book } from './Book';

export class $TableOfContents extends $Chapter implements $Catalogue<$Chapter> {
    get title(): $Title {
        const authored = this.$parts.find(s => !s.parenthetical)?.heading ?? '';
        const title: $Title = $(<Title>{authored || 'Table of Contents'}</Title>);
        return title;
    }

    get summary(): $Section { return this.book.cover.summary; }

    get cover(): $Cover { return this.book.cover; }

    get canonical(): $Row { return Composible.canonical(this); }

    get chapters(): $Chapter[] {
        return this.parts().map(r => r.read()).filter((c): c is $Chapter => c !== undefined);
    }

    parts(): $Row[] {
        return this.book.parts()
            .filter(c => c !== this && !(c instanceof $Cover))
            .map(c => {
                const row = new $Row();
                row.path = this.book.at(c.index);
                row.index = c.index;
                return row;
            });
    }

    where(match: (part: $Row) => boolean): $Row[] {
        return Composible.where(this, match);
    }

    select<U>(pick: (part: $Row) => U): U[] {
        return Composible.select(this, pick);
    }

    single(match: (part: $Row) => boolean): $Row {
        return Composible.single(this, match);
    }

    at(index: number): $Location<$Row> {
        return Composible.at(this, index);
    }

    follow(): $Composition<$Chapter> {
        return Composible.follow(this);
    }

    read(): $Book {
        return this.cover.read();
    }

    then<U extends $Referent>(next: $Reference<U>): $Reference<U> {
        return new $Path<$Book, U>(this, next);
    }

    $TableOfContents(...sections: $Section[]) {
        this.$parts = sections.map(s => $check(s, $Section));
        this.$parts.forEach((s, i) => { if (s.$index === undefined) s.index = i + 1; });
    }

    row(row: $Row): ReactNode {
        return <li key={row.index}>{row.copy} {row.index}</li>;
    }

    view(): ReactNode {
        return (
            <div className="table-of-contents">
                <div className="contents-title">{text(this.title.text)}</div>
                <ol>
                    {this.parts().map(r => this.row(r))}
                </ol>
            </div>
        );
    }
}

export const TableOfContents = $($TableOfContents);
