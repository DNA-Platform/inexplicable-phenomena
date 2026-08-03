import { type $Referent } from './Referent';
import { type $Reference } from './Reference';

export class $Path<M extends $Referent = any, U extends $Referent = any> implements $Reference<U> {
    index = 0;
    parenthetical = false;

    constructor(public first: $Reference<M>, public next: $Reference<U>) { }

    get copy(): string { return `${this.first.copy}.${this.next.copy}`; }

    read(): U {
        this.first.read();
        return this.next.read();
    }

    valid(): boolean {
        return this.first.valid() && this.next.valid();
    }

    then<V extends $Referent>(next: $Reference<V>): $Reference<V> {
        return new $Path<U, V>(this, next);
    }
}
