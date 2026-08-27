import { $Type } from '@/notation/Type';
import { $Composition$ } from './Composition';
import { $Written } from './Writing';
import { $Word } from './Word';
import { $$ } from '@/utilities/Lib';

export class $Sentence extends $Type<$Word> implements $Composition$<$Word> {
    resolve = false;
    override parts(): $Word[] { return this.source.written.filter(one => $$(one)($Word)).map(one => $$(one, $Word)); }

    $Sentence(...writing: $Written[]) {
        super.$Writing(...writing);
    }

    constructor() {
        super();
        this.cache('Sentence');
    }
}
