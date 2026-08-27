import { $Type } from '@/notation/Type';

export class $Document extends $Type {
    resolve = false;

    constructor() {
        super();
        this.cache('Document');
    }
}
