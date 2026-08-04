import { type $Referent$ } from '../reference/Referent';
import { type $Reference$ } from '../reference/Reference';
import { $Path } from '../reference/Path';
import { type $Footnote } from './Footnote';

export class $Key implements $Reference$<$Footnote> {
    index = 0;
    parenthetical = false;

    constructor(public name: string, public footnote: $Footnote) { }

    get copy(): string { return this.name; }

    read(): $Footnote {
        return this.footnote;
    }

    valid(): boolean {
        return this.footnote.valid();
    }

    then<U extends $Referent$>(next: $Reference$<U>): $Reference$<U> {
        return new $Path<$Footnote, U>(this, next);
    }
}
