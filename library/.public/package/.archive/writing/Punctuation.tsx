import { $, $check } from '@dna-platform/chemistry';
import { $Word } from './Word';
import { Role } from './Writing';

export class $Punctuation extends $Word {
    get role(): Role { return 'mention'; }

    protected override whole(): boolean {
        return $check(this.copy !== '', 'a mark stands between words and may be the space itself, and this one is empty');
    }

    protected override said(): boolean {
        return $check(this.copy !== '', 'a mark says nothing in letters, and this one is nothing at all');
    }
}

export const Punctuation = $($Punctuation);
