import { $, $check } from '@dna-platform/chemistry';
import { $Word } from './Word';

export class $Phrase extends $Word {
    protected override whole(): boolean {
        return $check(this.copy !== '', 'a phrase is a name, and a name may carry spaces but not be empty');
    }
}

export const Phrase = $($Phrase);
