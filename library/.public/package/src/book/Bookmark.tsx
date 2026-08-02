import { $ } from '@dna-platform/chemistry';
import { type $Reference, same } from '../reference/Reference';
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

    get to(): $Reference<T> | undefined {
        const keys = this.for.replace(/^.*#/, '').split('.').filter(Boolean).map(Number);
        const book = this.book;
        if (!keys.length || !book) return undefined;
        let reference: $Reference<any> = book.at(keys[0]);
        for (const key of keys.slice(1)) {
            const mid = reference.find() as { at?: (index: number) => $Reference<any> } | undefined;
            if (!mid?.at) return undefined;
            reference = reference.then(mid.at(key));
        }
        return reference as $Reference<T>;
    }

    find(): T | undefined {
        return this.to?.find();
    }

    equals(ref: $Reference<T>): boolean {
        return same(this.find(), ref.find());
    }

    then<U>(next: $Reference<U>): $Reference<U> {
        return new $Path<T, U>(this, next);
    }
}

export const Bookmark = $($Bookmark);
