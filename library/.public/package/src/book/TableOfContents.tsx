import React, { type ReactNode } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import { text } from '../utilities/html';
import { type $Reference, same } from '../reference/Reference';
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
import { type $Paragraph } from '../writing/Paragraph';
import { type $Sentence } from '../writing/Sentence';
import { type $Word } from '../writing/Word';
import { type $Letter } from '../writing/Letter';
import { type $Book } from './Book';

export class $TableOfContents extends $Chapter implements $Catalogue<$Chapter> {
    get title(): $Title {
        const authored = this.$contents.find(s => !s.parenthetical)?.heading ?? '';
        const title: $Title = $(<Title>{authored || 'Table of Contents'}</Title>);
        return title;
    }

    get summary(): $Section { return this.book.cover.summary; }

    get cover(): $Cover { return this.book.cover; }

    get canonical(): $Row { return Composible.canonical(this); }

    get chapters(): $Chapter[] {
        return this.contents().map(r => r.find()).filter((c): c is $Chapter => c !== undefined);
    }

    contents(): $Row[] {
        return this.book.contents()
            .filter(c => c !== this && !(c instanceof $Cover))
            .map(c => {
                const row = new $Row();
                row.to = this.book.at(c.index);
                row.index = c.index;
                row.place = this.at(row.index);
                return row;
            });
    }

    where(match: (part: $Row) => boolean): $Row[] {
        return Composible.where(this, match);
    }

    select<U>(pick: (part: $Row) => U): U[] {
        return Composible.select(this, pick);
    }

    at(index: number): $Location<$Row> {
        return Composible.at(this, index);
    }

    get telescope(): {
        sections: $Reference<$Section>[];
        paragraphs: $Reference<$Paragraph>[];
        sentences: $Reference<$Sentence>[];
        words: $Reference<$Word>[];
        letters: $Reference<$Letter>[];
    } {
        const contents = this;
        return {
            get sections() { return Composible.down(contents.contents(), c => c.ref); },
            get paragraphs() { return Composible.down(this.sections, s => s.ref); },
            get sentences() { return Composible.down(this.paragraphs, p => p.ref); },
            get words() { return Composible.down(this.sentences, s => s.ref); },
            get letters() { return Composible.down(this.words, w => w.ref); },
        };
    }

    find(): $Book | undefined {
        return this.cover.find();
    }

    equals(ref: $Reference<$Composition<$Chapter>>): boolean {
        const found = ref.find();
        return this.book === found || same(this.book, found);
    }

    then<U>(next: $Reference<U>): $Reference<U> {
        return new $Path<$Book, U>(this, next);
    }

    $TableOfContents(...sections: $Section[]) {
        this.$contents = sections.map(s => $check(s, $Section));
        this.$contents.forEach((s, i) => { if (s.$index === undefined) s.index = i + 1; });
        this.$contents.forEach(s => { s.place = this.at(s.index); });
    }

    row(row: $Row): ReactNode {
        return <li key={row.index}>{row.copy} {row.folio}</li>;
    }

    view(): ReactNode {
        return (
            <div className="table-of-contents">
                <div className="contents-title">{text(this.title.block)}</div>
                <ol>
                    {this.contents().map(r => this.row(r))}
                </ol>
            </div>
        );
    }

    valid(): boolean {
        return super.valid() && this.contents().every(s => s instanceof $Row);
    }
}

export const TableOfContents = $($TableOfContents);
