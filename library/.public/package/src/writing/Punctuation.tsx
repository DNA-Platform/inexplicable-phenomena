import { $ } from '@dna-platform/chemistry';
import { $Word } from './Word';
import { Role } from './Writing';

export class $Punctuation extends $Word {
    get role(): Role { return 'mention'; }

    valid(): boolean {
        return this.copy !== '';
    }
}

export const Punctuation = $($Punctuation);
