import { type $Reference } from './Reference';
import { same, from } from '../utilities/reference';

export class $Path<M = unknown, U = unknown> implements $Reference<U> {
    index = 0;
    parenthetical = false;

    constructor(public first: $Reference<M>, public next: $Reference<U>) { }

    get copy(): string { return `${this.first.copy}.${this.next.copy}`; }

    read(): U | undefined {
        const mid = this.first.read();
        if (mid === undefined) return undefined;
        if (!same(mid, from(this.next))) return undefined;
        return this.next.read();
    }

    valid(): boolean {
        return this.read() !== undefined;
    }

    equals(ref: $Reference<U>): boolean {
        return same(this.read(), ref.read());
    }

    then<V>(next: $Reference<V>): $Reference<V> {
        return new $Path<U, V>(this, next);
    }
}
