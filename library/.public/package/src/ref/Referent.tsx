import { $, $Chemical } from '@dna-platform/chemistry';
import { type $Reference } from './Reference';

export class $Referent extends $Chemical {
    $ref?: $Reference;

    get ref(): $Reference | undefined {
        const parent = this.parent;
        const derived = parent instanceof $Referent && parent !== this
            ? parent.ref?.compose((this as any).index ?? 0)
            : undefined;
        return derived ?? this.$ref;
    }

    set ref(reference: $Reference | undefined) {
        this.$ref = reference;
    }

    valid(): boolean {
        return true;
    }
}

export const Referent = $($Referent);
