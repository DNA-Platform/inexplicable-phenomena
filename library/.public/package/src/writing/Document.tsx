import { $Type } from '@/notation/Type';
import { $Section } from './Section';

export class $Document extends $Type<$Section> {
    resolve = false;

    constructor() {
        super();
        this.cache('Document');
    }

    override parts(): $Section[] {
        return this.composed($Section);
    }
}
