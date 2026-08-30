import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Letter } from '@/writing/Letter';

// One grapheme, however many code points it takes: composed, decomposed, and a joined family.
export class $GraphemeSpec extends $Chemical {
    view(): ReactNode {
        return (
            <>
                <Letter>é</Letter>
                <Letter>é</Letter>
                <Letter>👨‍👩‍👧</Letter>
            </>
        );
    }
}

export const GraphemeSpec = $($GraphemeSpec);
