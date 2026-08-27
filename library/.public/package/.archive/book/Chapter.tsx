import { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Referent } from '../reference/Referent';
import { $Reference } from '../reference/Reference';
import { $Catalogue } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import { $Path, Path } from '../reference/Path';
import { $Document } from '../document/Document';
import { Role } from '../writing/Writing';
import { $Section } from '../writing/Section';
import { $$Section } from '../writing/Section';
import { $Book } from './Book';

export class $Chapter extends $Document implements $Reference<$Book> {
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

    follow<U extends $Referent>(next: $Reference<U>): $Reference<U> {
        const path: $Path<$Book, U> = $(<Path first={this} onward={next} />);
        return path;
    }

    $Chapter(...writing: unknown[]) {
        super.$Document(...writing);
        this.requires();
    }

    // WHAT THIS KIND OF CHAPTER REQUIRES. A cover and a contents require
    // something else, and they say so by overriding rather than by catching
    // this one and rethrowing it only sometimes.
    protected requires(): void {
        if (!this.summary) throw new Error('A chapter requires a summary — a parenthetical section.');
    }
}

export class $$Chapter extends $Section implements $Reference<$Chapter>, $Catalogue<$Section> {
    $of!: $Chapter;

    $role?: Role = 'mention';

    view(): ReactNode { return <>{this.copy}</>; }

    get of(): $Chapter { return this.$of; }
    get copy(): string { return this.valid() ? (this.of.title?.copy || this.of.canonical.heading) : ''; }
    get heading(): string { return this.copy; }
    get chapter(): $Chapter { return this.of; }
    get canonical(): $$Section { return this.parts()[0]; }

    parts(): $$Section[] {
        const Entry = $($$Section);
        return this.of.parts().map(part => $(<Entry of={part} />) as $$Section);
    }

    where(match: (part: $$Section) => boolean): $$Section[] {
        return this.parts().filter(match);
    }

    select<U>(pick: (part: $$Section) => U): U[] {
        return this.parts().map(pick);
    }

    selectMany<U>(pick: (part: $$Section) => U[]): U[] {
        return this.parts().flatMap(pick);
    }

    single(match: (part: $$Section) => boolean): $$Section {
        const found = this.parts().filter(match);
        if (found.length !== 1) throw new Error(`single expected exactly one part and found ${found.length}.`);
        return found[0];
    }

    at(position: number): $Location<$$Section> {
        return this.located<$$Section>(position);
    }

    read(): $Chapter {
        return this.of;
    }

    follow<U extends $Referent>(next: $Reference<U>): $Reference<U> {
        return $(<Path first={this} onward={next} />);
    }

    valid(): boolean {
        return this.$of !== undefined;
    }
}

export const Chapter = $($Chapter);
