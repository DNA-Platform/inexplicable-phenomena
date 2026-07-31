import { $, $Chemical } from '@dna-platform/chemistry';
import { type $Reference } from './Reference';

export class $Referent extends $Chemical {
    $ref?: $Reference;

    get ref(): $Reference | undefined {
        if (this.$ref) return this.$ref;
        const parent = this.parent;
        return parent instanceof $Referent ? parent.ref?.compose((this as any).index ?? 0) : undefined;
    }

    set ref(reference: $Reference | undefined) {
        this.$ref = reference;
    }

    valid(): boolean {
        return true;
    }
}

export const Referent = $($Referent);
