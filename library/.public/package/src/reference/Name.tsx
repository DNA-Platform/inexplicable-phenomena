import { $ } from '@dna-platform/chemistry';
import { $Reference } from './Reference';
import { $Referent } from './Referent';

export class $Name<T extends $Referent = $Referent> extends $Reference<T> {
    get symbol(): string {
        return this.copy;
    }
}

export const Name = $($Name);
