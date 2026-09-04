import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Phrase } from '@/writing/Phrase';
import { Sentence } from '@/writing/Sentence';
import { Word } from '@/writing/Word';
import { Writing, Type } from '@/writing/Writing';

// A phrase written as prose carries the spaces a word may not. Its words await
// the parse above word, which is not built.
export class $PhraseTextExample extends $Chemical {
    view(): ReactNode {
        return (
            <Phrase>The semantics of books</Phrase>
        );
    }
}

export const PhraseTextExample = $($PhraseTextExample);

// A phrase takes words and composes them, staying on one unbroken line.
export class $PhraseWordsExample extends $Chemical {
    view(): ReactNode {
        return (
            <Phrase>
                <Word>at</Word>
                <Word>last</Word>
            </Phrase>
        );
    }
}

export const PhraseWordsExample = $($PhraseWordsExample);

// A phrase is a sentence standing inside one: it lends its words to the sentence
// holding it, and is never itself a part.
export class $PhraseSentenceExample extends $Chemical {
    view(): ReactNode {
        return (
            <Sentence>
                See Also:
                <Phrase>Gauge Theory</Phrase>
                [and <Phrase>General Relativity</Phrase>]
            </Sentence>
        );
    }
}

export const PhraseSentenceExample = $($PhraseSentenceExample);

// Writing told it is a Phrase composes its words at sentence grade.
export class $PhraseWritingExample extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>
                At last!
                <Type>Phrase</Type>
            </Writing>
        );
    }
}

export const PhraseWritingExample = $($PhraseWritingExample);
