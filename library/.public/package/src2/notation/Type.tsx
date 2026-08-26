import { $Referent$ } from '@/reference/Referent';
import { $Writing$ } from '@/writing/Writing';
import { $Annotation } from './Annotation';

export class $Type extends $Annotation {
    get instance(): $Writing$ { return this.parent?.parent as $Writing$; }

    constructor() {
        super();
        this.cache('<Type>');
    }

    specify(): void {
    }

    static is(instance: $Referent$, type: $Type): boolean {
        return instance.specification.some(t => t instanceof (type.constructor as any));
    }
}
