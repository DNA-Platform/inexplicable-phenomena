import { $Type } from '@/notation/Type';

export class $Word extends $Type {
    resolve = false;

    constructor() {
        super();
        this.cache('Word');
    }
}
