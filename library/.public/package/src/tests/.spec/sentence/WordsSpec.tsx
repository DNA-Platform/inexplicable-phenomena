import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Sentence } from '@/writing/Sentence';
import { Word } from '@/writing/Word';
import { Letter } from '@/writing/Letter';

// A sentence is written as words.
export class $WordsSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Sentence>
                <Word>Hi</Word>
                <Word>there</Word>
            </Sentence>
        );
    }
}

export const WordsSpec = $($WordsSpec);
