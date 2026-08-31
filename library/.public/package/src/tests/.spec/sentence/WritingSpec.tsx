import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Writing } from '@/writing/Writing';
import { Word } from '@/writing/Word';
import { Type } from '@/notation/Type';

// Writing told it is a Sentence composes the words written inside it.
export class $WritingSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>
                <Word>Hi</Word>
                <Word>there</Word>
                <Type>Sentence</Type>
            </Writing>
        );
    }
}

export const WritingSpec = $($WritingSpec);
