import { $ } from '@dna-platform/chemistry';
import { $Word } from './Word';
import { Role } from './Writing';

// Punctuation is a word that is mentioned rather than used: the mark is in the
// sentence and stands for itself. It is present in the writing and passed over
// by the reading — and because a mention is not parsed, it has no letters.
export class $Punctuation extends $Word {
    get role(): Role { return 'mention'; }

    valid(): boolean {
        return this.copy !== '';
    }
}

export const Punctuation = $($Punctuation);
