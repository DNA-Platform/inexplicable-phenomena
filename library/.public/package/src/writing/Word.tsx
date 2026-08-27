import { $Type } from '@/notation/Type';
import { $Composition$ } from './Composition';
import { $Written } from './Writing';
import { $Letter } from './Letter';
import { $$ } from '@/utilities/Lib';

export class $Word extends $Type<$Letter> implements $Composition$<$Letter> {
    resolve = false;
    override parts(): $Letter[] { return this.source.written.filter(one => $$(one)($Letter)).map(one => $$(one, $Letter)); }

    $Word(...writing: $Written[]) {
        super.$Writing(...writing);
    }

    constructor() {
        super();
        this.cache('Word');
    }
}
