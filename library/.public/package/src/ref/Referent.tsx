import { $, $Chemical } from '@dna-platform/chemistry';

export class $Referent extends $Chemical {
    valid(): boolean {
        return true;
    }

    $Referent() {
    }
}

export const Referent = $($Referent);
