import { $, $Chemical } from '@dna-platform/chemistry';
import { type $Reference } from './Reference';

export class $Referent extends $Chemical {
    ref?: $Reference;

    valid(): boolean {
        return true;
    }
}

export const Referent = $($Referent);
