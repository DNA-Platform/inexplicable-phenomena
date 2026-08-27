import { $Type } from '@/notation/Type';
import { $Composition$ } from './Composition';
import { $Written } from './Writing';
import { $Paragraph } from './Paragraph';
import { $$ } from '@/utilities/Lib';

export class $Section extends $Type<$Paragraph> implements $Composition$<$Paragraph> {
    inline = false;
    resolve = false;
    override parts(): $Paragraph[] { return this.source.written.filter(one => $$(one)($Paragraph)).map(one => $$(one, $Paragraph)); }

    $Section(...writing: $Written[]) {
        super.$Writing(...writing);
    }

    constructor() {
        super();
        this.cache('Section');
    }
}
