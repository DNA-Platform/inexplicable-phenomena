import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Word } from '@/writing/Word';
import { Letter } from '@/writing/Letter';

// A word written as letters keeps the very objects it was written with.
export class $LettersSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Word>
                <Letter>h</Letter>
                <Letter>i</Letter>
            </Word>
        );
    }
}

export const LettersSpec = $($LettersSpec);
