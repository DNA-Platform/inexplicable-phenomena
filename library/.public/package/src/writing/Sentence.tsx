import { $Type } from '@/notation/Type';

export class $Sentence extends $Type {
    resolve = false;

    constructor() {
        super();
        this.cache('Sentence');
    }
}
