import { type $Composition } from '../writing/Composition';
import { type $Referent } from './Referent';
import { type $Reference } from './Reference';
import { $Path } from './Path';

export class $Location<T extends $Referent = any> implements $Reference<T> {
    index = 0;
    parenthetical = false;

    constructor(public i: number, public of: $Composition<any>) { }

    get copy(): string { return `${this.i}`; }

    read(): T {
        return this.of.single((part: { index: number }) => part.index === this.i) as T;
    }

    valid(): boolean {
        return this.of.parts().filter((part: { index: number }) => part.index === this.i).length === 1;
    }

    then<U extends $Referent>(next: $Reference<U>): $Reference<U> {
        return new $Path<T, U>(this, next);
    }
}
