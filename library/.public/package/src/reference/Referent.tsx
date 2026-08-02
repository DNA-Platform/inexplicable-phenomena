import { $, $Chemical } from '@dna-platform/chemistry';
import { type $Reference } from './Reference';
import { $Location } from './Location';

export class $Referent extends $Chemical {
    protected location?: $Reference;

    get ref(): $Reference | undefined {
        return this.location;
    }

    set ref(reference: $Reference | undefined) {
        this.location = reference;
    }

    valid(): boolean {
        return this.location === undefined || this.location instanceof $Location;
    }
}

export const Referent = $($Referent);
