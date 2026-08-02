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
        if (this.location === undefined) return true;
        if (!(this.location instanceof $Location)) return false;
        const arrival = this.location.read();
        return arrival !== undefined && arrival instanceof (this.constructor as new () => unknown);
    }
}

export const Referent = $($Referent);
