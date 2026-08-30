import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Word } from '@/writing/Word';
import { Letter } from '@/writing/Letter';

// A written letter stands among divided ones, in written order.
export class $MixedSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Word>a<Letter>🙂</Letter>b</Word>
        );
    }
}

export const MixedSpec = $($MixedSpec);
