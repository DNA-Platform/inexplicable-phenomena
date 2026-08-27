import { $File } from '@/writing/File';
import { $Written } from '@/writing/Writing';
import { $$ } from '@/utilities/Lib';
import { $Chapter } from './Chapter';

export class $Book extends $File {
    override parts(): $Chapter[] { return this.source.written.filter(one => $$(one)($Chapter)).map(one => $$(one, $Chapter)); }
    override canonical(): $Chapter { return this.parts()[0]; }

    $Book(...writing: $Written[]) {
        super.$File(...writing);
    }

    constructor() {
        super();
        this.cache('Book');
    }
}
