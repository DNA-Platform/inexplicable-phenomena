import { $Type } from '@/notation/Type';
import { $Composition$ } from './Composition';
import { $Written } from './Writing';
import { $Sentence } from './Sentence';
import { $$ } from '@/utilities/Lib';

export class $Paragraph extends $Type<$Sentence> implements $Composition$<$Sentence> {
    inline = false;
    resolve = false;
    override parts(): $Sentence[] { return this.source.written.filter(one => $$(one)($Sentence)).map(one => $$(one, $Sentence)); }

    $Paragraph(...writing: $Written[]) {
        super.$Writing(...writing);
    }

    constructor() {
        super();
        this.cache('Paragraph');
    }
}
