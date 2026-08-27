import { $Composition$ } from '@/writing/Composition';
import { $File } from '@/writing/File';
import { $Written } from '@/writing/Writing';
import { $$ } from '@/utilities/Lib';
import { $Chapter } from './Chapter';

export class $Book extends $File implements $Composition$<$Chapter> {
    override parts(): $Chapter[] { return this.source.written.filter(one => $$(one)($Chapter)).map(one => $$(one, $Chapter)); }

    $Book(...writing: $Written[]) {
        super.$File(...writing);
    }

    constructor() {
        super();
        this.cache('Book');
    }
}
