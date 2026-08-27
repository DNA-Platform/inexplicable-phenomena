import { $Type } from '@/notation/Type';
import { $Composition$ } from './Composition';
import { $Written } from './Writing';
import { $Section } from './Section';
import { $$ } from '@/utilities/Lib';

export class $Document extends $Type<$Section> implements $Composition$<$Section> {
    inline = false;
    resolve = false;
    override parts(): $Section[] { return this.source.written.filter(one => $$(one)($Section)).map(one => $$(one, $Section)); }

    $Document(...writing: $Written[]) {
        super.$Writing(...writing);
    }

    constructor() {
        super();
        this.cache('Document');
    }
}
