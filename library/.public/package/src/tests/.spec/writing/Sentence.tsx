import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Writing, Type } from '@/writing/Writing';
import { Word } from '@/writing/Word';
import { Sentence } from '@/writing/Sentence';
import { Path } from '@/reference/Path';

// A sentence stops once, at its end.
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

// Nesting means the nested contributes its parts to the parts: the outer reads
// a through g while the inner still answers a through e.
export class $SentenceNestedSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Sentence>
                <Sentence>
                    <Word>a</Word> <Word>b</Word> <Word>c</Word> <Word>d</Word> <Word>e</Word>
                </Sentence>
                {' '}
                <Word>f</Word> <Word>g</Word>
            </Sentence>
        );
    }
}

export const SentenceNestedSpec = $($SentenceNestedSpec);

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

// A reference to a sentence stands one meta-level up: writing carrying the
// $Sentence type whose path must land on a sentence.
export class $SentenceReferenceSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>sentence<Type>$Sentence</Type><Path>Se:0</Path></Writing>
        );
    }
}

export const SentenceReferenceSpec = $($SentenceReferenceSpec);
