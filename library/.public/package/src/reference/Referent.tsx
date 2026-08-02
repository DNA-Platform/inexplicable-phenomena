import { $, $Chemical } from '@dna-platform/chemistry';
import { type $Reference } from './Reference';

export class $Referent extends $Chemical {
    protected location?: $Reference;

    get ref(): $Reference | undefined {
        return this.location;
    }

    set ref(reference: $Reference | undefined) {
        this.location = reference;
    }

    valid(): boolean {
        return true;
    }
}

export const Referent = $($Referent);
