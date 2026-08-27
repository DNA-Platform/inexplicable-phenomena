import { $Type } from '@/notation/Type';
import { $Composition$ } from './Composition';
import { $Written } from './Writing';
import { $Document } from './Document';
import { $$ } from '@/utilities/Lib';

export class $File extends $Type<$Document> implements $Composition$<$Document> {
    inline = false;
    resolve = false;
    override parts(): $Document[] { return this.source.written.filter(one => $$(one)($Document)).map(one => $$(one, $Document)); }

    $File(...writing: $Written[]) {
        super.$Writing(...writing);
    }

    constructor() {
        super();
        this.cache('File');
    }
}
