import { $Type } from '@/notation/Type';

export class $File extends $Type {
    resolve = false;

    constructor() {
        super();
        this.cache('File');
    }
}
