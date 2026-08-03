import { $ } from '@dna-platform/chemistry';
import { type $Referent } from '../reference/Referent';
import { type $Reference } from '../reference/Reference';
import { path } from '../utilities/reference';
import { $Path } from '../reference/Path';
import { $Sentence } from '../writing/Sentence';
import { $Book } from './Book';

export class $Bookmark<T extends $Referent = $Referent> extends $Sentence implements $Reference<T> {
    $for?: string;

    get for(): string {
        return this.$for ?? this.copy;
    }

    get book(): $Book | undefined {
        let scope: unknown = this.parent;
        while (scope && !(scope instanceof $Book)) {
            const above = (scope as { parent?: unknown }).parent;
            scope = above === scope ? undefined : above;
        }
        return scope as $Book | undefined;
    }

    protected get path(): $Reference<T> | undefined {
        const book = this.book;
        return book && path(book, this.for) as $Reference<T> | undefined;
    }

    read(): T {
        const reference = this.path;
        if (!reference) throw new Error(`The bookmark cannot read ${this.for} — no book holds it.`);
        return reference.read();
    }

    valid(): boolean {
        try {
            this.read();
            return true;
        } catch {
            return false;
        }
    }

    then<U extends $Referent>(next: $Reference<U>): $Reference<U> {
        return new $Path<T, U>(this, next);
    }
}

export const Bookmark = $($Bookmark);
