import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Phrase } from '@/writing/Phrase';
import { Word } from '@/writing/Word';
import { Letter } from '@/writing/Letter';
import { Writing, Type } from '@/writing/Writing';

// A phrase written as text carries the spaces a word may not, and divides into
// its letters because a phrase IS a word.
export class $PhraseTextSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Phrase>the semantics of books</Phrase>
        );
    }
}

export const PhraseTextSpec = $($PhraseTextSpec);

// A phrase takes WORDS as input and flattens them into one unbroken stretch.
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

// And written as letters, like any word.
export class $PhraseLettersSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Phrase>
                <Letter>a</Letter>
                <Letter>t</Letter>
            </Phrase>
        );
    }
}

export const PhraseLettersSpec = $($PhraseLettersSpec);

// Writing told it is a Phrase carries the spaces a Word may not.
export class $PhraseWritingSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>the semantics of books<Type>Phrase</Type></Writing>
        );
    }
}

export const PhraseWritingSpec = $($PhraseWritingSpec);
