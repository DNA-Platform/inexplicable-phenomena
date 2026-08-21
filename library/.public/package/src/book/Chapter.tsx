import { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Referent } from '../reference/Referent';
import { $Reference$ } from '../reference/Reference';
import { $Catalogue$ } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import { $Composible$ } from '../writing/Composition';
import { $Path, Path } from '../reference/Path';
import { $Composition$ } from '../writing/Composition';
import { $Document } from '../document/Document';
import { Role } from '../writing/Writing';
import { $Section } from '../writing/Section';
import { $$Section } from '../writing/Section';
import { $Book } from './Book';

export class $Chapter extends $Document implements $Reference$<$Book> {
    $in?: $Book = undefined;

    get book(): $Book { return this.$in as $Book; }

    get address(): string {
        return (this.title?.copy ?? '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    }

    get ref(): $$Chapter { const Entry = $($$Chapter); return $(<Entry of={this} />) as $$Chapter; }

    read(): $Book {
        const book = this.book;
        if (!book) throw new Error(`The chapter ${JSON.stringify(this.title?.copy ?? '')} stands outside any book.`);
        return book;
    }

    then<U extends $Referent>(next: $Reference$<U>): $Reference$<U> {
        const path: $Path<$Book, U> = $(<Path first={this} onward={next} />);
        return path;
    }

    $Chapter(...writing: unknown[]) {
        super.$Document(...writing);
        if (!this.summary) throw new Error('A chapter requires a summary — a parenthetical section.');
    }
}

export class $$Chapter extends $Section implements $Reference$<$Chapter>, $Catalogue$<$Section> {
    $of!: $Chapter;

    $role?: Role = 'mention';

    view(): ReactNode { return <>{this.copy}</>; }

    get of(): $Chapter { return this.$of; }
    get copy(): string { return this.valid() ? this.of.canonical.heading : ''; }
    get heading(): string { return this.copy; }
    get chapter(): $Chapter { return this.of; }
    get canonical(): $$Section { return $Composible$.canonical(this); }

    parts(): $$Section[] {
        const Entry = $($$Section);
        return this.of.parts().map(part => $(<Entry of={part} />) as $$Section);
    }

    where(match: (part: $$Section) => boolean): $$Section[] {
        return $Composible$.where(this, match);
    }

    select<U>(pick: (part: $$Section) => U): U[] {
        return $Composible$.select(this, pick);
    }

    selectMany<U>(pick: (part: $$Section) => U[]): U[] {
        return $Composible$.selectMany(this, pick);
    }

    single(match: (part: $$Section) => boolean): $$Section {
        return $Composible$.single(this, match);
    }

    at(position: number): $Location<$$Section> {
        return $Composible$.at(this, position);
    }

    follow(): $Composition$<$Section> {
        return $Composible$.follow(this as never);
    }

    read(): $Chapter {
        return this.of;
    }

    then<U extends $Referent>(next: $Reference$<U>): $Reference$<U> {
        return $(<Path first={this} onward={next} />);
    }

    valid(): boolean {
        return this.$of !== undefined;
    }
}

export const Chapter = $($Chapter);
