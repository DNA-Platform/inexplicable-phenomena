import { $, $Chemical } from '@dna-platform/chemistry';
import { type $Composition } from '../writing/Composition';

export class $Referent extends $Chemical {
    catalogue?: $Composition<any>;

    valid(): boolean {
        return true;
    }
}

export const Referent = $($Referent);
