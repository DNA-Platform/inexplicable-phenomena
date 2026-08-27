import { $Type } from '@/notation/Type';
import { $Letter } from './Letter';

export class $Word extends $Type<$Letter> {
    resolve = false;

    constructor() {
        super();
        this.cache('Word');
    }

    override parts(): $Letter[] {
        return this.composed($Letter);
    }
}
