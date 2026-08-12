import { $, $valid } from '@dna-platform/chemistry';
import { $Paragraph } from './Paragraph';

// A title is PARAGRAPH GRADE, because it is the canonical part of its section —
// the special first, at position zero. It carried no level at all while it was
// lifted out into a member of its own, which is why the walk could not place it.
export class $Title extends $Paragraph {
    valid(): boolean {
        return $valid(this.copy !== '', 'a title has words, and this one is empty');
    }
}

export const Title = $($Title);
