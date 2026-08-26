import { $Referent$ } from '@/reference/Referent';
import { $Type } from '@/notation/Type';

export interface $Writing$ extends $Referent$ {
    copy: string;
    parenthetical: boolean;
}

export class $TypeOfWriting extends $Type {
    constructor() {
        super();
        this.cache('Writing');
    }
}
