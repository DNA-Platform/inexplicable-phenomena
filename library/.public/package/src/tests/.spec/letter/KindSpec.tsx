import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Letter } from '@/writing/Letter';

// The five kinds a letter answers with: alphabetical, numeric, whitespace, punctuation, symbolic.
export class $KindSpec extends $Chemical {
    view(): ReactNode {
        return (
            <>
                <Letter>a</Letter>
                <Letter>7</Letter>
                <Letter>{' '}</Letter>
                <Letter>,</Letter>
                <Letter>🙂</Letter>
            </>
        );
    }
}

export const KindSpec = $($KindSpec);
