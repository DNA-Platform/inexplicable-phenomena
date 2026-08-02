import { $ } from '@dna-platform/chemistry';
import { type $Reference } from '../reference/Reference';
import { same } from '../utilities/reference';
import { $Path } from '../reference/Path';
import { $Referent } from '../reference/Referent';
import { $Sentence } from '../writing/Sentence';
import { $Book } from './Book';

export class $Bookmark<T extends $Referent = $Referent> extends $Sentence implements $Reference<T> {
    $for?: string;

    get for(): string {
        return this.$for ?? this.copy;
    }

    get book(): $Book | undefined {
        let scope: unknown = this.parent;
        while (scope && !(scope instanceof $Book)) scope = (scope as { parent?: unknown }).parent;
        return scope as $Book | undefined;
    }

    protected get path(): $Reference<T> | undefined {
        const keys = this.for.replace(/^.*#/, '').split('.').filter(Boolean).map(Number);
        const book = this.book;
        if (!keys.length || !book) return undefined;
        let reference: $Reference<any> = book.at(keys[0]);
        for (const key of keys.slice(1)) {
            const mid = reference.read() as { at?: (index: number) => $Reference<any> } | undefined;
            if (!mid?.at) return undefined;
            reference = reference.then(mid.at(key));
        }
        return reference as $Reference<T>;
    }

    read(): T | undefined {
        return this.path?.read();
    }

    equals(ref: $Reference<T>): boolean {
        return same(this.read(), ref.read());
    }

    then<U>(next: $Reference<U>): $Reference<U> {
        return new $Path<T, U>(this, next);
    }
}

export const Bookmark = $($Bookmark);
