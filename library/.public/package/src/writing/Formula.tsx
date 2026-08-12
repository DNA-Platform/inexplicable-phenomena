import { $, $valid } from '@dna-platform/chemistry';
import { $Phrase } from './Phrase';
import { type Role } from './Writing';

export class $Formula extends $Phrase {
    get role(): Role { return 'mention'; }

    valid(): boolean {
        return $valid(this.copy.trim() !== '', 'a formula is what it sets, and this one sets nothing');
    }
}

export const Formula = $($Formula);
