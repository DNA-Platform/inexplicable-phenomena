import { $Type } from '@/notation/Type';
import { $Sentence } from './Sentence';

export class $Paragraph extends $Type<$Sentence> {
    resolve = false;

    constructor() {
        super();
        this.cache('Paragraph');
    }

    override parts(): $Sentence[] {
        return this.composed($Sentence);
    }
}
