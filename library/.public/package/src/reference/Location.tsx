import { type $Composition } from '../writing/Composition';
import { type $Reference } from './Reference';
import { same } from '../utilities/reference';
import { $Path } from './Path';

export class $Location<T = unknown> implements $Reference<T> {
    index = 0;
    parenthetical = false;

    constructor(public i: number, public of: $Composition<any>) { }

    get copy(): string { return `${this.i}`; }

    read(): T | undefined {
        const found = this.of.parts().filter((p: { index: number }) => p.index === this.i);
        return found.length === 1 ? found[0] as T : undefined;
    }

    valid(): boolean {
        return this.read() !== undefined;
    }

    equals(ref: $Reference<T>): boolean {
        return same(this.read(), ref.read());
    }

    then<U>(next: $Reference<U>): $Reference<U> {
        return new $Path<T, U>(this, next);
    }
}
