import { $ } from '@dna-platform/chemistry';
import { text } from '../tools/html';
import { $Reference } from './Reference';
import { $Referent } from './Referent';

export class $Name<T extends $Referent = $Referent> extends $Reference<T> {
    get symbol(): string {
        return text(this.children);
    }
}

export const Name = $($Name);
