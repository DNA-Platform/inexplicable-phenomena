import { $, $check } from '@dna-platform/chemistry';
import { type $Reference } from '../reference/Reference';
import { same } from '../utilities/reference';
import { $Path } from '../reference/Path';
import { $Chapter } from './Chapter';
import { type $Title } from '../writing/Title';
import { type $Book } from './Book';
import { $Section } from '../writing/Section';

export class $Cover extends $Chapter implements $Reference<$Book> {
    get summary(): $Section { return this.canonical; }

    get title(): $Title { return super.title!; }

    read(): $Book | undefined {
        return this.book;
    }

    equals(ref: $Reference<$Book>): boolean {
        const found = ref.read();
        return (this.book !== undefined && this.book === found) || same(this.book, found);
    }

    then<U>(next: $Reference<U>): $Reference<U> {
        return new $Path<$Book, U>(this, next);
    }

    $Cover(...sections: $Section[]) {
        this.$contents = sections.length ? sections.map(s => $check(s, $Section)) : this.written();
        this.$contents.forEach((s, i) => { if (s.$index === undefined) s.index = i + 1; });
        this.$contents.forEach(s => { s.ref = this.at(s.index); });
        if (!this.valid()) throw new Error('A cover requires a title.');
    }
}

export const Cover = $($Cover);
