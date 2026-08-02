import { type $Reference, same, home } from './Reference';

export class $Path<M = unknown, U = unknown> implements $Reference<U> {
    index = 0;
    parenthetical = false;

    constructor(public first: $Reference<M>, public next: $Reference<U>) { }

    get copy(): string { return `${this.first.copy}.${this.next.copy}`; }

    find(): U | undefined {
        const mid = this.first.find();
        if (mid === undefined) return undefined;
        if (!same(mid, home(this.next))) return undefined;
        return this.next.find();
    }

    valid(): boolean {
        return this.find() !== undefined;
    }

    equals(ref: $Reference<U>): boolean {
        return same(this.find(), ref.find());
    }

    then<V>(next: $Reference<V>): $Reference<V> {
        return new $Path<U, V>(this, next);
    }
}
