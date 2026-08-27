import { $Referent$ } from '@/reference/Referent';
import { $Writing } from '@/writing/Writing';
import { $Annotation } from './Annotation';

export class $Type extends $Annotation {
    instance?: $Writing = undefined;

    override get formula(): boolean { return true; }

    override get copy(): string { return this.instance ? this.instance.copy : ''; }

    bind(writing: $Writing): this {
        this.instance = writing;
        return this;
    }

    static is(instance: $Referent$, type: $Type): boolean {
        return instance.specification.some(t => t instanceof (type.constructor as any));
    }
}
