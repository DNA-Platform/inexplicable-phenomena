import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Word } from '@/writing/Word';

// A word written as text divides into its letters, one per grapheme.
export class $TextSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Word>hi</Word>
        );
    }
}

export const TextSpec = $($TextSpec);
