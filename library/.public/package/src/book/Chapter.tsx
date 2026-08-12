import { $ } from '@dna-platform/chemistry';
import { $Referent$ } from '../reference/Referent';
import { $Reference$ } from '../reference/Reference';
import { $Catalogue$ } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import { $Composible$ } from '../utilities/Composible';
import { $Path, Path } from '../reference/Path';
import { $Composition$ } from '../writing/Composition';
import { $Document } from '../document/Document';
import { $Section } from '../writing/Section';
import { $Book } from './Book';

export class $Chapter extends $Document implements $Reference$<$Book> {
    $in?: $Book = undefined;

    get book(): $Book { return this.$in as $Book; }

    get ref(): $$Chapter { return new $$Chapter(this); }

    read(): $Book {
        const book = this.book;
        if (!book) throw new Error(`The chapter ${JSON.stringify(this.title?.copy ?? '')} stands outside any book.`);
        return book;
    }

    then<U extends $Referent$>(next: $Reference$<U>): $Reference$<U> {
        const path: $Path<$Book, U> = $(<Path first={this} onward={next} />);
        return path;
    }

    $Chapter(...writing: unknown[]) {
        super.$Document(...writing);
        if (!this.summary) throw new Error('A chapter requires a summary — a parenthetical section.');
    }
}

export class $$Chapter implements $Catalogue$<$Section>, $Reference$<$Chapter> {
    index = 0;
    parenthetical = false;

    constructor(public of: $Chapter) { }

    get copy(): string { return this.parts().map(r => r.copy).join(' '); }
    get canonical(): $Reference$<$Section> { return $Composible$.canonical(this); }

    // A reference per part, standing where the part stands. Position is the
    // whole of the correspondence — nothing is written to anything.
    parts(): $Reference$<$Section>[] {
        return this.of.parts().map((_, position) => this.of.at(position));
    }

    where(match: (reference: $Reference$<$Section>) => boolean): $Reference$<$Section>[] {
        return $Composible$.where(this, match);
    }

    select<U>(pick: (reference: $Reference$<$Section>) => U): U[] {
        return $Composible$.select(this, pick);
    }

    single(match: (reference: $Reference$<$Section>) => boolean): $Reference$<$Section> {
        return $Composible$.single(this, match);
    }

    at(index: number): $Location<$Reference$<$Section>> {
        return $Composible$.at(this, index);
    }

    follow(): $Composition$<$Section> {
        return $Composible$.follow(this);
    }

    read(): $Chapter {
        return this.of;
    }

    valid(): boolean {
        return this.of.valid();
    }

    then<U extends $Referent$>(next: $Reference$<U>): $Reference$<U> {
        const path: $Path<$Chapter, U> = $(<Path first={this} onward={next} />);
        return path;
    }
}

export const Chapter = $($Chapter);
