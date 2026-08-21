import { $ } from '@dna-platform/chemistry';
import { $Word } from './Word';

export class $Phrase extends $Word {
    valid(): boolean {
        return this.copy !== '' && /[\p{L}\p{N}]/u.test(this.copy);
    }
}

export const Phrase = $($Phrase);
