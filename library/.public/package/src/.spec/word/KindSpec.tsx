import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Word } from '@/writing/Word';

// A canonical word carries a letter or a number; punctuation and whitespace are its residue.
export class $KindSpec extends $Chemical {
    view(): ReactNode {
        return (
            <>
                <Word>hello</Word>
                <Word>123</Word>
                <Word>!</Word>
            </>
        );
    }
}

export const KindSpec = $($KindSpec);
