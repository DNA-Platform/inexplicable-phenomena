import { type $Composition } from '../writing/Composition';
import { type $Reference, same } from './Reference';
import { $Path } from './Path';

export class $Location<T = unknown> implements $Reference<T> {
    index = 0;
    parenthetical = false;

    constructor(public i: number, public of: $Composition<any>) { }

    get copy(): string { return `${this.i}`; }

    find(): T | undefined {
        const found = this.of.contents().filter((p: { index: number }) => p.index === this.i);
        return found.length === 1 ? found[0] as T : undefined;
    }

    valid(): boolean {
        return this.find() !== undefined;
    }

    equals(ref: $Reference<T>): boolean {
        return same(this.find(), ref.find());
    }

    then<U>(next: $Reference<U>): $Reference<U> {
        return new $Path<T, U>(this, next);
    }
}
