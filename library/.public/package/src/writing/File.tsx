import { $Type } from '@/notation/Type';
import { $Document } from './Document';

export class $File extends $Type<$Document> {
    resolve = false;

    constructor() {
        super();
        this.cache('File');
    }

    override parts(): $Document[] {
        return this.composed($Document);
    }
}
