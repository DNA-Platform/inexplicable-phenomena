import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Phrase } from '@/writing/Phrase';
import { Sentence } from '@/writing/Sentence';
import { Word } from '@/writing/Word';
import { Writing, Type } from '@/writing/Writing';

// A phrase written as prose carries the spaces a word may not. Its words await
// the parse above word, which is not built.
export class $PhraseTextSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Phrase>the semantics of books</Phrase>
        );
    }
}

export const PhraseTextSpec = $($PhraseTextSpec);

// A phrase takes words and composes them, staying on one unbroken line.
export class $PhraseWordsSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Phrase>
                <Word>at</Word> <Word>last</Word>
            </Phrase>
        );
    }
}

export const PhraseWordsSpec = $($PhraseWordsSpec);

// A phrase is a sentence standing inside one: it lends its words to the sentence
// holding it, and is never itself a part.
export class $PhraseSentenceSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Sentence>
                <Word>see</Word>
                {' '}
                <Phrase>
                    <Word>gauge</Word> <Word>theory</Word>
                </Phrase>
                {' '}
                <Word>today</Word>
            </Sentence>
        );
    }
}

export const PhraseSentenceSpec = $($PhraseSentenceSpec);

// Writing told it is a Phrase composes its words at sentence grade.
export class $PhraseWritingSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>
                <Word>at</Word> <Word>last</Word>
                <Type>Phrase</Type>
            </Writing>
        );
    }
}

export const PhraseWritingSpec = $($PhraseWritingSpec);
