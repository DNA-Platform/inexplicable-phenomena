import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Letter } from '@/writing/Letter';

// A letter is written as one grapheme of text.
export class $TextSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Letter>L</Letter>
        );
    }
}

export const TextSpec = $($TextSpec);
