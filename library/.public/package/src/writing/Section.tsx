import { $Type } from '@/notation/Type';
import { $Paragraph } from './Paragraph';

export class $Section extends $Type<$Paragraph> {
    resolve = false;

    constructor() {
        super();
        this.cache('Section');
    }

    override parts(): $Paragraph[] {
        return this.composed($Paragraph);
    }
}
