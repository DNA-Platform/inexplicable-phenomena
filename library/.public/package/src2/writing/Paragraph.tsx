import { $Type } from '@/notation/Type';

export class $Paragraph extends $Type {
    resolve = false;

    constructor() {
        super();
        this.cache('Paragraph');
    }
}
