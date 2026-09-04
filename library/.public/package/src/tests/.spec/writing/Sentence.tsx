import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Writing, Type } from '@/writing/Writing';
import { Word } from '@/writing/Word';
import { Sentence } from '@/writing/Sentence';
import { Path } from '@/reference/Path';

// A sentence stops once, at its end.
export class $SentenceStopExample extends $Chemical {
    view(): ReactNode {
        return (
            <Sentence>One two.</Sentence>
        );
    }
}

export const SentenceStopExample = $($SentenceStopExample);

// A sentence is written as words.
export class $SentenceWordsExample extends $Chemical {
    view(): ReactNode {
        return (
            <Sentence>
                <Word>Hi</Word>
                <Word>there.</Word>
            </Sentence>
        );
    }
}

export const SentenceWordsExample = $($SentenceWordsExample);

// Nesting means the nested contributes its parts to the parts: the outer reads
// a through g while the inner still answers a through e.
export class $SentenceNestedExample extends $Chemical {
    view(): ReactNode {
        return (
            <Sentence>
                <Sentence>a b c d e</Sentence>
                f g
            </Sentence>
        );
    }
}

export const SentenceNestedExample = $($SentenceNestedExample);

// Writing told it is a Sentence composes the words written inside it.
export class $SentenceWritingExample extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>
                <Word>Hi</Word>
                <Word>there.</Word>
                <Type>Sentence</Type>
            </Writing>
        );
    }
}

export const SentenceWritingExample = $($SentenceWritingExample);

// A reference to a sentence stands one meta-level up: writing carrying the
// $Sentence type whose path must land on a sentence.
export class $SentenceReferenceExample extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>sentence<Type>$Sentence</Type><Path>Se:0</Path></Writing>
        );
    }
}

export const SentenceReferenceExample = $($SentenceReferenceExample);
