import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Writing, Type } from '@/writing/Writing';
import { Word } from '@/writing/Word';
import { Sentence } from '@/writing/Sentence';
import { Letter } from '@/writing/Letter';

// A sentence stops once, at its end. Prose that stops before its end is two sentences and is refused.
export class $SentenceStopSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Sentence>One two.</Sentence>
        );
    }
}

export const SentenceStopSpec = $($SentenceStopSpec);

// A sentence is written as words.
export class $SentenceWordsSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Sentence>
                <Word>Hi</Word>
                <Word>there</Word>
            </Sentence>
        );
    }
}

export const SentenceWordsSpec = $($SentenceWordsSpec);

// Writing told it is a Sentence composes the words written inside it.
export class $SentenceWritingSpec extends $Chemical {
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

export const SentenceWritingSpec = $($SentenceWritingSpec);
