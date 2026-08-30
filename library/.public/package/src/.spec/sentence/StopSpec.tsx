import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Sentence } from '@/writing/Sentence';

// A sentence stops once, at its end. Prose that stops before its end is two sentences and is refused.
export class $StopSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Sentence>One two.</Sentence>
        );
    }
}

export const StopSpec = $($StopSpec);
