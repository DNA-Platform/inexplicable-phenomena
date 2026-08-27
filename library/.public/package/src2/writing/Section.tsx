import { $Type } from '@/notation/Type';

export class $Section extends $Type {
    resolve = false;

    constructor() {
        super();
        this.cache('Section');
    }
}
