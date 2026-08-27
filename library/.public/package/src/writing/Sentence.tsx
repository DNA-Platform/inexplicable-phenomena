import { $Type } from '@/notation/Type';
import { $Word } from './Word';

export class $Sentence extends $Type<$Word> {
    resolve = false;

    constructor() {
        super();
        this.cache('Sentence');
    }

    override parts(): $Word[] {
        return this.composed($Word);
    }
}
