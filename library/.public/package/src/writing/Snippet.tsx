// The real answer is one $Code with an `inline` boolean whose LEVEL moves
// between paragraph and phrase. That needs dynamic layering, which the framework
// does not have yet.
import { $, $valid } from '@dna-platform/chemistry';
import { $Phrase } from './Phrase';
import { type Role } from './Writing';

export class $Snippet extends $Phrase {
    get role(): Role { return 'mention'; }

    valid(): boolean {
        return $valid(this.copy.trim() !== '', 'code inside a sentence is the source it carries, and this one carries none');
    }
}

export const Snippet = $($Snippet);
